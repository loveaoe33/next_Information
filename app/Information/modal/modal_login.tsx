"use client";

import { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import "../css/information_login.css";


// 修正拼寫為 ModalViewProps，並添加 children（可選）
interface LoginAccount {
  isClose: () => void;
  isOpen: boolean;
  account:String;
  password:String;
  jwtoken:String;
  title: string;
}

const viewAlert = () => {
  alert("DDD");
};

// ModalView 組件
const modalView = ({ isClose, isOpen, title  }: LoginAccount) => {
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
    className="login-modal"
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



    <div className="login-container">
        <h2>{title}</h2>
        <form>
            <div className="input-group">
                <label htmlFor="username">使用者名稱</label>
                <input type="text" id="username" name="username" required/>
            </div>
            <div className="input-group">
                <label htmlFor="password">密碼</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <button type="submit" className="login-btn">登入</button>
        </form>
        {/* <a href="#" className="link">忘記密碼？</a> */}
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
