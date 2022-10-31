import React from 'react';
import ContentLoader from 'react-content-loader';

const CategoryPostPlaceholder = () => {
    return (
        <div className='col-12 post-row'>
            <div className='row'>
                <div className='col-md-2'>
                    <ContentLoader
                        height={200}
                        width={"100%"}
                        speed={2}
                        backgroundColor={"#ccc"}    
                        foregroundColor={"#ddd"}
                        >
                        <rect x="0" y="0" rx="6" ry="6" width="120" height="30" />
                    </ContentLoader>
                </div>
                <div className='col-md-6'>
                    <ContentLoader
                        height={200}
                        width={"100%"}
                        speed={2}
                        backgroundColor={"#ccc"}    
                        foregroundColor={"#ddd"}
                        >
                        <rect x="0" y="0" rx="6" ry="6" width="100%" height="30" />
                        <rect x="0" y="35" rx="6" ry="6" width="80%" height="30" />
                        <rect x="0" y="80" rx="6" ry="6" width="100%" height="20" />
                        <rect x="0" y="105" rx="6" ry="6" width="100%" height="20" />
                        <rect x="0" y="130" rx="6" ry="6" width="100%" height="20" />
                        <rect x="0" y="155" rx="6" ry="6" width="100%" height="20" />
                    </ContentLoader>
                </div>
                <div className='col-md-4 d-flex justify-content-end'>
                    <ContentLoader
                        height={200}
                        width={"100%"}
                        speed={2}
                        backgroundColor={"#ccc"}    
                        foregroundColor={"#ddd"}
                        >
                        <rect x="100" y="0" rx="6" ry="6" width="300" height="190" />
                    </ContentLoader>
                </div> 
            </div>
        </div>
    );
}

export default CategoryPostPlaceholder;
