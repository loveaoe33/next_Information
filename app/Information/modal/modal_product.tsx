"use client";

import { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import "../css/information_product.css";


// 修正拼寫為 ModalViewProps，並添加 children（可選）
interface ModalViewProps {
  isClose: () => void;
  isOpen: boolean;
  title: string;
  children?: string  | null; // 可為undefind或null
}

const viewAlert = () => {
  alert("DDD");
};

// ModalView 組件
const modalView = ({ isClose, isOpen, title, children }: ModalViewProps) => {
  if (!isOpen) return null;

  // 可選擇性地在 Modal 打開時調用 viewAlert
  // viewAlert(); // 如果你希望每次 Modal 打開時彈出 alert，取消這行註解

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={isClose}
    contentLabel={title}
    ariaHideApp={false} // 在Next.js中，使用此配置来避免错误
    preventScroll={false}
  >
  <div className="modal_product-body">
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
      <header className="navbar">
        <div className="navbar-container">
            <h1>{title}</h1>
        </div>
    </header>


    <section className="product-section">
        <div className="product-container">
            <div className="product-image">
                          <Image  src="https://i.imgur.com/sBHx3Wx.jpeg" width={300} height={200} alt="商品3"/>
            
            </div>
            <div className="product-info">
                <h2 className="product-title">商品名稱</h2>
                <p className="product-description">這是一個非常精緻且受歡迎的商品，適合各種喜好的人群。它擁有出色的設計和高品質的材質。</p>
                <div className="product-specs">
                    <h3>商品規格</h3>
                    <ul>
                        <li>材質：優質塑料</li>
                        <li>尺寸：20cm x 10cm</li>
                        <li>顏色：紅色、藍色、綠色</li>
                    </ul>
                </div>
                <div className="product-price">
                    <p>價格：$999</p>
                </div>
                <div className="product-actions">
                    <button className="add-to-cart">詢問專員</button>
                    <button className="buy-now">立即購買</button>
                    <button className="buy-now">記住項目</button>
                </div>
            </div>
        </div>
    </section>


    <hr className="separator"/>

   
    <section className="additional-content">
        <h3>更多資訊</h3>
        <p>這是更多的商品詳細資訊，可以放置更多的描述、使用方式、顧客評價等等。</p>
        <p>這個區域可以隨著需要增加更多的內容，例如相關商品、FAQ等。</p>
    </section>


    <footer className="footer">
        <div className="footer-content">
            <p>聯絡我們：bone.hosp@gmail.com</p>
        </div>
    </footer>
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
