import { resourceSchema } from "@/Schemas/resourceSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/db";
import * as cheerio from "cheerio";
import { getYouTubeThumbnail } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) => {
  /*
  take data 
  validate data
  check if url is exist or not
  check token 
  check jwt secret 
  decode token 
  check user is valid or not
  check if category is valid or not
  create resource 
  return response

  */
  try {
    const data = await req.json()

    const validateData = resourceSchema.safeParse(data)
    if (!validateData.success) {
      return NextResponse.json({
        message: "Invalid Input",
        error: validateData.error.flatten().fieldErrors
      }, { status: 400 })
    }
    const { title, url, description, categoryId, type, snippet } = validateData.data

    if (type === "LINK" && url) {
      const existingResource = await prisma.resource.findFirst({
        where: { url }
      })
      if (existingResource) {
        return NextResponse.json({
          success: false,
          message: "Resource already exist"
        }, { status: 401 })
      }
    }

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

    const findCategory = await prisma.category.findUnique({
      where: { id: categoryId }
    })
    if (!findCategory) {
      return NextResponse.json({
        success: false,
        message: "category not found"
      }, { status: 401 })
    }

    let thumbnailUrl = null;

    if (type === "LINK" && url) {
      thumbnailUrl = getYouTubeThumbnail(url);

      if (!thumbnailUrl) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const res = await fetch(url, { 
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

            thumbnailUrl = $('meta[property="og:image"]').attr('content')
              || $('meta[name="twitter:image"]').attr('content')
              || null;

            if (thumbnailUrl && thumbnailUrl.startsWith('/')) {
              const urlObj = new URL(url);
              thumbnailUrl = `${urlObj.protocol}//${urlObj.host}${thumbnailUrl}`;
            }
          }
          
          if (!thumbnailUrl) {
            const urlObj = new URL(url);
            thumbnailUrl = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=256`;
          }
        } catch (err) {
          console.error("Failed to scrape URL metadata:", err);
        }
      }
    }

    const createResorce = await prisma.resource.create({
      data: {
        title,
        url: type === "LINK" ? url : null,
        snippet: type === "SNIPPET" ? snippet : null,
        description,
        userId: findUser.id,
        categoryId: findCategory.id,
        type: type as "LINK" | "SNIPPET",
        thumbnailUrl
      }
    })

    revalidatePath("/")

    return NextResponse.json({
      success: true,
      message: "Resource created successfully",
      data: createResorce
    }, { status: 201 })





  } catch (error) {
    console.log("RESOURCE POST ERROR : ", error)
    return NextResponse.json({
      success: false,
      message: "Something went wrong in resource service"
    }, { status: 500 })
  }

}

export const GET = async (req: NextRequest) => {
  /*
  check the token
  check jwt secret
   decode toekn
   find user 
   if user then based on id fetch resources 
   if user dosen't find then show all resources 
   
  */
  try {

    const token = req.cookies.get("auth_token")?.value
    if (!token) {
      const allResources = await prisma.resource.findMany({
        include: {
          category: true,
          user: {
            select: {
              name: true,
              email: true,
              isVerified: true,
              imageUrl: true
            }
          },
        },
        orderBy: { createdAt: "desc" }
      })
      return NextResponse.json({
        success: true,
        message: "Resource fetched successfully",
        data: allResources
      }, { status: 200 })

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

    const allResources = await prisma.resource.findMany({
      where: { userId: decode.id },
      include: {
        category: true,
        user: {
          select: {
            name: true,
            email: true,
            isVerified: true,
            imageUrl: true
          }
        },
      },
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json({
      success: true,
      message: "Resource fetched successfully",
      data: allResources
    }, { status: 200 })


  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong in resource service"
    }, { status: 500 })
  }
}
