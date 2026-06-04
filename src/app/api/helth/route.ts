import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async () => {
      try {
            await prisma.$queryRaw`SELECT 1`
            return NextResponse.json({ message: "Database is connected" }, { status: 200 })
      } catch (error) {
            console.log(error)
            return NextResponse.json({ message: "Database is not connected" }, { status: 500 })
      }
}