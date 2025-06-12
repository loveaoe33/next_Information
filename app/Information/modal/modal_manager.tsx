"use client";
import Modal from "react-modal";
import "../css/information_manager.css";
import { useEffect, useRef, useState } from "react";
import ModalDetail from "./modal_manager_detail";
import * as api_Manager from "../lib/information_state";
import { ToastContainer, toast } from 'react-toastify';
import { treeData as treeDataType } from './modal_manager_detail';

import React from "react";
import { isEqual } from "lodash";



// 修正拼寫為 ModalViewProps，並添加 children（可選）
interface LoginCheck {
    isClose: () => void;
    fetch_Information: (caseSelect: string) => Promise<void>;
    isOpen: boolean;
    account: string;
    jwtoken: string;
    leve: number;
    title: string;
    headerData: any[] | undefined | null;
    kidData: any[] | undefined | null;
    treeData: any[] | undefined | null;
}



const modalView = ({ isClose, isOpen, fetch_Information, headerData, kidData, treeData, title, account, jwtoken, leve }: LoginCheck) => {
    const [domain, setDomain] = useState<string>('http://localhost:8080');
    const [MajorItem, setMajor] = useState<string>("");
    const [MidItem, setMid] = useState<string>("");
    const [MinorItem, setMinor] = useState<string>("");
    const headSelectRef = useRef<HTMLSelectElement>(null);
    const kidSelectRef = useRef<HTMLSelectElement>(null);
    const [ModalDetailbool, setDetail] = useState<boolean>(false);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [dataCode, setCode] = useState<string>("");









    const errorAlert = (message: string): void => {
        toast.error(message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    };


    const successAlert = (message: string): void => {
        toast.success(message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    };

    const addMajorCategory = async (): Promise<void> => {
        if (MajorItem === "") {
            errorAlert("不可為空白!")
        } else {
            const api: api_Manager.MajorCategory = api_Manager.MajorCategory_Api({
                id: 0,
                header: MajorItem,
                hashcode: "",
                domain,
                userData: "1,loveaoe33,456,0",
            });
            const log: string = await api.add();
            switch (log) {

                case "Server Insert none connetcion":
                    errorAlert("新增API伺服器異常!")
                    break;
                case "sucess":
                    successAlert("新增成功!")
                    setMajor("");
                    fetch_Information("headCase");
                    break;
                case "fail":
                    errorAlert("新增失敗，請聯繫專員!")
                    break;
                case "Account has no permissions":
                    errorAlert("權限錯誤，請聯繫專員!");
            }

        }

    }
    const deleteMajorCategory = async (hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const api: api_Manager.MajorCategory = api_Manager.MajorCategory_Api({
            id: Number(event.currentTarget.id),
            header: MajorItem,
            hashcode: hashCode,
            domain: domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = await api.delete();
        switch (log) {
            case "Server Delete none connetcion":
                errorAlert("刪除API伺服器異常");
                break;
            case "sucess":
                successAlert("刪除成功!")
                fetch_Information("headCase");
                break;
            case "fail":
                errorAlert("刪除失敗，請聯繫專員!")
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
        }
    }

    const stateMajorCategoty = async (caseSelect: string, hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const api: api_Manager.MajorCategory = api_Manager.MajorCategory_Api({
            id: Number(event.currentTarget.id),
            header: MajorItem,
            hashcode: hashCode,
            domain: domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = (caseSelect === "show") ? await api.shows() : await api.hide();
        switch (log) {
            case "Server Hide none connetcion":
                errorAlert("隱藏API伺服器異常");
                break;
            case "Server Show none connetcion":
                errorAlert("顯現API伺服器異常");
                break;
            case "sucess":
                successAlert("狀態更新成功!");
                fetch_Information("headCase");
                break;
            case "fail":
                errorAlert("狀態更新失敗，請聯繫專員!");
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
                break;

        }

    }
    const addMidCategory = async (): Promise<void> => {

        if (MidItem === "" || headSelectRef.current?.value === "") {
            errorAlert("不可為空白!")
        } else {
            const api = api_Manager.MidCategory_Api({
                id: 0,
                headHashCode: headSelectRef.current?.value ?? "",
                header: MidItem,
                hashcode: "",
                domain,
                userData: "1,loveaoe33,456,0",
            });
            const log = await api.add();
            switch (log) {
                case "Server Insert none connetcion":
                    errorAlert("新增API伺服器異常");
                    break;
                case "sucess":
                    successAlert("新增成功!");
                    fetch_Information("kidCase");
                    break;
                case "fail":
                    errorAlert("新增失敗，請聯繫專員!");
                    break;
                case "Account has no permissions":
                    errorAlert("權限錯誤，請聯繫專員!");
                    break;
            }

        }

    }

    const deleteMidCategory = async (hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        alert(Number(event.currentTarget.id));
        const api = api_Manager.MidCategory_Api({
            id: Number(event.currentTarget.id),
            headHashCode: "",
            header: MidItem,
            hashcode: hashCode,
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = await api.delete();
        switch (log) {
            case "Server Delete none connetcion":
                errorAlert("刪除API伺服器異常");
                break;
            case "sucess":
                successAlert("刪除成功!");

                fetch_Information("kidCase");
                break;
            case "fail":
                errorAlert("刪除失敗，請聯繫專員!");
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
                break;
        }
    }



    const stateMidCategoty = async (caseSelect: string, hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const api = api_Manager.MidCategory_Api({
            id: Number(event.currentTarget.id),
            headHashCode: "",
            header: MidItem,
            hashcode: hashCode,
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = (caseSelect === "show") ? await api.shows() : await api.hide();
        alert(log)
        switch (log) {
            case "Server Hide none connetcion":
                errorAlert("隱藏API伺服器異常");
                break;
            case "Server Show none connetcion":
                errorAlert("顯現API伺服器異常");
                break;
            case "sucess":
                successAlert("狀態更新成功!");
                fetch_Information("kidCase");
                break;
            case "fail":
                errorAlert("狀態更新失敗，請聯繫專員!");
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
                break;
        }
    }

    const addMinorCategory = async (): Promise<void> => {
        if (MinorItem === "") {
            errorAlert("不可為空白!")
        } else {
            const api = api_Manager.MinorCategory_Api({
                id: 0,
                header: MinorItem,
                kid_header: kidSelectRef.current?.value ?? "",
                hashcode: "",
                domain,
                userData: "1,loveaoe33,456,0",
                // img_url 和 content_json 是 optional，可以不寫
            });

            const log = await api.add();
            switch (log) {
                case "Server Insert none connetcion":
                    errorAlert("新增API伺服器異常");
                    break;
                case "sucess":
                    successAlert("新增成功!");
                    fetch_Information("treeCase");
                    break;
                case "fail":
                    errorAlert("新增失敗，請聯繫專員!");
                    break;
                case "Account has no permissions":
                    errorAlert("權限錯誤，請聯繫專員!");
                    break;
            }

        }

    }

    const deleteMinorCategory = async (hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        alert("code" + hashCode + "id" + event.currentTarget.id);
        const api = api_Manager.MinorCategory_Api({
            id: Number(event.currentTarget.id),
            header: "",
            kid_header: MajorItem,
            hashcode: hashCode,
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = await api.delete();
        switch (log) {
            case "Server Delete none connetcion":
                alert("刪除API伺服器異常");
                break;
            case "sucess":
                alert("刪除成功!");
                fetch_Information("treeCase");
                break;
            case "fail":
                alert("刪除失敗，請聯繫專員!");
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
                break;
        }
    }



    const stateMinorCategoty = async (caseSelect: string, hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const api = api_Manager.MinorCategory_Api({
            id: Number(event.currentTarget.id),
            header: "",
            kid_header: MajorItem,
            hashcode: hashCode,
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = (caseSelect === "show") ? await api.shows() : await api.hide();
        switch (log) {
            case "Server Hide none connetcion":
                errorAlert("隱藏API伺服器異常");
                break;
            case "Server Show none connetcion":
                errorAlert("顯現API伺服器異常");
                break;
            case "sucess":
                alert("狀態更新成功!");
                fetch_Information("treeCase");
                break;
            case "fail":
                errorAlert("狀態更新失敗，請聯繫專員!");
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
                break;
        }
    }

    const isCloseForm = (): void => {
        setFormOpen(false);
    }

    const showForm = (data: string) => {
        setFormOpen(true);
        setCode(data);
    }

    return (<Modal
        isOpen={isOpen}
        onRequestClose={isClose}
        contentLabel={title}
        ariaHideApp={false} // 在Next.js中，使用此配置来避免错误
        preventScroll={false}
    >
        <button
            onClick={isClose}
            style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                fontWeight: 'bold',
                cursor: 'pointer',
            }}
        >
            ×
        </button>
        <div className="manager-body">
            <div className="dashboard">
                <div className="category-section">
                    <h2>大項類別管理</h2>
                    <div className="input-group">
                        <input type="text" id="majorInput" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMajor(e.target.value)} placeholder="輸入大項類別" />
                        <button className="addMajor" onClick={addMajorCategory}>新增大項目</button>
                    </div>
                    <div className="category-list" id="majorList"></div>
                    <div className="deatail-container">
                        <h2>已存在類</h2>
                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>
                        <ul id="categoryList">

                            {headerData?.map((item: any, index: number) => (
                                (item.showbool) ? <li className="category-item">
                                    <span className="category-name">{item.header}</span>
                                    <div className="actions">
                                        <button id={item.id} onClick={(e) => stateMajorCategoty("hide", item.hashcode, e)} className="category-toggle-hide-btn">👁️‍🗨️隱藏</button>
                                        <button id={item.id} onClick={(e) => deleteMajorCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                    </div>
                                </li> : ""


                            ))}

                        </ul>


                    </div>


                    <div className="deatail-container">
                        <h2>已隱藏類</h2>
                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>
                        <ul id="categoryList">

                            {headerData?.map((item: any, index: number) => (
                                (!item.showbool) ? <li className="category-item">
                                    <span className="category-name">{item.header}</span>
                                    <div className="actions">
                                        <button id={item.id} onClick={(e) => stateMajorCategoty("show", item.hashcode, e)} className="category-toggle-view-btn">👁️顯示</button>
                                        <button id={item.id} onClick={(e) => deleteMajorCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                    </div>
                                </li> : ""


                            ))}

                        </ul>

                    </div>

                </div>

                <div className="category-section">
                    <h2>中項類別管理</h2>
                    <div className="input-group">
                        <select id="midSelect" ref={headSelectRef}>{headerData?.map((item: any, index: number) => (<option key={index} value={item.hashcode}>{item.header}</option>))}</select>
                        <input type="text" id="midInput" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMid(e.target.value)} placeholder="輸入中項類別" />
                        <button className="addMajor" onClick={addMidCategory}>新增中項目</button>

                    </div>
                    <div className="category-list" id="midList"></div>







                    <div className="deatail-container">
                        <h2>已存在類</h2>

                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>

                        <ul id="categoryList">


                            {kidData?.map((item: any, index: number) => (

                                (item.showbool) ?


                                    <li className="category-item">
                                        <span className="category-name">{item.header}</span>
                                        <div className="actions">
                                            <button id={item.id} onClick={(e) => stateMidCategoty("hide", item.hashcode, e)} className="category-toggle-hide-btn">👁️隱藏</button>
                                            <button id={item.id} onClick={(e) => deleteMidCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                        </div>
                                    </li> : ""


                            ))}

                        </ul>

                    </div>


                    <div className="deatail-container">
                        <h2>已隱藏類</h2>
                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>
                        <ul id="categoryList">
                            {kidData?.map((item: any, index: number) => (
                                (!item.showbool) ? <li className="category-item">
                                    <span className="category-name">{item.header}</span>
                                    <div className="actions">
                                        <button id={item.id} onClick={(e) => stateMidCategoty("show", item.hashcode, e)} className="category-toggle-view-btn">👁️顯示</button>
                                        <button id={item.id} onClick={(e) => deleteMidCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                    </div>
                                </li> : ""


                            ))}
                        </ul>

                    </div>

                </div>
                <div className="category-section">
                    <h2>小項類別管理</h2>
                    <div className="input-group">
                        <select id="majorSelect" ref={kidSelectRef}>{kidData?.map((item: any, index: number) => (<option key={index} value={item.hashcode}>{item.header}</option>))}</select>
                        <input type="text" id="midInput" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinor(e.target.value)} placeholder="輸入小項類別" />
                        <button className="addMajor" onClick={addMinorCategory}>新增小項目</button>

                    </div>
                    <div className="category-list" id="midList"></div>

                    <div className="deatail-container">
                        <h2>已存在類</h2>

                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>

                        <ul id="categoryList">

                            {treeData?.map((item: any, index: number) => (
                                (item.showbool) ? <li className="category-item">
                                    <span className="category-name">{item.header}</span> 
                                    <div className="actions">
                                        <button id={item.id} onClick={() => showForm(item.hashcode)} className="category-toggle-btn">📖編輯內容</button>
                                        <button id={item.id} onClick={(e) => stateMinorCategoty("hide", item.hashcode, e)} className="category-toggle-hide-btn">👁️隱藏</button>
                                        <button id={item.id} onClick={(e) => deleteMinorCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                    </div>
                                </li> : ""


                            ))}



                        </ul>

                    </div>


                    <div className="deatail-container">
                        <h2>已隱藏類</h2>
                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>
                        <ul id="categoryList">
                            {treeData?.map((item: any, index: number) => (
                                (!item.showbool) ? <li className="category-item">
                                    <span className="category-name">{item.header}</span>
                                    <div className="actions">
                                        <button id={item.id} onClick={() => showForm(item.hashcode)} className="category-toggle-btn">📖編輯內容</button>
                                        <button id={item.id} onClick={(e) => stateMinorCategoty("show", item.hashcode, e)} className="category-toggle-view-btn">👁️顯示</button>
                                        <button id={item.id} onClick={(e) => deleteMinorCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                    </div>
                                </li> : ""


                            ))}
                        </ul>

                    </div>

                </div>

            </div>
        </div>
        <ModalDetail isClose={isCloseForm} fetch_Information={fetch_Information} errorAlert={errorAlert} successAlert={successAlert} isOpen={formOpen} domain={domain} treeArrayData={treeData} dataCode={dataCode}  />


        <ToastContainer />
    </Modal>
    );


}


export default React.memo(modalView);