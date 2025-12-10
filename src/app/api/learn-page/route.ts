import { NextResponse } from 'next/server';
import { getLearnPage } from 'morpheus-asia/lib/strapi';

export async function GET() {
  try {
    const learnPage = await getLearnPage();
    return NextResponse.json(learnPage);
  } catch (error) {
    console.error('Error fetching learn page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learn page' },
      { status: 500 }
    );
  }
}
