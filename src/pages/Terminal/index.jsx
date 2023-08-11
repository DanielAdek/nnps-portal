import React, { useState } from 'react';

import '../styles.css';
import telpo from "../../assets/images/telpo.webp";
import urovo from "../../assets/images/urovo2.png";
import terminalImg from "../../assets/images/orizon.webp";
import { MakeApiRequest } from "../../api/MakeApiRequest";


function Terminal() {
  const [search, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState({});
  const [terminal, setTerminal] = useState({});
  const [ptsps, setPtsp] = useState([])

  const handleOnChangeEvent = (event) => setInputValue(prev => ({...prev, [event.target.name]: event.target.value}));

  const handleSearchInputChange = (event) => setSearchValue(prev => prev = event.target.value);

  const handleSearch = async () => {
    if (!search) return alert("Please provide terminal to search...");
    const result = await MakeApiRequest.searchTerminalRequestApi(search);
    const allPtsp = await MakeApiRequest.getPtspRequestApi();
    setTerminal(result);
    setPtsp(allPtsp);
  }

  const handleUpdatePtsp = async () => {
    const payload = { ...inputValue, terminals: terminal.terminalId };
    await MakeApiRequest.changePtspRequestApi(payload);
  }

  const handleRemap = async () => {
    await MakeApiRequest.remapTerminal(terminal);
  }

  const handleResetKeyDownload = async () => MakeApiRequest.resetKeyDownload(terminal);

  const first3 = terminal?.terminalId?.substring(0, 3);

  return(
    <div className='dashboard-content'>
      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
          <h2>Terminal</h2>
          <div style={{ flexBasis: "fit-content"}}>
            <div className='dashboard-content-search'>
              <input
                type='search'
                value={search}
                placeholder='Enter Terminal Serial...'
                className='dashboard-content-input'
                onChange={handleSearchInputChange}
              />
            </div>
            <button
                style={{marginLeft: "20px"}}
                onClick={handleSearch}
                className="dashbord-header-btn">Search</button>
          </div>
        </div>
      </div>
      <div className="dashboard-bulk-mapping-table-container">
        <div className={"terminal-main-section"}>
          <div className={"terminal-img-container"}>
            { first3 === "F28" ? <img alt={"telpo_image"} src={telpo}/>
              : first3 === "982" ? <img alt={"urovo_image"} src={urovo}/> : <img alt={"terminal_image"} src={terminalImg}/>
            }
          </div>
          <div className={"terminal-details-section"}>
            <h2>Search Terminal Result</h2>
            <div>
              <div className={"terminal-detail"}>Terminal Serial: {terminal.terminalId}</div>
              <div className={"terminal-detail"}>Terminal ID: {terminal.cterminalId} </div>
              <div className={"terminal-detail"}>Msisdn: {terminal.msisdn}</div>
              <div className={"terminal-detail"}>Entity ID: {terminal.entityId}</div>
              <div className={"terminal-detail"}>Key Download: {terminal.keyUpdated ? "Yes" : terminal.keyUpdated === false ? "No" : null}
                { ptsps.length
                  ?
                    <span style={{marginLeft: "20px"}}>
                      <input type={"button"} value={"Reset"} onClick={handleResetKeyDownload} />
                    </span>
                  : null
                }
              </div>
              <div className={"terminal-detail"}>Service Type: {terminal.serviceType}</div>
              <div style={{display: "flex"}} className={"terminal-detail"}>
                Ptsp:
                { ptsps.length ?
                  <div>
                    <select onChange={handleOnChangeEvent} name={"ptspId"} className={"terminal-ptsp-select"}>
                      <option key={0} value={terminal?.mposPtsp?.id}>{terminal.mposPtsp?.ptsp}</option>
                      {
                        ptsps.map((data, index) => (
                          <option key={index + 1} value={data?.id}>{data?.ptsp}</option>
                        ))
                      }
                    </select>
                    <span><input type={"button"} value={"update"} onClick={handleUpdatePtsp} /></span>
                  </div> : null
                }
              </div>
              {
                ptsps.length ?
                <span>
                  <button type={"button"} style={{width: "100%", color: "orange"}} className={"dashbord-header-btn"} onClick={handleRemap}>Remap</button>
                </span>
                : null
              }
              {/*<div className={"terminal-detail"}>Last Updated: {new Date(terminal.modifiedDate).toString()}</div>*/}
              {/*<div className={"terminal-detail"}>Date Created: {new Date(terminal.insertDate).toString()}</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terminal;