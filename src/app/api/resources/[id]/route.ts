import { prisma } from "@/lib/db";
import { UpdateResourceSchema } from "@/Schemas/resourceSchema";
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken";
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  /*
  take data from params 
  show the data
  */
  try {
    const { id } = params;
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

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
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
    const { id } = params;
    const data = await req.json()
    const validateData = UpdateResourceSchema.safeParse(data)
    if (!validateData.success) {
      return NextResponse.json({
        success: false,
        message: "Invalid input",
        error: validateData.error.flatten().fieldErrors
      }, { status: 400 })
    }
    const { title, url, description } = validateData.data
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

    const updateResource = await prisma.resource.update({
      where: { id },
      data: {
        title,
        url,
        description
      }
    })
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
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
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
    const { id } = params;

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