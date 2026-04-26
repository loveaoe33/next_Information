"use client";
import Image from "next/image";
import "./css/information_template.css"
import ModalProduct from "./modal/modal_product";

import { ReactNode, useState, useRef } from "react";
import { treeData as TreeDataType } from "./modal/modal_manager_detail";

/**
 * Props for the TemplateMd component.
 */
export interface TemplateMdProps {
    /** Array of minor (tree) category data to display. */
    treeData: any[] | null;
}

/**
 * Template component for displaying product information in a horizontally scrollable slider.
 */
export default function TemplateMd({ treeData }: TemplateMdProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedTreeData, setSelectedTreeData] = useState<TreeDataType | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    /** Closes the product detail modal. */
    const handleCloseModal = () => {
        setIsOpen(false);
    }

    /**
     * Opens the modal and sets the selected product data.
     * @param data - The product data to display.
     */
    const handleOpenModal = (data: TreeDataType) => {
        setIsOpen(true);
        setSelectedTreeData(data);
    }

    /** Handles mouse down event to start dragging the slider. */
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
        setScrollLeft(containerRef.current?.scrollLeft || 0);
    }

    /** Handles mouse move event to scroll the slider while dragging. */
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (containerRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2; // 滑動速度
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    }

    /** Handles mouse up/leave event to stop dragging. */
    const handleMouseUp = () => {
        setIsDragging(false);
    }

    /**
     * Parses the JSON content and renders the preview UI (Image and Introduction).
     * @param contentJson - The JSON string containing product details.
     * @returns ReactNode representing the parsed content.
     */
    const renderContent = (contentJson: string | null): ReactNode => {
        try {
            if (!contentJson || contentJson.trim() === "") {
                return <p>資料尚未準備好</p>;
            }
            const parsed = JSON.parse(contentJson);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                return <p>資料為空</p>;
            }
            const content = parsed[0];
            return (
                <>
                    {content.product_ImgUrl && <Image src={content.product_ImgUrl} width={300} height={200} alt="商品圖片" />}
                    <p>{content.product_Introduction}</p>
                </>
            );
        } catch (e) {
            console.error("JSON解析失敗", e);
            return <p>資料格式錯誤</p>;
        }
    }

    if (!treeData || treeData.length === 0) {
        return <div>資料載入中:Loading...</div>;
    }

    return (
        <div className="template-wrapper">
            <div
                ref={containerRef}
                className="flex overflow-x-auto space-x-4 p-4 cursor-grab select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
            >
            <div className="slider">
                <div className="slides">
                        {/* Hardcoded sample item 1 */}
                    <div className="slide" >
                        <h2>高單位B群1</h2>
                        <Image src="https://i.imgur.com/sBHx3Wx.jpeg" width={300} height={200} alt="商品3" />
                        <p>維生素B群（Vitamin B Complex），又稱維他命B群，是人體無法自行製造，需要從食物獲取的水溶性營養素。</p>
                            <div className="button-container">
                                <button className="forward_Line" >詢問院內窗口</button>
                                <button className="detail_Window" onClick={() => setIsOpen(true)}>了解詳情</button>
                            </div>
                    </div>

                        {/* Dynamically mapped items from treeData */}
                        {treeData.map((item: any, idx: number) => (
                            <div key={item.hashcode || idx} className="slide" >
                                <h2>{item.header}</h2>
                                {renderContent(item.content_json)}
                                <div className="button-container">
                                    <button className="forward_Line" >詢問院內窗口</button>
                                    <button className="detail_Window" onClick={() => handleOpenModal(item)}>了解詳情</button>
                                </div>
                            </div>
                        ))}

                        {/* Hardcoded sample item 2 */}
                    <div className="slide" >
                        <h2>高單位B群3</h2>
                        <Image src="https://i.imgur.com/sBHx3Wx.jpeg" width={300} height={200} alt="商品3" />
                        <p>有助於維持胺基酸正常代謝、紅血球中紫質的形成、有助於紅血球維持正常型態，幫助色胺酸轉變成菸鹼素，及增進神經系統的健康</p>
                            <div className="button-container">
                                <button className="forward_Line" >詢問院內窗口</button>
                                <button className="detail_Window" onClick={() => setIsOpen(true)} >了解詳情</button>
                            </div>
                    </div>
                </div>
            </div>
          
                <ModalProduct isClose={handleCloseModal} isOpen={isOpen} treeData={selectedTreeData} title={selectedTreeData?.header || "商品詳情"} />
            </div>
        </div>
    );
}
