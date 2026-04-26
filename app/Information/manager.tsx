"use client";

import { useState } from "react";
import "../Information/css/information_manager.css";

/**
 * ManagerView component for the administration dashboard.
 * Handles the UI for managing Major, Middle, and Minor categories.
 */
export default function ManagerView() {
    const [majorItem, setMajorItem] = useState<string>("");
    const [midItem, setMidItem] = useState<string>("");
    const [minorItem, setMinorItem] = useState<string>("");

    /**
     * Handles adding a new Major Category.
     */
    const addMajorCategory = () => {
        console.log("Add Major Category:", majorItem);
        // TODO: Implement API call for adding Major Category
    };
    
    /**
     * Handles adding a new Middle Category.
     */
    const addMidCategory = () => {
        console.log("Add Middle Category:", midItem);
        // TODO: Implement API call for adding Middle Category
    }; 
    
    /**
     * Handles adding a new Minor Category.
     */
    const addMinorCategory = () => {
        console.log("Add Minor Category:", minorItem);
        // TODO: Implement API call for adding Minor Category
    };

    return (
    <div className="manager-body">
    <div className="dashboard">
        <div className="category-section">
            <h2>大項類別管理</h2>
            <div className="input-group">
                <input type="text" id="majorInput" placeholder="輸入大項類別" value={majorItem} onChange={(e) => setMajorItem(e.target.value)} />
                <button className="addMajor" onClick={addMajorCategory}>新增大項目</button>
            </div>
            <div className="category-list" id="majorList"></div>
            <div className="deatail-container">
                <h2>已存在類</h2>
                <div className="input-group">
                    <input type="text" id="minorInput" placeholder="查詢類別"/>

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
                <input type="text" id="midInput" placeholder="輸入中項類別" value={midItem} onChange={(e) => setMidItem(e.target.value)} />
                <button className="addMajor" onClick={addMidCategory}>新增中項目</button>

            </div>
            <div className="category-list" id="midList"></div>







            <div className="deatail-container">
                <h2>已存在類</h2>
        
                <div className="input-group">
                    <input type="text" id="minorInput" placeholder="查詢類別"/>

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
                    <input type="text" id="minorInput" placeholder="查詢類別"/>

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
                <input type="text" id="minorInputItem" placeholder="輸入小項類別" value={minorItem} onChange={(e) => setMinorItem(e.target.value)} />
                <button className="addMajor" onClick={addMinorCategory}>新增小項目</button>

            </div>
            <div className="category-list" id="midList"></div>

            <div className="deatail-container">
                <h2>已存在類</h2>
        
                <div className="input-group">
                    <input type="text" id="minorInput" placeholder="查詢類別"/>

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
                    <input type="text" id="minorInput" placeholder="查詢類別"/>

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
    );
}