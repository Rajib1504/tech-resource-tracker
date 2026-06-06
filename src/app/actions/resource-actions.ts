"use server";

import { prisma } from "@/lib/db";

export async function getRecentResources(limit: number = 10, skip: number = 0) {
  try {
    const resources = await prisma.resource.findMany({
      take: limit,
      skip: skip,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        user: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    const total = await prisma.resource.count();

    return { resources, total };
  } catch (error) {
    console.error("Failed to fetch recent resources:", error);
    return { resources: [], total: 0 };
  }
}
