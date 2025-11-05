// app/api/loykrathong/route.js
import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://www.cipacmeeting.com/api/loykrathong';

// GET method - retrieve all krathongs from external API
export async function GET() {
  try {
    const response = await fetch(EXTERNAL_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform external API response to expected format
    if (Array.isArray(data)) {
      // If data is an array of krathongs, transform each one
      const transformedData = data.map(krathong => ({
        id: krathong.id,
        type: krathong.type,
        name: krathong.name,
        wish: krathong.wish,
        style: {
          left: krathong.style_left || `${10 + Math.random() * 60}%`,
          bottom: krathong.style_bottom || `${Math.random() * 30}%`,
          animationDuration: krathong.animation_duration || `${10 + Math.random() * 5}s`,
        },
        createdAt: krathong.created_at
      }));
      
      return NextResponse.json({
        success: true,
        data: transformedData,
        count: transformedData.length
      });
    } else if (data.success !== undefined) {
      // If external API already returns expected format
      return NextResponse.json(data);
    } else {
      // Handle other response formats
      return NextResponse.json({
        success: true,
        data: data,
        count: Array.isArray(data) ? data.length : 1
      });
    }
    
  } catch (error) {
    console.error('GET API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch krathongs from external API' },
      { status: 500 }
    );
  }
}

// POST method - forward to external API
export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    console.log('Received body:', body);
    const { type, name, wish } = body;

    // Validate required fields
    if (!type || !name || !wish) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: type, name, wish' },
        { status: 400 }
      );
    }

    // Validate type is one of the allowed values
    const allowedTypes = ['banana', 'lotus', 'candle'];
    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: `Invalid type. Must be one of: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }
    
    const externalResponse = await fetch(EXTERNAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        name,
        wish,
      }),
    });

    console.log('External API response status:', externalResponse.status);

    if (!externalResponse.ok) {
      const errorText = await externalResponse.text();
      console.error('External API error:', errorText);
      
      // If external API fails, create a local response as fallback
      const newKrathong = {
        id: Date.now(),
        type,
        name,
        wish,
        style: {
          left: `${10 + Math.random() * 60}%`,
          bottom: `${Math.random() * 30}%`,
          animationDuration: `${10 + Math.random() * 5}s`,
        },
        createdAt: new Date().toISOString()
      };

      return NextResponse.json({
        success: true,
        data: newKrathong,
        message: 'Krathong added successfully (fallback mode)',
        warning: 'External API unavailable'
      });
    }

    const externalData = await externalResponse.json();
    console.log('External API response:', externalData);

    // Transform the external API response to match expected frontend format
    const transformedResponse = {
      success: true,
      data: {
        id: externalData.id || Date.now(),
        type: externalData.type || type,
        name: externalData.name || name,
        wish: externalData.wish || wish,
        style: {
          left: externalData.style_left || `${10 + Math.random() * 60}%`,
          bottom: externalData.style_bottom || `${Math.random() * 30}%`,
          animationDuration: externalData.animation_duration || `${10 + Math.random() * 5}s`,
        },
        createdAt: externalData.created_at || new Date().toISOString()
      },
      message: 'Krathong added successfully'
    };

    return NextResponse.json(transformedResponse);

  } catch (networkError) {
    console.error('Network or external API error:', networkError);
    
    // Fallback: create local response if external API is unreachable
    const { type, name, wish } = await request.json();
    const newKrathong = {
      id: Date.now(),
      type,
      name,
      wish,
      style: {
        left: `${10 + Math.random() * 60}%`,
        bottom: `${Math.random() * 30}%`,
        animationDuration: `${10 + Math.random() * 5}s`,
      },
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newKrathong,
      message: 'Krathong added successfully (offline mode)',
      warning: 'External API connection failed'
    });
  }
}

// DELETE method - forward to external API
export async function DELETE() {
  try {
    const externalResponse = await fetch(EXTERNAL_API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!externalResponse.ok) {
      throw new Error(`External API error: ${externalResponse.status}`);
    }

    const externalData = await externalResponse.json();
    return NextResponse.json(externalData);
    
  } catch (error) {
    console.error('DELETE API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear krathongs from external API' },
      { status: 500 }
    );
  }
}