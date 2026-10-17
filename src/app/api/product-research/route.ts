
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.ETSY_API_KEY;
  const sharedSecret = process.env.ETSY_SHARED_SECRET;

  if (!apiKey || !sharedSecret) {
    return NextResponse.json(
      { error: "Etsy API credentials are missing." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const keywords = searchParams.get("keywords")?.trim();

  const limit = Math.min(
    Math.max(Number(searchParams.get("limit")) || 20, 1),
    100
  );

  const offset = Math.max(
    Number(searchParams.get("offset")) || 0,
    0
  );

  if (!keywords) {
    return NextResponse.json(
      { error: "Please provide product research keywords." },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams({
      keywords,
      limit: String(limit),
      offset: String(offset),
    });

    const response = await fetch(
      `https://api.etsy.com/v3/application/listings/active?${params.toString()}`,
      {
        headers: {
          "x-api-key": `${apiKey}:${sharedSecret}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Etsy product research failed:", response.status);

      return NextResponse.json(
        {
          error: "Etsy product research request failed.",
          status: response.status,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Could not connect to Etsy." },
      { status: 502 }
    );
  }
}
