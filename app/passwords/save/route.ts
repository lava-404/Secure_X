import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    console.log("Received raw body:", bodyText);
    let { passwordFor, seed, password, email } = JSON.parse(bodyText);
    email = email.replace(/^"|"$/g, "");


    // Fetch existing user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // TypeScript workaround for embedded array
    const existingPasswords =
      ((user as any)?.savedPasswords as Array<{
        passwordFor: string;
        seed?: string;
        password: string;
        createdAt: Date;
      }>) || [];

    const newPasswordEntry = {
      passwordFor,
      seed,
      password,
      createdAt: new Date(),
    };

    const updatedEntries = [...existingPasswords, newPasswordEntry];

    // Update user with proper typing
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        savedPasswords: updatedEntries,
      } as {
        savedPasswords: Array<{
          passwordFor: string;
          seed?: string;
          password: string;
          createdAt: Date;
        }>;
      },
    });

    return NextResponse.json({ message: "Password saved", user: updatedUser });
  } catch (err) {
    console.error("Error saving password:", err);
    return NextResponse.json(
      { error: "Failed to save password" },
      { status: 500 }
    );
  }
}
