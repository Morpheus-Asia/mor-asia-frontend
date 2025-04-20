import { NextRequest, NextResponse } from "next/server";

const endpointMap: Record<string, string> = {
  supply: "total_and_circ_supply",
  data: "metrics",
  priceData: "price/history",
  addSubscriber: "engagement/subscriber/add",
  sendEmail: "engagement/email/send",
};

export async function GET(request: NextRequest) {
  try {
    const { pathname, search } = new URL(request.url);
    const route = pathname.split("/api/morpheus-api/")[1];

    const mappedEndpoint = endpointMap?.[route];
    if (!mappedEndpoint) {
      return NextResponse.json(
        { error: `No endpoint mapped for ${route}` },
        { status: 404 }
      );
    }

    const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${endpointMap[route]}${search}`;

    const response = await fetch(targetUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch", status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { pathname } = new URL(req.url);
    const route = pathname.split("/api/morpheus-api/")[1];

    const mappedEndpoint = endpointMap?.[route];

    if (!mappedEndpoint) {
      return NextResponse.json(
        { error: `No endpoint mapped for ${route}` },
        { status: 404 }
      );
    }

    const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${endpointMap[route]}`;

    const response = await fetch(targetUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to process`,
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong. Error: ${error}` },
      { status: 500 }
    );
  }
}
