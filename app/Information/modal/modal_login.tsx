"use client";

import { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import "../css/information_login.css";
import { ToastContainer, toast } from 'react-toastify';


// 修正拼寫為 ModalViewProps，並添加 children（可選）
interface LoginAccount {
  isClose: () => void;
  isOpen: boolean;
  domain: string;
  account: string;
  password: string;
  jwtoken: string;
  title: string;
}

const viewAlert = () => {
  alert("DDD");
};



// ModalView 組件
const modalView = ({ isClose, isOpen, title, domain }: LoginAccount) => {



  if (!isOpen) return null;
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  // 可選擇性地在 Modal 打開時調用 viewAlert
  // viewAlert(); // 如果你希望每次 Modal 打開時彈出 alert，取消這行註解


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

  const loginBtn = async (): Promise<string> => {
    try {
      const res = await fetch("/api/adminLogin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,
          domainUrl: domain,
          account: account,
          password: password,
          token: "",
          level: 0,
          depart: "",
          create_date: ""
        }),
      });

      if (!res.ok) throw new Error("loginAdmin api Error");
      const result = await res.json();
      console.log("loginAdmin result:", result);
      if (result.res === "account none exist") {
        errorAlert("帳號或密碼錯誤，請確認後重新輸入");
      }
      else if (result.res === "account password error") {
        errorAlert("密碼驗證錯誤，請確認後重新輸入");
      } else {

        const data=result.res.JSON();
        successAlert("登入成功，歡迎回來！"+data.account);

      }

      return result.res;
    } catch (err) {
      alert(err);
      return "loginAdmin none connetcion";
    }

  }

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
          fontSize: '30px',
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
            <label htmlFor="username">名稱</label>
            <input type="text" id="username" name="username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">密碼</label>
            <input type="password" id="password" name="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required />
          </div>
          <button type="button" onClick={loginBtn} className="login-btn">登入</button>
        </form>
        {/* <a href="#" className="link">忘記密碼？</a> */}
      </div>
      <ToastContainer />
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
