import { NextResponse } from 'next/server';
import { getIdeaBanks } from 'morpheus-asia/lib/strapi';

export async function GET() {
  try {
    const ideaBanks = await getIdeaBanks();
    return NextResponse.json(ideaBanks);
  } catch (error) {
    console.error('Error fetching idea banks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch idea banks' },
      { status: 500 }
    );
  }
}
