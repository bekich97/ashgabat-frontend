import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux'; 
import { BACKEND_HOST } from '../consts';
import VideoService from '../services/VideoService';
import { langs } from '../langs/langs';
import ReklamaV from '../components/ReklamaV';
import { Helmet } from 'react-helmet';

export default function Videos() {
    const [videos, setVideos] = useState([]);
    const lang = useSelector((state) => state.mainSlice.lang);
    // document.title = langs["Videos"][lang] + " - " + langs["Ashgabat city municipality"][lang];

    useEffect(() => {
        VideoService.getVideos().then((res) => {
            setVideos(res.data);
        });
    }, []);
  return (
    <div className='Videos page-wrapper container shadowly-border'>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{langs["Videos"][lang] + " - " + langs["Ashgabat city municipality"][lang]}</title>
            <meta name="description" content={langs["Ashgabat city municipality"][lang]} />
            <link rel="canonical" href={window.location.href} />
        </Helmet>
        <div className='page-title-wrapper'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <span>{langs["Home"][lang]} / {langs["Videos"][lang]}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='page-body'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-9 col-sm-12 mb-5'>
                        <h4>{langs["Videos"][lang]}</h4>
                        {
                            videos.map(video => {
                                return <video width="100%" key={video.id} height="auto" poster={BACKEND_HOST + video.poster} controls style={{marginBottom: '20px'}}>
                                        <source src={BACKEND_HOST + video.video} type="video/mp4" />
                                    </video>
                            })
                        }
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
