import React from 'react';
import { BACKEND_HOST } from '../consts';
import PostDate from '../components/PostDate';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryPost = ({ post, isEvent = false }) => {
    const lang = useSelector(state => state.mainSlice.lang);
    const navigate = useNavigate();
    return (
        <div className='col-12 post-row'>
            <div className='row'>
                <div className='col-md-2'>
                    <PostDate date={post.pub_date} />
                </div>
                <div className='col-md-6 cursor-pointer' onClick={() => navigate( isEvent ? '/events/'+post.id : '/posts/'+post.id)}>
                    <Link to="/" className='underline-animation-on-hover'>{lang === 'en' ? post.name_en : lang === 'ru' ? post.name_ru : post.name_tm}</Link>
                    <div className='content-wrapper'>
                        <div className='content' dangerouslySetInnerHTML={{__html:(lang === 'en' ? post.description_en : lang === 'ru' ? post.description_ru : post.description_tm)}} />
                        <div className='gradient'></div>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-end'>
                    <div className='img-wrapper cursor-pointer' onClick={() => navigate( isEvent ? '/events/'+post.id : '/posts/'+post.id)}>
                        <img src={`${BACKEND_HOST}${post.image}`} alt="1" />
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default CategoryPost;
