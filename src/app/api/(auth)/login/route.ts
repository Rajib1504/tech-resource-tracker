import { prisma } from "@/lib/db";
import { loginUserSchema } from "@/Schemas/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // 1. Validate Input
    const validateResult = loginUserSchema.safeParse(body);
    if (!validateResult.success) {
      return NextResponse.json(
        {
          message: "Invalid Input",
          errors: validateResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = validateResult.data;

    // 2. Find the user in the database
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 3. Compare passwords
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password", },
        { status: 401 },
      );
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in environment variables");
    }

    // 4. Create the JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Set the HttpOnly Cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    // 6. Return success (excluding password)
    return NextResponse.json(
      {
        message: "Logged in successfully",
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("LOGIN ERROR: ", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
};
