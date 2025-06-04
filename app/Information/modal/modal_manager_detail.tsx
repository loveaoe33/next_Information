"use client";

import { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import "../css/information_product_detail.css";
// 修正拼寫為 ModalViewProps，並添加 children（可選）
interface LoginAccount {
    isClose: () => void;
    isOpen: boolean;
    account: string;
    password: string;
    jwtoken: string;
    title: string;
}

// ModalView 組件
const modalView = ({ isClose, isOpen, title }: LoginAccount) => {

    // 可選擇性地在 Modal 打開時調用 viewAlert
    // viewAlert(); // 如果你希望每次 Modal 打開時彈出 alert，取消這行註解

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={isClose}
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

            <div className="categoryDetail_container">
                <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">新增商品</h2>
                    <form className="space-y-5">


                        <div>
                            <label className="block text-gray-700 font-medium mb-1">商品抬頭</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="輸入商品名稱" />
                        </div>


                        <div>
                            <label className="block text-gray-700 font-medium mb-1">商品簡介</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="簡短描述商品" />
                        </div>


                        <div>
                            <label className="block text-gray-700 font-medium mb-1">商品規格</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="例如：500ml / 白色 / XL" />
                        </div>


                        <div>
                            <label className="block text-gray-700 font-medium mb-1">建議售價 (NTD)</label>
                            <input type="number" className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="輸入售價" />
                        </div>


                        <div>
                            <label className="block text-gray-700 font-medium mb-1">備註</label>
                            <textarea rows={4} className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="可填寫其他說明或注意事項"></textarea>
                        </div>


                        <div>
                            <label className="block text-gray-700 font-medium mb-2">商品分類清單</label>
                            <ul id="categoryList_Detail">
                                <li className="category-item_Detail">
                                    <span className="category-name">生活用品</span>
                                    <div className="actions">
                                        <button type="button" className="category-toggle-view-btn">顯示</button>
                                        <button type="button" className="category-toggle-hide-btn">隱藏</button>
                                        <button type="button" className="category-delete-btn">刪除</button>
                                    </div>
                                </li>
                                <li className="category-item_Detail">
                                    <span className="category-name">美妝保養</span>
                                    <div className="actions">
                                        <button type="button" className="category-toggle-view-btn">顯示</button>
                                        <button type="button" className="category-toggle-hide-btn">隱藏</button>
                                        <button type="button" className="category-delete-btn">刪除</button>
                                    </div>
                                </li>
                            </ul>
                        </div>


                        <div className="text-right">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
                                儲存商品
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};


// export default function view_modal(){
// const [isModalOpen,setModalOpen]=useState(false);
// return( 
//     <div classNameName="flex flex-col items-center justify-center min-h-screen">
//       <button 
//         classNameName="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" 
//         onClick={() => setModalOpen(true)}
//       >
//         打開 Modal
//       </button>
//       <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="彈出視窗">
//         <p>這是彈出視窗的內容。</p>
//       </Modal>
//     </div>

// )

// }


export default modalView;
