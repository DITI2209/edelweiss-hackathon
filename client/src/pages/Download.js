import React, { useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import './download.css';



const CSVDownloadButton = ({ data }) => {

   /*   for (let i = 0; i < data.length; i++) {
        delete data[i].Type;
        delete data[i].Underlying;
        delete data[i]["Packet Length"];
        delete data[i]["Sequence Number"];
        delete data[i]['Trading Symbol'];
      } */
   

    return(
      <div className='download'>
    <CSVLink data={data}>Download As CSV</CSVLink>
    </div>

    );

    }
export default CSVDownloadButton;
