import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const contentType = searchParams.get("contentType") ?? "pages";

  // Remove contentType to avoid passing it to the strapi API
  searchParams.delete("contentType");

  const strapiUrl = new URL(
    `api/${contentType}`,
    process.env.NEXT_PUBLIC_API_URL
  );

  try {
    const strapiRes = await fetch(
      `${strapiUrl.href}?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await strapiRes.json();
    return NextResponse.json(data, { status: strapiRes.status });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
