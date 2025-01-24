// import genreImage from "./assets/images/genre/01.webp"; // Import the genre image
// import trailerVideo from "./assets/images/video/Surah Al-Baqarah Mohamed AlMinshawi.mp4"; // Import the trailer video
import loader from "./assets/images/loader.gif"
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import $ from "jquery"; 
import "select2/dist/css/select2.min.css";
import "select2";
// import "../src/assets/js/setting-init.js"
// import "../src/assets/js/setting.js"

// CSS files
import "./assets/css/core/libs.min.css";
import "./assets/vendor/font-awesome/css/all.min.css";
import "./assets/vendor/iconly/css/style.css";
import "./assets/vendor/animate.min.css";
import "./assets/vendor/swiperSlider/swiper.min.css";
import "./assets/vendor/video/video-js.css";
import "./assets/css/streamit.min.css?v=5.2.1";
import "./assets/css/custom.min.css?v=5.2.1";
import "./assets/css/rtl.min.css?v=5.2.1";

// JS files
import "./assets/js/core/libs.min.js";
import "./assets/vendor/swiperSlider/swiper.min.js";
import "./assets/vendor/video/video.min.js";
import "./assets/vendor/videojs-youtube-master/youtube.js";
import "./assets/js/plugins/select2.js";
import "./assets/vendor/lodash/lodash.min.js";
import "./assets/js/core/external.min.js";
import "./assets/js/plugins/countdown.js";
import "./assets/js/utility.js";
import "./assets/js/setting.js";
import "./assets/js/setting-init.js";
import "./assets/js/streamit.js";
import "./assets/js/swiper.js";


export default function Test () {
  const selectRef = useRef(null); 

  useEffect(() => {
    $(selectRef.current).select2();

    return () => {
      $(selectRef.current).select2("destroy");
    };
  }, []);
  return (
<div>
<span className="screen-darken"></span>
        {/* Nav Start */}
        {/* Bread-crumb */}
        {/* Banner Start */}
        <div className="iq-main-slider site-video">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="pt-0">
                  <video
                    id="my-video"
                    poster="https://i.ytimg.com/vi_webp/rKVEoyTedv4/maxresdefault.webp"
                    className="video-js vjs-big-play-centered w-100"
                    controls
                    preload="auto"
                    data-setup='{}'
                  >
                    <source src={"dddwdw"} type="video/mp4" />
                    <source src="MY_VIDEO.webm" type="video/webm" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner End */}

    <div className="details-part">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            {/* Movie Description Start */}
            <div className="trending-info mt-4 pt-0 pb-4">
              <div className="row">
                <div className="col-md-9 col-12 mb-auto">
                  <div className="d-block d-lg-flex align-items-center">
                    <h2
                      className="trending-text fw-bold texture-text text-uppercase my-0 fadeInLeft animated d-inline-block"
                      data-animation-in="fadeInLeft"
                      data-delay-in="0.6"
                      style={{ opacity: 1, animationDelay: "0.6s" }}
                    >
                      Zombie Island
                    </h2>
                    <div className="slider-ratting d-flex align-items-center ms-lg-3 ms-0">
                      <ul className="ratting-start p-0 m-0 list-inline text-warning d-flex align-items-center justify-content-left">
                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        <li><i className="fa fa-star-half" aria-hidden="true"></i></li>
                      </ul>
                      <span className="text-white ms-2">4.8 (imdb)</span>
                    </div>
                  </div>
                  <ul className="p-0 mt-2 list-inline d-flex flex-wrap movie-tag">
                    <li className="trending-list"><Link className="text-primary" to="./view-all-movie.html">Action</Link></li>
                    <li className="trending-list"><Link className="text-primary" to="./view-all-movie.html">Adventure</Link></li>
                    <li className="trending-list"><Link className="text-primary" to="./view-all-movie.html">Drama</Link></li>
                  </ul>
                  <div className="d-flex flex-wrap align-items-center text-white text-detail flex-wrap mb-4">
                    <span className="badge bg-secondary">Horror</span>
                    <span className="ms-3 font-Weight-500 genres-info me-1">1hr : 48mins</span>
                    <span className="trending-year trending-year-list font-Weight-500 genres-info">
                      Feb 2017
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-4 flex-wrap mb-4">
                    <ul className="list-inline p-0 share-icons music-play-lists mb-n2 mx-n2">
                      <li className="share">
                        <span><i className="fa-solid fa-share-nodes"></i></span>
                        <div className="share-box">
                          <svg width="15" height="40" viewBox="0 0 15 40" className="share-shape" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.8842 40C6.82983 37.2868 1 29.3582 1 20C1 10.6418 6.82983 2.71323 14.8842 0H0V40H14.8842Z" fill="#191919"></path>
                          </svg>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="share-ico"><i className="fa-brands fa-facebook-f"></i></Link>
                            <Link to="#" className="share-ico"><i className="fa-brands fa-twitter"></i></Link>
                            <Link to="#" className="share-ico"><i className="fa-solid fa-link"></i></Link>
                          </div>
                        </div>
                      </li>
                      <li><span><i className="fa-solid fa-heart"></i></span></li>
                      <li><span><i className="fa-solid fa-plus"></i></span></li>
                      <li>
                        <span>
                          <Link to={"sss"} download><i className="fa-solid fa-download"></i></Link>
                        </span>
                      </li>
                    </ul>
                    <div className="movie-detail-select">
                      <select ref={selectRef} name="movieselect" className="form-control movie-select select2-basic-single js-states">
                        <option value="1">Playlist</option>
                        <option value="2">Zombie Island</option>
                        <option value="3">Sand Dust</option>
                        <option value="4">Jumbo Queen</option>
                      </select>
                    </div>
                  </div>
                  <ul className="iq-blogtag list-unstyled d-flex flex-wrap align-items-center gap-3 p-0">
                    <li className="iq-tag-title text-primary mb-0">
                      <i className="fa fa-tags" aria-hidden="true"></i>
                      Tags:
                    </li>
                    <li><Link className="title" to="./view-all-movie.html">Action</Link><span className="text-secondary">,</span></li>
                    <li><Link className="title" to="./view-all-movie.html">Adventure</Link><span className="text-secondary">,</span></li>
                    <li><Link className="title" to="./view-all-movie.html">Drama</Link><span className="text-secondary">,</span></li>
                  </ul>
                </div>
                <div className="trailor-video col-md-3 col-12 mt-lg-0 mt-4 mb-md-0 mb-1 text-lg-right">
                  <Link data-fslightbox="html5-video" to="https://www.youtube.com/watch?v=QCGq1epI9pQ" className="video-open playbtn block-images position-relative playbtn_thumbnail">
                    <img src={"dwwd"} className="attachment-medium-large size-medium-large wp-post-image" alt="" loading="lazy" />
                    <span className="content btn btn-transparant iq-button">
                      <i className="fa fa-play me-2 text-white"></i>
                      <span>Trailer Link</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Movie Description End */}

            {/* Movie Source Start */}
            <div className="content-details trending-info">
              <ul className="iq-custom-tab tab-bg-gredient-center d-flex nav nav-pills align-items-center text-center mb-5 justify-content-center list-inline" role="tablist">
                <li className="nav-item">
                  <Link className="nav-link active show" data-bs-toggle="pill" to="#description-01" role="tab" aria-selected="true">
                    Description
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" data-bs-toggle="pill" to="#review-01" role="tab" aria-selected="false">
                    Rate &amp; Review
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" data-bs-toggle="pill" to="#source-01" role="tab" aria-selected="false">
                    Sources
                  </Link>
                </li>
              </ul>
              <div className="tab-content">
                <div id="description-01" className="tab-pane animated fadeInUp active show" role="tabpanel">
                  <div className="description-content">
                    <p>
                      Zombie Island is a 1998 direct-to-video animated comedy horror film based on Hanna-Barbera's Scooby-Doo Saturday-morning cartoons. In the film, Shaggy, Scooby, Fred, Velma, and Daphne reunite after a year-long hiatus from Mystery, Inc. to investigate a bayou island said to be haunted by the ghost of the pirate Morgan Moonscar. The film was directed by Jim Stenstrum, from a screenplay by Glenn Leopold.
                    </p>
                  </div>
                </div>
                <div id="review-01" className="tab-pane animated fadeInUp" role="tabpanel">
                  <div className="streamit-reviews">
                    <div id="comments" className="comments-area validate-form">
                      <p className="masvideos-noreviews mt-3">
                        There are no reviews yet.
                      </p>
                    </div>
                    <div className="review_form">
                      <div className="comment-respond">
                        <h3 className="fw-500 my-2">
                          Be the first to review “Zombie Island”
                        </h3>
                        <p className="comment-notes">
                          <span>Your email address will not be published.</span>
                          <span> Required fields are marked<span className="required"> * </span></span>
                        </p>
                        <div className="d-flex align-items-center mb-4">
                          <label>Your rating</label>
                          <div className="star ms-4 text-primary">
                            <span><i className="fa-regular fa-star"></i></span>
                            <span><i className="fa-regular fa-star"></i></span>
                            <span><i className="fa-regular fa-star"></i></span>
                            <span><i className="fa-regular fa-star"></i></span>
                            <span><i className="fa-regular fa-star"></i></span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="mb-2">
                                Your review
                                <span className="required"> *</span>
                              </label>
                              <textarea className="form-control" name="comment" cols="5" rows="8" required></textarea>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="mb-2">
                                Name
                                <span className="required"> *</span>
                              </label>
                              <input className="form-control" name="author" type="text" required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="mb-2">
                                Email&nbsp;
                                <span className="required"> *</span>
                              </label>
                              <input className="form-control" name="email" type="email" required />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mt-3 d-flex gap-2 align-items-center">
                              <input className="form-check-input mt-0" type="checkbox" id="check1" defaultChecked />
                              <label className="form-check-label" htmlFor="check1">
                                Save my name, email, and website in this browser for the next time I comment.
                              </label>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-submit mt-4">
                              <div className="iq-button">
                                <button name="submit" type="submit" id="submit" className="btn text-uppercase position-relative" value="Submit">
                                  <span className="button-text">Submit</span>
                                  <i className="fa-solid fa-play"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="source-01" className="tab-pane animated fadeInUp" role="tabpanel">
                  <div className="source-list-content table-responsive">
                    <table className="table custom-table">
                      <thead>
                        <tr>
                          <th>Links</th>
                          <th>Quality</th>
                          <th>Language</th>
                          <th>Player</th>
                          <th>Date Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="iq-button">
                              <Link to="./movie-detail.html" className="btn text-uppercase position-relative">
                                <span className="button-text"> Play Now</span>
                                <i className="fa-solid fa-play"></i>
                              </Link>
                            </div>
                          </td>
                          <td>1080p</td>
                          <td>English</td>
                          <td>MusicBee</td>
                          <td>2021-11-28</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="iq-button">
                              <Link to="./movie-detail.html" className="btn text-uppercase position-relative">
                                <span className="button-text"> Play Now</span>
                                <i className="fa-solid fa-play"></i>
                              </Link>
                            </div>
                          </td>
                          <td>800p</td>
                          <td>English</td>
                          <td>5KPlayer</td>
                          <td>2021-11-25</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="iq-button">
                              <Link to="./movie-detail.html" className="btn text-uppercase position-relative">
                                <span className="button-text"> Play Now</span>
                                <i className="fa-solid fa-play"></i>
                              </Link>
                            </div>
                          </td>
                          <td>720p</td>
                          <td>English</td>
                          <td>MediaMonkey</td>
                          <td>2021-11-20</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Movie Source End */}
          </div>
        </div>
      </div>
      <div className="rtl-box">
            <Link
              to="#"
              className="btn btn-icon btn-setting"
              id="settingbutton"
              data-bs-toggle="offcanvas"
              data-bs-target="#live-customizer"
              role="button"
              aria-controls="live-customizer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.875em"
                height="1.875em"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <div
              className="offcanvas offcanvas-end live-customizer on-rtl end"
              tabIndex="-1"
              id="live-customizer"
              data-bs-scroll="true"
              data-bs-backdrop="false"
              aria-labelledby="live-customizer-label"
              aria-modal="true"
              role="dialog"
            >
              <div className="offcanvas-header gap-3">
                <div className="d-flex align-items-center">
                  <h5
                    className="offcanvas-title text-dark"
                    id="live-customizer-label"
                  >
                    Live Customizer
                  </h5>
                </div>
                <div className="d-flex gap-1 align-items-center">
                  <button
                    className="btn btn-icon text-primary"
                    data-reset="settings"
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    aria-label="Reset All Settings"
                    title="Reset All Settings"
                  >
                    <span className="btn-inner">
                      <i className="fa-solid fa-arrows-rotate"></i>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-icon btn-close px-0 text-reset shadow-none text-dark"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="offcanvas-body pt-0">
                <div className="modes row row-cols-2 gx-2">
                  <div className="col">
                    <div data-setting="attribute" className="text-center w-100">
                      <input
                        type="radio"
                        value="ltr"
                        className="btn-check"
                        name="theme_scheme_direction"
                        data-prop="dir"
                        id="theme-scheme-direction-ltr"
                        defaultChecked
                      />
                      <label
                        className="btn dir-btn cutomizer-button w-100"
                        htmlFor="theme-scheme-direction-ltr"
                      >
                        LTR
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div data-setting="attribute" className="text-center w-100">
                      <input
                        type="radio"
                        value="rtl"
                        className="btn-check"
                        name="theme_scheme_direction"
                        data-prop="dir"
                        id="theme-scheme-direction-rtl"
                      />
                      <label
                        className="btn dir-btn cutomizer-button w-100"
                        htmlFor="theme-scheme-direction-rtl"
                      >
                        RTL
                      </label>
                    </div>
                  </div>
                </div>
                <div className="modes mt-3">
                  <div className="color-customizer mb-3">
                    <h6 className="mb-0 title-customizer">Color Customizer</h6>
                  </div>
                  <div className="row row-cols-2 gx-2">
                    <div className="col mb-3">
                      <div
                        data-setting="attribute"
                        className="text-center w-100"
                      >
                        <input
                          type="radio"
                          value="dark"
                          className="btn-check"
                          name="theme_style_appearance"
                          data-prop="data-bs-theme"
                          id="theme-scheme-color-netflix"
                          data-colors='{"primary": "#e50914", "secondary": "#adafb8", "tertiray": "#adafb8"}'
                          defaultChecked
                        />
                        <label
                          className="btn dir-btn cutomizer-button w-100"
                          htmlFor="theme-scheme-color-netflix"
                        >
                          Netflix
                        </label>
                      </div>
                    </div>
                    <div className="col mb-3">
                      <div
                        data-setting="attribute"
                        className="text-center w-100"
                      >
                        <input
                          type="radio"
                          value="hotstar"
                          className="btn-check"
                          name="theme_style_appearance"
                          data-prop="data-bs-theme"
                          id="theme-scheme-color-hotstar"
                          data-colors='{"primary": "#0959E4", "secondary": "#adafb8", "tertiray": "#EA4335"}'
                        />
                        <label
                          className="btn dir-btn cutomizer-button w-100"
                          htmlFor="theme-scheme-color-hotstar"
                        >
                          Hotstar
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div
                        data-setting="attribute"
                        className="text-center w-100"
                      >
                        <input
                          type="radio"
                          value="amazonprime"
                          className="btn-check"
                          name="theme_style_appearance"
                          data-prop="data-bs-theme"
                          id="theme-scheme-color-prime"
                          data-colors='{"primary": "#1A98FF", "secondary": "#adafb8", "tertiray": "#89F425"}'
                        />
                        <label
                          className="btn dir-btn cutomizer-button w-100"
                          htmlFor="theme-scheme-color-prime"
                        >
                          Prime
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div
                        data-setting="attribute"
                        className="text-center w-100"
                      >
                        <input
                          type="radio"
                          value="hulu"
                          className="btn-check"
                          name="theme_style_appearance"
                          data-prop="data-bs-theme"
                          id="theme-scheme-color-hulu"
                          data-colors='{"primary": "#3ee783", "secondary": "#adafb8", "tertiray": "#0E0E0E"}'
                        />
                        <label
                          className="btn dir-btn cutomizer-button w-100"
                          htmlFor="theme-scheme-color-hulu"
                        >
                          Hulu
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="back-to-top" style={{display:"none"}}>
     <a className="p-0 btn bg-primary btn-sm position-fixed top border-0 rounded-circle text-white" id="top" href="#top">
        <i className="fa-solid fa-chevron-up"></i>
     </a>
  </div>
    </div>
</div>
  );
}
