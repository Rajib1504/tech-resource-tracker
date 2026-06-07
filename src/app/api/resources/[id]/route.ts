import { prisma } from "@/lib/db";
import { UpdateResourceSchema } from "@/Schemas/resourceSchema";
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import * as cheerio from "cheerio";
import { getYouTubeThumbnail } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  /*
  take data from params 
  show the data
  */
  try {
    const { id } = await params;
    const data = await prisma.resource.findUnique({
      where: { id },
      include: {
        category: true,
        user: {
          select: {
            name: true,
            email: true,
            isVerified: true,
            imageUrl: true
          }
        }
      }
    })
    if (!data) {
      return NextResponse.json({
        success: false,
        message: "Resource not found"
      }, { status: 404 })
    }
    return NextResponse.json({
      success: true,
      message: "Resource fetched successfully",
      data: data
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong in get resource service"
    }, { status: 500 })
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  /*
  take data from body 
  validate with resource schema
  take id form params
  check token
  decode token
  
  check user exist or not
  
  
  check resource exist or not with that params id
  check user is owner of that resource or not

  update the resource
  return response
  */
  try {
    const { id } = await params;
    const data = await req.json()
    const validateData = UpdateResourceSchema.safeParse(data)
    if (!validateData.success) {
      return NextResponse.json({
        success: false,
        message: "Invalid input",
        error: validateData.error.flatten().fieldErrors
      }, { status: 400 })
    }
    const { title, url, description, type, snippet } = validateData.data
    const token = req.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized : token is missing"
      }, { status: 401 })
    }
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({
        success: false,
        message: "JWT_SECRET not found "
      }, { status: 500 })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET) as { id: string, email: string }
    if (!decode) {
      return NextResponse.json({
        success: false,
        message: "Invalid token or token is expired"
      }, { status: 401 })
    }

    const findUser = await prisma.users.findUnique({
      where: { id: decode.id }
    })
    if (!findUser) {
      return NextResponse.json({
        success: false,
        message: "user not found"
      }, { status: 401 })
    }

    const findResource = await prisma.resource.findUnique({
      where: { id }
    })
    if (!findResource) {
      return NextResponse.json({
        success: false,
        message: "Resource not found"
      }, { status: 404 })
    }

    if (findResource.userId !== findUser.id) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to update this resource"
      }, { status: 401 })
    }

    // Determine the type to use (updated or existing)
    const resourceType = type || findResource.type;
    const resourceUrl = url !== undefined ? url : findResource.url;

    let thumbnailUrl = findResource.thumbnailUrl;

    // Re-scrape if the URL changed and it's a LINK
    if (resourceType === "LINK" && resourceUrl && url !== findResource.url) {
      let newThumbnail = getYouTubeThumbnail(resourceUrl);

      if (!newThumbnail) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const res = await fetch(resourceUrl, { 
            signal: controller.signal,
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
              "Accept-Language": "en-US,en;q=0.5"
            }
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            const html = await res.text();
            const $ = cheerio.load(html);

            newThumbnail = $('meta[property="og:image"]').attr('content')
              || $('meta[name="twitter:image"]').attr('content')
              || null;

            if (newThumbnail && newThumbnail.startsWith('/')) {
              const urlObj = new URL(resourceUrl);
              newThumbnail = `${urlObj.protocol}//${urlObj.host}${newThumbnail}`;
            }
          }
          
          if (!newThumbnail) {
            const urlObj = new URL(resourceUrl);
            newThumbnail = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=256`;
          }
        } catch (err) {
          console.error("Failed to scrape URL metadata on update:", err);
        }
      }
      
      if (newThumbnail) {
        thumbnailUrl = newThumbnail;
      }
    }

    const updateResource = await prisma.resource.update({
      where: { id },
      data: {
        title,
        type: resourceType as "LINK" | "SNIPPET",
        url: resourceType === "LINK" ? resourceUrl : null,
        snippet: resourceType === "SNIPPET" ? (snippet !== undefined ? snippet : findResource.snippet) : null,
        thumbnailUrl: resourceType === "LINK" ? thumbnailUrl : null,
        description
      }
    })

    revalidatePath("/")

    return NextResponse.json({
      success: true,
      message: "Resource updated successfully",
      data: updateResource
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong in update resource service"
    }, { status: 500 })
  }
}
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  /*
  take id form params
  check token
  decode token
  
  check user exist or not
  
  
  check resource exist or not with that params id
  check user is owner of that resource or not

  update the resource
  return response
  */
  try {
    const { id } = await params;

    const token = req.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized : token is missing"
      }, { status: 401 })
    }
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({
        success: false,
        message: "JWT_SECRET not found "
      }, { status: 500 })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET) as { id: string, email: string }
    if (!decode) {
      return NextResponse.json({
        success: false,
        message: "Invalid token or token is expired"
      }, { status: 401 })
    }

    const findUser = await prisma.users.findUnique({
      where: { id: decode.id }
    })
    if (!findUser) {
      return NextResponse.json({
        success: false,
        message: "user not found"
      }, { status: 401 })
    }

    const findResource = await prisma.resource.findUnique({
      where: { id }
    })
    if (!findResource) {
      return NextResponse.json({
        success: false,
        message: "Resource not found"
      }, { status: 404 })
    }

    if (findResource.userId !== findUser.id) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to delete this resource"
      }, { status: 401 })
    }

    const deleteResource = await prisma.resource.delete({
      where: { id }
    })

    revalidatePath("/")

    return NextResponse.json({
      success: true,
      message: "Resource deleted successfully",
      data: deleteResource.id
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong in delete resources service"
    }, { status: 500 })
  }
}