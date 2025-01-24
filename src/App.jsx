import React from "react";

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

import Test from "./Test";

// React Router
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Test />
      </div>
    </Router>
  );
};

export default App;
