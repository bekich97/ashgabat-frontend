import React from 'react';
import { useState } from 'react';
import { langs } from "../langs/langs";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import StaticService from '../services/StaticService';
import ReklamaV from '../components/ReklamaV';

const VoucherDoc = () => {
    const [data, setData] = useState({});
    const lang = useSelector((state) => state.mainSlice.lang);
    document.title = langs["Application procedure"][lang] + " - " + langs["Ashgabat city municipality"][lang];
    
    useEffect(() => {
        StaticService.getStatic('voucher-procedure').then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <div className='VoucherDoc page-wrapper container shadowly-border'>
            <div className='page-title-wrapper'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <span>{langs["Home"][lang]} / {langs["Application"][lang]} / {langs["Application procedure"][lang]}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='page-body'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-9 col-sm-12'>
                            <div className='card-wrapper'>
                                <div className='card-top'>
                                    <div dangerouslySetInnerHTML={{__html:(lang === 'en' ? data.content_one_en : lang === 'ru' ? data.content_one_ru : data.content_one_tm)}} />
                                </div>
                                <div className='card-middle'>
                                <div dangerouslySetInnerHTML={{__html:(lang === 'en' ? data.content_two_en : lang === 'ru' ? data.content_two_ru : data.content_two_tm)}} />
                                </div>
                                <div className='card-bottom'>
                                    <div className='text-justify' dangerouslySetInnerHTML={{__html:(lang === 'en' ? data.content_three_en : lang === 'ru' ? data.content_three_ru : data.content_three_tm)}} />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-sm-12'>
                            <div style={{display: 'contents', width: '100%', height: '1200px', backgroundColor: 'rgba(0,0,0,.2)'}}>
                                <ReklamaV />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoucherDoc;
