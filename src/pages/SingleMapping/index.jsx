import React, { useState } from 'react';
import swal from "sweetalert";
import '../styles.css';
import terminal from "../../assets/images/urovo.webp";
import card from "../../assets/images/nncard.svg"
import { MakeApiRequest } from "../../api/MakeApiRequest";
import { Loading } from "../../components/loading";

function SingleMapping() {
  const [requestPayload, setRequestPayload] = useState({});
  const [taskInAction, setTaskInAction] = useState(false);

  const handleOnChangeEvent = (event) => setRequestPayload(prev => ({...prev, [event.target.name]: event.target.value}));

  const handleSubmit = async (requestType) => {
    setTaskInAction(true)
    const response = await MakeApiRequest.singleMapRequestApi(requestPayload, requestType);
    setTaskInAction(false)
    setTimeout(() => swal(response, "Operation is been processed!"), 500)
  }

  return(
    <div className='dashboard-content'>
      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
          <h2>Single Mapping</h2>
        </div>
      </div>
      <div className="dashboard-bulk-mapping-table-container">
        <div className={"single-map-main-section"}>
          <div className={"single-map-main-section-img-container"}>
            <img alt={"terminal_image"} src={terminal}/>
            <img alt={"card_image"} src={card}/>
          </div>
          <div className={"single-map-main-section-form"}>
            <h2>Map Terminal</h2>
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
            <div className={"single-map-main-section-form-flex"}>
              <div className='dashboard-content-search flex-input-form'>
                <input
                  type='text'
                  name={"entityId"}
                  placeholder='Enter Entity Id'
                  className='dashboard-content-input'
                  onChange={handleOnChangeEvent}
                />
              </div>
              <div className='dashboard-content-search flex-input-form'>
                <input
                  type='text'
                  name={"c_terminalId"}
                  placeholder='Enter Terminal ID'
                  className='dashboard-content-input'
                  onChange={handleOnChangeEvent}
                />
              </div>
            </div>
            <button
              className="dashbord-header-btn single-map-form-btn"
              type={"button"}
              onClick={() => handleSubmit("v1")}>Save</button>
            <h2>Profile Terminal</h2>
            <div className={"single-map-main-section-form-flex"}>
              <div className='dashboard-content-search flex-input-form'>
                <input
                  type='text'
                  name={"serial"}
                  placeholder='Enter Terminal Serial'
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
            <div className={"single-map-main-section-form-flex"}>
              <div className='dashboard-content-search flex-input-form'>
                <input
                  type='text'
                  name={"entityId"}
                  placeholder='Enter Entity Id'
                  className='dashboard-content-input'
                  onChange={handleOnChangeEvent}
                />
              </div>
                <button
                  style={{padding: "15px"}}
                  type={"button"}
                  onClick={() => handleSubmit("v2")}
                  className="dashbord-header-btn single-map-form-btn">Save</button>
            </div>
          </div>
        </div>
      </div>
      {taskInAction ? <Loading /> : null}
    </div>
  )
}

export default SingleMapping;