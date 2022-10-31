import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { langs } from '../langs/langs';
import { useSelector } from 'react-redux';

export default function NoticeCard({notice, isMain = true}) {
    const lang = useSelector(state => state.mainSlice.lang);
    const my_date = new Date(notice.pub_date);
    const months = [langs["Jan"][lang], langs["Feb"][lang], langs["Mar"][lang], langs["Apr"][lang], langs["May"][lang], langs["Jun"][lang], langs["Jul"][lang], langs["Aug"][lang], langs["Sep"][lang], langs["Oct"][lang], langs["Nov"][lang], langs["Dec"][lang]];
    const day = my_date.getDate();
    const navigate = useNavigate();
  return (
    <div className={(isMain ? 'col-md-6 isMain ' : 'col-md-12 ') + 'col-sm-12 notice-card-wrapper'}>
        <div className='notice-card' onClick={() => navigate('/notices/'+notice.id)}>
            <div className='left'>
                <span className='top'>
                    {day}
                </span>
                <span className='bottom'>{months[my_date.getMonth()]}</span>
            </div>
            <div className='right'>
                <Link to={'/notices/'+notice.id} className='underline-animation-on-hover post-title'>{lang === 'en' ? notice.title_en : lang === 'ru' ? notice.title_ru : notice.title_tm}</Link>
                {
                    isMain ? 
                    ""
                    :
                    <div className='description-wrapper' dangerouslySetInnerHTML={{__html:(lang === 'en' ? notice.content_en : lang === 'ru' ? notice.content_ru : notice.content_tm).slice(0, 400).concat('…')}} />
                }
            </div>
        </div>
    </div>
  )
}
