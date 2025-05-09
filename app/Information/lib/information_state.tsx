import { useState } from "react"



export default function imformationState() {
  const [domain, setDomain] = useState("http://localhost:8080");
  interface Category {
    add: () => void;
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
    private header: String | undefined | null;
    private kid_header: String | undefined | null;
    private tree_header: String | undefined | null;
    private hashcode: String | undefined | null;
    private create_date: String | undefined | null;
    private create_name: String | undefined | null;
    private show: Boolean | undefined | null;
    constructor(header: String) {
      this.header = header;
    }
    add = async () => {
      try {
        this.api_url = `${domain}/Product_Imformation/setProduct_Information`;

        const res = await fetch(this.api_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

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
        this.api_url = `${domain}/Product_Imformation/deleteProduct_Information`;

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
        this.api_url = `${domain}/Product_Imformation/updateProduct_State`;

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
        this.api_url = `${domain}/Product_Imformation/updateProduct_State`;

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

    constructor() {

    }
    add = async () => {
      try {
        this.api_url = `${domain}/Product_Imformation/setProduct_Information`;
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
        this.api_url = `${domain}/Product_Imformation/deleteProduct_Information`;

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
        this.api_url = `${domain}/Product_Imformation/updateProduct_State`;

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
        this.api_url = `${domain}/Product_Imformation/updateProduct_State`;

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

    constructor() {

    }
    add = async () => {
      try {
        this.api_url = `${domain}/Product_Imformation/setProduct_Information`;
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
        this.api_url = `${domain}/Product_Imformation/deleteProduct_Information`;

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
        this.api_url = `${domain}/Product_Imformation/updateProduct_Tree_Detail`;

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
        this.api_url = `${domain}/Product_Imformation/updateProduct_State`;

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
        this.api_url = `${domain}/Product_Imformation/updateProduct_State`;

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
      this.api_url = `${domain}/Product_Imformation/setNumber_Value`;

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



  const [MajorItem, setMajor] = useState<Map<String, MajorCategory[]>>(new Map());
  const [MidItem, setMid] = useState<Map<String, MidCategory[]>>(new Map());
  const [MinorItem, setMinor] = useState<Map<String, MinorCategory[]>>(new Map());




  const fetchMajorCategory = async () => {
    const api_url = `${domain}/Product_Imformation/getProduct_Information`;
    //   const res=await axios.get("/api/");
    const response = await fetch("/api/productAll");
    if (!response) throw new Error("fetch Major_API Error");
    const data = await response.json();
    console.log(`大項目:${data}`);

  }

  const fetchMidCategory = async () => {
    const api_url = `${domain}/Product_Imformation/getProduct_Kid_Information`;

    const response = await fetch("/api/productKid");
    if (!response) throw new Error("fetch Mid_API Error");
    const data = await response.json();
    console.log(`中項目:${data}`);
  }

  const fetchMinorCategory = async () => {
    const api_url = `${domain}/Product_Imformation/getProduct_Tree_Information`;

    const response = await fetch("/api/productDetail");
    if (!response) throw new Error("fetch Minor_API Error");
    const data = await response.json();
    console.log(`小項目:${data}`);
  }


  const fetchMinorDetail = async () => {
    const api_url = `${domain}/Product_Imformation/getProduct_Tree_Detail`;

    const response = await fetch("/api/productDetail");
    if (!response) throw new Error("fetch Minor_API Error");
    const data = await response.json();
    console.log(`小項目內容:${data}`);
  }

}