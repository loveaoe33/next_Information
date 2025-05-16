"use client";

import { useState } from "react"



interface Category {
  fecth: () => void;
  add: (data: Category) => void;
  delete: () => void;
  update: () => void;
  hide: () => void;
  shows: () => void;
  touch: () => void;
  toJSON: () => void;
}



class MajorCategory implements Category {
  private api_url: string = "";
  private id: number | undefined | null;;
  private header: string | undefined | null;
  private kid_header: string | undefined | null;
  private tree_header: string | undefined | null;
  private hashcode: string | undefined | null;
  private create_date: string | undefined | null;
  private create_name: string | undefined | null;
  private show: Boolean | undefined | null;
  private domain: string | undefined | null;
  private userData:string| undefined | null;
  constructor(id: number, header: string, hashcode: string, domain: string,userData:string) {
    this.id = id;
    this.header = header;
    this.hashcode = hashcode;
    this.userData=userData;
    this.domain = domain;
  }
  fecth = async (): Promise<void> => {
    const res = await fetch('/api/productAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(`大項目:`);

  };
  add = async () => {
          alert(this.userData);

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

      if (!res.ok) throw new Error("MajorCategory add Error")
      const result = await res.json();
      console.log(result);
    } catch (err) {
      alert(err);

    }
  }
  delete = async () => {

    try {

      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MajorCategory delete Error")
      const result = await res.json();
      console.log(result);
    } catch (err) {
      alert(err);

    }

  }
  update = () => {

  }
  hide = async () => {
    try {

      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MajorCategory hide Error")
      const result = await res.json();
      this.show = false;
      console.log(result);
    } catch (err) {
      alert(err);

    }
  }
  shows = async () => {
    try {

      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MajorCategory shows Error")
      const result = await res.json();
      this.show = true;
      console.log(result);
    } catch (err) {
      alert(err);

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
      tree_header: this.tree_header,
      hashcode: this.hashcode,
    }

  }

}

class MidCategory implements Category {
  private api_url = "";

  private id: number | undefined | null;;
  private header: String | undefined | null;
  private kid_header: String | undefined | null;
  private father_header: String | undefined | null;
  private hashcode: String | undefined | null;
  private create_date: String | undefined | null;
  private create_name: String | undefined | null;
  private show: Boolean | undefined | null;
  private focus_number: number | undefined | null;
  private domain: string | undefined | null;

  constructor(domain: string) {
    this.domain = domain;
  }
  fecth = (): void => {
    console.log(`大項目:`);

  };
  add = async (data: Category) => {
    try {
      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MidCategory add Error")
      const result = await res.json();
      console.log(result);
    } catch (err) {
      alert(err);
    }

  }
  delete = async () => {


    try {

      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MidCategory delete Error")
      const result = await res.json();
      console.log(result);
    } catch (err) {
      alert(err);

    }

  }
  update = () => {

  }
  hide = async () => {
    try {

      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MidCategory hide Error")
      const result = await res.json();
      this.show = true;
      console.log(result);
    } catch (err) {
      alert(err);

    }
  }
  shows = async () => {
    try {

      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MidCategory shows Error")
      const result = await res.json();
      this.show = false;
      console.log(result);
    } catch (err) {
      alert(err);

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
      father_header: this.father_header,
      hashcode: this.hashcode,
      create_date: this.create_date,
      create_name: this.create_name,
      focus_number: this.focus_number,
    }
  }
}




class MinorCategory implements Category {
  private api_url = "";
  private id: number | undefined | null;;
  private header: String | undefined | null;

  private father_header: String | undefined | null;
  private top_header: String | undefined | null;
  private hashcode: String | undefined | null;
  private create_date: String | undefined | null;
  private create_name: String | undefined | null;
  private focus_number: number | undefined | null;
  private img_url: String | undefined | null;
  private show: Boolean | undefined | null;
  private content_json: String | undefined | null;
  private domain: String | undefined | null;
  constructor(domain: string) {
    this.domain = domain
  }
  fecth = (): void => {
    console.log(`大項目:`);

  };


  add = async (data: Category) => {
    try {
      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MinorCategory add Error")
      const result = await res.json();
      console.log(result);
    } catch (err) {
      alert(err);
    }


  }
  delete = async () => {
    try {

      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MinorCategory delete Error")
      const result = await res.json();
      console.log(result);
    } catch (err) {
      alert(err);

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

      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MinorCategory hide Error")
      const result = await res.json();
      this.show = true;
      console.log(result);
    } catch (err) {
      alert(err);

    }
  }
  shows = async () => {
    try {

      const res = await fetch(this.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      })

      if (!res.ok) throw new Error("MinorCategory shows Error")
      const result = await res.json();
      this.show = false;
      console.log(result);
    } catch (err) {
      alert(err);

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
      top_header: this.top_header,
      father_header: this.father_header,
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



export function MajorCategory_Api(id: number, header: string, hashcode: string, domain: string,userData:string): MajorCategory {
  const Major = new MajorCategory(id, header, hashcode, domain,userData);
  return Major;

}

export function MidCategory_Api(domain: string): MidCategory {
  const Kid = new MidCategory(domain);
  return Kid;

}


export function MinorCategory_Api(domain: string): MinorCategory {
  const Minor = new MinorCategory(domain);
  return Minor;


}
