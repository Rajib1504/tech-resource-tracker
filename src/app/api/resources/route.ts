import { resourceSchema } from "@/Schemas/resourceSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/db";

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
    const { title, url, description, categoryId } = validateData.data

    const existingResource = await prisma.resource.findFirst({
      where: { url }
    })
    if (existingResource) {
      return NextResponse.json({
        success: false,
        message: "Resource already exist"
      }, { status: 401 })
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

    const createResorce = await prisma.resource.create({
      data: {
        title,
        url,
        description,
        userId: findUser.id,
        categoryId: findCategory.id
      }
    })
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