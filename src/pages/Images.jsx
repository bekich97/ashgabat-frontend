import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ImageService from '../services/ImageService';
import { BACKEND_HOST } from "../consts";
import { langs } from '../langs/langs';
import ImageViewer from 'react-simple-image-viewer';
import ReklamaV from '../components/ReklamaV';
import { Helmet } from 'react-helmet';

export default function Images() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [thumbs, setThumbs] = useState([]);
    const [imgs, setImgs] = useState([]);
    const lang = useSelector((state) => state.mainSlice.lang);
    // document.title = langs["Images"][lang] + " - " + langs["Ashgabat city municipality"][lang];

    useEffect(() => {
        ImageService.getImageCategories().then((res) => {
            setCategories(res.data);
        });
        ImageService.getCategoryImages(selectedCategory).then((res) => {
            let IMAGES = [];
            let THUMBS = [];
            for (var i=0; i<res.data.length; i++){
                IMAGES.push(BACKEND_HOST + res.data[i]["image"]);
                THUMBS.push(BACKEND_HOST + res.data[i]["thumb"]);
            }
            setImgs(IMAGES);
            setThumbs(THUMBS);
        });
    }, [selectedCategory]);

    useEffect(() => {
        ImageService.getMixImages().then((res) => {
            let IMAGES = [];
            let THUMBS = [];
            for (var i=0; i<res.data.length; i++){
                IMAGES.push(BACKEND_HOST + res.data[i]["image"]);
                THUMBS.push(BACKEND_HOST + res.data[i]["thumb"]);
            }
            setImgs(IMAGES);
            setThumbs(THUMBS);
          });
    }, []);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }, []);
    
      const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
      };

  return (
    <div className='Images page-wrapper container shadowly-border'>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{langs["Images"][lang] + " - " + langs["Ashgabat city municipality"][lang]}</title>
            <meta name="description" content={langs["Ashgabat city municipality"][lang]} />
            <link rel="canonical" href={window.location.href} />
        </Helmet>
        <div className='page-title-wrapper'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <span>{langs["Home"][lang]} / {langs["Images"][lang]}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='page-body'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-9 col-sm-12 mb-5'>
                            <h4>{langs["Images"][lang]}</h4>
                            <div className='links-wrapper'>
                                {
                                    categories.map(category => {
                                        return <button 
                                                    key={category.id} 
                                                    onClick={() => setSelectedCategory(category.id)} 
                                                    className={'app-btn ' + (category.id === selectedCategory ? 'green' : 'gray')}
                                                    >
                                                        {lang === 'en' ? category.name_en : lang === 'ru' ? category.name_ru : category.name_tm}
                                                    </button>
                                    })
                                }
                            </div>
                            <div className='images-wrapper gallery'>
                                <div className='container'>
                                    <div className='row'>
                                        {
                                            thumbs.map((image, index) => {
                                                return <div key={index} className='col-md-4 col-sm-12'>
                                                    <div className='bg-image' onClick={ () => openImageViewer(index) } style={{backgroundImage: `url(${(image)})`}}></div>
                                                </div>
                                            })
                                        }
                                        {isViewerOpen && (
                                            <ImageViewer
                                            src={ imgs }
                                            currentIndex={ currentImage }
                                            disableScroll={ false }
                                            closeOnClickOutside={ true }
                                            onClose={ closeImageViewer }
                                            />
                                        )}
                                    </div>
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
