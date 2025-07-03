"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import "./css/information_main.css"
import Template_Md from "./template_md";
import ModalLogin from "./modal/modal_login";
import ModalAdmin from "./modal/modal_manager";
import ModalDetail from "./modal/modal_manager_detail";
import * as api_Manager from "./lib/information_state";
import isEqual from 'lodash/isEqual';



export default function main() {


    class apiRouter {
        private ipAddress: string | undefined;
        private ipPort: string | undefined;
        private isOpen: boolean | undefined;
        private url: string | undefined;
        private item: string | undefined;
        constructor(ipAddress: string, ipPort: string, isOpen: boolean, url: string, item: string) {
            this.ipAddress = ipAddress;
            this.ipPort = ipPort;
            this.isOpen = isOpen;
            this.url = url;
            this.item = item;
        };

        public getRouter(): string {
            return `${this.ipAddress}:${this.ipPort}/${this.url}/${this.item}`;
        }
    }

    interface LoginCheck {
        isClose: () => void;
        isOpen: boolean;
        account: string;
        jwtoken: string;
        leve: number;
        title: string;
    }

    // const [routerMap, setRouterMap] = useState<Map<string, apiRouter>>(() => {    //api router state
    //     const apiUrl_MD = new apiRouter("192.168.2.147", "3000", true, "Information", "getMD_Product");
    //     const apiUrl_Xray = new apiRouter("192.168.2.147", "3000", true, "Information", "getXray_Product");
    //     const apiUrl_Health = new apiRouter("192.168.2.147", "3000", true, "Information", "getHealth_Product");
    //     const apiUrl_Reha = new apiRouter("192.168.2.147", "3000", true, "Information", "getReha_Product");
    //     const apiUrl_Or = new apiRouter("192.168.2.147", "3000", true, "Information", "getOr_Product");
    //     const apiUrl_Other = new apiRouter("192.168.2.147", "3000", true, "Information", "getOther_Product");

    //     return new Map([
    //         ['MD', apiUrl_MD],
    //         ['Xray', apiUrl_Xray],
    //         ['Health', apiUrl_Health],
    //         ['Reha', apiUrl_Reha],
    //         ['Or', apiUrl_Or],
    //         ['Other', apiUrl_Other]
    //     ]);
    // });


    ;

    const [templateMap, setTemplateMap] = useState<Map<string, boolean>>(() => {     //template state
        return new Map([
            ['template_Md', false],
            ['template_Admin', false],
        ])

    });

    const [domain, setDomain] = useState('http://localhost:8080');


    const [headData, setHead] = useState<any[] | null>([]); //fetch Head


    const [kidData, setKid] = useState<any[] | null>([]);//fetch Kid


    const [treeData, setTree] = useState<any[] | null>([]);//fetch Tree

    // 儲存上一輪的資料
    const prevRef = useRef({ headData, kidData, treeData });



    useEffect(() => {  //when mount
        console.log("✅ useEffect - 元件初始化完成");
        fetch_Information("all");
        return () => {
            console.log("❌ useEffect Cleanup");
        };
    }, [])


    // 正確寫法（監聽變化）
    useEffect(() => {
        const current = { headData, kidData, treeData };
        if (!isEqual(prevRef.current, current)) {
            prevRef.current = current;
            console.log("main資料有更新");
        } else {
            console.log("main資料無更新");

        }
    }, [headData, kidData, treeData])

    const [isOpenLogin, setLoginOpent] = useState<boolean>(false);
    const [isOpenAdmin, setAdminOpent] = useState<boolean>(false);
    const [loginAccount, setAccount] = useState("TEST");
    const isCloseLogin = (): void => {
        setLoginOpent(false);
    }




    const fetch_headInformation = async (): Promise<void> => {
        const head: any = await api_Manager.MajorCategory_Api({
            id: 0,
            header: "",
            hashcode: "",
            domain: domain,
            userData: "",
        }).fetchs();


        const parsed: any[] = head.res.externalData.map((str: string) => {
            try {
                return JSON.parse(str);
            } catch (e) {
                console.warn("Invalid JSON:", str);
                return null; // 或 return {}; 視情況
            }
        });  //Json string to Json
        setHead(parsed);

    }

    const fetch_kidInformation = async (): Promise<void> => {
        const kid: any = await api_Manager.MidCategory_Api({
            id: 0,
            headHashCode: "",
            header: "",
            hashcode: "",
            domain,
            userData: "",
        }).fetchs();
        const parsed: any[] = kid.res.externalData.map((str: string) => {
            try {
                return JSON.parse(str);
            } catch (e) {
                console.warn("Invalid JSON:", str);
                return null; // 或 return {}; 視情況
            }
        });  //Json string to Json
        // const parsed = kid.res.externalData.map(JSON.parse);  //Json string to Json
        setKid(parsed);

    }

    const fetch_treeInformation = async (): Promise<void> => {
        const tree: any = await api_Manager.MinorCategory_Api({
            id: 0,
            header: "",
            kid_header: "",
            hashcode: "",
            domain,
            userData: "",
        }).fetchs();
        const parsed: any[] = tree.res.externalData.map((str: string) => {
            try {
                return JSON.parse(str);
            } catch (e) {
                console.warn("Invalid JSON:", str);
                return null; // 或 return {}; 視情況
            }
        });  //Json string to Json
        // const parsed = tree.res.externalData.map(JSON.parse);  // Json string to Json
        setTree(parsed);
    };


    const fetch_Information = async (caseSelect: string): Promise<void> => {
        // const [head, ked, tree] = await Promise.all([
        //     api_Manager.MajorCategory_Api(0, "", "", domain, "").fetchs(),
        //     api_Manager.MidCategory_Api(0, "", "", domain, "").fetchs(),
        //     api_Manager.MinorCategory_Api(0, "", "", domain, "").fetchs(),
        // ])

        switch (caseSelect) {
            case "headCase":
                fetch_headInformation();
                break;
            case "kidCase":
                fetch_kidInformation();
                break;
            case "treeCase":
                fetch_treeInformation();
            case "all":
                await Promise.all([fetch_headInformation(), fetch_kidInformation(), fetch_treeInformation()]);
                break;
        }
        console.log("中項目" + kidData);

        //   setKid(ked);
        //   setTree(tree);
    }

    const show_Informatoins = (): void => {


    }

    const isCloseAdmin = (): void => {
        setAdminOpent(false);
    }

    const toggleSidebar = (): void => {
        document.getElementById("sidebar")?.classList.toggle("collapsed");

    }
    const toggleMenu = (index: string): void => {
        document.getElementById(`submenu-item-kid-${index}`)?.classList.toggle("active");


    }

    const toggleTree = (index: string): void => {
        document.getElementById(`submenu-item-tree-${index}`)?.classList.toggle("active");

    }

    const toggleDetail = (index: string): void => {
        document.getElementById(`submenu-tree-Detail-${index}`)?.classList.toggle("active");
    }

    const phoneSidebar = (): void => {
        const sidebar_bar = document.getElementById("sidebar")!;
        sidebar_bar.classList.toggle('open');

    }

    const test = () => {
        alert("123");
    }

    const templateChange = (index: string): void => {
        const newMap = new Map(templateMap);
        if (index === "admin_Class_Maintenance") {
            setTemplateMap(newMap.set("template_Admin", true));
            setAdminOpent(true);
        } else if (index === "md_Product_Information") {
            setTemplateMap(newMap.set("template_Admin", false));

        }

    }


    return (
        <div className="main-body">
            <div className="main-container">
                <button className="phone-menu-toggle" onClick={phoneSidebar}>☰</button>

                <div className="sidebar" id="sidebar">
                    <h2>選單</h2>
                    <div className="main-toggle-btn" onClick={toggleSidebar}>≡</div>

                    {headData?.map((item, headIndex) => {
                        // 過濾出這個 head 對應的 kid
                        const relatedKids: any[] = kidData?.filter(kid => kid.father_header === item.hashcode) || [];


                        if (item.showbool === true) {
                            return (

                                <React.Fragment key={item.hashcode || headIndex}>
                                    {/* 第一層：menu item */}
                                    <div
                                        className="menu-item"
                                        id={`menu-item-${headIndex}`}
                                        onClick={() => toggleMenu(headIndex.toString())}
                                    >
                                        {item.header}
                                    </div>
                                    <div className="submenu-item-kid" id={`submenu-item-kid-${headIndex}`}>




                                        {kidData?.filter((kidData) => kidData.father_header === item.hashcode).map((kidItem, kidIndex) => {
                                            // 過濾出這個 head 對應的 kid


                                            if (kidItem.showbool === true) {

                                                return (

                                                    <React.Fragment key={kidItem.hashcode || kidIndex}>
                                                        {/* 第一層：menu item */}
                                                        <div
                                                            className="submenu-item-tree"
                                                            id={`submenu-item-tree-${kidIndex}`}
                                                        >
                                                            {kidItem.header}
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            }
                                        })}

                                    </div>
                                </React.Fragment>
                            );

                        }






                    })}







                    {/* 
                                {relatedKids.map((kid, kidIndex) => (
                                    <div
                                        className="submenu-item-kid"
                                        id={`submenu-item-kid-${index}`}
                                        key={kid.hashcode || kidIndex}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // toggleTree(kidIndex.toString());
                                        }}
                                    >
                                        {kid.header}
                                    </div>
                                ))} */}







                    {/* <div className="menu-item" onClick={(e) => toggleMenu("0")}>💊藥品/保健品服務展示</div>
                    <div className="submenu-item-kid" id="submenu-item-kid-0" onClick={(e) => toggleTree("0")}>

                        <div className="submenu-item-tree" onClick={(e) => toggleDetail("0")}>子類別1
                            <div className="submenu-tree-Detail" id="submenu-tree-Detail-0">
                                <button className="submenu-item-button" onClick={(e) => { e.stopPropagation(), templateChange("md_Product_Information") }}>📖項目維護</button>
                                <button className="submenu-item-button ">👨‍💼使用者管理</button>
                            </div>
                        </div>

                        <div className="submenu-item-tree" onClick={(e) => toggleDetail("1")}>子類別2
                            <div className="submenu-tree-Detail" id="submenu-tree-Detail-1">
                                <button className="submenu-item-button" onClick={(e) => { templateChange("admin_Class_Maintenance") }}>📖項目維護</button>
                                <button className="submenu-item-button">👨‍💼使用者管理</button>
                            </div>
                        </div>
                    </div> */}







                    <div className="menu-item" onClick={(e) => toggleMenu("5")}>⚙️管理者項目維護</div>
                    <div className="submenu-item-kid" id="submenu-item-kid-5" onClick={(e) => toggleTree("5")}>
                        <div className="submenu-item-tree" onClick={(e) => toggleDetail("5")}>子類別1
                            <div className="submenu-tree-Detail" id="submenu-tree-Detail-5">
                                <button className="submenu-item-button" onClick={(e) => { e.stopPropagation(), templateChange("admin_Class_Maintenance") }}>📖項目維護</button>
                                <button className="submenu-item-button ">👨‍💼使用者管理</button>
                            </div>
                        </div>

                        <div className="submenu-item-tree" onClick={(e) => toggleDetail("6")}>子類別2
                            <div className="submenu-tree-Detail" id="submenu-tree-Detail-6">
                                <button className="submenu-item-button" onClick={(e) => { templateChange("admin_Class_Maintenance") }}>📖項目維護</button>
                                <button className="submenu-item-button">👨‍💼使用者管理</button>
                            </div>
                        </div>
                    </div>




                </div>
                <div className="content">
                    <div className="top-bar">
                        <span className="span-title">系統標題</span>
                        <span className="span-account">用戶資訊:</span>
                        <button className="main-login-btn" onClick={() => setLoginOpent(true)}>登入</button>
                    </div>
                    { <ModalLogin isClose={isCloseLogin} isOpen={isOpenLogin} title="登入" domain={domain}   account={loginAccount} password={""} jwtoken={""} />}
                    {/* {templateMap.get("template_Admin") && (headData) ? <ModalDetail isClose={isCloseLogin} isOpen={isOpenLogin} title="管理者登入" account={""} password={""} jwtoken={""} /> : <Template_Md />} */}
                    {templateMap.get("template_Admin") && (headData) ? <ModalAdmin isClose={isCloseAdmin} fetch_Information={fetch_Information} isOpen={isOpenAdmin} headerData={headData} kidData={kidData} treeData={treeData} title={""}  domain={domain}  account={""} jwtoken={""} leve={0} /> : <Template_Md treeData={treeData} />}
                </div>

            </div>
        </div>
    );
}