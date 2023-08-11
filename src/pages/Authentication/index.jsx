import React, { useState } from 'react';

import '../styles.css';
import NowNowLogo from "../../assets/images/nownow.png";
import { MakeApiRequest } from "../../api/MakeApiRequest";


function Authentication() {
  const [requestPayload, setRequestPayload] = useState({});

  const handleOnChangeEvent = (event) => setRequestPayload(prev => ({...prev, [event.target.name]: event.target.value}));

  const handleSubmit = async (requestType) => await MakeApiRequest.singleMapRequestApi(requestPayload, requestType);

  return(
    <div className={"single-map-main-section"}>
      <div className={"single-map-main-section-img-container"}>
        <img alt={"terminal_image"} src={NowNowLogo}/>
      </div>
      <div className={"single-map-main-section-form-flex"}>
        <div className='dashboard-content-search flex-input-form'>
          <input
            type='text'
            placeholder='Enter Terminal Serial'
            name={"terminalId"}
            className='dashboard-content-input'
            onChange={handleOnChangeEvent}
          />
        </div>
        <div className='dashboard-content-search flex-input-form'>
                <input
                  type='text'
                  placeholder='Enter msisdn'
                  name={"msisdn"}
                  className='dashboard-content-input'
                  onChange={handleOnChangeEvent}
                />
              </div>
      </div>
      <button
        className="dashbord-header-btn single-map-form-btn"
        type={"button"}
        onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Authentication;