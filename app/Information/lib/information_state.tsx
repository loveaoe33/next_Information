"use client";

/**
 * Interface representing a generic category with standard CRUD and visibility operations.
 */
export interface Category {
  /** Fetches category data. */
  fetchs: () => Promise<any[]>;
  /** Adds a new category. */
  add: () => Promise<string>;
  /** Deletes the category. */
  delete: () => Promise<string>;
  /** Updates the category. */
  update: () => Promise<string>;
  /** Hides the category from display. */
  hide: () => Promise<string>;
  /** Shows the category on display. */
  shows: () => Promise<string>;
  /** Touches the category (e.g., updates timestamp). */
  touch: () => void;
  /** Converts the object to a JSON-serializable format. */
  toJSON: () => any;
}

/**
 * Represents a Major Category (Top-level).
 * Implements the Category interface for API interactions.
 */
export class MajorCategory implements Category {
  private id?: number | null;
  private header?: string | null;
  private hashcode?: string | null;
  private create_date?: string | null;
  private create_name?: string | null;
  private showbool?: boolean | null;
  private domain?: string | null;
  private userData?: string | null;

  constructor(id?: number | null, header?: string | null, hashcode?: string | null, domain?: string | null, userData?: string | null) {
    this.id = id;
    this.header = header;
    this.hashcode = hashcode;
    this.userData = userData;
    this.domain = domain;
  }

  fetchs = async (): Promise<any[]> => {
    const query = new URLSearchParams({ id: "123", domainUrl: this.domain ?? "" }).toString();
    const res = await fetch(`/api/productAll?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Major Category fetched`);
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
      });

      if (!res.ok) throw new Error("MajorCategory add Error");
      const result = await res.json();
      return result.res;
    } catch (err) {
      console.error(err);
      return "Server connection error during insert";
    }
  };

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
      });

      if (!res.ok) throw new Error("MajorCategory delete Error");
      const result = await res.json();
      return result.res;
    } catch (err) {
      alert(err);
      return "Server connection error during delete";
    }
  };

  update = async () => {
    return "success";
  };

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
      });

      if (!res.ok) throw new Error("MajorCategory hide Error");
      const result = await res.json();
      this.showbool = false;
      return result.res;
    } catch (err) {
      console.error(err);
      return "Server connection error during hide";
    }
  };

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
      });

      if (!res.ok) throw new Error("MajorCategory show Error");
      const result = await res.json();
      this.showbool = true;
      return result.res;
    } catch (err) {
      alert(err);
      return "Server connection error during show";
    }
  };

  touch = () => {
    // TODO: Implement touch functionality
  };

  static fromJSON = () => {
    // TODO: Implement deserialization from JSON
  };

  /** 
   * Required for serializing private fields properly. 
   */
  toJSON = () => {
    return {
      id: this.id,
      header: this.header,
      hashcode: this.hashcode,
    };
  };
}

/**
 * Represents a Middle Category (Sub-level).
 * Implements the Category interface for API interactions.
 */
export class MidCategory implements Category {
  private id?: number | null;
  private header?: string | null;
  private father_header?: string | null;
  private hashcode?: string | null;
  private create_date?: string | null;
  private create_name?: string | null;
  private showbool?: boolean | null;
  private focus_number?: number | null;
  private domain?: string | null;
  private userData?: string | null;


  constructor(id?: number | null, headHashCode?: string | null, header?: string | null, hashcode?: string | null, domain?: string | null, userData?: string | null) {
    this.id = id;
    this.header = header;
    this.father_header = headHashCode;
    this.hashcode = hashcode;
    this.userData = userData;
    this.domain = domain;
  }

  fetchs = async (): Promise<any[]> => {
    const query = new URLSearchParams({ id: "123", domainUrl: this.domain ?? "" }).toString();
    const res = await fetch(`/api/productKid?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Mid Category fetched`);
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
      });

      if (!res.ok) throw new Error("MidCategory add Error");
      const result = await res.json();
      return result.res;
    } catch (err) {
      console.error(err);
      return "Server connection error during insert";
    }
  };

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
      });

      if (!res.ok) throw new Error("MidCategory delete Error");
      const result = await res.json();
      return result.res;
    } catch (err) {
      alert(err);
      return "Server connection error during delete";
    }
  };

  update = async () => {
    return "success";
  };

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
      });

      if (!res.ok) throw new Error("MidCategory hide Error");
      const result = await res.json();
      this.showbool = false; // Fixed logical error: was true
      return result.res;
    } catch (err) {
      alert(err);
      return "Server connection error during hide";
    }
  };

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
      });

      if (!res.ok) throw new Error("MidCategory show Error");
      const result = await res.json();
      this.showbool = true;
      return result.res;
    } catch (err) {
      alert(err);
      return "Server connection error during show";
    }
  };

  touch = () => {
    // TODO: Implement touch functionality
  };

  static fromJSON = () => {
    // TODO: Implement deserialization from JSON
  };

  /** 
   * Required for serializing private fields properly. 
   */
  toJSON = () => {
    return {
      id: this.id,
      header: this.header,
      father_header: this.father_header,
      hashcode: this.hashcode,
      create_date: this.create_date,
      create_name: this.create_name,
      focus_number: this.focus_number,
    };
  };
}

/**
 * Represents a Minor Category (Leaf-level).
 * Implements the Category interface for API interactions.
 */
export class MinorCategory implements Category {
  private id?: number | null;
  private header?: string | null;
  private kid_header?: string | null;
  private hashcode?: string | null;
  private create_date?: string | null;
  private create_name?: string | null;
  private focus_number?: number | null;
  private showbool?: boolean | null;
  private content_json?: string | null;
  private domain?: string | null;
  private userData?: string | null;

  constructor(id: number | undefined | null, header?: string | null, kid_header?: string | null, hashcode?: string | null, domain?: string | null, userData?: string | null, content_json?: string | null) {
    this.id = id;
    this.header = header;
    this.kid_header = kid_header;
    this.hashcode = hashcode;
    this.userData = userData;
    this.domain = domain;
    this.content_json = content_json;
  }

  fetchs = async (): Promise<any[]> => {
    const query = new URLSearchParams({ id: "123", domainUrl: this.domain ?? "" }).toString();
    const res = await fetch(`/api/productDetail?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Minor Category fetched`);
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
      });

      if (!res.ok) throw new Error("MinorCategory add Error");
      const result = await res.json();
      return result.res;
    } catch (err) {
      console.error(err);
      return "Server connection error during insert";
    }
  };

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
          content_json: this.header,
          userData: this.userData,
        }),
      });

      if (!res.ok) throw new Error("MinorCategory delete Error");
      const result = await res.json();
      return result.res;
    } catch (err) {
      alert(err);
      return "Server connection error during delete";
    }
  };

  /** Updates JSON string content of the category. */
  update = async () => {
    try {
      const res = await fetch("/api/productDetail", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
          hashcode: this.hashcode,
          domainUrl: this.domain,
          userData: this.userData,
          content_json: this.content_json,
        }),
      });

      if (!res.ok) throw new Error("MinorCategory update Error");
      const result = await res.json();
      console.log(result);
      return result.res;
    } catch (err) {
      console.error(err);
      return "Server connection error during update";
    }
  };

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
      });

      if (!res.ok) throw new Error("MinorCategory hide Error");
      const result = await res.json();
      this.showbool = false; // Fixed logical error: was true
      return result.res;
    } catch (err) {
      alert(err);
      return "Server connection error during hide";
    }
  };

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
      });

      if (!res.ok) throw new Error("MinorCategory show Error");
      const result = await res.json();
      this.showbool = true;
      return result.res;
    } catch (err) {
      alert(err);
      return "Server connection error during show";
    }
  };

  touch = () => {
    // TODO: Implement touch functionality
  };

  static fromJSON = () => {
    // TODO: Implement deserialization from JSON
  };

  /** 
   * Required for serializing private fields properly. 
   */
  toJSON = () => {
    return {
      id: this.id,
      header: this.header,
      kid_header: this.kid_header,
      hashcode: this.hashcode,
      create_date: this.create_date,
      create_name: this.create_name,
      focus_number: this.focus_number,
      content_json: this.content_json,
    };
  };
}

export function MajorCategory_Api({
  id,
  header,
  hashcode,
  domain,
  userData,
}: {
  id?: number | null;
  header?: string | null;
  hashcode?: string | null;
  domain?: string | null;
  userData?: string | null;
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
  id?: number | null;
  headHashCode?: string | null;
  header?: string | null;
  hashcode?: string | null;
  domain?: string | null;
  userData?: string | null;
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
  content_json,
}: {
  id?: number | null;
  header?: string | null;
  kid_header?: string | null;
  hashcode?: string | null;
  domain?: string | null;
  userData?: string | null;
  content_json?: string | null;
}): MinorCategory {
  return new MinorCategory(id, header, kid_header, hashcode, domain, userData, content_json);
}
