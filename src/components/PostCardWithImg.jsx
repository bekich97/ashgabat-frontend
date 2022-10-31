import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_HOST } from "../consts";
import PostDate from "./PostDate";
import { useSelector } from "react-redux";
import * as Icon from "react-bootstrap-icons";

export default function PostCardWithImg({ post }) {
  const lang = useSelector(state => state.mainSlice.lang);
  const navigate = useNavigate();
  const truncate = (str, n = 30) => {
    return str ? (str.length > n ? str.substr(0, n - 1) + "..." : str) : null;
  };
  return (
    <div className="col-md-4 col-sm-12 post-card-with-img">
      <div
          onClick={() => (navigate(`/posts/${post.id}`))}
          className="img-wrapper cursor-pointer"
          style={{ backgroundColor: "rgba(0,0,0,.05)" }}
        >
          <img
            src={BACKEND_HOST + post.thumb}
            alt="1"
            style={{ maxHeight: "100%", maxWidth: "100%", margin: "auto", width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      <div className="bottom">
        <Link to={`/posts/${post.id}`} className="underline-animation-on-hover post-title">
          {truncate(lang === 'en' ? post.name_en : lang === 'ru' ? post.name_ru : post.name_tm, 70)}
        </Link>
        <div className="footer-wrapper" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <PostDate date={post.pub_date} />
          <div style={{color: "#999999"}}>
            <Icon.Eye style={{margin: "0 0 0 30x"}} /> {post.views}
          </div>
        </div>
      </div>
    </div>
  );
}
