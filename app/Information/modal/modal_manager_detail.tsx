'use client';

import { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import Image from 'next/image';
import { Category, MinorCategory_Api } from "../lib/information_state";
import '../css/information_product_detail.css';
import { nanoid } from 'nanoid'
import { initialize } from "next/dist/server/lib/render-server";
import React from "react";
import { isEqual } from "lodash";


type product = {
    isClose: () => void;
    fetch_Information: (caseSelect: string) => Promise<void>;
    errorAlert: (message: string) => void;
    successAlert: (message: string) => void;
    isOpen: boolean;
    domain: string;
    treeArrayData?: any[] | null;
    dataCode?: string | null;
}

export type treeData = {
    id?: number | null;
    header?: string | null;
    kid_header?: string | null;
    hashcode?: string | null;
    focus_number?: number | null;
    showbool?: boolean | null;
    content_json?: string | null;
}

export type treeContent = {
    product_Header?: string | null;
    product_Introduction?: string | null;
    product_Specification?: string | null;
    product_Price?: number | null;
    product_Remark?: string | null;
    product_ImgUrl?: string | null;
    jsonCode: string;
}

const ModalView = ({ isClose, fetch_Information, errorAlert, successAlert, isOpen, domain, treeArrayData, dataCode }: product) => {


    const initialTreeObject: treeContent = {
        product_Header: "",
        product_Introduction: "",
        product_Specification: "",
        product_Price: 0,
        product_Remark: "",
        product_ImgUrl: "",
        jsonCode: "",
    };
    const prevRef = useRef(treeArrayData);
    const prefCode = useRef(dataCode);
    const [treeData, setTreeData] = useState<treeData>();
    const [treeObject, setTree] = useState<treeContent>(initialTreeObject)
    const [updateBtn, setUpdateBtn] = useState<boolean>(false);


    const handleChange = (field: keyof treeContent, value: string | number): void => {
        setTree((prev) => ({
            ...prev,
            [field]: value,
        }));

    }

    // 正確寫法（監聽變化）
    useEffect(() => {
        if (!isOpen) {
            changeCode();
        }

        const current = treeArrayData;
        if (!isEqual(prevRef.current, current)) {
            prevRef.current = current;
            treeDataSelect();

            console.log("Tree資料有更新");
        } else {
            console.log("Tree資料無更新");

        }
    }, [treeArrayData, isOpen])

    // 正確寫法（監聽變化）
    useEffect(() => {


        const current = dataCode;
        if (!isEqual(prefCode.current, current)) {
            prefCode.current = current;
            treeDataSelect();

            console.log("Code資料有更新");
        } else {
            console.log("Code資料無更新");

        }
    }, [dataCode])



    const changeCode = (): void => {
        setTree(initialTreeObject);
        setUpdateBtn(false);
        setTree((prev) => ({
            ...prev,
            jsonCode: nanoid(8), // 使用 nanoid 生成唯一識別碼
        }));
    }





    const treeDataSelect = (): void => {
        const targetItem = treeArrayData?.find((item: any) => item.hashcode === dataCode);
        setTreeData(targetItem);
    }




    const contenCheck = (): boolean => {

        const vaildations = [
            { conditioin: !treeObject.product_Header, message: "資料驗證失敗，抬頭不可為空!" },
            { conditioin: !treeObject.product_Introduction, message: "資料驗證失敗，介紹不可為空!" },
            { conditioin: !treeObject.product_Specification, message: "資料驗證失敗，註記不可為空!" },
            { conditioin: !treeObject.product_Price, message: "資料驗證失敗，金額不可為空!" },
            { conditioin: !treeObject.jsonCode, message: "資料驗證失敗，識別碼產生錯誤!" }

        ]
        for (const { conditioin, message } of vaildations) {
            if (conditioin) {
                errorAlert(message);
                return false;
            }
        }
        successAlert("資料驗證成功，傳送中");
        return true;
    }

    const postConten = (caseSelect?: string | null, id?: number | null, hashcode?: string | null, jsoncode?: string | null): void => {

        if (caseSelect === "update" || caseSelect === "delete" || contenCheck()) {
            const newJson = jsonContent(caseSelect, jsoncode);
            updateMinorCategory(id, hashcode, newJson);
        }
    }

    const printContent = (item: treeContent): void => {

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
                changeCode();
                break;
            case "fail":
                errorAlert("更新失敗，請聯繫專員!");
                break;
            case "Account has no permissions":
                errorAlert("權限錯誤，請聯繫專員!");
                break;
        }
    }


    const jsonContent = (caseSelect?: string | null, jsonCode?: string | null): string => {
        let jsonArray: treeContent[] = [];
        try {
            jsonArray = JSON.parse(treeData?.content_json ?? "[]");
        } catch (error) {
            errorAlert("JSON資料解析錯誤，請聯繫專員!");
            jsonArray = []; // fallback
        }
        console.log("jsonArray1:", jsonArray, "hashCode:", jsonCode);
        if (caseSelect == "insert") {
            jsonArray.push(treeObject);
            /*call insert api*/
        }
        else if (caseSelect == "update") {

            jsonArray = jsonArray.map(item => item.jsonCode === jsonCode ? { ...treeObject } : item)

            /*call update api*/
        } else if (caseSelect == "delete") {

            jsonArray = jsonArray.filter(item => item.jsonCode !== jsonCode);
            /*call delete api*/

        }
        console.log("jsonArray2:", jsonArray);

        const newJson: string = JSON.stringify(jsonArray);

        return newJson;

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
                        {treeData?.content_json}
                        <ul id="category-list">
                            {JSON.parse(treeData?.content_json || "[]").map((item: treeContent, index: number) => {
                                return (
                                    <li className="category-item">

                                        <span className="category-name">{item.product_Header}</span>
                                        <div className="actions">
                                            <button type="button" id={item.jsonCode} onClick={(e) => { printContent(item) }} className="category-toggle-bring-btn">帶出資訊</button>
                                            <button type="button" id={item.jsonCode} disabled={!updateBtn} className={ !updateBtn?'updateBtn-disable':'updateBtn-active'}  onClick={(e) => { postConten("update", treeData?.id, treeData?.hashcode, item?.jsonCode) }}>更新</button>
                                            <button type="button" id={item.jsonCode} onClick={(e) => { postConten("delete", treeData?.id, treeData?.hashcode, item?.jsonCode) }} className="category-delete-btn">刪除</button>
                                        </div>
                                    </li>
                                )

                            })}
                        </ul>
                    </div>




                    <div className="text-right">
                        <button type="button" onClick={(e) => { postConten("insert", treeData?.id, treeData?.hashcode) }} className="submit-btn">儲存商品</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default React.memo(ModalView);


