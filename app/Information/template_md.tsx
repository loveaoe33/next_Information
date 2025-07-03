"use client";
import Image from "next/image";
import "./css/information_template.css"
import ModalView from "./modal/modal_product";
import ModalLogin from "./modal/modal_login";

import { ReactNode, useEffect, useState, useRef } from "react";
import { treeData } from "./modal/modal_manager_detail";
import { json } from "stream/consumers";


type Props = {
    treeData: any[] | null;
};
export default function template_md(treeData: Props) {
    const [isOpen, setIsOpent] = useState<boolean>(false);
    const [proprTree, setTree] = useState<treeData | null>(null);


    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const isClose = () => {
        setIsOpent(false);
    }

    const setDataOpem = (data: treeData, open: boolean) => {
        setIsOpent(open);
        setTree(data);

    }


    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
        setScrollLeft(containerRef.current?.scrollLeft || 0);

    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (containerRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2; // 滑動速度
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    }


    const handleMouseUp = (e: React.MouseEvent) => {
        setIsDragging(false);
    }

    const scrollByAmount = (amount: number) => {
        containerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });

    }

    const rePlaeceContent = (str: string, target: string) => {
        console.log("型別為" + typeof str);

        if (typeof str !== "string") return str;
        if (typeof target !== "string" || !target) return str;
        const escped = target.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); // escape regex special characters
        return str.replace(new RegExp(escped, "g"), "");
    }

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
                    <Image src={content.product_ImgUrl} width={300} height={200} alt="商品3" />
                    <p>{content.product_Introduction}</p>
                </>
            );
        } catch (e) {
            console.error("JSON解析失敗", e);
            return <p>資料格式錯誤</p>;
        }
    }
    // useEffect(()=>{
    // const handleResize=()=>setIsOpent(false);
    // window.addEventListener("resize",handleResize);
    // return ()=>window.removeEventListener("resize",handleResize);
    // },[]);

    useEffect(() => {
        // 安全，這裡一定只跑在瀏覽器
    }, [treeData]);


    if (!treeData.treeData || treeData.treeData.length === 0) {
        return <div>資料載入中:Loading...</div>;
    }
    return (
        <body>
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
                    <div className="slide" >
                        <h2>高單位B群1</h2>
                        <Image src="https://i.imgur.com/sBHx3Wx.jpeg" width={300} height={200} alt="商品3" />
                        <p>維生素B群（Vitamin B Complex），又稱維他命B群，是人體無法自行製造，需要從食物獲取的水溶性營養素。</p>
                        <div className="button-container"><button className="forward_Line" >詢問院內窗口</button>

                            <button className="detail_Window" onClick={() => setIsOpent(true)}>了解詳情</button></div>
                    </div>

                    {treeData.treeData && treeData.treeData.map((item: any, idx: number) => (

                        <div key={idx} className="slide" >
                            <h2>{item.header}</h2>

                            {renderContent(item.contentJson)}

                            <div className="button-container"><button className="forward_Line" >詢問院內窗口</button>

                                <button className="detail_Window" onClick={() => setDataOpem(item, true)}>了解詳情</button></div>
                        </div>

                    ))}



                    <div className="slide" >
                        <h2>高單位B群3</h2>
                        <Image src="https://i.imgur.com/sBHx3Wx.jpeg" width={300} height={200} alt="商品3" />
                        <p>有助於維持胺基酸正常代謝、紅血球中紫質的形成、有助於紅血球維持正常型態，幫助色胺酸轉變成菸鹼素，及增進神經系統的健康</p>
                        <div className="button-container"><button className="forward_Line" >詢問院內窗口</button>
                            <button className="detail_Window" onClick={() => setIsOpent(true)} >了解詳情</button></div>
                    </div>
                </div>


            </div>
      
            <ModalView isClose={isClose} isOpen={isOpen} treeData={proprTree} title="高單位B群"   >

            </ModalView>
  </div>
        </body>
    );
}

