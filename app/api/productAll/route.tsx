import { NextResponse } from 'next/server';


type RequestBody = {
  id: number | undefined | null;
  hashcode: string | undefined | null;
  domainUrl: string | undefined | null;
  header: string | undefined | null;
  showbool: boolean | undefined | null;
  userData: string | undefined | null;
}
// GET Method
export async function GET(request: Request) {   //get all data
  try {

    const { searchParams } = new URL(request.url);
    const domainUrl = searchParams.get("domainUrl");
    console.log("ass"+domainUrl);
    const response = await fetch(`${domainUrl}/Product_Imformation/getProduct_Information`);
    const result: any = await response.json();
    const transResult:any=Object.values(result);   //HashMap data to List
    const data: any = {
      externalData: transResult,
      timestamp: new Date().toISOString()
    };
    if (!response.ok) throw new Error('Insert API失敗了')
    return NextResponse.json({ method: 'GET', sucess: true, message: '取得資料成功', res: data })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }





}
// POST Method
export async function POST(request: Request) {   //insert data

  try {
    const body = await request.json();   //呼叫時會丟json過來
    const { id, hashcode, domainUrl, header, userData }: RequestBody = body;
    console.log("url:" + domainUrl);
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
    if (!response.ok) throw new Error('Insert API失敗了')
    const data: any = await response.json();
    // return NextResponse.json(data, { status: 201 });
    return NextResponse.json({ method: 'POST', sucess: true, message: '新增資料成功', res: data.res })

  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }


}


export async function DELETE(request: Request) { //delet data

  try {

    const body = await request.json()
    const { id, hashcode, domainUrl, userData }: RequestBody = body;
    const response = await fetch(`${domainUrl}/Product_Imformation/deleteProduct_Information?caseSelect=marjorCase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        hashcode: hashcode,
        userString: userData,

      })
    });
    if (!response.ok) throw new Error('Delete API失敗了')
    const data: any = response.json();
    return NextResponse.json({ method: 'DELETE', sucess: true, message: '刪除成功', res: data.res })

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
    const { id, hashcode, domainUrl, userData, showbool }: RequestBody = body;
    const response = await fetch(`${domainUrl}/Product_Imformation/updateProduct_State?caseSelect=marjorCase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        hashcode: hashcode,
        showbool: showbool,
        userString: userData,
      })

    });
    if (!response.ok) throw new Error('PATCH API失敗了')
    const data: any = response.json();
    return NextResponse.json({ method: 'PATCH', sucess: true, message: '更新資料成功', res: data.res })


  } catch (error) {

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );

  }

}

export async function PUT(request: Request) { //update data
  const body: string = await request.json()
  return NextResponse.json({ method: 'PUT', data: body, message: '更新資料成功' })
}


