import React from 'react'
import { Link } from 'react-router-dom';
import PostDate from './PostDate';
import { useSelector } from "react-redux";

export default function PostCard({ post }) {
  const lang = useSelector(state => state.mainSlice.lang);
  const truncate = (str, n = 30) => {
    return str ? (str.length > n ? str.substr(0, n - 1) + "..." : str) : null;
  };
  return (
    <div className='col-12 post-card'>
        <div className='content-wrapper'>
            <Link to={`/posts/${post.id}`} className='underline-animation-on-hover post-title'>{truncate(lang === 'en' ? post.name_en : lang === 'ru' ? post.name_ru : post.name_tm, 70)}</Link>
            <PostDate date={post.pub_date} />
        </div>
    </div>
  )
}
