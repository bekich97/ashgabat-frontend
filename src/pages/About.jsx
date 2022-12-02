import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { YMaps, Map } from "react-yandex-maps";
import { langs } from "../langs/langs";
import InformationService from "../services/InformationService";
import ReklamaV from "../components/ReklamaV";
import { Helmet } from "react-helmet";

export default function About() {
  const lang = useSelector((state) => state.mainSlice.lang);
  // document.title = langs["About us"][lang] + " - " + langs["Ashgabat city municipality"][lang];
  const [info, setInfo] = useState({});
  useEffect(() => {
    InformationService.getInformations().then((res) => {
      setInfo(res.data);
    });
  }, []);
  return (
    <div className="About page-wrapper container shadowly-border">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{langs["About us"][lang] + " - " + langs["Ashgabat city municipality"][lang]}</title>
        <meta name="description" content={langs["Ashgabat city municipality"][lang]} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div className="page-title-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <span>
                {langs["Home"][lang]} / {langs["Our address"][lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-12">
              <h4>{langs["Our address"][lang]}</h4>
              <h6>{langs["Ashgabat city municipality"][lang]}</h6>
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <span className="title">{langs["Telephone"][lang]}</span>
                  <span>
                    {info.contact_phone_one} <br /> {info.contact_phone_two}
                  </span>
                </div>
                <div className="col-md-4 col-sm-6">
                  <span className="title">{langs["E-mail"][lang]}</span>
                  <span>{info.contact_email}</span>
                </div>
                <div className="col-md-4 col-sm-6">
                  <span className="title">{langs["Address"][lang]}</span>
                  <span>{lang === 'en' ? info.contact_address_en : lang === 'ru' ? info.contact_address_ru : info.contact_address_tm}</span>
                </div>
              </div>
              <div className="map-wrapper">
                <YMaps>
                  <Map
                    width={"100%"}
                    height={"500px"}
                    defaultState={{ center: [37.95, 58.3833], zoom: 9 }}
                  />
                </YMaps>
              </div>
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
