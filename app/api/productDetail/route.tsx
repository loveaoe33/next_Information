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
    const response = await fetch(`${domainUrl}/Product_Imformation/getProduct_Tree_Information`);
    const result: any = await response.json();
    const transResult: any = Object.values(result);   //HashMap data to List
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

// POST Method
export async function POST(request: Request) {
  try {
    const body = await request.json();   //呼叫時會丟json過來
    const { id, hashcode, domainUrl, header, kid_header, userData }: RequestBody = body;
    console.log("url:" + domainUrl);
    const response = await fetch(`${domainUrl}/Product_Imformation/setProduct_Information?caseSelect=minorCase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: "Tree",
        id: id,
        hashcode: hashcode,
        header: header,
        kid_header: kid_header,
        userString: userData,
      })
    });
    const data: string = await response.text();
    // return NextResponse.json(data, { status: 201 });
    if (!response.ok) throw new Error('Insert API失敗了')
    return NextResponse.json({ method: 'POST', sucess: true, message: '新增資料成功', res: data })

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
    const response = await fetch(`${domainUrl}/Product_Imformation/deleteProduct_Information?caseSelect=minorCase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: "Tree",
        id: id,
        hashcode: hashcode,
        userString: userData,
      })
    });
    if (!response.ok) throw new Error('Delete API失敗了')
    const data: string = await response.text();
    return NextResponse.json({ method: 'DELETE', sucess: true, message: '刪除成功', res: data })

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
    const response = await fetch(`${domainUrl}/Product_Imformation/updateProduct_State?caseSelect=minorCase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: "Tree",
        id: id,
        hashcode: hashcode,
        showbool: showbool,
        userString: userData,
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



export async function PUT(request: Request) {  //update content
  try {
    const body = await request.json()
    const { id, hashcode, domainUrl, userData, img_url, content_json }: RequestBody = body;
    const response = await fetch(`${domainUrl}/Product_Imformation/update_Product_Detail?caseSelect=minorCase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: "Tree",
        id: id,
        hashcode: hashcode,
        userString: userData,
        content_json: content_json,
        img_url: img_url,
      })

    });
    if (!response.ok) throw new Error('PUT API失敗了')
    const data: string = await response.text();
    return NextResponse.json({ method: 'PUT', sucess: true, message: '更新資料成功', res: data })
  } catch (error) {

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );

  }
}


