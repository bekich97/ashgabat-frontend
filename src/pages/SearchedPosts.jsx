import React, { useState, useEffect } from 'react';
import PostService from '../services/PostService';
import CategoryPost from '../components/CategoryPost';
import CategoryPostPlaceholder from '../components/CategoryPostPlaceholder';
import { langs } from '../langs/langs';
import { useSelector } from 'react-redux';
import * as Icon from 'react-bootstrap-icons';

export default function SearchedPosts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const word = useSelector((state) => state.mainSlice.word);
    const lang = useSelector(state => state.mainSlice.lang);
    document.title = langs["Search"][lang] + " - " + langs["Ashgabat city municipality"][lang];
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        PostService.getSearchedPosts(word, page).then((res) => {
            setPosts(res.data);
        }).finally(() => {
            setLoading(false);
        });
    }, [word, page]);

    var rows = [];
    for (var i = 1; i <= Math.ceil(posts.count / 10); i++) {
        rows.push(i);
    }

  return (
    <div className='category-posts page-wrapper container shadowly-border'>
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
                        <h4>{word}</h4>
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
  )
}
