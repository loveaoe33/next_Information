"use client";
import Modal from "react-modal";
import "../css/information_manager.css";

// 修正拼寫為 ModalViewProps，並添加 children（可選）
interface LoginCheck {
    isClose: () => void;
    isOpen: boolean;
    account: String;
    jwtoken: String;
    title: string;
}

interface Category {
    add: () => void;
    delete: () => void;
    update: () => void;
    hide: () => void;
    show: () => void;
    toJSON: () => void;
}

class MajorCategory implements Category {
    private id: number | undefined | null;;
    private header: String | undefined | null;
    private kid_header: String | undefined | null;
    private tree_header: String | undefined | null;
    private hashcode: String | undefined | null;
    constructor(header: String) {
        this.header = header;
    }
    add = () => {

    }
    delete = () => {

    }
    update = () => {

    }
    hide = () => {

    }
    show = () => {

    }
    toJSON = () => {   //私有欄位的話要寫
        return {
            id: this.id,
            header: this.header,
            kid_header: this.kid_header,
            tree_header: this.tree_header,
            hashcode: this.hashcode,
        }

    }

}

class MidCategory implements Category {
    private id: number | undefined | null;;
    private header: String | undefined | null;
    private kid_header: String | undefined | null;
    private tree_header: String | undefined | null;
    private hashcode: String | undefined | null;
    
    constructor(){

    }
    add = () => {

    }
    delete = () => {

    }
    update = () => {

    }
    hide = () => {

    }
    show = () => {

    }
    toJSON = () => {   //私有欄位的話要寫

    }
}


class MinorCategory implements Category {
    private id: number | undefined | null;;
    private header: String | undefined | null;
    private kid_header: String | undefined | null;
    private tree_header: String | undefined | null;
    private hashcode: String | undefined | null;

    constructor(){

    }
    add = () => {

    }
    delete = () => {

    }
    update = () => {

    }
    hide = () => {

    }
    show = () => {

    }
    toJSON = () => {   //私有欄位的話要寫
   return {

   }
    }
}



const modalView = ({ isClose, isOpen, title, account, jwtoken }: LoginCheck) => {
    const addMajorCategory = () => {

    }


    const addMidCategory = () => {


    }

    const addMinorCategory = () => {


    }

    const apiCallMethod = () => {

    }
    return (<Modal
        isOpen={isOpen}
        onRequestClose={isClose}
        contentLabel={title}
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
        <div className="manager-body">
            <div className="dashboard">
                <div className="category-section">
                    <h2>大項類別管理</h2>
                    <div className="input-group">
                        <input type="text" id="majorInput" placeholder="輸入大項類別" />
                        <button className="addMajor" onClick={addMajorCategory}>新增項目視窗</button>
                    </div>
                    <div className="category-list" id="majorList"></div>
                    <div className="deatail-container">
                        <h2>已存在類</h2>
                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>

                        <ul id="categoryList">
                            <li className="category-item">
                                <span className="category-name">類項 1</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-hide-btn">👁️‍🗨️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>

                            <li className="category-item">
                                <span className="category-name">類項 2</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-hide-btn">👁️‍🗨️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="category-section">
                    <h2>中項類別管理</h2>
                    <div className="input-group">
                        <select id="majorSelect"></select>
                        <input type="text" id="midInput" placeholder="輸入中項類別" />
                        <button className="addMajor" onClick={addMidCategory}>新增項目視窗</button>

                    </div>
                    <div className="category-list" id="midList"></div>







                    <div className="deatail-container">
                        <h2>已存在類</h2>

                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>

                        <ul id="categoryList">
                            <li className="category-item">
                                <span className="category-name">類項 1</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-hide-btn">👁️‍🗨️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                            <li className="category-item">
                                <span className="category-name">類項 2</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-hide-btn">👁️‍🗨️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                        </ul>

                    </div>


                    <div className="deatail-container">
                        <h2>已隱藏類</h2>
                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>
                        <ul id="categoryList">
                            <li className="category-item">
                                <span className="category-name">類項 1</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-view-btn">👁️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                            <li className="category-item">
                                <span className="category-name">類項 2</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-view-btn">👁️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                        </ul>

                    </div>

                </div>
                <div className="category-section">
                    <h2>小項類別管理</h2>
                    <div className="input-group">
                        <select id="majorSelect"></select>
                        <input type="text" id="midInput" placeholder="輸入小項類別" />
                        <button className="addMajor" onClick={addMidCategory}>新增項目視窗</button>

                    </div>
                    <div className="category-list" id="midList"></div>

                    <div className="deatail-container">
                        <h2>已存在類</h2>

                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>

                        <ul id="categoryList">
                            <li className="category-item">
                                <span className="category-name">類項 1</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-hide-btn">👁️‍🗨️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                            <li className="category-item">
                                <span className="category-name">類項 2</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-hide-btn">👁️‍🗨️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                        </ul>

                    </div>


                    <div className="deatail-container">
                        <h2>已隱藏類</h2>
                        <div className="input-group">
                            <input type="text" id="minorInput" placeholder="查詢類別" />

                        </div>
                        <ul id="categoryList">
                            <li className="category-item">
                                <span className="category-name">類項 1</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-view-btn">👁️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                            <li className="category-item">
                                <span className="category-name">類項 2</span>
                                <div className="actions">
                                    <button className="category-toggle-modal-btn">📝</button>
                                    <button className="category-toggle-view-btn">👁️</button>
                                    <button className="category-delete-btn">🗑️</button>
                                </div>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>
        </div>
    </Modal>
    );


}


export default modalView;