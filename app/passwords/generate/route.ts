import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { seed, length = 12 } = await req.json();

    if (!seed || typeof seed !== "string") {
      return NextResponse.json(
        { error: "Seed is required and must be a string" },
        { status: 400 }
      );
    }

    // Ensure minimum length of 8
    const finalLength = Math.max(length, 8);

    // Character sets
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const allChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    // Deterministic pseudo-random function based on seed + index
    const prng = (seedStr: string, index: number) => {
      const hash = crypto
        .createHash("sha256")
        .update(seedStr + index)
        .digest("hex");
      return parseInt(hash.slice(0, 8), 16);
    };

    // Decide prefix/suffix lengths
    const seedLength = seed.length;
    const remaining = finalLength - seedLength;
    const prefixLen = Math.floor(remaining / 2);
    const suffixLen = remaining - prefixLen;

    // Generate prefix
    let prefix = "";
    for (let i = 0; i < prefixLen; i++) {
      const idx = prng(seed, i) % allChars.length;
      prefix += allChars[idx];
    }

    // Generate suffix
    let suffix = "";
    for (let i = 0; i < suffixLen; i++) {
      const idx = prng(seed, i + prefixLen) % allChars.length;
      suffix += allChars[idx];
    }

    // Ensure at least 1 uppercase in prefix or suffix
    const uppercaseIndex = prng(seed, 999) % (prefix.length + suffix.length);
    if (uppercaseIndex < prefix.length) {
      prefix =
        prefix.slice(0, uppercaseIndex) +
        uppercase[prng(seed, 1000) % uppercase.length] +
        prefix.slice(uppercaseIndex + 1);
    } else {
      const idx = uppercaseIndex - prefix.length;
      suffix =
        suffix.slice(0, idx) +
        uppercase[prng(seed, 1001) % uppercase.length] +
        suffix.slice(idx + 1);
    }

    // Ensure at least 1 number in prefix or suffix
    const numberIndex = prng(seed, 2000) % (prefix.length + suffix.length);
    if (numberIndex < prefix.length) {
      prefix =
        prefix.slice(0, numberIndex) +
        numbers[prng(seed, 2001) % numbers.length] +
        prefix.slice(numberIndex + 1);
    } else {
      const idx = numberIndex - prefix.length;
      suffix =
        suffix.slice(0, idx) +
        numbers[prng(seed, 2002) % numbers.length] +
        suffix.slice(idx + 1);
    }

    const password = `${prefix}${seed}${suffix}`;

    return NextResponse.json({ password });
  } catch (error) {
    console.error("Error generating password:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
