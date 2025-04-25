import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  const data = {
    message: `Getting user with ID: ${userId}`,
    userId,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const body = await request.json();
  const data = {
    message: `Updating user with ID: ${userId}`,
    userId,
    updatedData: body,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(data);
}



export async function PUT(request: Request){
  const body = await request.json()
  return NextResponse.json({ method: 'PUT', data: body, message: '更新資料成功' })
}


export async function DELETE(request: Request){
    const body=await request.json()
    return NextResponse.json({method:'delete',data: body,message:'刪除成功'})
}