import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cap_virtual_deposited`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching virtual deposits:', error);
    return NextResponse.json({ error: 'Failed to fetch virtual deposits' }, { status: 500 });
  }
} 