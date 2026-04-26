"use client";

import { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import "../css/information_login.css";
import { ToastContainer, toast } from 'react-toastify';

/**
 * Props for the Login Modal component.
 */
interface LoginAccountProps {
  /** Function to close the modal. */
  isClose: () => void;
  /** Boolean indicating whether the modal is open. */
  isOpen: boolean;
  /** The domain associated with the login request. */
  domain: string;
  /** The title displayed on the modal. */
  title: string;
}

/**
 * Modal component for handling user login.
 */
const modalView = ({ isClose, isOpen, title, domain }: LoginAccountProps) => {

  if (!isOpen) return null;
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

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
   * Handles the login button click event.
   * Sends the account and password to the server for authentication.
   */
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
      } else if (result.res === "account password error") {
        errorAlert("密碼驗證錯誤，請確認後重新輸入");
      } else {
        // Handle parsing carefully as standard objects do not have a .JSON() method
        try {
          const data = typeof result.res === 'string' ? JSON.parse(result.res) : result.res;
          successAlert("登入成功，歡迎回來！" + (data.account || account));
        } catch (e) {
          successAlert("登入成功，歡迎回來！" + account);
        }
      }

      return result.res;
    } catch (err) {
      console.error(err);
      return "loginAdmin connection error";
    }
  };

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


export default modalView;
