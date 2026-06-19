import { helpers } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { User, ApiResponse } from '@/types';

// GET single user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Invalid user ID',
        },
        { status: 400 }
      );
    }

    const user = await helpers.findById(id);

    if (!user) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<User>>(
      {
        success: true,
        data: user,
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

// DELETE user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Invalid user ID',
        },
        { status: 400 }
      );
    }

    const user = await helpers.findById(id);

    if (!user) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    await helpers.deleteById(id);

    return NextResponse.json<ApiResponse<{ message: string }>>(
      {
        success: true,
        data: { message: `User with ID ${id} deleted` },
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
