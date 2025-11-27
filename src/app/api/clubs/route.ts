import { NextResponse } from 'next/server';
import { getClubs } from 'morpheus-asia/lib/strapi';

export async function GET() {
  try {
    const clubs = await getClubs();
    return NextResponse.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clubs' },
      { status: 500 }
    );
  }
}

