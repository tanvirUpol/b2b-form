/* eslint-disable no-prototype-builtins */
import { useState } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import csvtojson from 'csvtojson';

const JsonConverter = () => {
    
        const [files, setFiles] = useState(null);
        const [jsonFile, setJsonFile] = useState(null);
        const [jsonFile2, setJsonFile2] = useState(null);
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

            const file = files[0]
            setFiles(files)
            const extension = file.name.split('.').pop().toLowerCase();
        
    
            if (extension === 'csv') {
                const fileReader = new FileReader();
                fileReader.readAsText(file);
                fileReader.onload = () => {
                csvtojson()
                    .fromString(fileReader.result)
                    .then((json) => {

                        console.log(json[0]);

                        // eslint-disable-next-line no-prototype-builtins
                        if(json[0].hasOwnProperty('division')) {
                        
                            const updateData = json.map((data) => {
                                return { ...data, isPopuler: false };
                            });
        
                            const filteredJson = updateData.filter(data=>{
                                // console.log(data);
                                return data.division == "GROCERY";
                            })
                            //console.log('updateData: ', updateData);
                            // const filteredJson = updateData.filter(data => data.Name);
                            // // filter only name and image fields
                            // const finalJson = [];
                            // for (let i = 0; i < filteredJson.length; i++) {
                            //     const { Name, isPopuler } = filteredJson[i];
                            //     finalJson.push({ Name, isPopuler });
                            // }
                            setJsonFile(filteredJson);
                            }
                            else if(json[0].hasOwnProperty('MRP')){
                                setJsonFile2(json);
                            }else if(json[0].hasOwnProperty('Stock')){
                                setJsonFile3(json);
                            }else{
                                console.error("egula ki vai")
                            }
                        // console.log(jsonFile);
                        
                    });
                };
                
            }
            else if (extension === 'xls' || extension === 'xlsx') {
                const reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                let json;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                json = XLSX.utils.sheet_to_json(sheet);
                // eslint-disable-next-line no-prototype-builtins
                if(json[0].hasOwnProperty('division')) {
                        
                    const updateData = json.map((data) => {
                        return { ...data, isPopuler: false };
                    });

                    const filteredJson = updateData.filter(data=>{
                        // console.log(data);
                        return data.division == "GROCERY";
                    })
                    //console.log('updateData: ', updateData);
                    // const filteredJson = updateData.filter(data => data.Name);
                    // // filter only name and image fields
                    // const finalJson = [];
                    // for (let i = 0; i < filteredJson.length; i++) {
                    //     const { Name, isPopuler } = filteredJson[i];
                    //     finalJson.push({ Name, isPopuler });
                    // }
                    setJsonFile(filteredJson);
                    }
                    else if(json[0].hasOwnProperty('MRP')){
                        setJsonFile2(json);
                    }else if(json[0].hasOwnProperty('Stock')){
                        setJsonFile3(json);
                    }else{
                        console.error("egula ki vai")
                    }
                

                // const finalJson = [];
                // for (let i = 0; i < filteredJson.length; i++) {
                //     const { Name, isPopuler } = filteredJson[i];
                //     finalJson.push({ Name, isPopuler });
                // }
              
              
                }
                
            }
            else {
                setError(true)
                console.error('Unsupported file type.');
            }


        };
        
        const removeFile = ()=>{
            setFiles(null)
            setJsonFile(null)
            setError(false)
        }

        const handleSubmit = (event) =>{
            event.preventDefault();

            console.log("Uploaded JSON1",jsonFile);
            console.log("Uploaded JSON2",jsonFile2);
            console.log("Uploaded JSON3",jsonFile3);

            const newArray = [];

            jsonFile.forEach((item) => {
            //   const mrp = jsonFile2[index].MRP;
            //   const stock = jsonFile3[index].Stock;
              const mrp = jsonFile2.find((mrpItem) => mrpItem.ProductCode === item.code);
            //   const stock = jsonFile3[index].Stock;
            
            if(mrp){
                newArray.push({
                    code: item.code,
                    isPopuler: item.isPopuler,
                    mrp: mrp.MRP,
                  });
            }
              
            });
            console.log("loading...");
            console.log("new Array",newArray);
            console.log("Finished loading");
      
        }


  return (
    <div className="bg-white p-9 shadow text-center" >
            <h1 className="text-lg mb-8 font-bold" >Drag & Drop Files</h1>

            <form onSubmit={handleSubmit} >
                {files ?
                    <div className="uploadedFile flex justify-center items-center gap-5
                    ">
                        <h4>{files[0].name}</h4> 
                        <button className="bg-primaryRed text-white p-2 rounded" onClick={removeFile}>Remove</button>
                    </div>  : ""}
                    <label  id="drop-area"
                        className={`flex  bg-slate-100 rounded justify-center items-center file-input-with-drag-and-drop w-96 h-64 text-primaryRed ${highlight ? 'highlight' : ''}`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        name="fileUp">
                        <div className="" >Drag and drop files here or click to select files</div>
                        <input
                            type="file"
                            accept=".xlsx, .xls, .csv"
                            name="fileUp"
                            onChange={(e)=>{handleFileUpload(e.target.files);}}
                            hidden
                        />
                    </label>
                
                { error && <h3>Wrong file format!!</h3> }
                { jsonFile && jsonFile2  &&  <input type="submit" className="submit-btn bg-green-700 text-white p-2 rounded mt-5 cursor-pointer"  value="Submit" /> }
            </form>

    </div>
  )
}
export default JsonConverter