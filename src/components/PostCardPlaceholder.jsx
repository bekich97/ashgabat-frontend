import React from 'react';
import ContentLoader from "react-content-loader";

export default function PostCardPlaceholder() {
  return (
    <div className='col-12 post-card'>
        <ContentLoader
        height={120}
        width={"100%"}
        speed={2}
        backgroundColor={"#ccc"}
        foregroundColor={"#ddd"}
        >
        <rect x="0" y="0" rx="6" ry="6" width="100%" height="20" />
        <rect x="0" y="23" rx="6" ry="6" width="90%" height="20" />
        <rect x="0" y="46" rx="6" ry="6" width="85%" height="20" />
        <rect x="0" y="84" rx="6" ry="6" width="120" height="20" />
        </ContentLoader>
    </div>
  )
}
