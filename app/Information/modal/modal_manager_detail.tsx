'use client';

import { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import Image from 'next/image';
import { Category, MinorCategory_Api } from "../lib/information_state";
import '../css/information_product_detail.css';
import { nanoid } from 'nanoid'
import React from "react";
import { isEqual } from "lodash";

/**
 * Props for the ModalDetail component.
 */
export interface ModalDetailProps {
    /** Function to close the modal. */
    isClose: () => void;
    /** Function to re-fetch category information. */
    fetch_Information: (caseSelect: string) => Promise<void>;
    /** Displays an error alert. */
    errorAlert: (message: string) => void;
    /** Displays a success alert. */
    successAlert: (message: string) => void;
    /** Boolean indicating whether the modal is open. */
    isOpen: boolean;
    /** Domain context for API requests. */
    domain: string;
    /** Array of all tree category data. */
    treeArrayData?: any[] | null;
    /** The specific target data code (hashcode) to display. */
    dataCode?: string | null;
}

/** Represents a tree category item. */
export type treeData = {
    id?: number | null;
    header?: string | null;
    kid_header?: string | null;
    hashcode?: string | null;
    focus_number?: number | null;
    showbool?: boolean | null;
    content_json?: string | null;
}

/** Represents the detailed content of a specific product. */
export type treeContent = {
    product_Header?: string | null;
    product_Introduction?: string | null;
    product_Specification?: string | null;
    product_Price?: number | null;
    product_Remark?: string | null;
    product_ImgUrl?: string | null;
    jsonCode: string;
}

/** Initial state for a new product content object. */
const initialTreeObject: treeContent = {
    product_Header: "",
    product_Introduction: "",
    product_Specification: "",
    product_Price: 0,
    product_Remark: "",
    product_ImgUrl: "",
    jsonCode: "",
};

const ModalView = ({ isClose, fetch_Information, errorAlert, successAlert, isOpen, domain, treeArrayData, dataCode }: ModalDetailProps) => {

    const prevTreeDataRef = useRef(treeArrayData);
    const prevDataCodeRef = useRef(dataCode);
    const [treeData, setTreeData] = useState<treeData>();
    const [treeObject, setTree] = useState<treeContent>(initialTreeObject)
    const [updateBtn, setUpdateBtn] = useState<boolean>(false);

    /**
     * Handles input changes for the tree content form.
     * @param field - The field name to update.
     * @param value - The new value for the field.
     */
    const handleChange = (field: keyof treeContent, value: string | number): void => {
        setTree((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    // Monitor changes in tree array data
    useEffect(() => {
        if (!isOpen) {
            resetFormCode();
        }

        const current = treeArrayData;
        if (!isEqual(prevTreeDataRef.current, current)) {
            prevTreeDataRef.current = current;
            updateSelectedTreeData();

            console.log("Tree資料有更新");
        } else {
            console.log("Tree資料無更新");

        }
    }, [treeArrayData, isOpen])

    // Monitor changes in data code
    useEffect(() => {
        const current = dataCode;
        if (!isEqual(prevDataCodeRef.current, current)) {
            prevDataCodeRef.current = current;
            updateSelectedTreeData();

            console.log("Code資料有更新");
        } else {
            console.log("Code資料無更新");

        }
    }, [dataCode])


    /**
     * Resets the form and generates a new unique JSON code for a new entry.
     */
    const resetFormCode = (): void => {
        setTree(initialTreeObject);
        setUpdateBtn(false);
        setTree((prev) => ({
            ...prev,
            jsonCode: nanoid(8), 
        }));
    }

    /**
     * Updates the current treeData object based on the matching dataCode.
     */
    const updateSelectedTreeData = (): void => {
        const targetItem = treeArrayData?.find((item: any) => item.hashcode === dataCode);
        setTreeData(targetItem);
    }

    /**
     * Validates the form content before submission.
     * @returns boolean indicating whether the validation passed.
     */
    const validateContent = (): boolean => {
        const validations = [
            { condition: !treeObject.product_Header, message: "資料驗證失敗，抬頭不可為空!" },
            { condition: !treeObject.product_Introduction, message: "資料驗證失敗，介紹不可為空!" },
            { condition: !treeObject.product_Specification, message: "資料驗證失敗，註記不可為空!" },
            { condition: !treeObject.product_Price, message: "資料驗證失敗，金額不可為空!" },
            { condition: !treeObject.jsonCode, message: "資料驗證失敗，識別碼產生錯誤!" }
        ]
        
        for (const { condition, message } of validations) {
            if (condition) {
                errorAlert(message);
                return false;
            }
        }
        successAlert("資料驗證成功，傳送中");
        return true;
    }

    /**
     * Handles insert, update, or delete operations for the tree content.
     */
    const handleContentSubmit = (action?: string | null, id?: number | null, hashcode?: string | null, jsoncode?: string | null): void => {
        if (action === "update" || action === "delete" || validateContent()) {
            const newJson = generateUpdatedJson(action, jsoncode);
            updateMinorCategory(id, hashcode, newJson);
        }
    }

    /**
     * Loads the selected tree content item into the form for editing.
     * @param item - The selected tree content item.
     */
    const loadContentToForm = (item: treeContent): void => {
        if (item !== undefined && item.jsonCode != undefined && item.jsonCode != null) {
            setTree({
                product_Header: item.product_Header ?? "",
                product_Introduction: item.product_Introduction ?? "",
                product_Specification: item.product_Specification ?? "",
                product_Price: item.product_Price ?? 0,
                product_Remark: item.product_Remark ?? "",
                jsonCode: item.jsonCode ?? "",
                product_ImgUrl: item.product_ImgUrl ?? "",
            });
            setUpdateBtn(true);
            return;
        } else {
            errorAlert("資料帶出錯誤，請聯繫專員!");
        }
    }

    /**
     * Makes the API request to update the Minor Category JSON data.
     */
    const updateMinorCategory = async (id: number | undefined | null, hashcode: string | undefined | null, data: string | undefined | null): Promise<void> => {
        const api: Category = MinorCategory_Api({
            id: id,
            header: "",
            hashcode: hashcode,
            domain,
            userData: "1,loveaoe33,456,0",
            content_json: data,
            // img_url 和 content_json 是 optional，可以不寫
        });

        const log = await api.update();
        switch (log) {
            case "Server Update none connetcion":
                errorAlert("新增API伺服器異常");
                break;
            case "sucess":
                successAlert("更新成功!");
                fetch_Information("treeCase");
                resetFormCode();
                break;
            case "fail":
                errorAlert("更新失敗，請聯繫專員!");
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
                break;
        }
    }

    /**
     * Generates a new JSON string representation of the tree content based on the given action.
     */
    const generateUpdatedJson = (action?: string | null, jsonCode?: string | null): string => {
        let jsonArray: treeContent[] = [];
        try {
            jsonArray = JSON.parse(treeData?.content_json ?? "[]");
        } catch (error) {
            console.error(error);
            errorAlert("JSON資料解析錯誤，請聯繫專員!");
            jsonArray = []; // fallback
        }
        
        if (action == "insert") {
            jsonArray.push(treeObject);
        } else if (action == "update") {
            jsonArray = jsonArray.map(item => item.jsonCode === jsonCode ? { ...treeObject } : item)
        } else if (action == "delete") {
            jsonArray = jsonArray.filter(item => item.jsonCode !== jsonCode);
        }

        return JSON.stringify(jsonArray);
    }
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={isClose}
            ariaHideApp={false}
            preventScroll={false}
            style={{
                content: {
                    width: '110vw',       // 最大佔螢幕寬度的90%
                    maxWidth: '800px',   // 最大寬度600px
                    height: 'auto',
                    maxHeight: '80vh',   // 高度最大是視窗的80%
                    margin: 'auto',
                    overflow: 'auto',
                    padding: '20px',
                    borderRadius: '12px',
                },
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                },
            }}
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

            <div className="container">
                <h2>主類別內容:{treeData?.header}</h2>
                <form>

                    <div>
                        <label>商品抬頭</label>
                        <input type="text" value={treeObject.product_Header ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("product_Header", e.target.value)} placeholder="輸入商品名稱" />
                    </div>

                    <div>
                        <label>商品簡介</label>
                        <input type="text" value={treeObject.product_Introduction ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("product_Introduction", e.target.value)} placeholder="簡短描述商品" />
                    </div>

                    <div>
                        <label>商品規格</label>
                        <input type="text" value={treeObject.product_Specification ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("product_Specification", e.target.value)} placeholder="例如：500ml / 白色 / XL" />
                    </div>

                    <div>
                        <label>建議售價 (NTD)</label>
                        <input type="number" value={treeObject.product_Price ?? 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("product_Price", e.target.value)} placeholder="輸入售價" />
                    </div>

                    <div>
                        <label>圖片網址</label>
                        <input type="text" value={treeObject.product_ImgUrl ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("product_ImgUrl", e.target.value)} placeholder="輸入圖片網址" />
                    </div>

                    <div>
                        <label>備註</label>
                        <textarea rows={4} value={treeObject.product_Remark ?? ""} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("product_Remark", e.target.value)} placeholder="可填寫其他說明或注意事項"></textarea>
                    </div>

                    <div>
                        <label>商品識別碼:</label>
                        <input type="text" value={treeObject.jsonCode} readOnly onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("jsonCode", e.target.value)} placeholder="輸入識別碼" />
                    </div>


                    <div>
                        <label>商品分類清單</label>
                        <ul id="category-list">
                            {JSON.parse(treeData?.content_json || "[]").map((item: treeContent, index: number) => {
                                return (
                                    <li key={item.jsonCode || index} className="category-item">
                                        <span className="category-name">{item.product_Header}</span>
                                        <div className="actions">
                                            <button type="button" id={item.jsonCode} onClick={() => { loadContentToForm(item) }} className="category-toggle-bring-btn">帶出資訊</button>
                                            <button type="button" id={item.jsonCode} disabled={!updateBtn} className={ !updateBtn?'updateBtn-disable':'updateBtn-active'}  onClick={() => { handleContentSubmit("update", treeData?.id, treeData?.hashcode, item?.jsonCode) }}>更新</button>
                                            <button type="button" id={item.jsonCode} onClick={() => { handleContentSubmit("delete", treeData?.id, treeData?.hashcode, item?.jsonCode) }} className="category-delete-btn">刪除</button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>




                    <div className="text-right">
                        <button type="button" onClick={() => { handleContentSubmit("insert", treeData?.id, treeData?.hashcode) }} className="submit-btn">儲存商品</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default React.memo(ModalView);
