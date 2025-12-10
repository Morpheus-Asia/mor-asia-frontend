import { NextResponse } from 'next/server';
import { getDocSections } from 'morpheus-asia/lib/strapi';

export async function GET() {
  try {
    const docSections = await getDocSections();
    return NextResponse.json(docSections);
  } catch (error) {
    console.error('Error fetching doc sections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documentation sections' },
      { status: 500 }
    );
  }
}
