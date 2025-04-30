import { useState } from "react"



export default function  imformationState(){

 

  const [MajorItem,setMajor]=useState<any[]>([]);
  const [MidItem,setMid]=useState<any[]>([]);
  const [MinorItem,setMinor]=useState<any[]>([]);

  const addMajorCategory=async (name:String)=>{


  }

  const addMidCategory=async (name:String)=>{


  }
  const addMinorCategory=async (name:String,content:String)=>{


  }

  

  const fetchMajor=async ()=>{
    //   const res=await axios.get("/api/");
  }

  const fetchMidCategory=async()=>{

  }

  const fetchMinorCategory=async()=>{

  }


}