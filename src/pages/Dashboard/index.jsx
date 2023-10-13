import React from 'react';
import { Chart } from 'react-google-charts';
import '../styles.css';
import telpo from "../../assets/images/telpo.webp";
import urovo from "../../assets/images/urovo2.png";
import others from "../../assets/images/orizon.webp";
import { Table } from "../../components/table";

export const data = [
  ["Task", "Hours per Day"],
  ["Active", 11],
  ["V2 Terminals", 2],
  ["v1 Terminals", 2],
  ["Others", 2],
  ["Key Download", 7],
];

export const options = {
  title: "POS DAILY ACTIVITIES",
};

export const dataBar = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const optionsBar = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};

const listOfData = [
  {
    c_terminalId: "2NNESRPZ",
    c_terminalId_2: "2NNESRPZ",
    entityId: 25000005290,
    msisdn: 7011118163,
    success: true,
    serviceType: 827,
    terminalId: "F280900P04501595"
  },
  {
    c_terminalId: "2NNESRPZ",
    c_terminalId_2: "2NNESRPZ",
    entityId: 25000005290,
    msisdn: 7011118163,
    success: false,
    serviceType: 827,
    terminalId: "F280900P04501595"
  },
  {
    c_terminalId: "2NNESRPZ",
    c_terminalId_2: "2NNESRPZ",
    entityId: 25000005290,
    msisdn: 7011118163,
    success: false,
    serviceType: 827,
    terminalId: "F280900P04501595"
  },
  {
    c_terminalId: "2NNESRPZ",
    c_terminalId_2: "2NNESRPZ",
    entityId: 25000005290,
    msisdn: 7011118163,
    serviceType: 827,
    success: true,
    terminalId: "F280900P04501595"
  },
  {
    c_terminalId: "2NNESRPZ",
    c_terminalId_2: "2NNESRPZ",
    entityId: 25000005290,
    msisdn: 7011118163,
    serviceType: 827,
    success: false,
    terminalId: "F280900P04501595"
  },
  {
    c_terminalId: "2NNESRPZ",
    c_terminalId_2: "2NNESRPZ",
    entityId: 25000005290,
    msisdn: 7011118163,
    serviceType: 827,
    success: true,
    terminalId: "F280900P04501595"
  },
  {
    c_terminalId: "2NNESRPZ",
    c_terminalId_2: "2NNESRPZ",
    entityId: 25000005290,
    msisdn: 7011118163,
    serviceType: 827,
    success: true,
    terminalId: "F280900P04501595"
  },
  {
    c_terminalId: "2NNESRPZ",
    c_terminalId_2: "2NNESRPZ",
    entityId: 25000005290,
    msisdn: 7011118163,
    serviceType: 827,
    success: true,
    terminalId: "F280900P04501595"
  },
]

const Dashboard = () => {
  return(
    <div className='dashboard-content'>
      <div className="dashboard-overview-card-container">
        <div className={"dashboard-overview-card"}>
          <img src={telpo} alt={"telpo"} />
          <h3>5,500 Telpo</h3>
        </div>
        <div className={"dashboard-overview-card"}>
          <img src={urovo} alt={"urovo"} />
          <h3>5,245 Urovo</h3>
        </div>
        <div className={"dashboard-overview-card"}>
          <img src={others} alt={"others"} />
          <h3>531 Others</h3>
        </div>
      </div>

      <div className={"dashboard-overview-chart-container"}>
        <div className={"dashboard-overview-chart-card"}>
          <Chart
            chartType="Bar"
            width="90%"
            height="400px"
            data={dataBar}
            options={optionsBar}
          />
        </div>
        <div className={"dashboard-overview-chart-card"}>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </div>

      <div className="dashboard-bulk-mapping-table-container">
        <Table listOfData={listOfData} />
      </div>
    </div>
  )
}

export default Dashboard;