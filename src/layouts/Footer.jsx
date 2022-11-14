import React from 'react';
import { useState, useEffect } from "react";
import PostService from "../services/PostService";  
import { useSelector } from 'react-redux';
import { langs } from '../langs/langs';
import { Link } from 'react-router-dom';
import { BACKEND_HOST } from '../consts';
import * as Icon from 'react-bootstrap-icons';

export default function Footer() {
    const [categories, setCategories] = useState([]);
    const today = new Date();
    const lang = useSelector((state) => state.mainSlice.lang)

    useEffect(() => {
        PostService.getCategories().then((res) => {
          setCategories(res.data);
        });
      }, []);
  return (
    <div className='footer'>
        <div className='green-part'>
            <div className='top-part d-none'>
                <div className='container h-100'>
                    <div className='row h-100'>
                        <div className='col-md-5 col-sm-12 left'>
                            <div className='top-text'>
                                <h1>{langs["Mobile applications"][lang]}</h1>
                                <p>{langs["The application will become your indispensable assistant"][lang]}</p>
                            </div>
                            <div className='market-btns-wrapper'>
                                <a href="/"><img src={require("./../assets/img/download-android.png")} alt="Playstore" style={{width: "180px", marginRight: "10px"}} /></a>
                                <a href="/"><img src={require("./../assets/img/download-ios.png")} alt="Appstore" style={{width: "180px"}} /></a>
                            </div>
                        </div>
                        <div className='col-md-7 col-sm-12 right'>
                            <div className='imgs-wrapper'>
                                <img className='phones' src={require("./../assets/img/phones.png")} alt="Phone 1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-line d-none'></div>
            <div className='bottom-part bg-green'>
                <div className='container bg-green' style={{paddingTop: '30px', paddingBottom: '30px'}}>
                    <div className='row'>
                        <div className='col-md-4 col-12 left' style={{paddingLeft: '50px'}}>
                            <div className='footer-gerb-wrapper' style={{width: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <img src={require("./../assets/img/logo.png")} alt="Aşgabat şäher häkimligi" />
                                <h4 style={{width: 'fit-content'}}>{langs["Ashgabat city municipality"][lang]}</h4>
                            </div>
                        </div>
                        <div className='col-md-8 col-12 right'>
                            <div className='row'>
                                <div className='col-md-4 col-sm-6 col-xs-12'>
                                    <h6>{langs["Pages"][lang]}</h6>
                                    <ul>
                                        <li><Link to="/">{langs["Main contents"][lang]}</Link></li>
                                        <li><Link to='/posts/cat/0'>{ lang === 'en' ? "All news" : lang === 'ru' ? "Все новости" : "Ähli habarlar" }</Link></li>
                                        <li><Link to='/voucher'>{langs["Electronic Application"][lang]}</Link></li>
                                        <li><Link to="/taxi">{langs["Online taxi"][lang]}</Link></li>
                                        <li><Link to="/duralga">{langs["Stop"][lang]}</Link></li>
                                        <li><Link to="/about">{langs["Contacts"][lang]}</Link></li>
                                    </ul>
                                </div>
                                <div className='col-md-4 col-sm-6 col-xs-12'>
                                    <h6>{langs["News"][lang]}</h6>
                                    <ul>
                                        {
                                            categories.map(category => {
                                            return <li key={category.id}><Link to={`/posts/cat/${category.id}`}>{ lang === 'en' ? category.name_en : lang === 'ru' ? category.name_ru : category.name_tm }</Link></li>
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className='col-md-4 col-sm-6 col-xs-12'>
                                    <h6>{langs["Others"][lang]}</h6>
                                    <ul>
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
                                    </ul>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div className='white-part'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 py-2'>
                        <p className='mb-0 text-center'>
                            <a href={BACKEND_HOST + "/rss/posts/latest-posts/feed"} target="_blank" rel="noreferrer">
                                {/* <img src={require("./../assets/img/rss.png")} alt="RSS" style={{width: '22px', marginRight: '10px', marginTop: '-4px'}} /> */}
                                <Icon.Rss style={{color: 'black', fontSize: '18px', marginRight: '5px'}} />
                            </a>
                            &copy; {today.getFullYear()} {langs["All rights reserved"][lang]}
                            {/* &nbsp;&nbsp;<a style={{textDecoration: 'none'}} href={require("./../assets/img/privacy.pdf")} target="_blank" rel="noreferrer">{langs["Privacy Policy"][lang]}</a> */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
