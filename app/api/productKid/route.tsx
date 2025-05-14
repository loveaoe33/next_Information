import { NextResponse } from 'next/server';

// GET Method
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const apiRouter = searchParams.get("api");
  const response = await fetch(`${apiRouter}/Product_Imformation/setProduct_Information`);
  const result = await response.json();
  const data = {
    externalData: result,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(data, { status: 200 });
}

// POST Method
export async function POST(request: Request) {
  try {
    const body = await request.json();   //呼叫時會丟json過來
    const { apiRouter } = body;

    const response = await fetch(`${apiRouter}/Product_Imformation/setProduct_Information`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body.user)
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON format' },
      { status: 400 }
    );
  }


}




export async function PUT(request: Request) {
  const body = await request.json()
  return NextResponse.json({ method: 'PUT', data: body, message: '更新資料成功' })
}


export async function DELETE(request: Request) {
  const body = await request.json()
  return NextResponse.json({ method: 'delete', data: body, message: '刪除成功' })
}