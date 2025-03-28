



const ManagerView=()=>{
return(
<div className="dashboard">
        <div className="category-section">
            <h1>大項類別管理</h1>
            <div className="input-group">
            <input
                type="text"
                id="minorInput"
                placeholder="輸入小項類別"
            />                  
                <button >新增項目視窗</button>
                <button >更新視窗</button>
                <button >刪除</button>
            </div>
            <div className="category-list" id="majorList"></div>
        </div>

        <div className="category-section">
            <h2>中項類別管理</h2>
            <div className="input-group">
                <select id="majorSelect"></select>
                <input
                type="text"
                id="minorInput"
                placeholder="輸入中項類別"
                />                   <button >新增項目視窗</button>
                <button >更新視窗</button>
                <button >刪除</button>

            </div>
            <div className="category-list" id="midList"></div>
        </div>

        <div className="category-section">
            <h3>小項類別管理</h3>
            <div className="input-group">
                <select id="midSelect"></select>
                <input
                type="text"
                id="minorInput"
                placeholder="輸入小項類別"
                />             
                <button>新增項目視窗</button>
                <button >更新視窗</button>
                <button >刪除</button>


            </div>
            <div className="category-list" id="minorList"></div>
        </div>
    </div>

);


};


export {ManagerView}