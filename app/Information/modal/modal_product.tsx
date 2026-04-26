"use client";

import React from "react";
import Modal from "react-modal";
import Image from "next/image";
import "../css/information_product.css";
import { treeData, treeContent } from "./modal_manager_detail";

/**
 * Props for the ModalProduct component.
 */
export interface ModalProductProps {
  /** Function to close the modal. */
  isClose: () => void;
  /** Boolean indicating whether the modal is open. */
  isOpen: boolean;
  /** The title displayed on the modal. */
  title: string;
  /** The category tree data containing product details. */
  treeData?: treeData | null;
}

/**
 * Represents the status and data parsed from the product content JSON.
 */
export type RenderResult = {
  status: "empty" | "notReady" | "error" | "success";
  data?: treeContent;
  message?: string;
}

/**
 * Modal component for displaying detailed product information.
 */
const ModalProduct = ({ isClose, isOpen, title, treeData }: ModalProductProps) => {
  if (!isOpen) return null;

  /**
   * Parses the JSON content string into a RenderResult object.
   * @param contentJson - The JSON string containing product content.
   * @returns The parsed result status and data.
   */
  const renderContent = (contentJson: string | null): RenderResult => {
    try {
      if (!contentJson || contentJson.trim() === "") {          
        return { status: "notReady", message: "資料尚未準備好" };
      }
      const parsed = JSON.parse(contentJson);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return { status: "empty", message: "資料為空" };
      }
      const content = parsed[0] as treeContent;
      return { status: "success", data: content};
    } catch (e) {
      console.error("Failed to parse product content JSON:", e);
      return { status: "error", message: "解析資料時發生錯誤" };
    }
  };

  const result = renderContent(treeData?.content_json || null);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isClose}
      contentLabel={title}
      ariaHideApp={false} // Avoids errors in Next.js
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
              <Image src="https://i.imgur.com/sBHx3Wx.jpeg" width={300} height={200} alt="商品3" />

            </div>



            <div className="product-info">
              <h2 className="product-title">{treeData?.header}</h2>
              <p className="product-description">{result.data?.product_Introduction}</p>
              <div className="product-specs">
                <h3>商品規格</h3>
                <ul>
                  {result.data?.product_Specification}
                  {/* <li>材質：優質塑料</li>
                  <li>尺寸：20cm x 10cm</li>
                  <li>顏色：紅色、藍色、綠色</li> */}
                </ul>
              </div>
              <div className="product-price">
                <p>價格：${result.data?.product_Price}</p>
              </div>



              <div className="product-actions">
                <button className="add-to-cart">詢問專員</button>
                <button className="buy-now">立即購買</button>
                <button className="buy-now">記住項目</button>
              </div>
            </div>
          </div>
        </section>


        <hr className="separator" />


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


export default React.memo(ModalProduct);
