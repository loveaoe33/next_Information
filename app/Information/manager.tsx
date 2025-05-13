
"use client";
import { useState } from "react";
import "../Information/css/information_manager.css"
export default function ManagerView(){
const [MajorItem,setMajor]=useState<string>("");
const [MidItem,setMid]=useState<string>("");
const [Minor,setMinor]=useState<string>("");
    const addMajorCategory=()=>{
       
    }
    
    
    const addMidCategory=()=>{
    
    
    } 
    
    const addMinorCategory=()=>{
    
    
    }

    const apiCallMethod=()=>{

    }
return(
    <div className="manager-body">
    <div className="dashboard">
        <div className="category-section">
            <h2>大項類別管理</h2>
            <div className="input-group">
                <input type="text" id="majorInput" placeholder="輸入大項類別"/>
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
                <input type="text" id="midInput" placeholder="輸入中項類別"/>
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
                <input type="text" id="midInput" placeholder="輸入小項類別"/>
                <button className="addMajor" onClick={addMidCategory}>新增小項目</button>

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