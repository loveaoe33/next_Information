import { NextResponse } from 'next/server';


type RequestBody = {
  id: number | undefined | null;
  hashcode: string | undefined | null;
  domainUrl: string | undefined | null;
  header: string | undefined | null;
  showbool:boolean| undefined | null;
  userData:string | undefined | null;
}
// GET Method
export async function GET(request: Request) {   //get all data
  // const { searchParams } = new URL(request.url);
  // const domainUrl = searchParams.get("domainUrl");
  // const response = await fetch(`${domainUrl}/Product_Imformation/geetProduct_Information`);
  // const result: any = await response.json();
  // const data: any = {
  //   externalData: result,
  //   timestamp: new Date().toISOString()
  // };
  console.log('Sucess');
  return NextResponse.json({ error: 'Missing api parameter' }, { status: 400 });
}
// POST Method
export async function POST(request: Request) {   //insert data

  try {
    const body = await request.json();   //呼叫時會丟json過來
    const { id, hashcode, domainUrl, header, userData }: RequestBody = body;
    console.log("url:"+domainUrl);
    const response = await fetch(`${domainUrl}/Product_Imformation/setProduct_Information?caseSelect=marjorCase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        hashcode: hashcode,
        header: header,
        userString: userData,
      })
    });
    const data: any = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON format' },
      { status: 400 }
    );
  }


}


export async function DELETE(request: Request) { //delet data
  const body = await request.json()
  const { id, hashcode, domainUrl,userData }: RequestBody = body;
  const response = await fetch(`${domainUrl}/Product_Imformation/deleteProduct_Information?caseSelect=marjorCase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      hashcode: hashcode,
      userString: userData,

    })
  });
  const data: any = response.json();
  return NextResponse.json({ method: 'delete', data: data, message: '刪除成功' })
}


export async function STATE(request: Request) {   //update state
  const body = await request.json()
    const { id, hashcode, domainUrl,userData,showbool }: RequestBody = body;
    const response = await fetch(`${domainUrl}/Product_Imformation/updateProduct_State`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      hashcode: hashcode,
      showbool:showbool,
       userString: userData,
    })
  });
  return NextResponse.json({ method: 'PUT', data: body, message: '更新資料成功' })
}




export async function PUT(request: Request) { //update data
  const body: string = await request.json()
  return NextResponse.json({ method: 'PUT', data: body, message: '更新資料成功' })
}


