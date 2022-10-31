import React from "react";
import ContentLoader from "react-content-loader";

const PostCardWithImgPlaceholder = () => {
  return (
    <ContentLoader
      height={380}
      width={"100%"}
      speed={2}
      backgroundColor={"#ccc"}
      foregroundColor={"#ddd"}
    >
      <rect x="0" y="0" rx="10" ry="10" width="100%" height="65%" className="imggg" />
      <rect x="0" y="70%" rx="6" ry="6" width="100%" height="20" />
      <rect x="0" y="76%" rx="6" ry="6" width="85%" height="20" />
      <rect x="0" y="82%" rx="6" ry="6" width="70%" height="20" />
      <rect x="0" y="93%" rx="6" ry="6" width="100" height="20" />
    </ContentLoader>
  );
};

export default PostCardWithImgPlaceholder;
