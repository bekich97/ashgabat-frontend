import React, { useState, useEffect } from 'react';
import PostCard from "../components/PostCard";
import { useParams } from 'react-router-dom';
import PostDate from '../components/PostDate';
import PostService from '../services/PostService';
import ContentLoader from 'react-content-loader';
import { BACKEND_HOST } from '../consts';
import { langs } from '../langs/langs';
import { useSelector } from 'react-redux';
import PostCardPlaceholder from "../components/PostCardPlaceholder";
import * as Icon from "react-bootstrap-icons";

export default function Post() {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [tenLoading, setTenLoading] = useState(true);
    const [tenPosts, setTenPosts] = useState([]);
    let params = useParams();
    const id = params.id;
    const lang = useSelector((state) => state.mainSlice.lang);
    document.title = langs["News"][lang] + " - " + langs["Ashgabat city municipality"][lang];

    useEffect(() => {
        PostService.getPostById(id).then((res) => {
            setPost(res.data);
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);
    useEffect(() => {
        PostService.getTenPosts()
        .then((res) => {
            setTenPosts(res.data);
        })
        .finally(() => {
            setTenLoading(false);
        });
    }, []);
  return (
    <div className='post-page page-wrapper container shadowly-border'>
        <div className='page-title-wrapper'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <span>{langs["Home"][lang]} / {langs["News"][lang]} / { loading ? "..." : (lang === 'en' ? post.name_en : lang === 'ru' ? post.name_ru : post.name_tm)}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='row'>
                {
                    loading ?
                    <div className='col-md-8 col-sm-12 content-wrapper'>
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
                    <div className='col-md-8 col-sm-12 post-left content-wrapper'>
                        <h4>{ lang === 'en' ? post.name_en : lang === 'ru' ? post.name_ru : post.name_tm }</h4>
                        <div className='date-share-wrapper'>
                            <div className='lefter'>
                                <PostDate date={ post.pub_date } /> &nbsp;&nbsp;&nbsp;&nbsp;
                                <Icon.Eye /> {post.views}
                            </div>
                            <div className='btn share d-flex'>
                                {
                                    post.is_main ?
                                    <a href={BACKEND_HOST + "/rss/posts/main-posts/feed"} target="_blank" rel="noreferrer" className='rss-link'>
                                        <div className='one-social-btn'>
                                            <img src={require("./../assets/img/rss.png")} alt="RSS" style={{width: '22px', marginRight: '8px', marginTop: '-4px'}} />
                                            {langs["Main contents"][lang]}
                                        </div>
                                    </a>
                                    :
                                    <a href={BACKEND_HOST + "/rss/posts/latest-posts/feed"} target="_blank" rel="noreferrer" className='rss-link'>
                                        <div className='one-social-btn'>
                                            <img src={require("./../assets/img/rss.png")} alt="RSS" style={{width: '22px', marginRight: '8px', marginTop: '-4px'}} />
                                            {langs["News feed"][lang]}
                                        </div>
                                    </a>
                                }
                            </div>
                        </div>
                        <div className='img-wrapper d-flex w-100 justify-content-center'>
                            <img src={`${BACKEND_HOST}${post.image}`} alt="1" />
                        </div>
                        <div className='description-wrapper' dangerouslySetInnerHTML={{__html:(lang === 'en' ? post.description_en : lang === 'ru' ? post.description_ru : post.description_tm)}} />
                    </div>
                }
                <div className="col-md-4 on-desktop hide-on-mobile post-right">
                    <div className="row">
                        <div className="col-12">
                        <h4 className="mb-2">{langs["Others"][lang]}</h4>
                        </div>
                        {tenLoading ? (
                        <div>
                            <PostCardPlaceholder />
                            <PostCardPlaceholder />
                            <PostCardPlaceholder />
                            <PostCardPlaceholder />
                            <PostCardPlaceholder />
                        </div>
                        ) : (
                        tenPosts.map((post) => {
                            return <PostCard key={post.id} post={post} />;
                        })
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
