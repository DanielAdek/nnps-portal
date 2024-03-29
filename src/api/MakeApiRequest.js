import axios from 'axios';
import md5 from "md5";
import swal from "sweetalert";
import URL from './urls';
import {apiProperties} from "../resources/api.properties";

class ApiRequest {
  async authenticate(payload) {
    try {
      let { username, password } = payload;
      password = md5(password + apiProperties.getEncryptSec)
      const result = await axios.post(URL.PROD_BASE_URL_AUTH + "/mfs-authorization/validate", {username, password, role: 1}, {
        headers: {
          Authorization: apiProperties.getBasicProp
        }
      });
      const data = result?.data;
      console.log(result.data);
      if (data.statusCode !== 100 || data.message?.toLowerCase() !== "success") {
        return swal(data.message);
      }
      localStorage.setItem("x-access", data?.object?.token);
      localStorage.setItem("user_name", data?.object?.userName);
      window.location.href = "/dashboard";
    } catch (e) {
      console.error(e);
      swal("An error as occurred!");
    }
  }
  async bulkMapRequestApi(payload) {
    const mappedSuccess = [], mappedFailed = [];
    const defaultData = {
      ptspId: "41",
      serviceType: "827",
      defaultConfig: "true"
    }
    const chunkSize = 2;

    for (let i = 0; i < payload.length; i += chunkSize) {

      const chunkData = payload.slice(i, i + chunkSize);

      const modifiedChunk = chunkData.map(terminal => ({
        ...defaultData,
        terminalId: terminal["TID*"],
        msisdn: terminal["MSISDN*"],
        entityId: terminal["ENTITY_ID*"],
        c_terminalId: terminal["CTID"],
        c_terminalId_2: terminal["CTID"]
      }));

      const requestPayload = { terminalMappingRequest: { mappingList: modifiedChunk } };

      try {
        const result = await axios.post(URL.PROD_BASE_URL + "/qpos/bulkMapping", requestPayload, {
          headers: this.getHeaders(),
        });
        const { resultBody } = result.data;
        for (const value of modifiedChunk) {
          for (const terminal in resultBody ) {
            if (value.terminalId === terminal) {
              mappedSuccess.push({ ...value, success: value.terminalId === terminal });
            }
          }
        }
      } catch (error) {
        mappedFailed.push(error)
      }
      await this.sleep(500);
    }
    return { mappedSuccess, mappedFailed };
  }

  async bulkMapRequestApi2(payload) {
    const mappedSuccess = [], mappedFailed = [];
    for (const data of payload) {
      const requestPayload = {
        serial: data["TID*"],
        msisdn: data["MSISDN*"],
        entityId: data["ENTITY_ID*"],
        serviceType: 827
      };
      try {
        const result = await axios.post(URL.PROD_BASE_URL + "/qpos/map-terminal", requestPayload, {
          headers: this.getHeaders(),
        });
        const { resultBody } = result.data;
        if (requestPayload.serial in resultBody) {
          mappedSuccess.push({ ...requestPayload, terminalId: requestPayload.serial, c_terminalId: resultBody.cTerminal, success: true });
        }
      } catch (error) {
        mappedFailed.push(error)
      }
      await this.sleep(500);
    }
    return { mappedSuccess, mappedFailed };
  }

  async singleMapRequestApi(payload, requestType) {
    const request_url = URL.PROD_BASE_URL + "/qpos/" + ( requestType === "v2" ? "map-terminal" : "bulkMapping");
    const requestPayload = requestType === "v1" ? {
      terminalMappingRequest: {
        mappingList: [{
          ptspId: "41",
          serviceType: "827",
          defaultConfig: "true",
          c_terminalId_2: payload.c_terminalId,
          c_terminalId: payload.c_terminalId,
          terminalId: payload.terminalId,
          msisdn: payload.msisdn,
          entityId: payload.entityId
        }]
      }
    } : {
      serial: payload.serial,
      msisdn: payload.msisdn,
      entityId: payload.entityId,
      serviceType: 827
    };
    try {
      const result = await axios.post(request_url, requestPayload, {
        headers: this.getHeaders(),
      });
      const { resultBody } = result.data;
      return JSON.stringify(resultBody);
    } catch (error) {
      alert(error)
    }
  }

  async searchTerminalRequestApi(payload) {
    try {
      const result = await axios.get(URL.PROD_BASE_URL + `/qpos/getTerminalDetailsByTerminalId/?terminalId=${payload}`,{
        headers: this.getHeaders(),
      });
      return result.data;
    } catch (error) {
      alert(error)
    }
  }

  async changePtspRequestApi(payload) {
    try {
      const result = await axios.post(URL.PROD_BASE_URL + `/qpos/updatePtsp`, payload, {
        headers: this.getHeaders(),
      });
      return JSON.stringify(result.data.resultBody);
    } catch (error) {
      alert(error)
    }
  }

  async remapTerminal(payload) {
    try {
      const requestPayload = {
        terminalMappingRequest: {
          mappingList: [{
            ptspId: "41",
            serviceType: "827",
            defaultConfig: "true",
            c_terminalId_2: payload.cterminalId,
            c_terminalId: payload.cterminalId,
            terminalId: payload.terminalId,
            msisdn: payload.msisdn,
            entityId: payload.entityId
          }]
        }
      }
      const result = await axios.post(URL.PROD_BASE_URL + `/qpos/bulkMapping`, requestPayload, {
        headers: this.getHeaders(),
      });
      return JSON.stringify(result.data.resultBody);
    } catch (error) {
      alert(error)
    }
  }

  // 8022250132, 9155001625, 9038326010
  async getPtspRequestApi() {
    try {
      const result = await axios.get(URL.PROD_BASE_URL + `/qpos/getAllPtsp`,{
        headers: this.getHeaders(),
      });
      return result.data;
    } catch (error) {
      alert(error)
    }
  }

  async resetKeyDownload(payload) {
    try {
      const requestPayload = {
        requestInfo: {
          isKeyUpdated: false,
          msisdn: payload.msisdn,
          requestCts: new Date().toISOString(),
          requestType: "TerminalData",
          serialId: payload.terminalId,
          terminalId: payload.terminalId,
          transactionInfo: {
            isRefunded: false,
            cardType: "EMV",
            isoRequest: {
              cardData: {
                cTerminalId: payload.cterminalId,
              }
            },
            resultCode: 0,
            vendoreResultCode: 0
          }
        }
      }
      const result = await axios.post(URL.PROD_BASE_URL + `/qpos/v1/getTerminalData`, requestPayload, {
        headers: this.getHeaders(),
      });
      await axios.post(URL.PROD_BASE_URL + `/qpos/confirmKeyUpdated`, requestPayload, {
        headers: this.getHeaders(),
      });
      return JSON.stringify(result.data.responseInfo.transactionInfo.resultDesc)
    } catch (error) {
      alert(error)
    }
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `bearer ${apiProperties.getBearerProp}`
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const MakeApiRequest = new ApiRequest();