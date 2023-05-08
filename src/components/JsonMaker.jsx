/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import { useState } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import csvtojson from 'csvtojson';

const JsonMaker = () => {
    const [files, setFiles] = useState(null);
    const [jsonFile, setJsonFile] = useState(null);
    const [jsonFile2, setJsonFile2] = useState(null);
    const [name, setName] = useState("");
    const [name2, setName2] = useState("");
    const [jsonFile3, setJsonFile3] = useState(null);
    const [error, setError] = useState(null);
    const [highlight, setHighlight] = useState(false);

    // Handle drag events
    const handleDragEnter = (event) => {
        event.preventDefault();
        setHighlight(true);
    };
    
    const handleDragOver = (event) => {
    event.preventDefault();
    setHighlight(true);
    };

    const handleDragLeave = (event) => {
    event.preventDefault();
    setHighlight(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setHighlight(false);
        const newFiles = [...event.dataTransfer.files];
        setFiles(newFiles);
        handleFileUpload(newFiles);
    };


    const handleFileUpload =  (files) => {
        console.log("file upload");

        const file = files[0]
        setFiles(files)
        const extension = file.name.split('.').pop().toLowerCase();
    

        if (extension === 'csv') {
            setError(false)
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = () => {
            csvtojson()
                .fromString(fileReader.result)
                .then((json) => {

                    const result = json.map(obj =>
                        Object.keys(obj).reduce((acc, key) => {
                          const newKey = key.trim().replace(/\s+/g, '_');
                          acc[newKey] = obj[key];
                          return acc;
                        }, {})
                      );
                    
                      console.log(result);
                    
                    // eslint-disable-next-line no-prototype-builtins
                    if(result[0].hasOwnProperty('Description')) {
                        setName( files[0].name)
                        console.log("File paise");
        
                        const words = ["Rice","Sugar", "Chini", "Oil","Badam", "Dal","Seed","Chola","Beson"]
                        console.log("loading..");                  
                        const searchData = result.filter((data) => {
                            if (data. Description){
                                if(words.some(word => data.Description.includes(word))){
                                    return data;
                                }
                            }
                        });
        
                        const updateData = searchData.map((data) => {
                            return { ...data, isPopuler: false };
                        });
        
                        console.log("Done");
                        console.log(updateData);
        
        
                        setJsonFile(updateData);
                        }
                        else if(result[0].hasOwnProperty('Total_Value')){
                            setName2( files[0].name)
                            setJsonFile2(result);
                        }else if(result[0].hasOwnProperty('Stock')){
                            setJsonFile3(result);
                        }else{
                            console.error("wrong xlsx")
                        }
  
                    
                });
            };
            
        }
        else if (extension === 'xls' || extension === 'xlsx') {
            setError(false)
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            let json;
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            console.log(sheetName);
            const sheet = workbook.Sheets[sheetName];
            json = XLSX.utils.sheet_to_json(sheet);
            

            const result = json.map(obj =>
                Object.keys(obj).reduce((acc, key) => {
                  const newKey = key.trim().replace(/\s+/g, '_');
                  acc[newKey] = obj[key];
                  return acc;
                }, {})
              );
            
              console.log(result);
            
            // eslint-disable-next-line no-prototype-builtins
            if(result[0].hasOwnProperty('Description')) {
                setName( files[0].name)
                const words = ["Rice","Sugar", "Chini", "Oil","Badam", "Dal","Seed","Chola","Beson"]
                console.log("loading..");                  
                const searchData = result.filter((data) => {
                    if (data. Description){
                        if(words.some(word => data.Description.includes(word))){
                            return data;
                        }
                    }
                });

                const updateData = searchData.map((data) => {
                    return { ...data, isPopuler: false };
                });

                console.log("Done");
                console.log(updateData);


                setJsonFile(updateData);
                }
                else if(result[0].hasOwnProperty('Total_Value')){
                    setName2( files[0].name)
                    setJsonFile2(result);
                }else if(result[0].hasOwnProperty('Stock')){
                    setJsonFile3(result);
                }else{
                    console.error("wrong xlsx")
                }

          
            }
            
        }
        else {
            setError(true)
            console.error('Unsupported file type.');
        }


    };
    
    const removeFile = (file)=>{

        if(file == 1){
            setJsonFile(null)
        }

        if(file == 2){
            setJsonFile2(null)
        }

        setFiles(null)
        setError(false)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        console.log("Uploaded JSON1",jsonFile);
        console.log("Uploaded JSON2",jsonFile2);
        // console.log("Uploaded JSON3",jsonFile3);

        const newArray = [];

        jsonFile.forEach((item) => {
      
          const mrp = jsonFile2.find((mrpItem) => mrpItem.ProductCode === item.code);

        if(mrp){
            newArray.push({
                id: item.ProductCode,
                isPopuler: item.isPopuler,
                name: item.Description,
                stock: item["DHK_Stock"],
                price:  mrp["Total_Value"] / mrp.Stock,
                category: item.Category_Level_1,
                image: ""
              });
            }
          
        });
        console.log("loading...");
        console.log("new Array",newArray);
        
    }


return (
<div className="bg-white p-9 shadow text-center" >
        <h1 className="text-lg mb-8 font-bold" >Upload Files</h1>

        <form onSubmit={handleSubmit} >
            <div className="flex justify-between items-center gap-6 " >
                {jsonFile ?
                    <div className="uploadedFile flex justify-center items-center gap-5 bg-slate-200 p-2 px-3 rounded-md
                    ">
                        <h4>{name}</h4> 
                        <button className="bg-primaryRed text-white p-2 rounded" onClick={()=>removeFile(1)}>Remove</button>
                    </div>  : ""    
                }

                {jsonFile2 ?
                    <div className="uploadedFile flex justify-center items-center gap-5 bg-slate-200 p-2 px-3 rounded-md
                    ">
                        <h4>{name2}</h4> 
                        <button className="bg-primaryRed text-white p-2 rounded" onClick={()=>removeFile(2)}>Remove</button>
                    </div>  : ""    
                }
            </div>
             
             { !(jsonFile && jsonFile2) &&   <label  id="drop-area"
                    className={`flex mt-4  bg-slate-100 rounded justify-center items-center file-input-with-drag-and-drop w-96 h-64 text-primaryRed ${highlight ? 'highlight' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    name="fileUp">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">XLX, XLSX, CSV</p>
                    </div>
                    <input
                        type="file"
                        accept=".xlsx, .xls, .csv, .xlsb"
                        name="fileUp"
                        onChange={(e)=>{handleFileUpload(e.target.files);}}
                        hidden
                    />
                </label>

            }
            
            { error && <h3>Wrong file format!!</h3> }
            { jsonFile && jsonFile2 &&  <input type="submit" className="submit-btn bg-green-700 px-5 text-white p-2 rounded mt-5 cursor-pointer"  value="Submit" /> }
        </form>

</div>
)
}
export default JsonMaker