"use client";
import Image from "next/image";
import "./css/information_template.css"
import ModalView  from "./modal/modal_product";
import ModalLogin from "./modal/modal_login";
import { useEffect, useState } from "react";


export default function template_md(){
const [isOpen ,setIsOpent]=useState<boolean>(false);
const isClose=()=>{
    setIsOpent(false);
}
// useEffect(()=>{
// const handleResize=()=>setIsOpent(false);
// window.addEventListener("resize",handleResize);
// return ()=>window.removeEventListener("resize",handleResize);
// },[]);

    return(
        <body>
           
    <div className="slider">
        <div className="slides">
            <div className="slide" >
            <h2>高單位B群1</h2>
            <Image  src="https://i.imgur.com/sBHx3Wx.jpeg" width={300} height={200} alt="商品3"/>
            <p>維生素B群（Vitamin B Complex），又稱維他命B群，是人體無法自行製造，需要從食物獲取的水溶性營養素。</p>
        <div className="button-container"><button className="forward_Line" >詢問院內窗口</button>

        <button className="detail_Window" onClick={()=>setIsOpent(true)}>了解詳情</button></div>
            </div>
            <div className="slide" >
            <h2>高單位B群2</h2>
            <Image  src="https://i.imgur.com/sBHx3Wx.jpeg" width={300} height={200} alt="商品3"/>
            <p>有助於維持能量正常代謝，增進皮膚和黏膜的健康，有助於體脂肪、膽固醇的合成及胺基酸的代謝</p>
            <div className="button-container"><button className="forward_Line" >詢問院內窗口</button>
        
        <button className="detail_Window"  onClick={()=>setIsOpent(true)}>了解詳情</button></div>
            </div>
            <div className="slide" >
            <h2>高單位B群3</h2>
            <Image  src="https://i.imgur.com/sBHx3Wx.jpeg" width={300} height={200} alt="商品3"/>
            <p>有助於維持胺基酸正常代謝、紅血球中紫質的形成、有助於紅血球維持正常型態，幫助色胺酸轉變成菸鹼素，及增進神經系統的健康</p>
            <div className="button-container"><button className="forward_Line" >詢問院內窗口</button>
        
        <button className="detail_Window"  onClick={()=>setIsOpent(true)} >了解詳情</button></div>
            </div>
        </div>


    </div>
    <ModalView isClose={isClose} isOpen={isOpen} title="高單位B群" >
    你好呀
    </ModalView>

    </body>
    );
}