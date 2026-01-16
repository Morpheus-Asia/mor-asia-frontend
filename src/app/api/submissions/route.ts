import { NextResponse } from 'next/server';
import { createSubmission } from 'morpheus-asia/lib/strapi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formDocumentId, content } = body;

    if (!formDocumentId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: formDocumentId and content' },
        { status: 400 }
      );
    }

    const submission = await createSubmission(formDocumentId, content);
    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}
