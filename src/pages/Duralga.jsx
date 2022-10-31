import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { langs } from "../langs/langs";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InformationService from "../services/InformationService";

export default function Duralga() {
  const lang = useSelector((state) => state.mainSlice.lang);
  document.title = langs["Stop"][lang] + " - " + langs["Ashgabat city municipality"][lang];
  const [table, setTable] = useState('');
  useEffect(() => {
    InformationService.getInformations().then((res) => {
      setTable(res.data["duralga_table"]);
    });
  }, []);
  return (
    <div className="About page-wrapper container shadowly-border">
      <div className="page-title-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <span>
                {langs["Home"][lang]} / {langs["Stop"][lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container">
          <div className="row">
            <div className="col-12 duralga-page">
              <Tabs defaultActiveKey="table" className="mb-3">
                  <Tab eventKey="table" title={langs["Table"][lang]}>
                  <div className='table-holder' dangerouslySetInnerHTML={{__html:(table)}} />
                  </Tab>
                  <Tab eventKey="map" title={langs["Map"][lang]}>
                    <iframe src="http://duralga.gov.tm/" style={{width: '100%', height: '800px'}}></iframe>
                  </Tab>
                </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
