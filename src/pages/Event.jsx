import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import EventService from '../services/EventService';
import PostDate from '../components/PostDate';
import ContentLoader from 'react-content-loader';
import { BACKEND_HOST } from '../consts';
import { langs } from '../langs/langs';
import { useSelector } from 'react-redux';

export default function Event() {
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState({});
    const params = useParams();
    const lang = useSelector((state) => state.mainSlice.lang);
    document.title = langs["Events"][lang] + " - " + langs["Ashgabat city municipality"][lang];

    useEffect(() => {
        EventService.getEvent(params.id).then((res) => {
            setEvent(res.data);
        }).finally(() => {
            setLoading(false);
        })
    }, [params.id]);
  return (
    <div className='post-page page-wrapper container shadowly-border'>
        <div className='page-title-wrapper'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <span>{langs["Home"][lang]} / {langs["News"][lang]} / { loading ? "..." : (lang === 'en' ? event.name_en : lang === 'ru' ? event.name_ru : event.name_tm)}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='row'>
                {
                    loading ?
                    <div className='col-12 content-wrapper'>
                        <ContentLoader
                            height={1000}
                            width={"100%"}
                            speed={2}
                            backgroundColor={"#ccc"}    
                            foregroundColor={"#ddd"}
                            >
                            <rect x="0" y="0" rx="6" ry="6" width="100%" height="30" />
                            <rect x="0" y="35" rx="6" ry="6" width="70%" height="30" />
                            <rect x="0" y="90" rx="6" ry="6" width="100" height="20" />
                            <rect x="0" y="140" rx="6" ry="6" width="100%" height="600" />
                            <rect x="0" y="760" rx="6" ry="6" width="100%" height="20" />
                            <rect x="0" y="785" rx="6" ry="6" width="100%" height="20" />
                            <rect x="0" y="810" rx="6" ry="6" width="100%" height="20" />
                            <rect x="0" y="835" rx="6" ry="6" width="100%" height="20" />
                            <rect x="0" y="860" rx="6" ry="6" width="40%" height="20" />
                        </ContentLoader>
                    </div> 
                    :
                    <div className='col-12 content-wrapper'>
                        <h4>{ lang === 'en' ? event.name_en : lang === 'ru' ? event.name_ru : event.name_tm }</h4>
                        <div className='date-share-wrapper'>
                            <PostDate date={ event.pub_date } />
                        </div>
                        <div className='img-wrapper d-flex w-100 justify-content-center'>
                            <img src={`${BACKEND_HOST}${event.image}`} alt="1" />
                        </div>
                        <div className='description-wrapper' dangerouslySetInnerHTML={{__html:(lang === 'en' ? event.description_en : lang === 'ru' ? event.description_ru : event.description_tm)}} />
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
