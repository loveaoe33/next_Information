import { NextResponse } from 'next/server';

// GET Method
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = {
    message: 'This is a GET response',
    id: id || 'no-id-provided',
    token:"123",
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(data, { status: 200 });
}

// POST Method
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = {
      message: 'This is a POST response',
      receivedData: body,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON format' },
      { status: 400 }
    );
  }
}




export async function PUT(request: Request){
  const body = await request.json()
  return NextResponse.json({ method: 'PUT', data: body, message: '更新資料成功' })
}


export async function DELETE(request: Request){
    const body=await request.json()
    return NextResponse.json({method:'delete',data: body,message:'刪除成功'})
}