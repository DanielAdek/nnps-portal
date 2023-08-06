import axios from 'axios';
import URL from './urls';

class ApiRequest {
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
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer a6846579-b60b-4944-936c-f6e1a93184a1"
          },
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
    for (const data of payload.length) {
      const requestPayload = {
        serial: data["TID*"],
        msisdn: data["MSISDN*"],
        entityId: data["ENTITY_ID*"],
        serviceType: 827
      };
      try {
        const result = await axios.post(URL.PROD_BASE_URL + "/qpos/map-terminal", requestPayload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer a6846579-b60b-4944-936c-f6e1a93184a1"
          },
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
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer a6846579-b60b-4944-936c-f6e1a93184a1"
        },
      });
      const { resultBody } = result.data;
      alert(JSON.stringify(resultBody));
    } catch (error) {
      alert(error)
    }
  }

  async searchTerminalRequestApi(payload) {
    try {
      const result = await axios.get(URL.PROD_BASE_URL + `/qpos/getTerminalDetailsByTerminalId/?terminalId=${payload}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer a6846579-b60b-4944-936c-f6e1a93184a1"
        },
      });
      return result.data;
    } catch (error) {
      alert(error)
    }
  }

  async changePtspRequestApi(payload) {
    try {
      const result = await axios.post(URL.PROD_BASE_URL + `/qpos/updatePtsp`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer a6846579-b60b-4944-936c-f6e1a93184a1"
        },
      });
      alert(JSON.stringify(result.data.resultBody));
      return result.data;
    } catch (error) {
      alert(error)
    }
  }

  async getPtspRequestApi(payload) {
    try {
      const result = await axios.get(URL.PROD_BASE_URL + `/qpos/getAllPtsp`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer a6846579-b60b-4944-936c-f6e1a93184a1"
        },
      });
      return result.data;
    } catch (error) {
      alert(error)
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

export const MakeApiRequest = new ApiRequest();