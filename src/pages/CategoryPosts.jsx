import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../services/PostService';
import CategoryPost from '../components/CategoryPost';
import CategoryPostPlaceholder from '../components/CategoryPostPlaceholder';
import { langs } from '../langs/langs';
import { useSelector } from 'react-redux';
import * as Icon from 'react-bootstrap-icons';

export default function CategoryPosts() {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState({});
    const params = useParams();
    const lang = useSelector(state => state.mainSlice.lang);
    document.title = langs["News"][lang] + " - " + langs["Ashgabat city municipality"][lang];
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        PostService.getCategory(params.id).then((res) => {
            setCategory(res.data);
        });
        if(params.id === '0'){
            PostService.getAllPosts(page).then((res) => {
                setPosts(res.data);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            PostService.getCategoryPosts(params.id, page).then((res) => {
                setPosts(res.data);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [params.id, page]);

    var rows = [];
    for (var i = 1; i <= Math.ceil(posts.count / 10); i++) {
        rows.push(i);
    }

  return (
    <div className='category-posts page-wrapper shadowly-border container'>
        <div className='row'>
            <div className='col-12'>
                <div className='page-title-wrapper'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <span>{ langs["Home"][lang] } / {langs["News"][lang]}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='page-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <h4>{category.name_tm ? (lang === 'en' ? category.name_en : lang === 'ru' ? category.name_ru : category.name_tm) : langs["All news"][lang]}</h4>
                            </div>
                            {
                                loading ?
                                <div>
                                    <CategoryPostPlaceholder />
                                    <CategoryPostPlaceholder />
                                    <CategoryPostPlaceholder />
                                    <CategoryPostPlaceholder />
                                    <CategoryPostPlaceholder />
                                </div>
                                :
                                posts.results.map(post => {
                                    return <CategoryPost key={post.id} post={post} />
                                })
                            }
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='pagination'>
                                    <button className='btn-left' onClick={() => { page > 1 ? setPage(page-1) : setPage(page) }}><Icon.ChevronLeft /></button>
                                    {
                                        rows.map(row => {
                                            return <button key={row} onClick={() => setPage(row)} className={page === row ? "active" : ""} >{row}</button>
                                        })
                                    }
                                    <button className='btn-right' onClick={() => { page < Math.ceil(posts.count / 10) ? setPage(page+1) : setPage(page) }}><Icon.ChevronRight /></button>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
