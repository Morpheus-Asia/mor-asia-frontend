import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/total_deposited`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching total deposits:', error);
    return NextResponse.json({ error: 'Failed to fetch total deposits' }, { status: 500 });
  }
} 