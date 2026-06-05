import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/db";
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