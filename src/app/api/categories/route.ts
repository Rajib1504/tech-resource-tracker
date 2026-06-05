import { prisma } from "@/lib/db";
import { categorySchema } from "@/Schemas/categorySchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
export const POST = async (req: NextRequest) => {
  /*take data form body
  validate the data 
  check is that category exist
  create that category 
  return response
*/
  try {
    const body = await req.json()
    const validate = categorySchema.safeParse(body)

    if (!validate.success) {
      return NextResponse.json({
        success: false,
        message: "Invalid Input",
        errors: validate.error.flatten().fieldErrors
      }, { status: 400 })
    }

    const { name, slug } = validate.data;
    const token = req.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({
        message: "Unauthorized: token is missing",
        success: false
      }, { status: 401 })
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json({
        success: false,
        message: "JWT_SECRET not found "
      }, { status: 401 })
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET) as { id: string, email: string }

    const userCheck = await prisma.users.findUnique({
      where: { id: decode.id }
    })
    if (!userCheck) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized :user not found"
      }, { status: 401 }
      )
    }
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name: name.toLowerCase() }, { slug: slug.toLowerCase() }]
      }
    })
    if (existingCategory) {
      return NextResponse.json({
        success: false,
        message: "Category Already exist with this name or slug",
      }, { status: 400 })
    }
    const category = await prisma.category.create({
      data: {
        name: name.toLowerCase(),
        slug: slug.toLowerCase(),
      }
    })

    return NextResponse.json({
      success: true,
      message: "category created successfully",
      data: category
    }, { status: 201 })

  } catch (error) {
    console.log("CATEGORY POST ERROR : ", error)
    return NextResponse.json({
      success: false,
      message: "Something went wrong in category service"
    }, { status: 500 })
  }
}