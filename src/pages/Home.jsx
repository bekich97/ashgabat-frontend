import React from "react";
import PostCard from "../components/PostCard";
import PostCardWithImg from "../components/PostCardWithImg";
import * as Icon from "react-bootstrap-icons";
import NoticeCard from "../components/NoticeCard";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect, useCallback } from "react";
import PostService from "../services/PostService";
import PostCardWithImgPlaceholder from "../components/PostCardWithImgPlaceholder";
import PostCardPlaceholder from "../components/PostCardPlaceholder";
import LetterService from "../services/LetterService";
import ImageService from "../services/ImageService";
import { BACKEND_HOST } from "../consts";
import noticeService from "../services/noticeService";
import VideoService from '../services/VideoService';
import { Link } from "react-router-dom";
import { langs } from "../langs/langs";
import { useSelector } from "react-redux";
import ImageViewer from 'react-simple-image-viewer';
import ReklamaH from "../components/ReklamaH";

export default function Home() {
  const lang = useSelector(state => state.mainSlice.lang);
  document.title = langs["Home"][lang] + " - " + langs["Ashgabat city municipality"][lang];
  const [threeLoading, setThreeLoading] = useState(true);
  const [tenLoading, setTenLoading] = useState(true);
  const [threePosts, setThreePosts] = useState([]);
  const [tenPosts, setTenPosts] = useState([]);
  const [notices, setNotices] = useState([]);
  const [thumbs, setThumbs] = useState([]);
  const [pop, setPop] = useState("news");
  const [regions, setRegions] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    PostService.getThreePosts()
      .then((res) => {
        setThreePosts(res.data);
      })
      .finally(() => {
        setThreeLoading(false);
      });
    PostService.getTenPosts()
      .then((res) => {
        setTenPosts(res.data);
      })
      .finally(() => {
        setTenLoading(false);
      });

    noticeService.getNotices().then((res) => {
      setNotices(res.data);
    });

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

    LetterService.getRegions().then((res) => {
      setRegions(res.data);
    });

    VideoService.getVideos().then((res) => {
      setVideos(res.data);
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
    <div className="container page-main-container page-wrapper">
      <div className="row">
        <div
          className="col-md-9 col-sm-12 no-p"
          style={{ paddingRight: "30px" }}
        >
          <div className="row">
            {threeLoading ? (
              <div className="col-12">
                <div className="row">
                  <div className="col-md-4 col-sm-12 post-card-with-img">
                    <PostCardWithImgPlaceholder />
                  </div>
                  <div className="col-md-4 col-sm-12 post-card-with-img">
                    <PostCardWithImgPlaceholder />
                  </div>
                  <div className="col-md-4 col-sm-12 post-card-with-img">
                    <PostCardWithImgPlaceholder />
                  </div>
                </div>
              </div>
            ) : (
              threePosts.map((post) => {
                return <PostCardWithImg key={post.id} post={post} />;
              })
            )}
            <div className="col-12 pt-3 d-flex justify-content-end home-news-link">
              <h4 className="show-on-mobile">{langs["News"][lang]}</h4>
              <Link to="/posts/cat/0" className="all-link">
                {langs["All news"][lang]}
                <Icon.ChevronRight />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="home-adver-wrapper pt-3">
              <ReklamaH />
            </div>
          </div>
          <div className="row">
            <div className="col-12 section-header">
              <div className="bottom-borderly d-flex justify-content-between align-items-center">
                <h4 className="mb-0">{langs["Notices"][lang]}</h4>
                <Link to="/notices" className="all-link">
                  {langs['All notices'][lang]}
                  <Icon.ChevronRight />
                </Link>
              </div>
            </div>
            {notices.map((notice, index) => {
              if (index < 4) {
                return <NoticeCard key={notice.id} notice={notice} />;
              } else {
                return "";
              }
            })}
          </div>
          <div className="row home-gallery">
            <div className="col-12 position-relative">
              <div className="tab-wrapper">
                <Tabs defaultActiveKey="images" className="mb-3">
                  <Tab eventKey="images" title={langs["Gallery"][lang]}>
                  <div className='images-wrapper gallery'>
                      <div className='container'>
                          <div className='row'>
                              {
                                  thumbs.map((image, index) => {
                                      return <div key={index} className='col-4'>
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
                  </Tab>
                  <Tab eventKey="videos" title={langs["Video"][lang]}>
                    {
                      videos.map((video, index) => {
                        if (index === 0) {
                        return <video key={index} width="100%" height="auto" poster={BACKEND_HOST + video.poster} controls style={{marginBottom: '20px'}}>
                                <source src={BACKEND_HOST + video.video} type="video/mp4" />
                            </video>
                            } else {
                              return "";
                            }
                      })
                    }
                  </Tab>
                </Tabs>
              </div>
              <Link to="/images" className="all-link gallery-all-link pt-4">
                {langs["All gallery"][lang]}
                <Icon.ChevronRight />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 on-desktop hide-on-mobile">
          <div className="row">
            <div className="col-12">
              <h4 className="mb-4">{langs["News feed"][lang]}</h4>
            </div>
            {tenLoading ? (
              <div>
                <PostCardPlaceholder />
                <PostCardPlaceholder />
                <PostCardPlaceholder />
                <PostCardPlaceholder />
                <PostCardPlaceholder />
              </div>
            ) : (
              tenPosts.map((post) => {
                return <PostCard key={post.id} post={post} />;
              })
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 map-header">
          <div className="wrapper">
            <h4>{langs["Districts"][lang]}</h4>
          </div>
        </div>
        <div className="col-md-8">
          <div className="map-wrapper">
            <svg
              style={{width: '80%', height: 'auto', margin: 'auto', display: 'block'}}
              viewBox="0 0 868 759"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="etr"
                id="etr1"
                onMouseEnter={() => setPop("etr1")}
                onMouseLeave={() => setPop("news")}
                d="M615.299 267.587L246.138 47.0484C242.363 44.7929 237.468 46.5645 236.011 50.7139C235.589 51.9146 235.505 53.208 235.767 54.4533L241.27 80.5472L241.976 86.1851L243.195 92.2716L246.083 104.893L247.99 115.68C248.376 117.866 249.479 119.861 251.124 121.351L251.177 121.399C251.758 121.925 252.398 122.381 253.086 122.758L257.042 124.926C259.316 126.172 261.017 128.252 261.786 130.728L266.154 144.785C266.462 145.776 266.614 146.809 266.604 147.847L265.933 218.692C265.922 219.855 264.976 220.792 263.813 220.792C263.589 220.792 263.373 220.759 263.161 220.687C256.383 218.388 241.196 210.925 235.46 207.183C234.789 206.746 234.206 206.196 233.689 205.585L216.066 184.777C215.459 184.06 214.973 183.253 214.507 182.437C211.359 176.934 203.91 171.113 201.546 169.665L177.741 156.601C177.268 156.341 176.779 156.12 176.269 155.946C166.885 152.734 151.493 149.412 141.418 147.644C140.859 147.546 140.294 147.498 139.727 147.498H92.6414H90.5953C87.0175 147.498 83.2889 145.738 79.7914 144.984C79.2543 144.868 78.7176 144.756 78.2023 144.631C77.1657 144.379 76.2429 143.82 75.4208 143.14L73.3314 141.413C72.815 140.986 72.2569 140.612 71.6656 140.297L69.1618 138.961C68.3052 138.504 67.3866 138.175 66.4349 137.983L64.5421 137.6C62.9758 137.284 61.3262 137.287 59.8922 137.992C57.8052 139.018 56.6815 140.185 54.8448 140.178C54.4166 140.177 54.0014 140.045 53.6076 139.876L53.4604 139.813C52.2221 139.284 50.8121 139.333 49.6139 139.948C49.378 140.069 49.1319 140.169 48.8784 140.247L43.4882 141.907C42.2145 142.299 41.0326 142.941 39.9451 143.711C38.8858 144.462 37.6104 145.321 36.4908 146.109C34.5276 147.492 33.2032 149.735 32.2474 151.938L29.2949 158.743C28.799 159.886 28.6191 161.171 28.6472 162.416C28.6656 163.229 28.718 164.15 28.9881 165.053C29.3636 166.309 29.4505 167.782 28.6103 168.789C27.9377 169.595 27.8031 170.721 28.2669 171.662L28.4391 172.012C29.0354 173.222 28.8226 174.675 27.9042 175.664L26.4021 177.28C25.7446 177.988 25.5619 179.015 25.9352 179.906C26.4247 181.075 25.9432 182.426 24.8272 183.026C23.9933 183.474 23.4869 184.361 23.5275 185.307L23.6713 188.657C23.7809 191.209 25.7708 192.863 27.2106 194.973C27.8333 195.885 27.7346 197.187 25.912 199.348C25.225 200.162 24.647 201.079 24.3375 202.099C24.2241 202.473 24.1443 202.855 24.0992 203.243L23.8462 205.415L23.7092 206.691C23.546 208.212 23.7339 209.75 24.2584 211.187L25.5312 214.674C25.9863 215.921 26.1886 217.246 26.1264 218.572L25.7598 226.389C25.5135 231.641 21.2407 235.806 15.9832 235.918L13.3557 235.974C8.1778 236.084 3.94066 240.129 3.59094 245.296L1.34538 278.475C1.12849 281.68 2.46415 284.793 4.93566 286.845L19.848 299.223C22.1369 301.123 23.4611 303.943 23.4611 306.917V339.109C23.4611 342.407 25.0872 345.493 27.8076 347.357L64.0513 372.199C64.965 372.825 65.7683 373.599 66.4284 374.488L92.5773 409.728L114.461 438.494L142.056 474.116L162.014 503.162C164.927 507.402 170.582 508.74 175.087 506.255L187.173 499.587C189.847 498.111 193.124 498.271 195.642 499.999L199.364 502.818L204.883 505.893L212.584 510.634L217.608 513.9C217.937 514.115 218.282 514.305 218.639 514.469C221.81 515.93 225.559 515.21 227.963 512.678L234.403 505.893L252.821 484.367L256.706 479.94C258.298 478.126 260.492 476.949 262.883 476.626L273.871 475.141L281.058 474.116L289.594 473.155H295.389C296.896 473.155 298.385 473.496 299.742 474.152L305.894 477.127L316.098 481.227L322.387 483.534L334.067 487.89L407.547 519.091L417.304 523.361C422.683 525.715 424.886 532.173 422.068 537.323L418.145 544.49C417.462 545.738 417.053 547.118 416.946 548.537L415.177 571.941C414.939 575.09 416.201 578.166 418.583 580.238L424.968 585.796C426.495 587.125 428.389 587.959 430.4 588.188L475.494 593.333C477.746 593.59 480.019 593.075 481.94 591.87L492.841 585.036C495.891 583.123 499.734 582.998 502.902 584.708L514.397 590.911L522.969 596.404C523.581 596.796 524.262 597.067 524.976 597.201C528.364 597.837 531.528 595.317 531.666 591.872L537.891 436.613C538.104 431.307 542.426 427.093 547.736 427.014L582.443 426.502C587.091 426.434 591.079 423.171 592.067 418.628L597.356 394.301C597.497 393.653 597.568 392.992 597.568 392.328C597.568 390.837 597.209 389.368 596.521 388.045L594.674 384.491C593.187 381.632 593.17 378.231 594.627 375.357L599.1 366.533C599.863 365.029 600.994 363.741 602.389 362.791L603.589 361.973C604.066 361.648 604.514 361.282 604.928 360.88L611.622 354.373L623.754 344.378C624.465 343.792 624.998 343.018 625.293 342.145C626.266 339.255 624.414 336.183 621.404 335.695L618.799 335.274C618.041 335.151 617.308 334.908 616.627 334.553L600.8 326.296C595.425 323.492 593.762 316.589 597.269 311.644L618.327 281.958C621.701 277.201 620.306 270.578 615.299 267.587Z"
                fill="#E2E2E2"
                stroke="white"
                strokeWidth="2"
              />
              <path
                className="etr"
                id="etr2"
                onMouseEnter={() => setPop("etr2")}
                onMouseLeave={() => setPop("news")}
                d="M625.548 272.943L239.281 41.4658L252.18 6.22847L291.647 3.7939L324.697 6.22847L336.57 9.7522L353.833 21.4125L372.122 29.1647L440.276 73.8841L496.493 9.49593L576.134 7.06136C593.201 5.08477 607.066 2.83288 619.837 2L631.966 3.28136L642.041 6.35661L648.844 5.26746L653.721 7.06136L659.882 14.0447H667.069L674.257 23.2705C688.986 28.986 695.242 36.5966 700.953 51.7166L741.751 36.1205C744.919 34.9094 748.46 36.5629 749.566 39.7693L769.941 98.8705L786.562 151.15L818.586 184.145L803.248 200.802L776.294 228.864L764.679 245.009L748.25 266.728L763.267 280.823L761.663 283.129L753.513 282.233L737.212 302.029L719.5 330.155L705.381 352.771L679.647 334.448L673.551 343.866L669.765 366.097L682.214 391.853L636.394 414.981L627.217 426.449H590.958L598.21 393.39V389.866L595.514 384.997L593.012 379.936L598.21 369.365L600.777 364.688L604.691 361.997L614.253 352.771L625.42 343.866L627.987 336.114L617.911 334.448L609.312 329.386L598.21 323.748L591.6 320.737L625.548 272.943Z"
                fill="#E2E2E2"
                stroke="white"
                strokeWidth="2"
              />
              <path
                className="etr"
                id="etr3"
                onMouseEnter={() => setPop("etr3")}
                onMouseLeave={() => setPop("news")}
                d="M821.91 629.169C803.764 618.237 792.664 613.719 773.398 601.768C771.919 600.851 770.858 599.388 770.43 597.701C769.956 595.827 770.303 593.839 771.385 592.238L789.354 565.645C789.632 565.234 789.939 564.844 790.275 564.479L800.636 553.2C801.418 552.348 802.435 551.747 803.558 551.473C806.226 550.821 808.082 548.402 808.023 545.656L807.818 536.201C807.702 530.884 803.444 526.587 798.128 526.423L761.317 525.289C755.851 525.121 751.534 520.592 751.627 515.124L753.39 411.597C753.463 407.303 750.786 403.441 746.739 402.004L715.576 390.933C714.929 390.703 714.414 390.205 714.162 389.567C713.886 388.868 713.957 388.081 714.353 387.443L722.43 374.417C725.42 369.595 723.804 363.254 718.87 360.452L705.574 352.899L687.256 339.908C683.109 336.967 677.347 338.079 674.592 342.351C673.947 343.351 673.509 344.469 673.302 345.641L670.263 362.901C669.897 364.979 670.198 367.119 671.121 369.015L677.909 382.949C680.298 387.855 678.314 393.771 673.449 396.243L638.304 414.106C637.003 414.767 635.863 415.704 634.963 416.853L630.348 422.744C628.452 425.164 625.549 426.577 622.476 426.577H590.894L548.293 427.575C543.019 427.699 538.747 431.899 538.535 437.171L532.165 595.752C532.087 597.693 532.576 599.616 533.574 601.284L543.43 617.773C543.754 618.315 544.027 618.888 544.243 619.481L545.253 622.253C545.559 623.095 545.978 623.892 546.497 624.622L547.972 626.699C549.055 628.223 550.544 629.414 552.27 630.134L559.358 633.095C561.201 633.865 563.253 633.972 565.165 633.399C569.341 632.149 573.793 634.205 575.549 638.195L580.369 649.149L588.519 667.024L593.592 674.996C594.515 676.448 595.049 678.113 595.141 679.832L595.523 686.998C595.56 687.689 595.525 688.383 595.418 689.068L593.893 698.869C593.651 700.425 593.78 702.016 594.269 703.513L596.837 711.371C597.744 714.146 600.695 715.695 603.494 714.865C606.498 713.975 609.625 715.823 610.294 718.883L610.383 719.288C610.796 721.178 612.128 722.736 613.931 723.438L628.246 729.012C629.597 729.538 630.818 730.352 631.823 731.396L644.261 744.322C645.374 745.479 646.75 746.351 648.271 746.864L658.229 750.222C659.655 750.703 661.17 750.856 662.663 750.67L664.464 750.445C666.809 750.152 668.975 749.038 670.577 747.301L673.211 744.444C675.574 741.881 679.102 740.734 682.521 741.416L685.337 741.979C687.825 742.476 690.409 742.008 692.565 740.671L696.567 738.189C699.836 736.161 703.978 736.189 707.22 738.259L714.716 743.045C715.673 743.657 716.728 744.101 717.835 744.358L743.405 750.3C745.067 750.686 746.603 751.491 747.866 752.638L750.595 755.117C752.622 756.958 755.315 757.887 758.045 757.688L777.14 756.297C779.1 756.154 780.974 755.437 782.529 754.236L804.556 737.211C805.515 736.469 806.332 735.559 806.966 734.525L816.277 719.338C817.241 717.765 817.751 715.956 817.751 714.111V665.741C817.751 664.307 818.06 662.889 818.656 661.584L822.136 653.97C822.336 653.533 822.504 653.082 822.638 652.621L826.22 640.377C827.475 636.089 825.737 631.474 821.91 629.169Z"
                fill="#E2E2E2"
                stroke="white"
                strokeWidth="2"
              />
              <path
                className="etr"
                id="etr4"
                onMouseEnter={() => setPop("etr4")}
                onMouseLeave={() => setPop("news")}
                d="M807.565 512.337L807.115 516.106C807.061 516.557 807.049 517.013 807.079 517.467C807.365 521.783 803.889 525.416 799.565 525.321L762.108 524.499C756.608 524.378 752.238 519.837 752.329 514.336L754.035 411.149C754.106 406.854 751.427 402.994 747.379 401.559L715.932 390.405C715.428 390.226 715.031 389.831 714.849 389.328C714.665 388.818 714.723 388.252 715.007 387.79L723.352 374.181C726.301 369.371 724.69 363.075 719.793 360.273L715.396 357.758C710.459 354.934 708.869 348.566 711.898 343.752L737.789 302.606L751.382 285.942C752.909 284.071 755.286 283.109 757.684 283.391L760.436 283.716C761.386 283.828 762.317 283.398 762.848 282.603C763.535 281.574 763.382 280.201 762.486 279.348L755.571 272.774C751.933 269.315 751.423 263.694 754.38 259.637L776.808 228.864L814 190.062C817.241 186.68 822.397 186.003 826.401 188.435C826.965 188.777 827.493 189.175 827.979 189.621L863.623 222.404C866.32 224.885 867.445 228.643 866.553 232.197L857.776 267.196C857.576 267.992 857.475 268.809 857.475 269.629V289.308C857.475 291.545 858.545 293.646 860.353 294.963C862.745 296.703 863.783 299.76 862.946 302.596L857.347 321.57L856.035 330.298C855.339 334.932 851.519 338.461 846.845 338.788L821.302 340.577C818.687 340.76 817.219 343.673 818.628 345.883C819.639 347.468 819.197 349.57 817.634 350.614L813.613 353.302C813.122 353.631 812.666 354.01 812.254 354.434L803.172 363.788C801.561 365.447 800.575 367.613 800.381 369.917L799.145 384.648C798.936 387.139 799.667 389.619 801.196 391.597L802.439 393.206C803.873 395.063 804.609 397.366 804.517 399.711L804.215 407.419C804.138 409.376 805.496 411.099 807.416 411.482C809.367 411.872 810.732 413.641 810.614 415.627L809.645 431.9C809.456 435.078 810.792 438.157 813.243 440.191L818.072 444.196L821.147 446.624C824.46 449.241 825.773 453.657 824.428 457.66L824.303 458.029C823.876 459.301 823.708 460.646 823.811 461.984L824.361 469.118L826.822 482.239C827.061 483.517 827.05 484.829 826.787 486.102L826.748 486.294C826.169 489.101 824.412 491.525 821.925 492.951L820.359 493.848C819.106 494.566 818.023 495.547 817.185 496.723L809.35 507.721C808.378 509.086 807.764 510.673 807.565 512.337Z"
                fill="#E2E2E2"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3 pt-5 bottom-news-and-map">
          {pop === "news" ? (
            <div className="row">
              <div className="col-12">
                <h4 className="mb-4">{langs["Main contents"][lang]}</h4>
              </div>
              {threeLoading ? (
                <div>
                  <PostCardPlaceholder />
                </div>
              ) : (
                threePosts.map((post) => {
                  return <PostCard key={post.id} post={post} />;
                })
              )}
            </div>
          ) : pop === "etr1" ? (
            regions.map(region => {
              return region.map_no === 1 ? <div key={region.id} dangerouslySetInnerHTML={{__html:(lang === 'en' ? region.description_en : lang === 'ru' ? region.description_ru : region.description_tm)}} /> : ""
            })
          ) : pop === "etr2" ? (
            regions.map(region => {
              return region.map_no === 2 ? <div key={region.id} dangerouslySetInnerHTML={{__html:(lang === 'en' ? region.description_en : lang === 'ru' ? region.description_ru : region.description_tm)}} /> : ""
            })
          ) : pop === "etr3" ? (
            regions.map(region => {
              return region.map_no === 4 ? <div key={region.id} dangerouslySetInnerHTML={{__html:(lang === 'en' ? region.description_en : lang === 'ru' ? region.description_ru : region.description_tm)}} /> : ""
            })
          ) : (
            regions.map(region => {
              return region.map_no === 3 ? <div key={region.id} dangerouslySetInnerHTML={{__html:(lang === 'en' ? region.description_en : lang === 'ru' ? region.description_ru : region.description_tm)}} /> : ""
            })
          )}
        </div>
      </div>
    </div>
  );
}
