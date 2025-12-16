import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const runtime = "nodejs";

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
      const res = NextResponse.json({ message: "User created", user: newUser });
      res.cookies.set("auth", String(newUser.email || ""), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }

    console.log("User exists:", existingUser);
    const res = NextResponse.json({ message: "User exists", user: existingUser });
    res.cookies.set("auth", String(existingUser.email || ""), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    console.error("Error in signup route:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
