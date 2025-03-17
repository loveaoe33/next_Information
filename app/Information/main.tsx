import "./css/information_main.css"
import Template_Md from "./template_md";

export default function main(){
    return (
    <body>
    <div className="container">
        <div className="sidebar" id="sidebar">
            <h2>選單</h2>
            <div className="toggle-btn" >≡</div>
            <div className="menu-item" >💊藥品/保健品服務展示</div>
            <div className="submenu" id="submenu-0">

                <div className="submenu-item">子選單 1-1</div>
                <div className="submenu-item">子選單 1-2</div>
            </div>
            <div className="menu-item" >🔪手術醫療展示</div>
            <div className="submenu" id="submenu-1">
                <div className="submenu-item">子選單 2-1</div>
                <div className="submenu-item">子選單 2-2</div>
            </div>
            <div className="menu-item" >🩺院內健檢服務展示</div>
            <div className="submenu" id="submenu-1">
                <div className="submenu-item">子選單 2-1</div>
                <div className="submenu-item">子選單 2-2</div>
            </div>
            
            <div className="menu-item" >☢️放射健檢展示</div>
            <div className="submenu" id="submenu-1">
                <div className="submenu-item">子選單 2-1</div>
                <div className="submenu-item">子選單 2-2</div>
            </div>
            <div className="menu-item" >🦴復健醫療展示</div>
            <div className="submenu" id="submenu-1">
                <div className="submenu-item">子選單 2-1</div>
                <div className="submenu-item">子選單 2-2</div>
            </div>
            <div className="menu-item" >📋其他自費服務展示</div>
            <div className="submenu" id="submenu-1">
                <div className="submenu-item">子選單 2-1</div>
                <div className="submenu-item">子選單 2-2</div>
            </div>
        </div>
        <div className="content">
            <div className="top-bar">
                <span>系統標題</span>
                <span>用戶資訊</span>
            </div>
            <Template_Md />

            <div className="content_Template">
            <Template_Md />
            </div>
        </div>
    </div>
    </body>
    );
}

