import { NextResponse } from 'next/server';
import { getForms } from 'morpheus-asia/lib/strapi';

export async function GET() {
  try {
    const forms = await getForms();
    return NextResponse.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forms' },
      { status: 500 }
    );
  }
}
