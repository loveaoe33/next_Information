import { useState } from "react"



export default function imformationState() {



  const [MajorItem, setMajor] = useState<any[]>([]);
  const [MidItem, setMid] = useState<any[]>([]);
  const [MinorItem, setMinor] = useState<any[]>([]);

  const addMajorCategory = async (name: String, userToken: String) => {


  }

  const addMidCategory = async (name: String, userToken: String, caseSelect: String) => {


  }
  const addMinorCategory = async (name: String, content: String, userToken: String, caseSelect: String) => {


  }

  const updateMinorCategory = async (hashCode: String, content: String, userToken: String, caseSelect: String) => {

  }



  const fetchMajorCategory = async () => {
    //   const res=await axios.get("/api/");
  }

  const fetchMidCategory = async () => {

  }

  const fetchMinorCategory = async () => {

  }


  const deleteMajor = async (hashCode: String, userToken: String) => {
    //   const res=await axios.get("/api/");
  }

  const deleteMidCategory = async (hashCode: String, userToken: String) => {

  }

  const deleteMinorCategory = async (hashCode: String, userToken: String) => {

  }


}