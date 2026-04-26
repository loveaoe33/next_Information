"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import "./css/information_main.css"
import Template_Md from "./template_md";
import ModalLogin from "./modal/modal_login";
import ModalAdmin from "./modal/modal_manager";
import * as api_Manager from "./lib/information_state";
import isEqual from 'lodash/isEqual';

/**
 * Main component for the Information application.
 * Handles routing, state management, and primary layout structures.
 */
export default function Main() {

    const [templateMap, setTemplateMap] = useState<Map<string, boolean>>(() => {
        return new Map([
            ['template_Md', false],
            ['template_Admin', false],
        ])
    });

    const [domain, setDomain] = useState('http://localhost:8080');
    const [headData, setHead] = useState<any[] | null>([]); //fetch Head
    const [kidData, setKid] = useState<any[] | null>([]);//fetch Kid
    const [treeData, setTree] = useState<any[] | null>([]);//fetch Tree

    // Keeps track of previous data references for deep equality comparison
    const prevRef = useRef({ headData, kidData, treeData });

    useEffect(() => {  //when mount
        console.log("✅ useEffect - 元件初始化完成");
        fetch_Information("all");
    }, [])

    // Monitor deep data changes
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

    /** Closes the login modal. */
    const isCloseLogin = (): void => {
        setLoginOpent(false);
    }

    /** Fetches the Major (Head) category data. */
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
                return null; 
            }
        });
        setHead(parsed);
    }

    /** Fetches the Middle (Kid) category data. */
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
                return null; 
            }
        });  
        setKid(parsed);
    }

    /** Fetches the Minor (Tree) category data. */
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
                return null; 
            }
        }); 
        setTree(parsed);
    };

    /**
     * Centralized fetch coordinator for all category data.
     * @param caseSelect - Specifies which data to fetch ("headCase", "kidCase", "treeCase", or "all")
     */
    const fetch_Information = async (caseSelect: string): Promise<void> => {
        switch (caseSelect) {
            case "headCase":
                fetch_headInformation();
                break;
            case "kidCase":
                fetch_kidInformation();
                break;
            case "treeCase":
                fetch_treeInformation();
                break; // Fixed missing break causing fall-through bug
            case "all":
                await Promise.all([fetch_headInformation(), fetch_kidInformation(), fetch_treeInformation()]);
                break;
        }
        console.log("中項目", kidData);
    }

    /** Closes the Admin Modal */
    const isCloseAdmin = (): void => {
        setAdminOpent(false);
    }

    // ----- DOM Manipulation Section (Consider refactoring to React State later) -----

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
        document.getElementById("sidebar")?.classList.toggle('open');
    }

    // ---------------------------------------------------------------------------------

    /**
     * Switches the active template display.
     * @param index - The ID of the template to activate.
     */
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
                        if (!item.showbool) return null;
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
                                        if (!kidItem.showbool) return null;
                                        return (
                                            <React.Fragment key={kidItem.hashcode || kidIndex}>
                                                {/* 第二層：menu item */}
                                                <div
                                                    className="submenu-item-tree"
                                                    id={`submenu-item-tree-${kidIndex}`}
                                                >
                                                    {kidItem.header}
                                                </div>
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </React.Fragment>
                        );
                    })}

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
                    <ModalLogin isClose={isCloseLogin} isOpen={isOpenLogin} title="登入" domain={domain} />
                    {templateMap.get("template_Admin") && (headData) ? <ModalAdmin isClose={isCloseAdmin} fetch_Information={fetch_Information} isOpen={isOpenAdmin} headerData={headData} kidData={kidData} treeData={treeData} title={""} domain={domain} /> : <Template_Md treeData={treeData} />}
                </div>
            </div>
        </div>
    );
}