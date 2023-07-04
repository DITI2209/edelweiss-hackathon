import React, { useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";




const CSVDownloadButton = ({ data }) => {
   

    return(
    <CSVLink data={data}>Download me</CSVLink>
    );

    }
export default CSVDownloadButton;
