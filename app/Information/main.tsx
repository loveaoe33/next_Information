"use client";

import { useEffect, useState } from "react";
import "./css/information_main.css"
import Template_Md from "./template_md";
import ModalLogin from "./modal/modal_login";


export default function main(){
    

        class apiRouter{
        private ipAddress:string | undefined;
        private ipPort:string | undefined;
        private isOpen:boolean| undefined;
        private url:string | undefined;
        private item:string| undefined;
        constructor(ipAddress:string,ipPort:string,isOpen:boolean,url:string,item:string){
          this.ipAddress=ipAddress;
          this.ipPort=ipPort;
          this.isOpen=isOpen;
          this.url=url;
          this.item=item;
        };

        public getRouter(): string {
            return `${this.ipAddress}:${this.ipPort}/${this.url}/${this.item}`;
          }
    }
    const [routerMap, setRouterMap] = useState<Map<string, apiRouter>>(() => {
        const apiUrl_MD = new apiRouter("192.168.2.147", "3000", true, "Information", "getMD_Product");
        const apiUrl_Xray = new apiRouter("192.168.2.147", "3000", true, "Information", "getXray_Product");
        const apiUrl_Health = new apiRouter("192.168.2.147", "3000", true, "Information", "getHealth_Product");
        const apiUrl_Reha = new apiRouter("192.168.2.147", "3000", true, "Information", "getReha_Product");
        const apiUrl_Or = new apiRouter("192.168.2.147", "3000", true, "Information", "getOr_Product");
        const apiUrl_Other = new apiRouter("192.168.2.147", "3000", true, "Information", "getOther_Product");
    
        return new Map([
            ['MD', apiUrl_MD],
            ['Xray', apiUrl_Xray],
            ['Health', apiUrl_Health],
            ['Reha', apiUrl_Reha],
            ['Or', apiUrl_Or],
            ['Other', apiUrl_Other]
        ]);
    });
    useEffect(()=>{  //when mount
        console.log("✅ useEffect - 组件初始化完成");
        return () => {
        console.log("❌ useEffect Cleanup");
        };
    },[])
    const [isOpen ,setIsOpent]=useState<boolean>(false);

    const isClose=()=>{
        setIsOpent(false);
    }
    const toggleSidebar=():void=>{
        document.getElementById("sidebar")?.classList.toggle("collapsed");
        
    }
    const toggleMenu=(index:string):void=>{
        document.getElementById(`submenu-${index}`)?.classList.toggle("active");

    }

    return (
    <body>
    <div className="container">
        <div className="sidebar" id="sidebar">
            <h2>選單</h2>
            <div className="toggle-btn" onClick={toggleSidebar}>≡</div>
            <div className="menu-item" onClick={(e)=>toggleMenu("0")}>💊藥品/保健品服務展示</div>
            <div className="submenu" id="submenu-0" >

                <div className="submenu-item">子選單 1-1</div>
                <div className="submenu-item">子選單 1-2</div>
            </div>
            <div className="menu-item"  onClick={(e)=>toggleMenu("1")}>🔪手術醫療展示</div>
            <div className="submenu" id="submenu-1" >
                <div className="submenu-item">子選單 1-1</div>
                <div className="submenu-item">子選單 1-2</div>
            </div>
            <div className="menu-item"  onClick={(e)=>toggleMenu("2")}>🩺院內健檢服務展示</div>
            <div className="submenu" id="submenu-2">
                <div className="submenu-item">子選單 2-1</div>
                <div className="submenu-item">子選單 2-2</div>
            </div>
            <div className="menu-item"  onClick={(e)=>toggleMenu("3")}>☢️放射健檢展示</div>
            <div className="submenu" id="submenu-3">
                <div className="submenu-item">子選單 3-1</div>
                <div className="submenu-item">子選單 3-2</div>
            </div>
            <div className="menu-item"  onClick={(e)=>toggleMenu("4")}>🦴復健醫療展示</div>
            <div className="submenu" id="submenu-4">
                <div className="submenu-item">子選單 4-1</div>
                <div className="submenu-item">子選單 4-2</div>
            </div>
            <div className="menu-item"  onClick={(e)=>toggleMenu("5")}>📋其他自費服務展示</div>
            <div className="submenu" id="submenu-5">
                <div className="submenu-item">子選單 5-1</div>
                <div className="submenu-item">子選單 5-2</div>
            </div>
            <div className="menu-item"  onClick={(e)=>toggleMenu("6")}>⚙️管理者項目維護</div>
            <div className="submenu" id="submenu-6">
                <div className="submenu-item">子選單 6-1</div>
                <div className="submenu-item">子選單 6-2</div>
            </div>
        </div>
        <div className="content">
            <div className="top-bar">
                <span>系統標題</span>
                <span>用戶資訊<button onClick={()=>setIsOpent(true)}>登入</button></span>
            </div>
            <Template_Md />
            <ModalLogin isClose={isClose} isOpen={isOpen} title="管理者登入" account={""} password={""} jwtoken={""} />
        </div>
    </div>
    </body>
    );
}

