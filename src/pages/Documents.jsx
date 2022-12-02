import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import FileService from '../services/FileService';
import { langs } from '../langs/langs';
import { BACKEND_HOST } from "../consts";
import Table from 'react-bootstrap/Table';
import * as Icon from 'react-bootstrap-icons';
import ReklamaV from '../components/ReklamaV';
import { Helmet } from 'react-helmet';

export default function Documents() {
    const [documents, setDocuments] = useState([]);
    const lang = useSelector((state) => state.mainSlice.lang);
    // document.title = langs["Information"][lang] + " - " + langs["Ashgabat city municipality"][lang];

    useEffect(() => {
        FileService.getFiles().then((res) => {
            setDocuments(res.data);
        });
    }, []);
  return (
    <div className='Documents page-wrapper container shadowly-border'>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{langs["Information"][lang] + " - " + langs["Ashgabat city municipality"][lang]}</title>
            <meta name="description" content={langs["Ashgabat city municipality"][lang]} />
            <link rel="canonical" href={window.location.href} />
        </Helmet>
        <div className='page-title-wrapper'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <span>{langs["Home"][lang]} / {langs["Information"][lang]}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='page-body'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-9 col-sm-12 mb-5'>
                            <h4>{langs["Information"][lang]}</h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th style={{width: "50px", textAlign: "center"}}>#</th>
                                    <th>{langs["Name"][lang]}</th>
                                    <th style={{width: "150px", textAlign: "center"}}>{langs["Actions"][lang]}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        documents.map((document, index) => {
                                            return <tr key={document.id}>
                                                        <td style={{textAlign: "center"}}>{index + 1}</td>
                                                        <td><a href={BACKEND_HOST + document.file} target="_blank" rel="noreferrer">{lang === 'en' ? document.name_en : lang === 'ru' ? document.name_ru : document.name_tm}</a></td>
                                                        <td><a href={BACKEND_HOST + document.file} style={{textAlign: "center"}}><Icon.Download /> &nbsp; {langs["Download"][lang]}</a></td>
                                                    </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
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
