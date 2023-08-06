import React from 'react';

import './styles.css';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';

export const Table = props => {
  const { listOfData } = props;

  return (
    <table>
      <thead>
        <th>TERMINAL SERIAL</th>
        <th>MSISDN</th>
        <th>Entity ID</th>
        <th>TERMINAL ID</th>
        <th>SERVICE TYPE</th>
        <th>MAP STATUS</th>
      </thead>
      {listOfData?.length !== 0 ?
        <tbody>
          {listOfData?.map((data, index) => (
            <tr key={index}>
              <td><span>{data.terminalId}</span></td>
              <td><span>{data.msisdn}</span></td>
              <td><span>{data.entityId}</span></td>
              <td><span>{data.c_terminalId}</span></td>
              <td><span>{data.serviceType}</span></td>
              <td>
                <div>
                  {data.success ?
                    <img
                      src={DoneIcon}
                      alt='paid-icon'
                      className='dashboard-content-icon' />
                    : <img
                        src={CancelIcon}
                        alt='canceled-icon'
                        className='dashboard-content-icon' />}
                  <span>{data.success}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        : null}
    </table>
  )
}