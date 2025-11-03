import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    console.log("Received raw body:", bodyText);

    const { passwordFor, seed, password, email } = JSON.parse(bodyText);
    const emailValue = email.replace(/^"|"$/g, "");

    // Fetch existing user
    const user = await prisma.user.findUnique({
      where: { email: emailValue },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Avoid 'any' — define a proper type
    type SavedPassword = {
      passwordFor: string;
      seed?: string;
      password: string;
      createdAt: Date;
    };

    const existingPasswords =
      ((user as unknown as { savedPasswords?: SavedPassword[] })
        ?.savedPasswords) || [];

    const newPasswordEntry: SavedPassword = {
      passwordFor,
      seed,
      password,
      createdAt: new Date(),
    };

    const updatedEntries: SavedPassword[] = [
      ...existingPasswords,
      newPasswordEntry,
    ];

    const updatedUser = await prisma.user.update({
      where: { email: emailValue },
      data: {
        savedPasswords: updatedEntries,
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
