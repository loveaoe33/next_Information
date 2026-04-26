"use client";
import Modal from "react-modal";
import "../css/information_manager.css";
import { useRef, useState } from "react";
import ModalDetail from "./modal_manager_detail";
import * as api_Manager from "../lib/information_state";
import { ToastContainer, toast } from 'react-toastify';
import React from "react";

/**
 * Props for the ModalManager component.
 */
export interface ModalManagerProps {
    /** Function to close the modal. */
    isClose: () => void;
    /** Function to re-fetch category information. */
    fetch_Information: (caseSelect: string) => Promise<void>;
    /** Boolean indicating whether the modal is open. */
    isOpen: boolean;
    /** The title displayed on the modal. */
    title: string;
    /** The domain associated with the requests. */
    domain: string;
    /** Array of Major Category data. */
    headerData: any[] | undefined | null;
    /** Array of Middle Category data. */
    kidData: any[] | undefined | null;
    /** Array of Minor (Tree) Category data. */
    treeData: any[] | undefined | null;
}

const ModalManager = ({ isClose, isOpen, fetch_Information, headerData, kidData, treeData, title, domain }: ModalManagerProps) => {
    const [majorItem, setMajorItem] = useState<string>("");
    const [midItem, setMidItem] = useState<string>("");
    const [minorItem, setMinorItem] = useState<string>("");
    
    const headSelectRef = useRef<HTMLSelectElement>(null);
    const kidSelectRef = useRef<HTMLSelectElement>(null);
    
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [dataCode, setDataCode] = useState<string>("");

    /**
     * Displays an error alert notification.
     * @param message - The error message to display.
     */
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

    /**
     * Displays a success alert notification.
     * @param message - The success message to display.
     */
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

    /**
     * Adds a new Major Category.
     */
    const addMajorCategory = async (): Promise<void> => {
        if (!majorItem) {
            errorAlert("不可為空白!");
            return;
        } 
        
        const api: api_Manager.MajorCategory = api_Manager.MajorCategory_Api({
            id: 0,
            header: majorItem,
            hashcode: "",
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log: string = await api.add();
        
        switch (log) {
            case "Server connection error during insert":
                errorAlert("新增API伺服器異常!");
                break;
            case "sucess":
            case "success":
                successAlert("新增成功!");
                setMajorItem("");
                fetch_Information("headCase");
                break;
            case "fail":
                errorAlert("新增失敗，請聯繫專員!");
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
        }
    }

    /**
     * Deletes a Major Category based on its hashcode.
     */
    const deleteMajorCategory = async (hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const api: api_Manager.MajorCategory = api_Manager.MajorCategory_Api({
            id: Number(event.currentTarget.id),
            header: majorItem,
            hashcode: hashCode,
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = await api.delete();
        switch (log) {
            case "Server connection error during delete":
                errorAlert("刪除API伺服器異常");
                break;
            case "sucess":
            case "success":
                successAlert("刪除成功!");
                fetch_Information("headCase");
                break;
            case "fail":
                errorAlert("刪除失敗，請聯繫專員!");
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
        }
    }

    /**
     * Toggles the visibility of a Major Category (Show/Hide).
     */
    const toggleMajorCategoryVisibility = async (caseSelect: string, hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const api: api_Manager.MajorCategory = api_Manager.MajorCategory_Api({
            id: Number(event.currentTarget.id),
            header: majorItem,
            hashcode: hashCode,
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = (caseSelect === "show") ? await api.shows() : await api.hide();
        switch (log) {
            case "Server connection error during hide":
                errorAlert("隱藏API伺服器異常");
                break;
            case "Server connection error during show":
                errorAlert("顯現API伺服器異常");
                break;
            case "sucess":
            case "success":
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

    /**
     * Adds a new Middle Category.
     */
    const addMidCategory = async (): Promise<void> => {
        if (!midItem || !headSelectRef.current?.value) {
            errorAlert("不可為空白!");
            return;
        }
        
        const api = api_Manager.MidCategory_Api({
            id: 0,
            headHashCode: headSelectRef.current?.value ?? "",
            header: midItem,
            hashcode: "",
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = await api.add();
        
        switch (log) {
            case "Server connection error during insert":
                errorAlert("新增API伺服器異常");
                break;
            case "sucess":
            case "success":
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

    /**
     * Deletes a Middle Category based on its hashcode.
     */
    const deleteMidCategory = async (hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const api = api_Manager.MidCategory_Api({
            id: Number(event.currentTarget.id),
            headHashCode: "",
            header: midItem,
            hashcode: hashCode,
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = await api.delete();
        switch (log) {
            case "Server connection error during delete":
                errorAlert("刪除API伺服器異常");
                break;
            case "sucess":
            case "success":
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

    /**
     * Toggles the visibility of a Middle Category (Show/Hide).
     */
    const toggleMidCategoryVisibility = async (caseSelect: string, hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const api = api_Manager.MidCategory_Api({
            id: Number(event.currentTarget.id),
            headHashCode: "",
            header: midItem,
            hashcode: hashCode,
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = (caseSelect === "show") ? await api.shows() : await api.hide();
        switch (log) {
            case "Server connection error during hide":
                errorAlert("隱藏API伺服器異常");
                break;
            case "Server connection error during show":
                errorAlert("顯現API伺服器異常");
                break;
            case "sucess":
            case "success":
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

    /**
     * Adds a new Minor Category.
     */
    const addMinorCategory = async (): Promise<void> => {
        if (!minorItem) {
            errorAlert("不可為空白!");
            return;
        }
        
        const api = api_Manager.MinorCategory_Api({
            id: 0,
            header: minorItem,
            kid_header: kidSelectRef.current?.value ?? "",
            hashcode: "",
            domain,
            userData: "1,loveaoe33,456,0",
        });

        const log = await api.add();
        switch (log) {
            case "Server connection error during insert":
                errorAlert("新增API伺服器異常");
                break;
            case "sucess":
            case "success":
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

    /**
     * Deletes a Minor Category based on its hashcode.
     */
    const deleteMinorCategory = async (hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const api = api_Manager.MinorCategory_Api({
            id: Number(event.currentTarget.id),
            header: "",
            kid_header: majorItem,
            hashcode: hashCode,
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = await api.delete();
        switch (log) {
            case "Server connection error during delete":
                errorAlert("刪除API伺服器異常");
                break;
            case "sucess":
            case "success":
                successAlert("刪除成功!");
                fetch_Information("treeCase");
                break;
            case "fail":
                errorAlert("刪除失敗，請聯繫專員!");
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
                break;
        }
    }

    /**
     * Toggles the visibility of a Minor Category (Show/Hide).
     */
    const toggleMinorCategoryVisibility = async (caseSelect: string, hashCode: string, event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const api = api_Manager.MinorCategory_Api({
            id: Number(event.currentTarget.id),
            header: "",
            kid_header: majorItem,
            hashcode: hashCode,
            domain,
            userData: "1,loveaoe33,456,0",
        });
        const log = (caseSelect === "show") ? await api.shows() : await api.hide();
        switch (log) {
            case "Server connection error during hide":
                errorAlert("隱藏API伺服器異常");
                break;
            case "Server connection error during show":
                errorAlert("顯現API伺服器異常");
                break;
            case "sucess":
            case "success":
                successAlert("狀態更新成功!");
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

    /** Closes the Minor Category detail form modal. */
    const isCloseForm = (): void => {
        setFormOpen(false);
    }

    /** 
     * Opens the Minor Category detail form modal.
     * @param data - The hashcode identifier of the specific category.
     */
    const showForm = (data: string) => {
        setFormOpen(true);
        setDataCode(data);
    }

    return (
        <Modal
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
                            <input type="text" id="majorInput" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMajorItem(e.target.value)} value={majorItem} placeholder="輸入大項類別" />
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
                                    item.showbool && (
                                        <li key={item.id || index} className="category-item">
                                            <span className="category-name">{item.header}</span>
                                            <div className="actions">
                                                <button id={item.id} onClick={(e) => toggleMajorCategoryVisibility("hide", item.hashcode, e)} className="category-toggle-hide-btn">👁️‍🗨️隱藏</button>
                                                <button id={item.id} onClick={(e) => deleteMajorCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                            </div>
                                        </li>
                                    )
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
                                    !item.showbool && (
                                        <li key={item.id || index} className="category-item">
                                            <span className="category-name">{item.header}</span>
                                            <div className="actions">
                                                <button id={item.id} onClick={(e) => toggleMajorCategoryVisibility("show", item.hashcode, e)} className="category-toggle-view-btn">👁️顯示</button>
                                                <button id={item.id} onClick={(e) => deleteMajorCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                            </div>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="category-section">
                        <h2>中項類別管理</h2>
                        <div className="input-group">
                            <select id="midSelect" ref={headSelectRef}>
                                {headerData?.map((item: any, index: number) => (
                                    <option key={item.hashcode || index} value={item.hashcode}>{item.header}</option>
                                ))}
                            </select>
                            <input type="text" id="midInput" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMidItem(e.target.value)} value={midItem} placeholder="輸入中項類別" />
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
                                    item.showbool && (
                                        <li key={item.id || index} className="category-item">
                                            <span className="category-name">{item.header}</span>
                                            <div className="actions">
                                                <button id={item.id} onClick={(e) => toggleMidCategoryVisibility("hide", item.hashcode, e)} className="category-toggle-hide-btn">👁️隱藏</button>
                                                <button id={item.id} onClick={(e) => deleteMidCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                            </div>
                                        </li>
                                    )
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
                                    !item.showbool && (
                                        <li key={item.id || index} className="category-item">
                                            <span className="category-name">{item.header}</span>
                                            <div className="actions">
                                                <button id={item.id} onClick={(e) => toggleMidCategoryVisibility("show", item.hashcode, e)} className="category-toggle-view-btn">👁️顯示</button>
                                                <button id={item.id} onClick={(e) => deleteMidCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                            </div>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="category-section">
                        <h2>小項類別管理</h2>
                        <div className="input-group">
                            <select id="majorSelect" ref={kidSelectRef}>
                                {kidData?.map((item: any, index: number) => (
                                    <option key={item.hashcode || index} value={item.hashcode}>{item.header}</option>
                                ))}
                            </select>
                            <input type="text" id="midInput" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinorItem(e.target.value)} value={minorItem} placeholder="輸入小項類別" />
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
                                    item.showbool && (
                                        <li key={item.id || index} className="category-item">
                                            <span className="category-name">{item.header}</span> 
                                            <div className="actions">
                                                <button id={item.id} onClick={() => showForm(item.hashcode)} className="category-toggle-edit-btn">📖編輯內容</button>
                                                <button id={item.id} onClick={(e) => toggleMinorCategoryVisibility("hide", item.hashcode, e)} className="category-toggle-hide-btn">👁️隱藏</button>
                                                <button id={item.id} onClick={(e) => deleteMinorCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                            </div>
                                        </li>
                                    )
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
                                    !item.showbool && (
                                        <li key={item.id || index} className="category-item">
                                            <span className="category-name">{item.header}</span>
                                            <div className="actions">
                                                <button id={item.id} onClick={() => showForm(item.hashcode)} className="category-toggle-edit-btn">📖編輯內容</button>
                                                <button id={item.id} onClick={(e) => toggleMinorCategoryVisibility("show", item.hashcode, e)} className="category-toggle-view-btn">👁️顯示</button>
                                                <button id={item.id} onClick={(e) => deleteMinorCategory(item.hashcode, e)} className="category-delete-btn" >🗑️刪除</button>
                                            </div>
                                        </li>
                                    )
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

export default React.memo(ModalManager);