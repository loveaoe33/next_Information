"use client";

import { useEffect, useState } from "react";
import "./css/information_main.css"
import Template_Md from "./template_md";
import ModalLogin from "./modal/modal_login";
import ModalAdmin from "./modal/modal_manager";


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
    const [routerMap, setRouterMap] = useState<Map<string, apiRouter>>(() => {    //api router state
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

    const [templateMap, setTemplateMap] = useState<Map<string, boolean>>(()=>{     //template state
        return new Map([
            ['template_Md', false],
            ['template_Admin', false],
          ])

    } );





    useEffect(()=>{  //when mount
        console.log("✅ useEffect - 组件初始化完成");
        return () => {
        console.log("❌ useEffect Cleanup");
        };
    },[])
    const [isOpenLogin ,setLoginOpent]=useState<boolean>(false);
    const [isOpenAdmin ,setAdminOpent]=useState<boolean>(false);
    const [loginAccount,setAccount]=useState("TEST");
    const isCloseLogin=()=>{
        setLoginOpent(false);
    }

    const isCloseAdmin=()=>{
        setAdminOpent(false);
    }
    
    const toggleSidebar=():void=>{
        document.getElementById("sidebar")?.classList.toggle("collapsed");
        
    }
    const toggleMenu=(index:string):void=>{
        document.getElementById(`submenu-item-kid-${index}`)?.classList.toggle("active");


    }

    const toggleTree=(index:string):void=>{
        document.getElementById(`submenu-item-tree-${index}`)?.classList.toggle("active");

    }

    const toggleDetail=(index:string):void=>{
        document.getElementById(`submenu-tree-Detail-${index}`)?.classList.toggle("active");
    }

    const phoneSidebar=():void=>{
        const sidebar_bar =document.getElementById("sidebar")!;
        sidebar_bar.classList.toggle('open');

    }

    const test=()=>{
        alert("123");
    }

    const templateChange=(index:string):void=>{
        const newMap=new Map(templateMap);
        if(index==="admin_Class_Maintenance"){
            setTemplateMap(newMap.set("template_Admin",true));
            setAdminOpent(true);
        }else if(index==="md_Product_Information"){
            setTemplateMap(newMap.set("template_Admin",false));

        }

    }


    return (
    <div className="main-body">
    <div className="main-container">
    <button className="phone-menu-toggle" onClick={phoneSidebar}>☰</button>

        <div className="sidebar" id="sidebar">
            <h2>選單</h2>
            <div className="main-toggle-btn" onClick={toggleSidebar}>≡</div>

            <div className="menu-item" onClick={(e)=>toggleMenu("0")}>💊藥品/保健品服務展示</div>
            <div className="submenu-item-kid" id="submenu-item-kid-0" onClick={(e)=>toggleTree("0")}>

                <div className="submenu-item-tree"   onClick={(e)=>toggleDetail("0")}>子類別1
                <div className="submenu-tree-Detail" id="submenu-tree-Detail-0">
                <button className="submenu-item-button" onClick={(e)=>{e.stopPropagation(),templateChange("md_Product_Information")}}>📖項目維護</button>
                <button className="submenu-item-button ">👨‍💼使用者管理</button>
                </div>
                </div>

                <div className="submenu-item-tree"   onClick={(e)=>toggleDetail("1")}>子類別2
                <div className="submenu-tree-Detail" id="submenu-tree-Detail-1">
                <button className="submenu-item-button" onClick={(e)=>{templateChange("admin_Class_Maintenance")}}>📖項目維護</button>
                <button className="submenu-item-button">👨‍💼使用者管理</button>
                </div>
                </div>

 
            </div>

            <div className="menu-item"  onClick={(e)=>toggleMenu("5")}>⚙️管理者項目維護</div>   
            <div className="submenu-item-kid" id="submenu-item-kid-5" onClick={(e)=>toggleTree("5")}>
            <div className="submenu-item-tree"   onClick={(e)=>toggleDetail("5")}>子類別1
            <div className="submenu-tree-Detail" id="submenu-tree-Detail-5">
            <button className="submenu-item-button" onClick={(e)=>{e.stopPropagation(),templateChange("admin_Class_Maintenance")}}>📖項目維護</button>
            <button className="submenu-item-button ">👨‍💼使用者管理</button>
            </div>
            </div>

            <div className="submenu-item-tree"   onClick={(e)=>toggleDetail("6")}>子類別2
            <div className="submenu-tree-Detail" id="submenu-tree-Detail-6">
            <button className="submenu-item-button" onClick={(e)=>{templateChange("admin_Class_Maintenance")}}>📖項目維護</button>
            <button className="submenu-item-button">👨‍💼使用者管理</button>
            </div>
            </div>
</div>

         

            
        </div>
        <div className="content">
            <div className="top-bar">
                <span className="span-title">系統標題</span>
                <span className="span-account">用戶資訊:</span>
                <button className="main-login-btn" onClick={()=>setLoginOpent(true)}>登入</button>
            </div>
            {templateMap.get("template_Admin")?<ModalAdmin  isClose={isCloseAdmin} isOpen={isOpenAdmin} title={""} account={""} jwtoken={""}     />:<Template_Md/>}
            <ModalLogin isClose={isCloseLogin} isOpen={isOpenLogin} title="管理者登入" account={""} password={""} jwtoken={""} />       
      </div>

    </div>
    </div>
    );
}