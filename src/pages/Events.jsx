import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import EventService from '../services/EventService';
import { langs } from '../langs/langs';
import CategoryPostPlaceholder from './../components/CategoryPostPlaceholder';
import CategoryPost from './../components/CategoryPost';
import * as Icon from 'react-bootstrap-icons';

export default function Events() {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const lang = useSelector((state) => state.mainSlice.lang);
    document.title = langs["Events"][lang] + " - " + langs["Ashgabat city municipality"][lang];
    const [page, setPage] = useState(1);

    useEffect(() => {
        EventService.getEvents(page).then((res) => {
            setEvents(res.data)
        }).finally(() => {
            setLoading(false);
        });
    }, [page]);

    var rows = [];
    for (var i = 1; i <= Math.ceil(events.count / 10); i++) {
        rows.push(i);
    }

  return (
    <div className='category-posts page-wrapper container shadowly-border'>
        <div className='page-title-wrapper'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <span>{ langs["Home"][lang] } / {langs["Events"][lang]}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='page-body'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h4>{langs["Events"][lang]}</h4>
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
                        events.results.map(event => {
                            return <CategoryPost key={event.id} post={event} isEvent={true} />
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
                            <button className='btn-right' onClick={() => { page < Math.ceil(events.count / 10) ? setPage(page+1) : setPage(page) }}><Icon.ChevronRight /></button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
