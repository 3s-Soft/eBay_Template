import { NextResponse } from 'next/server';
import { compileTemplate } from '@/lib/templateEngine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateId, data } = body;
    
    if (!templateId || !data) {
      return NextResponse.json({ error: 'Missing templateId or data' }, { status: 400 });
    }

    const html = compileTemplate(templateId, data);
    
    return NextResponse.json({ html });
  } catch (error) {
    console.error('Generation errors:', error);
    return NextResponse.json({ error: 'Failed to generate template' }, { status: 500 });
  }
}
