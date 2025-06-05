'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import '../css/information_product_detail.css';

type product = {
    isClose: () => void;
    fetch_Information:(caseSelect: string) => Promise<void>;
    isOpen: boolean;
    treeData: treeData | null | undefined;
}

export type treeData = {
    id: number;
    header: string;
    kid_header: string;
    hashcode: string;
    focus_number: number;
    img_url: string;
    showbool: boolean;
    content_json: string;
}

export type treeContent = {
    product_Header:string;
    product_Introduction:string;
    product_Specification:string;
    product_Price:Number;
    product_Remark:string;


}
const ModalView = ({ isClose,fetch_Information, isOpen, treeData }: product) => {
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
                        <input type="text" placeholder="輸入商品名稱" />
                    </div>

                    <div>
                        <label>商品簡介</label>
                        <input type="text" placeholder="簡短描述商品" />
                    </div>

                    <div>
                        <label>商品規格</label>
                        <input type="text" placeholder="例如：500ml / 白色 / XL" />
                    </div>

                    <div>
                        <label>建議售價 (NTD)</label>
                        <input type="number" placeholder="輸入售價" />
                    </div>

                    <div>
                        <label>圖片網址</label>
                        <input type="text" placeholder="輸入圖片網址" />
                    </div>

                    <div>
                        <label>備註</label>
                        <textarea rows={4} placeholder="可填寫其他說明或注意事項"></textarea>
                    </div>

                    <div>
                        <label>商品分類清單</label>
                        <ul id="category-list">
                            <li className="category-item">
                                <span className="category-name">生活用品</span>
                                <div className="actions">
                                    <button type="button" className="category-toggle-hide-btn">帶出資訊</button>
                                    <button type="button" className="category-delete-btn">刪除</button>
                                </div>
                            </li>
                            <li className="category-item">
                                <span className="category-name">美妝保養</span>
                                <div className="actions">
                                    <button type="button" className="category-toggle-hide-btn">帶出資訊</button>
                                    <button type="button" className="category-delete-btn">刪除</button>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="text-right">
                        <button type="submit" className="submit-btn">儲存商品</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ModalView;
