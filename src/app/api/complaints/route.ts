import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json([]); // Return empty if not configured
  }

  const { data: complaints, error } = await supabase
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch complaints from Supabase', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(complaints || []);
}

export async function POST(request: Request) {
  try {
    const newComplaint = await request.json();
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // Insert into Supabase
    // We omit 'id' and 'date' to let Supabase handle UUID and timestamp,
    // or we can pass them if we generated them locally. Let's let Supabase handle it.
    const { data, error } = await supabase
      .from('complaints')
      .insert([
        {
          text: newComplaint.text,
          lat: newComplaint.lat,
          lng: newComplaint.lng,
          category: newComplaint.category,
          department: newComplaint.department,
          priority: newComplaint.priority,
          address: newComplaint.address,
        }
      ])
      .select()
      .single();
    
    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Failed to save complaint to Supabase', error);
    return NextResponse.json({ error: error.message || 'Failed to save' }, { status: 500 });
  }
}

