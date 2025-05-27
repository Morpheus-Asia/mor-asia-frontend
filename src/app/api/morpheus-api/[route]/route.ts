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

    // Handle metrics-data route specially
    if (route === "metrics-data") {
      const { searchParams } = new URL(request.url);
      const currentTime = searchParams.get("currentTime");

      // Fetch all data in parallel
      const [ethPriceResponse, ethHistoryResponse, totalDepositedResponse, morMetricsResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eth/price`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eth/history`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/total_deposited`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/metrics?currentTime=${currentTime}`),
      ]);

      // Parse all responses
      const [ethPriceData, ethHistoryData, totalDepositedData, morMetricsData] = await Promise.all([
        ethPriceResponse.json(),
        ethHistoryResponse.json(),
        totalDepositedResponse.json(),
        morMetricsResponse.json(),
      ]);

      // Combine all data into a single response
      const combinedData = {
        ethPrice: ethPriceData,
        ethHistory: ethHistoryData,
        totalDeposited: totalDepositedData,
        morMetrics: morMetricsData,
      };

      return NextResponse.json({ data: combinedData });
    }

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
