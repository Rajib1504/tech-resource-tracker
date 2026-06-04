import { prisma } from "@/lib/db";
import { registerUserSchema } from "@/Schemas/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const POST = async (req: NextRequest) => {
      // take data
      //validate body data
      // hash password
      // check user is exist or not
      // jwt token create
      // send response
      // cookie set 


      try {
            const body = await req.json();

            const validateResult = registerUserSchema.safeParse(body);
            if (!validateResult.success) {
                  return NextResponse.json(
                        {
                              message: "Invalid Input",
                              errors: validateResult.error.flatten().fieldErrors,
                        },
                        { status: 400 },
                  );
            }

            const { name, email, password, imageUrl } = validateResult.data;

            // check dose user exist with this email 

            const existingUser = await prisma.users.findUnique({ where: { email: email } })
            if (existingUser) {
                  return NextResponse.json({
                        success: false,
                        message: "User Already Registered",
                  }, { status: 400 })
            }

            const hashPassword = await bcryptjs.hash(password, 10)

            const result = await prisma.users.create({
                  data: {
                        name,
                        email,
                        password: hashPassword,
                        imageUrl,
                  },
            });

            // 1. Create the JWT
            const token = jwt.sign(
                  { id: result.id, email: result.email },
                  process.env.JWT_SECRET!,
                  { expiresIn: "7d" }
            );

            // 2. Put the JWT inside an HttpOnly Cookie
            const cookieStore = await cookies();
            cookieStore.set("auth_token", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "strict",
                  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
                  path: "/",
            });

            const responseData = { id: result.id, email: result.email, name: result.name, imageUrl: result.imageUrl }
            return NextResponse.json(
                  {
                        message: "User Created Successfully",
                        user: responseData,
                  },
                  { status: 200 },
            );
      } catch (error) {
            if (error instanceof Error && (error as any).code === "P2002") {
                  return NextResponse.json(
                        {
                              message: "A user with this email already exists.",
                        },
                        { status: 409 },
                  );
            }

            return NextResponse.json(
                  {
                        message: "Internal Server Error",
                  },
                  { status: 500 },
            );
      }
};
