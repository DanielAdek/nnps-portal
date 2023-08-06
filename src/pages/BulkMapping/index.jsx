import React, { useState } from 'react';

import '../styles.css';
import { Table } from "../../components/table";
import { MakeApiRequest } from "../../api/MakeApiRequest";
import { convertXlsToJson } from '../../utils/xls_to_json';


function BulkMapping () {
  const [requestPayload, setRequestPayload] = useState(null);
  const [mappedTerminals, setMappedTerminals] = useState([]);
  const [uploadedFile, setUploadedFile] = useState("");
  const [inputValue, setInputValue] = useState({});

  const handleOnChangeEvent = (event) => setInputValue(prev => ({...prev, [event.target.name]: event.target.value}));

  const handleUploadChange = (event) => {
    const file = event.target.files[0];

    setUploadedFile(prev => prev = file);

    const reader = new FileReader();

    const rABS = !!reader.readAsBinaryString;  // !! converts object to boolean

    reader.onabort = () => console.log('file reading was aborted')

    reader.onerror = () => console.log('file reading has failed')

    reader.onload = (e) => {
      const binaryString = e.target.result;

      const formattedData = convertXlsToJson(binaryString, true);

      setRequestPayload(prev => prev = formattedData);
    }
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    if (!inputValue.mapType) return alert("Please choose map type");

    if (!requestPayload) return alert("Please provide a file to upload");

    let result;
    if (inputValue.mapType === 1) result = await MakeApiRequest.bulkMapRequestApi(requestPayload);

    else result = await MakeApiRequest.bulkMapRequestApi2(requestPayload);

    setMappedTerminals(prev => prev = result.mappedSuccess);
  }

  const acceptedFileTypes = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";
  return(
    <div className='dashboard-content'>
      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
          <h2>Bulk Mapping</h2>
          <div className='dashboard-content-search'>
            <select name={"mapType"} onChange={handleOnChangeEvent} className='dashboard-content-input'>
              <option value={0}>Choose map type...</option>
              <option value={1}>Map Type 1</option>
              <option value={2}>Map To v2</option>
            </select>
          </div>
        </div>
        <div className='dashboard-content-search'>
          <input
            type='file'
            value={uploadedFile.originalname}
            placeholder='Choose Excel File..'
            className='dashboard-content-input'
            accept={acceptedFileTypes}
            onChange={handleUploadChange}
          />
        </div>
        <button onClick={handleSubmit} className="dashbord-header-btn">Upload</button>
      </div>
      <div className="dashboard-bulk-mapping-table-container">
        <Table listOfData={mappedTerminals} />
      </div>
    </div>
  )
}

export default BulkMapping;