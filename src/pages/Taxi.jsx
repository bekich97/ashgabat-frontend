import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { langs } from "../langs/langs";
import StaticService from "../services/StaticService";
import ReklamaV from "../components/ReklamaV";

export default function Taxi() {
  const lang = useSelector((state) => state.mainSlice.lang);
  const [data, setData] = useState({});
  document.title = langs["Online taxi"][lang] + " - " + langs["Ashgabat city municipality"][lang];
  useEffect(() => {
    StaticService.getStatic('taxi').then((res) => {
        setData(res.data);
    });
  }, []);
  return (
    <div className="About page-wrapper container shadowly-border">
      <div className="page-title-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <span>
                {langs["Home"][lang]} / {langs["Online taxi"][lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-12">
              <div dangerouslySetInnerHTML={{__html:(lang === 'en' ? data.content_one_en : lang === 'ru' ? data.content_one_ru : data.content_one_tm)}} />
              <div style={{margin: '50px 0'}}></div>
              <div dangerouslySetInnerHTML={{__html:(lang === 'en' ? data.content_two_en : lang === 'ru' ? data.content_two_ru : data.content_two_tm)}} />
            </div>
            <div className="col-md-3 col-sm-12">
              <div
                className="black-area"
                style={{
                  display: "contents",
                  width: "100%",
                  height: "900px",
                  backgroundColor: "rgba(0,0,0,.2)",
                }}
              >
                <ReklamaV />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
