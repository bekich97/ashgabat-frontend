import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import noticeService from '../services/noticeService';
import { langs } from '../langs/langs';
import NoticeCard from '../components/NoticeCard';
import ReklamaV from '../components/ReklamaV';
import { Helmet } from 'react-helmet';

export default function Notices() {
    const [notices, setNotices] = useState([]);
    const lang = useSelector((state) => state.mainSlice.lang);
    // document.title = langs["Notices"][lang] + " - " + langs["Ashgabat city municipality"][lang];

    useEffect(() => {
        noticeService.getNotices().then((res) => {
            setNotices(res.data);
        });
    }, []);
  return (
    <div className='Notices page-wrapper container shadowly-border'>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{langs["Notices"][lang] + " - " + langs["Ashgabat city municipality"][lang]}</title>
            <meta name="description" content={langs["Ashgabat city municipality"][lang]} />
            <link rel="canonical" href={window.location.href} />
        </Helmet>
        <div className='page-title-wrapper'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <span>{langs["Home"][lang]} / {langs["Notices"][lang]}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='page-body'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-9 col-sm-12 mb-5'>
                        <h4>{langs["Notices"][lang]}</h4>
                        <div className='row-wrapper'>
                            {
                                notices.map(notice => {
                                    return <NoticeCard key={notice.id} notice={notice} isMain={false} />
                                })
                            }
                        </div>
                    </div>
                    <div className='col-md-3 col-sm-12'>
                        <div className='black-area' style={{display: 'contents', width: '100%', height: '900px', backgroundColor: 'rgba(0,0,0,.2)'}}>
                            <ReklamaV />
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
