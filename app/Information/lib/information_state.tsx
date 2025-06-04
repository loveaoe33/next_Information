"use client";

import { useState } from "react"



export interface Category {
  fetchs: () => Promise<[]>;
  add: (data: Category) => Promise<string>;
  delete: () => Promise<string>;
  update: () => void;
  hide: () => Promise<string>;
  shows: () => Promise<string>;
  touch: () => void;
  toJSON: () => void;
}





export class MajorCategory implements Category {
  private api_url: string = "";
  private id: number | undefined | null;
  private header: string | undefined | null;
  private hashcode: string | undefined | null;
  private create_date: string | undefined | null;
  private create_name: string | undefined | null;
  private showbool: Boolean | undefined | null;
  private domain: string | undefined | null;
  private userData: string | undefined | null;
  constructor(id: number, header: string, hashcode: string, domain: string, userData: string) {
    this.id = id;
    this.header = header;
    this.hashcode = hashcode;
    this.userData = userData;
    this.domain = domain;
  }
  fetchs = async (): Promise<[]> => {
    const query = new URLSearchParams({ id: "123", domainUrl: this.domain ?? "" }).toString();
    const res = await fetch(`/api/productAll?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(`大項目:`);
    return res.json();
  };
  add = async (): Promise<string> => {
    try {
      const res = await fetch('/api/productAll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          header: this.header,
          userData: this.userData,
        }),
      })
      const result = await res.json();
      if (!res.ok) throw new Error("MajorCategory add Error")
      return result.res;
    } catch (err) {

      return "Server Insert none connetcion";
    }
  }
  delete = async (): Promise<string> => {

    try {

      const res = await fetch('/api/productAll', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          header: this.header,
          userData: this.userData,
        }),
      })

      if (!res.ok) throw new Error("MajorCategory delete Error")
      const result = await res.json();
      return result.res;
    } catch (err) {
      alert(err);
      return "Server Delete none connetcion";
    }

  }
  update = () => {

  }
  hide = async () => {
    try {

      const res = await fetch('/api/productAll', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          header: this.header,
          showbool: false,
          userData: this.userData,
        }),
      })

      if (!res.ok) throw new Error("MajorCategory hide Error")
      const result = await res.json();
      this.showbool = false;
      return result.res;
    } catch (err) {
      return "Server Hide none connetcion";
    }
  }
  shows = async () => {
    try {

      const res = await fetch('/api/productAll', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          header: this.header,
          showbool: true,
          userData: this.userData,
        }),
      })

      if (!res.ok) throw new Error("MajorCategory show Error")
      const result = await res.json();
      this.showbool = true;
      return result.res;
    } catch (err) {
      alert(err);
      return "Server Show none connetcion";

    }

  }

  touch = () => {

  }
  static fromJSOM = () => {

  }
  toJSON = () => {   //私有欄位的話要寫
    return {
      id: this.id,
      header: this.header,
      hashcode: this.hashcode,
    }

  }

}

export class MidCategory implements Category {
  private api_url = "";

  private id: number | undefined | null;;
  private header: String | undefined | null;
  private father_header: String | undefined | null;
  private hashcode: String | undefined | null;
  private create_date: String | undefined | null;
  private create_name: String | undefined | null;
  private showbool: Boolean | undefined | null;
  private focus_number: number | undefined | null;
  private domain: string | undefined | null;
  private userData: string | undefined | null;


  constructor(id: number, headHashCode: string | undefined | null, header: string, hashcode: string, domain: string, userData: string) {
    this.id = id;
    this.header = header;
    this.father_header = headHashCode;
    this.hashcode = hashcode;
    this.userData = userData;
    this.domain = domain;
  }


  fetchs = async (): Promise<[]> => {

    const query = new URLSearchParams({ id: "123", domainUrl: this.domain ?? "" }).toString();
    const res = await fetch(`/api/productKid?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(`中項目:`);
    return res.json();

  };
  add = async (): Promise<string> => {
    try {
      const res = await fetch("/api/productKid", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          father_header: this.father_header,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          header: this.header,
          userData: this.userData,
        }),


      })

      if (!res.ok) throw new Error("MidCategory add Error")
      const result = await res.json();

      return result.res;
    } catch (err) {
      return "Server Insert none connetcion";
    }

  }
  delete = async (): Promise<string> => {


    try {

      const res = await fetch("/api/productKid", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          header: this.header,
          father: this.father_header,
          userData: this.userData,
        }),
      })

      if (!res.ok) throw new Error("MidCategory delete Error")
      const result = await res.json();
      return result.res;
    } catch (err) {
      alert(err);
      return "Server Delete none connetcion";
    }

  }
  update = () => {

  }
  hide = async () => {
    try {

      const res = await fetch("/api/productKid", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          header: this.header,
          showbool: false,
          userData: this.userData,
        }),
      })

      if (!res.ok) throw new Error("MidCategory hide Error")
      const result = await res.json();
      this.showbool = true;
      return result.res;
    } catch (err) {
      alert(err);
      return "Server Hide none connetcion";

    }
  }
  shows = async () => {
    try {

      const res = await fetch("/api/productKid", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          header: this.header,
          showbool: true,
          userData: this.userData,
        }),
      })

      if (!res.ok) throw new Error("MidCategory show Error")
      const result = await res.json();
      this.showbool = true;
      return result.res;
    } catch (err) {
      alert(err);
      return "Server Show none connetcion";

    }

  }

  touch = () => {

  }
  static fromJSOM = () => {

  }
  toJSON = () => {   //私有欄位的話要寫
    return {
      id: this.id,
      header: this.header,
      father_header: this.father_header,
      hashcode: this.hashcode,
      create_date: this.create_date,
      create_name: this.create_name,
      focus_number: this.focus_number,
    }
  }
}




export class MinorCategory implements Category {
  private api_url = "";
  private id: number | undefined | null;;
  private header: string | undefined | null;

  private kid_header: string | undefined | null;
  private hashcode: string | undefined | null;
  private create_date: string | undefined | null;
  private create_name: string | undefined | null;
  private focus_number: number | undefined | null;
  private img_url: string | undefined | null;
  private showbool: Boolean | undefined | null;
  private content_json: string | undefined | null;
  private domain: string | undefined | null;
  private userData: string | undefined | null;
  constructor(id: number, header: string, kid_header: string | null | undefined, hashcode: string, domain: string, userData: string, img_url?: string | undefined | null, content_json?: string | undefined | null) {
    this.id = id;
    this.header = header;
    this.kid_header = kid_header;
    this.hashcode = hashcode;
    this.userData = userData;
    this.domain = domain;
    this.img_url = img_url;
    this.content_json = content_json;
  }
  fetchs = async (): Promise<[]> => {
    const query = new URLSearchParams({ id: "123", domainUrl: this.domain ?? "" }).toString();
    const res = await fetch(`/api/productDetail?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(`小項目:`);
    return res.json();
  };
  add = async (): Promise<string> => {
    try {
      const res = await fetch('/api/productDetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          kid_header: this.kid_header,
          domainUrl: this.domain,
          header: this.header,
          userData: this.userData,
        }),
      })
      const result = await res.json();
      if (!res.ok) throw new Error("MajorCategory add Error")
      return result.res;
    } catch (err) {

      return "Server Insert none connetcion";
    }
  }
  delete = async (): Promise<string> => {


    try {

      const res = await fetch("/api/productDetail", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          kid_header: this.kid_header,
          domainUrl: this.domain,
          header: this.header,
          userData: this.userData,
        }),
      })

      if (!res.ok) throw new Error("MidCategory delete Error")
      const result = await res.json();
      return result.res;
    } catch (err) {
      alert(err);
      return "Server Delete none connetcion";
    }

  }
  update = async () => {
    try {

      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MinorCategory update Error")
      const result = await res.json();
      console.log(result);
    } catch (err) {
      alert(err);

    }
  }
  hide = async () => {
    try {

      const res = await fetch("/api/productDetail", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          header: this.header,
          showbool: false,
          userData: this.userData,
        }),
      })

      if (!res.ok) throw new Error("MinorCategory hide Error")
      const result = await res.json();
      this.showbool = true;
      return result.res;
    } catch (err) {
      alert(err);
      return "Server Hide none connetcion";

    }
  }
  shows = async () => {
    try {

      const res = await fetch("/api/productDetail", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          header: this.header,
          showbool: true,
          userData: this.userData,
        }),
      })

      if (!res.ok) throw new Error("MinorCategory show Error")
      const result = await res.json();
      this.showbool = true;
      return result.res;
    } catch (err) {
      alert(err);
      return "Server Show none connetcion";

    }

  }
  touch = () => {

  }
  static fromJSOM = () => {

  }
  toJSON = () => {   //私有欄位的話要寫
    return {
      id: this.id,
      header: this.header,
      kid_header: this.kid_header,
      hashcode: this.hashcode,
      create_date: this.create_date,
      create_name: this.create_name,
      focus_number: this.focus_number,
      img_url: this.img_url,
      content_json: this.content_json,
    }
  }
}



// const [MajorItem, setMajor] = useState<Map<String, MajorCategory[]>>(new Map());
// const [MidItem, setMid] = useState<Map<String, MidCategory[]>>(new Map());
// const [MinorItem, setMinor] = useState<Map<String, MinorCategory[]>>(new Map());




// const fetchMajorCategory = async () => {
//   const api_url = `${domain}/Product_Imformation/getProduct_Information`;
//   //   const res=await axios.get("/api/");
//   const response = await fetch("/api/productAll");
//   if (!response) throw new Error("fetch Major_API Error");
//   const data = await response.json();
//   console.log(`大項目:${data}`);

// }

// const fetchMidCategory = async () => {
//   const api_url = `${domain}/Product_Imformation/getProduct_Kid_Information`;

//   const response = await fetch("/api/productKid");
//   if (!response) throw new Error("fetch Mid_API Error");
//   const data = await response.json();
//   console.log(`中項目:${data}`);
// }

// const fetchMinorCategory = async () => {
//   const api_url = `${domain}/Product_Imformation/getProduct_Tree_Information`;

//   const response = await fetch("/api/productDetail");
//   if (!response) throw new Error("fetch Minor_API Error");
//   const data = await response.json();
//   console.log(`小項目:${data}`);
// }


// const fetchMinorDetail = async () => {
//   const api_url = `${domain}/Product_Imformation/getProduct_Tree_Detail`;

//   const response = await fetch("/api/productDetail");
//   if (!response) throw new Error("fetch Minor_API Error");
//   const data = await response.json();
//   console.log(`小項目內容:${data}`);
// }



export function MajorCategory_Api({
  id,
  header,
  hashcode,
  domain,
  userData,
}: {
  id: number;
  header: string;
  hashcode: string;
  domain: string;
  userData: string;
}): MajorCategory {
  return new MajorCategory(id, header, hashcode, domain, userData);
}


export function MidCategory_Api({
  id,
  headHashCode,
  header,
  hashcode,
  domain,
  userData,
}: {
  id: number;
  headHashCode?: string | null;
  header: string;
  hashcode: string;
  domain: string;
  userData: string;
}): MidCategory {
  return new MidCategory(id, headHashCode, header, hashcode, domain, userData);
}



export function MinorCategory_Api({
  id,
  header,
  kid_header,
  hashcode,
  domain,
  userData,
  img_url,
  content_json,
}: {
  id: number;
  header: string;
  kid_header?: string | null;
  hashcode: string;
  domain: string;
  userData: string;
  img_url?: string | null;
  content_json?: string | null;
}): MinorCategory {
  return new MinorCategory(id, header, kid_header, hashcode, domain, userData, img_url, content_json);
}

