import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eth/price`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    return NextResponse.json({ error: 'Failed to fetch ETH price' }, { status: 500 });
  }
} 