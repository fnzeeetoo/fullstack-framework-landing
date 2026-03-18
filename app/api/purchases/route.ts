import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "purchases.json");
    const data = await fs.readFile(filePath, "utf8").catch(() => null);
    if (!data) {
      return NextResponse.json({ purchases: [] });
    }
    const purchases = JSON.parse(data);
    return NextResponse.json({ purchases });
  } catch (err) {
    console.error("Failed to read purchases:", err);
    return NextResponse.json({ error: "Failed to read purchases" }, { status: 500 });
  }
}
