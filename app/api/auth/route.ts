import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: { email, name, password: "" },
      });
      
      console.log("User created:", newUser);
      return NextResponse.json({ message: "User created", user: newUser });
    }

    console.log("User exists:", existingUser);
    return NextResponse.json({ message: "User exists", user: existingUser });
  } catch (err) {
    console.error("Error in signup route:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
