import { helpers } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { User, ApiResponse } from '@/types';

// GET all users
export async function GET() {
  try {
    const users = await helpers.findAll();
    return NextResponse.json<ApiResponse<User[]>>(
      {
        success: true,
        data: users,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST new user
export async function POST(request: NextRequest) {
  try {
    const body: User = await request.json();

    // Validate required fields
    if (!body.name || body.age === undefined) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Please provide name and age',
        },
        { status: 400 }
      );
    }

    // Validate age is a number
    if (typeof body.age !== 'number' || body.age < 0) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Age must be a positive number',
        },
        { status: 400 }
      );
    }

    const user = await helpers.addUser(body.name, body.age);

    return NextResponse.json<ApiResponse<User>>(
      {
        success: true,
        data: user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
