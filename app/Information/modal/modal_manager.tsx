"use client";
import Modal from "react-modal";
import "../css/information_manager.css";
import { useState } from "react";
import * as api_Manager from "../lib/information_state";
import { ToastContainer, toast } from 'react-toastify';
import React from "react";



// 修正拼寫為 ModalViewProps，並添加 children（可選）
interface LoginCheck {
    isClose: () => void;
    fetch_Information: () => void;
    isOpen: boolean;
    account: string;
    jwtoken: string;
    leve: number;
    title: string;
    headerData: any[] | undefined | null;
    kidData: any[] | undefined | null;
    treeData: any[] | undefined | null;
}
const modalView = ({ isClose, isOpen, fetch_Information, headerData, title, account, jwtoken, leve }: LoginCheck) => {
    const [domain, setDomain] = useState('http://localhost:8080');
    const [MajorItem, setMajor] = useState<string>("");
    const [MidItem, setMid] = useState<string>("");
    const [Minor, setMinor] = useState<string>("");

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
        const api: api_Manager.MajorCategory = api_Manager.MajorCategory_Api(0, MajorItem, "", domain, "1,loveaoe33,456,0");
        const log: string = await api.add();
        if (MajorItem === "") {
            errorAlert("不可為空白!")
        } else {
            switch (log) {
                case "Server Insert none connetcion":
                    alert("新增API伺服器異常或者資料重複");
                    break;
                case "sucess":
                    successAlert("新增成功!")
                    setMajor("");
                    fetch_Information();
                    break;
                case "fail":
                    alert("新增失敗，請聯繫專員!")
                    break;
            }

        }

    }
    const deleteMajorCategory = async (): Promise<void> => {
        const api: api_Manager.MajorCategory = api_Manager.MajorCategory_Api(0, MajorItem, "", domain, "1,loveaoe33,456,0");
        const log = await api.delete();
        switch (log) {
            case "Server Delete none connetcion":
                alert("刪除API伺服器異常");
                break;
            case "sucess":
                alert("刪除成功!")
                break;
            case "fail":
                alert("刪除失敗，請聯繫專員!")
                break;
        }
    }

    const stateMajorCategoty = async (caseSelect: string): Promise<void> => {
        const api: api_Manager.MajorCategory = api_Manager.MajorCategory_Api(0, MajorItem, "", domain, "1,loveaoe33,456,0");
        const log = (caseSelect === "Show") ? await api.shows() : await api.hide();
        switch (log) {
            case "Server Hide none connetcion":
                alert("隱藏API伺服器異常");
                break;
            case "Server Show none connetcion":
                alert("顯現API伺服器異常");
                break;
            case "sucess":
                alert("狀態更新成功!");
                break;
            case "fail":
                alert("狀態更新失敗，請聯繫專員!");
                break;
        }

    }
    const addMidCategory = async (): Promise<void> => {
        const api = api_Manager.MidCategory_Api(0, MajorItem, "", domain, "1,loveaoe33,456,0");
        const log = await api.add();

        switch (log) {
            case "Server Insert none connetcion":
                alert("新增API伺服器異常");
                break;
            case "sucess":
                alert("新增成功!");
                break;
            case "fail":
                alert("新增失敗，請聯繫專員!");
                break
        }
    }

    const deleteMidCategory = async (): Promise<void> => {
        const api = api_Manager.MidCategory_Api(0, MajorItem, "", domain, "1,loveaoe33,456,0");
        const log = await api.delete();
        switch (log) {
            case "Server Delete none connetcion":
                alert("刪除API伺服器異常");
                break;
            case "sucess":
                alert("刪除成功!");
                break;
            case "fail":
                alert("刪除失敗，請聯繫專員!");
                break;
        }
    }



    const stateMidCategoty = async (caseSelect: string): Promise<void> => {
        const api = api_Manager.MidCategory_Api(0, MajorItem, "", domain, "1,loveaoe33,456,0");
        const log = (caseSelect === "Show") ? await api.shows() : await api.hide();
        switch (log) {
            case "Server Hide none connetcion":
                alert("隱藏API伺服器異常");
                break;
            case "Server Show none connetcion":
                alert("顯現API伺服器異常");
                break;
            case "sucess":
                alert("狀態更新成功!");
                break;
            case "fail":
                alert("狀態更新失敗，請聯繫專員!");
                break;
        }
    }




    const addMinorCategory = async (): Promise<void> => {
        const api = api_Manager.MidCategory_Api(0, MajorItem, "", domain, "1,loveaoe33,456,0");
        const log = await api.add();

        switch (log) {
            case "Server Insert none connetcion":
                alert("新增API伺服器異常");
                break;
            case "sucess":
                alert("新增成功!");
                break;
            case "fail":
                alert("新增失敗，請聯繫專員!");
                break;
        }
    }

    const deleteMinorCategory = async (): Promise<void> => {
        const api = api_Manager.MidCategory_Api(0, MajorItem, "", domain, "1,loveaoe33,456,0");
        const log = await api.delete();
        switch (log) {
            case "Server Delete none connetcion":
                alert("刪除API伺服器異常");
                break;
            case "sucess":
                alert("刪除成功!");
                break;
            case "fail":
                alert("刪除失敗，請聯繫專員!");
                break;
        }
    }



    const stateMinorCategoty = async (caseSelect: string): Promise<void> => {
        const api = api_Manager.MidCategory_Api(0, MajorItem, "", domain, "1,loveaoe33,456,0");
        const log = (caseSelect === "Show") ? await api.shows() : await api.hide();
        switch (log) {
            case "Server Hide none connetcion":
                alert("隱藏API伺服器異常");
                break;
            case "Server Show none connetcion":
                alert("顯現API伺服器異常");
                break;
            case "sucess":
                alert("狀態更新成功!");
                break;
            case "fail":
                alert("狀態更新失敗，請聯繫專員!");
                break;
        }
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
                        <input type="text" id="majorInput" value={MajorItem} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMajor(e.target.value)} placeholder="輸入大項類別" />
                        <button className="addMajor" onClick={() => addMajorCategory()}>新增大項目</button>
                    </div>
                    <div className="category-list" id="majorList"></div>
                    <div className="deatail-container">
                        <h2>已存在類</h2>
                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>
                        <ul id="categoryList">

                            {headerData?.map((item, index) => (
                                (item.showbool) ? <li className="category-item">
                                    <span className="category-name">類項4111</span>
                                    <div className="actions">
                                        <button className="category-toggle-hide-btn">👁️‍🗨️</button>
                                        <button className="category-delete-btn">🗑️</button>
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
                            <li className="category-item">
                                <span className="category-name">類項 1</span>
                                <div className="actions">
                                    <button className="category-toggle-view-btn">👁️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                            <li className="category-item">
                                <span className="category-name">類項 2</span>
                                <div className="actions">
                                    <button className="category-toggle-view-btn">👁️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                        </ul>

                    </div>

                </div>

                <div className="category-section">
                    <h2>中項類別管理</h2>
                    <div className="input-group">
                        <select id="majorSelect">{headerData?.map((item, index) => (<option key={index} value={item.id}>{item.header}</option>))}</select>
                        <input type="text" id="midInput" placeholder="輸入中項類別" />
                        <button className="addMajor" onClick={addMidCategory}>新增中項目</button>

                    </div>
                    <div className="category-list" id="midList"></div>







                    <div className="deatail-container">
                        <h2>已存在類</h2>

                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>

                        <ul id="categoryList">

                            {headerData?.map((item, index) => (
                                (item.showbool) ? <li className="category-item">
                                    <span className="category-name">顯示類測試</span>
                                    <div className="actions">
                                        <button className="category-toggle-hide-btn">👁️‍🗨️</button>
                                        <button className="category-delete-btn">🗑️</button>
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
                            {headerData?.map((item, index) => (
                                (!item.showbool) ? <li className="category-item">
                                    <span className="category-name">隱藏類測試</span>
                                    <div className="actions">
                                        <button className="category-toggle-show-btn">👁️‍🗨️</button>
                                        <button className="category-delete-btn">🗑️</button>
                                    </div>
                                </li> : ""


                            ))}
                        </ul>

                    </div>

                </div>
                <div className="category-section">
                    <h2>小項類別管理</h2>
                    <div className="input-group">
                        <select id="majorSelect"></select>
                        <input type="text" id="midInput" placeholder="輸入小項類別" />
                        <button className="addMajor" onClick={addMidCategory}>新增小項目</button>

                    </div>
                    <div className="category-list" id="midList"></div>

                    <div className="deatail-container">
                        <h2>已存在類</h2>

                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>

                        <ul id="categoryList">
                            <li className="category-item">
                                <span className="category-name">類項 1</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-hide-btn">👁️‍🗨️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                            <li className="category-item">
                                <span className="category-name">類項 2</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-hide-btn">👁️‍🗨️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                        </ul>

                    </div>


                    <div className="deatail-container">
                        <h2>已隱藏類</h2>
                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>
                        <ul id="categoryList">
                            <li className="category-item">
                                <span className="category-name">類項 1</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-view-btn">👁️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                            <li className="category-item">
                                <span className="category-name">類項 2</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-view-btn">👁️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>
        </div>
        <ToastContainer />
    </Modal>
    );


}


export default React.memo(modalView);