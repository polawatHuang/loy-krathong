// app/api/loykrathong/route.js
import { NextResponse } from 'next/server';

// In-memory storage (in production, you'd use a database)
let krathongs = [];

// GET method - retrieve all krathongs
export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      data: krathongs,
      count: krathongs.length 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch krathongs' },
      { status: 500 }
    );
  }
}

// POST method - add new krathong
export async function POST(request) {
  try {
    const body = await request.json();
    const { type, name, wish } = body;

    // Validate required fields
    if (!type || !name || !wish) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: type, name, wish' },
        { status: 400 }
      );
    }

    // Create new krathong with ID and style
    const newKrathong = {
      id: Date.now(),
      type,
      name,
      wish,
      style: {
        left: `${Math.random() * 90}%`,
        top: `${60 + Math.random() * 30}%`,
        animationDuration: `${10 + Math.random() * 5}s`,
      },
      createdAt: new Date().toISOString()
    };

    // Add to in-memory storage
    krathongs.push(newKrathong);

    return NextResponse.json({
      success: true,
      data: newKrathong,
      message: 'Krathong added successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add krathong' },
      { status: 500 }
    );
  }
}

// DELETE method - clear all krathongs (optional utility)
export async function DELETE() {
  try {
    krathongs = [];
    return NextResponse.json({
      success: true,
      message: 'All krathongs cleared'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to clear krathongs' },
      { status: 500 }
    );
  }
}