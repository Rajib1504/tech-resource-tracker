import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/db";
import { updateProfileSchema } from "@/Schemas/userSchema";
import bcrypt from "bcryptjs";
export const GET = async (req: NextRequest) => {
  try {
    //check the token form cookie 
    //if token expired or not logged in handle that 
    //verify the token using secret key and handle it 
    //decode token 
    //fetch latest user data 
    // if that user was deleted from db still has a token handel that and invalidate that 
    // return the user but exclude the password

    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in environment variables");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET) as { id: string, email: string }

    const user = await prisma.users.findUnique({
      where: { id: decode.id }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "user is not found "
      }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      message: "user is fetched successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        isVerified: user.isVerified
      }
    }, { status: 200 })
  } catch (error) {
    console.log("USER INFO ERROR :", error)


    return NextResponse.json({
      success: false,
      message: "Unauthorized: Invalid or expired token"
    }, { status: 401 })

  }




}

export const PUT = async (req: NextRequest) => {
  /*
  take data from body
  validate data
  check token 
  find user 
  update user data 
  return response 
  */
  try {
    const data = await req.json()
    const validateData = updateProfileSchema.safeParse(data)

    if (!validateData.success) {
      return NextResponse.json({
        success: false,
        message: "Invalid Input",
        error: validateData.error.flatten().fieldErrors
      }, { status: 400 })
    }

    const passwordMatching = data.oldPassword === data.confirmPassword
    if (passwordMatching) {
      return NextResponse.json({
        success: false,
        message: "old and new password should not be same",
      }, { status: 400 })
    }
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized token not found"
      }, { status: 401 })
    }
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({
        success: false,
        message: "JWT_SECRET not found "
      }, { status: 500 })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET) as { id: string, email: string }


    const user = await prisma.users.findUnique({
      where: { id: decode.id }
    })
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "user not found"
      }, { status: 401 })
    }
    const validateOldPassword = await bcrypt.compare(data.oldPassword, user.password)

    if (!validateOldPassword) {
      return NextResponse.json({
        success: false,
        message: "invalid old password"
      }, { status: 401 })
    }

    const hashNewPassword = await bcrypt.hash(validateData.data.newPassword, 10)

    const updatedUser = await prisma.users.update({
      where: { id: decode.id },
      data: {
        imageUrl: validateData.data.imageUrl,
        password: hashNewPassword,
      }
    })
    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: { id: user.id, name: user.name, email: user.email, imageUrl: user.imageUrl, isVerified: user.isVerified }
    }, { status: 200 })


  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong in update user service"
    }, { status: 500 })
  }
}