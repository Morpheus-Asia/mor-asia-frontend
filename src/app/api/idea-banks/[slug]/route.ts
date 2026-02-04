import { NextResponse } from 'next/server';
import { getIdeaBankBySlug } from 'morpheus-asia/lib/strapi';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const ideaBank = await getIdeaBankBySlug(slug);
    return NextResponse.json(ideaBank);
  } catch (error) {
    console.error('Error fetching idea bank:', error);
    return NextResponse.json(
      { error: 'Failed to fetch idea bank' },
      { status: 500 }
    );
  }
}
