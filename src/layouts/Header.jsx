import React from "react";
import { useOpenWeather } from "react-open-weather";
import * as Icon from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PostService from "../services/PostService";
import { useDispatch, useSelector } from "react-redux";
import { setLang, setWord as sWord } from "../stores/mainSlice";
import { langs } from "../langs/langs";
import yearName from "./../assets/img/year-name.png";
import logo from "./../assets/img/logo.png";
import InformationService from "../services/InformationService";

export default function Header() {
    const [today, setToday] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [word, setWord] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const lang = useSelector(state => state.mainSlice.lang);
    const [info, setInfo] = useState({});

    useEffect(() => {
      const timer = setInterval(() => {
        setToday(new Date());
      }, 1000);
      return () => {
        clearInterval(timer);
      }
    }, []);

    const getCurrentRoute = () => {
      let path = location.pathname;
      let id = params.id ? params.id.toString() : " ";
      return path.replace(id, ":id")
    }

    const handleSearch = () => {
      dispatch(sWord(word));
      navigate('/search');
    }

    useEffect(() => {
      PostService.getCategories().then((res) => {
        setCategories(res.data);
      });
      InformationService.getInformations().then((res) => {
        setInfo(res.data);
      });
    }, []);

    useEffect(() => {
      handleMenu(false);
    }, [location.pathname]);

  const { data, isLoading } = useOpenWeather({
    key: "39563f758f19ee87ab09027c896d0ae7",
    lat: "37.95",
    lon: "58.3833",
    lang: "en",
    unit: "metric",
  });

  const handleMenu = (b) => {
    setOpen(b);
  }
  return (
    <div className="header" id="header">
      <div className="header-top p-0 bg-green">
        <div className="container bg-green" style={{paddingTop: '5px', paddingBottom: '5px'}}>
          <div className="row align-items-center">
            <div className="col-md-4 col-sm-7 col-7">
              {isLoading ? 0 : data ? data.current.temperature.current : 0}{" "}
              &#176;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>{langs["Date"][lang]}: &nbsp;&nbsp; 
                {today.getHours() < 10 ? "0"+today.getHours() : today.getHours()}:
                {today.getMinutes() < 10 ? "0"+today.getMinutes() : today.getMinutes()}
                &nbsp;&nbsp;&nbsp;&nbsp; 
                {today.getDate() < 10 ? "0"+today.getDate() : today.getDate()}.
                {(today.getMonth()+1) < 10 ? "0"+(today.getMonth()+1) : (today.getMonth()+1)}.
                {today.getFullYear() < 10 ? "0"+today.getFullYear() : today.getFullYear()}
                </span>
            </div>
            <div className="col-md-4 col-sm-5 col-5 d-flex justify-content-md-center justify-content-sm-end justify-content-end">
              <span className="mx-3 mr-4 email-wrapper text-center">
                <Icon.EnvelopeFill /> &nbsp;&nbsp; {info.header_email}
              </span>
              <span className="mx-3 ml-4 tel-wrapper text-center">
                <Icon.TelephoneFill /> &nbsp;&nbsp; {info.header_phone}
              </span>
            </div>
            <div className="col-md-4 col-sm-6 text-end  hide-on-mobile">
              <button className="clear-btn my-dropdown-btn">
                <span>
                  <Icon.Globe /> &nbsp; { lang === 'tm' ? 'Tkm' : ( lang === 'ru' ? 'Рус' : ( lang === 'en' ? 'Eng' : 'Tkm')) } &nbsp;
                  <Icon.ChevronDown />
                </span>
                <div className="my-dropdown-content">
                  <div className="lang-options" onClick={() => dispatch(setLang('ru'))}>Русский</div>
                  <div className="lang-options" onClick={() => dispatch(setLang('tm'))}>Türkmen</div>
                  <div className="lang-options" onClick={() => dispatch(setLang('en'))}>English</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="header-middle">
        <div className="container">
          <div className="row d-flex align-items-center py-2">
            <div className="col-md-6 col-11 d-flex align-items-center cursor-pointer" onClick={() => navigate('/')}>
              <img
                src={logo}
                alt="Aşgabat şäher häkimligi"
                className="app-logo"
                style={{display: 'block', marginRight: '15px'}}
              />
              <span className="fw-bold logo-name">{langs["Ashgabat city municipality"][lang]}</span>
            </div>
            <div className="col-md-6 hide-on-mobile">
              <img
                src={yearName}
                alt="Year name"
                className="w-100"
              />
            </div>
            <div className="show-on-mobile col-1">
              <Icon.List className="menu-btn text-black" onClick={() => handleMenu(true)} />
            </div>
          </div>
        </div>
      </div>
      <div className={"header-bottom bg-green " + (open ? "menu-open" : "")}>
        <div className="container bg-green" style={{paddingLeft: '0'}}>
          <div className="row close-btn-wrapper">
            <div className="col-12 justify-content-end">
              <Icon.X className="menu-btn" onClick={() => handleMenu(false)} />
            </div>
          </div>
          <div className="row">
            <div className="col-10 show-on-mobile" style={{padding: "24px 26px"}}>
              <div className={"lang-options d-inline-block"+(lang === 'ru' ? " active-mobile-lang" : "")} style={{marginRight: "20px"}} onClick={() => dispatch(setLang('ru'))}>Ру</div>
              <div className={"lang-options d-inline-block"+(lang === 'tm' ? " active-mobile-lang" : "")} style={{marginRight: "20px"}} onClick={() => dispatch(setLang('tm'))}>Tm</div>
              <div className={"lang-options d-inline-block"+(lang === 'en' ? " active-mobile-lang" : "")} style={{marginRight: "20px"}} onClick={() => dispatch(setLang('en'))}>En</div>
            </div>
            <div className="col-md-8 col-12 left-part d-flex align-items-center">
              <ul className="header-menu outer-menu">
                <li className={getCurrentRoute() === "/" ? "active" : "" }>
                  <Link to='/'>{langs["Main contents"][lang]}</Link>
                </li>
                <li className={(getCurrentRoute() === "/posts/:id" || getCurrentRoute() === "/posts/cat/:id") ? "outer-li active" : "outer-li"}>
                  <span>{langs["News"][lang]}</span>
                  <ul className="inner-menu">
                    <div className="container bg-green">
                      <div className="row">
                        <div className="col-12">
                          <li>
                            <Link to='/posts/cat/0'>{ lang === 'en' ? "All news" : lang === 'ru' ? "Все новости" : "Ähli täzelikler" }</Link>
                          </li>
                          {
                            categories.map(category => {
                              return <li key={category.id}><Link to={`/posts/cat/${category.id}`}>{ lang === 'en' ? category.name_en : lang === 'ru' ? category.name_ru : category.name_tm }</Link></li>
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className={(getCurrentRoute() === "/voucher" || getCurrentRoute() === "/voucher-doc" || getCurrentRoute() === "/verify") ? "outer-li active" : "outer-li"}>
                  <span>{langs["Application"][lang]}</span>
                  <ul className="inner-menu">
                    <div className="container bg-green">
                      <div className="row">
                        <div className="col-12">
                          <li>
                            <Link to='/voucher-doc'>{langs["Application procedure"][lang]}</Link>
                          </li>
                          <li>
                            <Link to='/voucher'>{langs["Electronic Application"][lang]}</Link>
                          </li>
                          <li>
                            <Link to='/check-voucher'>{langs["Check voucher status"][lang]}</Link>
                          </li>
                        </div>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className={(getCurrentRoute() === "/documents" || getCurrentRoute() === "/images" || getCurrentRoute() === "/videos" || getCurrentRoute() === "/events" || getCurrentRoute() === "/notices") ? "outer-li active" : "outer-li"}>
                  <span>{langs["Others"][lang]}</span>
                  <ul className="inner-menu">
                    <div className="container bg-green">
                      <div className="row">
                        <div className="col-12">
                          <li>
                            <Link to='/documents'>{langs["Information"][lang]}</Link>
                          </li>
                          <li>
                            <Link to='/images'>{langs["Images"][lang]}</Link>
                          </li>
                          <li>
                            <Link to='/videos'>{langs["Videos"][lang]}</Link>
                          </li>
                          <li>
                            <Link to='/events'>{langs["Events"][lang]}</Link>
                          </li>
                          <li>
                            <Link to='/notices'>{langs["Notices"][lang]}</Link>
                          </li>
                          <li className="taxi-inner-others">
                            <Link to="/taxi">{langs["Online taxi"][lang]}</Link>
                          </li>
                          <li className="duralga-inner-others">
                            <Link to="/duralga">{langs["Stop"][lang]}</Link>
                          </li>
                        </div>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className={(getCurrentRoute() === "/taxi" ? "active" : "") + " taxi-outer-others"}>
                  <Link to="/taxi">{langs["Online taxi"][lang]}</Link>
                </li>
                <li className={(getCurrentRoute() === "/duralga" ? "active" : "") + " duralga-outer-others"}>
                  <Link to="/duralga">{langs["Stop"][lang]}</Link>
                </li>
                <li className={(getCurrentRoute() === "/about") ? "active" : ""}>
                  <Link to="/about">{langs["Contacts"][lang]}</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-12 right-part d-flex justify-content-end">
              <a className="digital-service-btn clear-btn d-block mr-5" style={{textDecoration: 'none'}} href="https://e.ashgabat.gov.tm/" target="_blank" rel="noreferrer">
                {langs["Digital service"][lang]}
              </a>
              <div className="mx-3"></div>
              <button className="clear-btn search-btn d-flex align-items-center">
                <Icon.Search /> &nbsp; {langs["Search"][lang]}
                <dir className="search-input">
                  <input type="text" placeholder={langs["Search"][lang]+"..."} onChange={(e) => setWord(e.target.value)} />
                  <span className="clear-btn" onClick={() => handleSearch()}>
                    <Icon.Search />
                  </span>
                </dir>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
