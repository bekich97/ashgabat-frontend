import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import noticeService from '../services/noticeService';
import { langs } from '../langs/langs';
import ReklamaV from '../components/ReklamaV';

export default function Notice() {

    const [notice, setNotice] = useState({});
    const params = useParams();
    const lang = useSelector((state) => state.mainSlice.lang);
    document.title = langs["Notices"][lang] + " - " + langs["Ashgabat city municipality"][lang];
    
    const my_date = new Date(notice.pub_date);
    const months = [langs["Jan"][lang], langs["Feb"][lang], langs["Mar"][lang], langs["Apr"][lang], langs["May"][lang], langs["Jun"][lang], langs["Jul"][lang], langs["Aug"][lang], langs["Sep"][lang], langs["Oct"][lang], langs["Nov"][lang], langs["Dec"][lang]];
    const day = my_date.getDate();
    const navigate = useNavigate();

    useEffect(() => {
        noticeService.getNotice(params.id).then((res) => {
          setNotice(res.data);
        });
    }, [params.id]);

  return (
    <div className='Notice page-wrapper container shadowly-border'>
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
                        <h4>{lang === 'en' ? notice.title_en : lang === 'ru' ? notice.title_ru : notice.title_tm}</h4>
                        <div className='notice-card' onClick={() => navigate('/notices/'+notice.id)}>
                            <div className='left'>
                                <span className='top'>
                                    {day ? day : ""}
                                </span>
                                <span className='bottom'>{months[my_date.getMonth()]}</span>
                            </div>
                            <div className='right'>
                              <div className='description-wrapper text-justify' dangerouslySetInnerHTML={{__html:(lang === 'en' ? notice.content_en : lang === 'ru' ? notice.content_ru : notice.content_tm)}} />
                            </div>
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
