import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const cookieStore = await cookies()
    const user = cookieStore.get("auth_token");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not logged in" },
        { status: 401 }
      )
    }
    cookieStore.delete("auth_token")
    return NextResponse.json(
      { success: true, message: "User logged out successfully" },
      { status: 200 }
    )

  } catch (error) {
    console.log("LOGOUT ERROR : ", error)
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong in logout service"
      },
      { status: 500 }
    )
  }
}