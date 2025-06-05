import { NextResponse } from 'next/server';

type RequestBody = {
  id: number | undefined | null;
  hashcode: string | undefined | null;
  domainUrl: string | undefined | null;
  header: string | undefined | null;
  kid_header: string | undefined | null;
  showbool: boolean | undefined | null;
  focus_number: number | undefined | null;
  img_url: string | undefined | null;
  userData: string | undefined | null;
  content_json: string | undefined | null;
}
// GET Method
export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);
    const domainUrl = searchParams.get("domainUrl");
    const productId=searchParams.get("id");
    const response = await fetch(`${domainUrl}/Product_Imformation/getProduct_Tree_Information?productId=${productId}`);
    const result: any = await response.json();
    const transResult:any=Object.values(result);   //HashMap data to List
    const data: any = {
      externalData: transResult,
      timestamp: new Date().toISOString()
    };
    if (!response.ok) throw new Error('GET API失敗了')
    return NextResponse.json({ method: 'GET', sucess: true, message: '取得資料成功', res: data })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {   //update state

  try {
    console.log("123123");
    const body = await request.json()
    const { id, domainUrl, content_json }: RequestBody = body;
    const response = await fetch(`${domainUrl}/Product_Imformation/update_Product_Detail?productId=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        content_json: content_json,
      })

    });
    if (!response.ok) throw new Error('PATCH API失敗了')
    const data: string = await response.text();
    return NextResponse.json({ method: 'PATCH', sucess: true, message: '更新資料成功', res: data })


  } catch (error) {

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );

  }

}



export async function PUT(request: Request){
  const body = await request.json()
  return NextResponse.json({ method: 'PUT', data: body, message: '更新資料成功' })
}


