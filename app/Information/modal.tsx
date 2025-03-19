"use client";

import { useState } from "react";
import Modal from "react-modal";


// 修正拼寫為 ModalViewProps，並添加 children（可選）
interface ModalViewProps {
  isClose: () => void;
  isOpen: boolean;
  title: string;
  children?: string; // 添加 children 以支援內容
}

const viewAlert = () => {
  alert("DDD");
};

// ModalView 組件
const ModalView = ({ isClose, isOpen, title, children }: ModalViewProps) => {
  if (!isOpen) return null;

  // 可選擇性地在 Modal 打開時調用 viewAlert
  // viewAlert(); // 如果你希望每次 Modal 打開時彈出 alert，取消這行註解

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={isClose}
    contentLabel={title}
    ariaHideApp={false} // 在Next.js中，使用此配置来避免错误
  >
  <div className="modal_children">  {children}</div>
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
        </button>  </Modal>
  );
};


// export default function view_modal(){
// const [isModalOpen,setModalOpen]=useState(false);
// return( 
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <button 
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" 
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


export default ModalView;
