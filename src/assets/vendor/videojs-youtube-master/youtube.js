/* The MIT License (MIT)

Copyright (c) 2014-2015 Benoit Tremblay <trembl.ben@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/*global define, YT*/
(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    const { default: videojs } = require("video.js");
    module.exports = factory(videojs.default || videojs);
  } else if (typeof define === 'function' && define.amd) {
    define(['videojs'], function (videojs) {
      return (root.Youtube = factory(videojs));
    });
  } else {
    root.Youtube = factory(root.videojs);
  }
}(this, function (videojs) {
  'use strict';

  const _isOnMobile = videojs.browser.IS_IOS || videojs.browser.IS_NATIVE_ANDROID;
  const Tech = videojs.getTech('Tech');

  // Define the YouTube Tech class
  class Youtube extends Tech {
    constructor(options, ready) {
      super(options, ready);

      this.setPoster(options.poster);
      this.setSrc(this.options_.source, true);

      // Set the vjs-youtube class to the player
      this.setTimeout(() => {
        if (this.el_) {
          this.el_.parentNode.classList.add('vjs-youtube');

          if (_isOnMobile) {
            this.el_.parentNode.classList.add('vjs-youtube-mobile');
          }

          if (Youtube.isApiReady) {
            this.initYTPlayer();
          } else {
            Youtube.apiReadyQueue.push(this);
          }
        }
      });
    }

    dispose() {
      if (this.ytPlayer) {
        // Dispose of the YouTube Player
        if (this.ytPlayer.stopVideo) {
          this.ytPlayer.stopVideo();
        }
        if (this.ytPlayer.destroy) {
          this.ytPlayer.destroy();
        }
      } else {
        // YouTube API hasn't finished loading or the player is already disposed
        const index = Youtube.apiReadyQueue.indexOf(this);
        if (index !== -1) {
          Youtube.apiReadyQueue.splice(index, 1);
        }
      }
      this.ytPlayer = null;

      this.el_.parentNode.classList.remove('vjs-youtube', 'vjs-youtube-mobile');
      this.el_.parentNode.removeChild(this.el_);

      // Needs to be called after the YouTube player is destroyed
      super.dispose();
    }

    createEl() {
      const div = document.createElement('div');
      div.setAttribute('id', this.options_.techId);
      div.setAttribute('style', 'width:100%;height:100%;top:0;left:0;position:absolute');
      div.setAttribute('class', 'vjs-tech');

      const divWrapper = document.createElement('div');
      divWrapper.appendChild(div);

      if (!_isOnMobile && !this.options_.ytControls) {
        const divBlocker = document.createElement('div');
        divBlocker.setAttribute('class', 'vjs-iframe-blocker');
        divBlocker.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%');

        // In case the blocker is still there and we want to pause
        divBlocker.onclick = () => this.pause();

        divWrapper.appendChild(divBlocker);
      }

      return divWrapper;
    }

    initYTPlayer() {
      const playerVars = {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        loop: this.options_.loop ? 1 : 0,
      };

      // Allow user to set any YouTube parameter
      const params = [
        'autohide', 'cc_load_policy', 'ytControls', 'disablekb', 'color',
        'fs', 'end', 'hl', 'iv_load_policy', 'list', 'listType',
        'modestbranding', 'playlist', 'playsinline', 'rel', 'showinfo', 'start', 'theme'
      ];

      params.forEach(param => {
        if (typeof this.options_[param] !== 'undefined') {
          playerVars[param] = this.options_[param];
        }
      });

      if (this.options_.source.src.includes('end=')) {
        const srcEndTime = this.options_.source.src.match(/end=([0-9]*)/);
        this.options_.end = parseInt(srcEndTime[1]);
      }

      if (this.options_.source.src.includes('start=')) {
        const srcStartTime = this.options_.source.src.match(/start=([0-9]*)/);
        this.options_.start = parseInt(srcStartTime[1]);
      }

      // Allow undocumented options to be passed along via customVars
      if (typeof this.options_.customVars !== 'undefined') {
        Object.assign(playerVars, this.options_.customVars);
      }

      this.activeVideoId = this.url ? this.url.videoId : null;
      this.activeList = playerVars.list;

      const playerConfig = {
        videoId: this.activeVideoId,
        playerVars: playerVars,
        events: {
          onReady: this.onPlayerReady.bind(this),
          onPlaybackQualityChange: this.onPlayerPlaybackQualityChange.bind(this),
          onPlaybackRateChange: this.onPlayerPlaybackRateChange.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this),
          onVolumeChange: this.onPlayerVolumeChange.bind(this),
          onError: this.onPlayerError.bind(this),
        },
      };

      if (this.options_.enablePrivacyEnhancedMode) {
        playerConfig.host = 'https://www.youtube-nocookie.com';
      }

      this.ytPlayer = new YT.Player(this.options_.techId, playerConfig);
    }

    // Define other methods as needed
    onPlayerReady() {
      if (this.options_.muted) {
        this.ytPlayer.mute();
      }

      const playbackRates = this.ytPlayer.getAvailablePlaybackRates();
      if (playbackRates.length > 1) {
        this.featuresPlaybackRate = true;
      }

      this.playerReady_ = true;
      this.triggerReady();

      if (this.playOnReady) {
        this.play();
      } else if (this.cueOnReady) {
        this.cueVideoById_(this.url.videoId);
        this.activeVideoId = this.url.videoId;
      }
    }

    onPlayerPlaybackQualityChange() {}

    onPlayerPlaybackRateChange() {
      this.trigger('ratechange');
    }

    onPlayerStateChange(e) {
      const state = e.data;

      if (state === this.lastState || this.errorNumber) {
        return;
      }

      this.lastState = state;

      switch (state) {
        case -1:
          this.trigger('loadstart');
          this.trigger('loadedmetadata');
          this.trigger('durationchange');
          this.trigger('ratechange');
          break;

        case YT.PlayerState.ENDED:
          this.trigger('ended');
          break;

        case YT.PlayerState.PLAYING:
          this.trigger('timeupdate');
          this.trigger('durationchange');
          this.trigger('playing');
          this.trigger('play');
          if (this.isSeeking) {
            this.onSeeked();
          }
          break;

        case YT.PlayerState.PAUSED:
          this.trigger('canplay');
          if (this.isSeeking) {
            this.onSeeked();
          } else {
            this.trigger('pause');
          }
          break;

        case YT.PlayerState.BUFFERING:
          this.trigger('timeupdate');
          this.trigger('waiting');
          break;
      }
    }

    onPlayerVolumeChange() {
      this.trigger('volumechange');
    }

    onPlayerError(e) {
      this.errorNumber = e.data;
      this.trigger('pause');
      this.trigger('error');
    }

    error() {
      const code = 1000 + this.errorNumber; // as smaller codes are reserved
      switch (this.errorNumber) {
        case 5:
          return { code, message: 'Error while trying to play the video' };
        case 2:
        case 100:
          return { code, message: 'Unable to find the video' };
        case 101:
        case 150:
          return {
            code,
            message: 'Playback on other Websites has been disabled by the video owner.',
          };
      }
      return { code, message: `YouTube unknown error (${this.errorNumber})` };
    }

    loadVideoById_(id) {
      const options = {
        videoId: id,
        startSeconds: this.options_.start || undefined,
        endSeconds: this.options_.end || undefined,
      };
      this.ytPlayer.loadVideoById(options);
    }

    cueVideoById_(id) {
      const options = {
        videoId: id,
        startSeconds: this.options_.start || undefined,
        endSeconds: this.options_.end || undefined,
      };
      this.ytPlayer.cueVideoById(options);
    }

    src(src) {
      if (src) {
        this.setSrc({ src });
      }
      return this.source;
    }

    poster() {
      return _isOnMobile ? null : this.poster_;
    }

    setPoster(poster) {
      this.poster_ = poster;
    }

    setSrc(source) {
      if (!source || !source.src) {
        return;
      }

      delete this.errorNumber;
      this.source = source;
      this.url = Youtube.parseUrl(source.src);

      if (!this.options_.poster && this.url.videoId) {
        this.poster_ = `https://img.youtube.com/vi/${this.url.videoId}/0.jpg`;
        this.trigger('posterchange');
        this.checkHighResPoster();
      }

      if (this.options_.autoplay && !_isOnMobile) {
        if (this.isReady_) {
          this.play();
        } else {
          this.playOnReady = true;
        }
      } else if (this.activeVideoId !== this.url.videoId) {
        if (this.isReady_) {
          this.cueVideoById_(this.url.videoId);
          this.activeVideoId = this.url.videoId;
        } else {
          this.cueOnReady = true;
        }
      }
    }

    autoplay() {
      return this.options_.autoplay;
    }

    setAutoplay(val) {
      this.options_.autoplay = val;
    }

    loop() {
      return this.options_.loop;
    }

    setLoop(val) {
      this.options_.loop = val;
    }

    play() {
      if (!this.url || !this.url.videoId) {
        return;
      }

      this.wasPausedBeforeSeek = false;

      if (this.isReady_) {
        if (this.url.listId) {
          if (this.activeList === this.url.listId) {
            this.ytPlayer.playVideo();
          } else {
            this.ytPlayer.loadPlaylist(this.url.listId);
            this.activeList = this.url.listId;
          }
        }

        if (this.activeVideoId === this.url.videoId) {
          this.ytPlayer.playVideo();
        } else {
          this.loadVideoById_(this.url.videoId);
          this.activeVideoId = this.url.videoId;
        }
      } else {
        this.trigger('waiting');
        this.playOnReady = true;
      }
    }

    pause() {
      if (this.ytPlayer) {
        this.ytPlayer.pauseVideo();
      }
    }

    paused() {
      return this.ytPlayer ? (this.lastState !== YT.PlayerState.PLAYING && this.lastState !== YT.PlayerState.BUFFERING) : true;
    }

    currentTime() {
      return this.ytPlayer ? this.ytPlayer.getCurrentTime() : 0;
    }

    setCurrentTime(seconds) {
      if (this.lastState === YT.PlayerState.PAUSED) {
        this.timeBeforeSeek = this.currentTime();
      }

      if (!this.isSeeking) {
        this.wasPausedBeforeSeek = this.paused();
      }

      this.ytPlayer.seekTo(seconds, true);
      this.trigger('timeupdate');
      this.trigger('seeking');
      this.isSeeking = true;

      if (this.lastState === YT.PlayerState.PAUSED && this.timeBeforeSeek !== seconds) {
        clearInterval(this.checkSeekedInPauseInterval);
        this.checkSeekedInPauseInterval = setInterval(() => {
          if (this.lastState !== YT.PlayerState.PAUSED || !this.isSeeking) {
            clearInterval(this.checkSeekedInPauseInterval);
          } else if (this.currentTime() !== this.timeBeforeSeek) {
            this.trigger('timeupdate');
            this.onSeeked();
          }
        }, 250);
      }
    }

    seeking() {
      return this.isSeeking;
    }

    seekable() {
      return this.ytPlayer ? videojs.createTimeRange(0, this.ytPlayer.getDuration()) : videojs.createTimeRange();
    }

    onSeeked() {
      clearInterval(this.checkSeekedInPauseInterval);
      this.isSeeking = false;

      if (this.wasPausedBeforeSeek) {
        this.pause();
      }

      this.trigger('seeked');
    }

    playbackRate() {
      return this.ytPlayer ? this.ytPlayer.getPlaybackRate() : 1;
    }

    setPlaybackRate(suggestedRate) {
      if (this.ytPlayer) {
        this.ytPlayer.setPlaybackRate(suggestedRate);
      }
    }

    duration() {
      return this.ytPlayer ? this.ytPlayer.getDuration() : 0;
    }

    currentSrc() {
      return this.source && this.source.src;
    }

    ended() {
      return this.ytPlayer ? (this.lastState === YT.PlayerState.ENDED) : false;
    }

    volume() {
      return this.ytPlayer ? this.ytPlayer.getVolume() / 100.0 : 1;
    }

    setVolume(percentAsDecimal) {
      if (this.ytPlayer) {
        this.ytPlayer.setVolume(percentAsDecimal * 100.0);
      }
    }

    muted() {
      return this.ytPlayer ? this.ytPlayer.isMuted() : false;
    }

    setMuted(mute) {
      if (this.ytPlayer) {
        if (mute) {
          this.ytPlayer.mute();
        } else {
          this.ytPlayer.unMute();
        }
        this.setTimeout(() => {
          this.trigger('volumechange');
        }, 50);
      }
    }

    buffered() {
      if (!this.ytPlayer || !this.ytPlayer.getVideoLoadedFraction) {
        return videojs.createTimeRange();
      }

      const bufferedEnd = this.ytPlayer.getVideoLoadedFraction() * this.ytPlayer.getDuration();
      return videojs.createTimeRange(0, bufferedEnd);
    }

    preload() {}
    load() {}
    reset() {}

    networkState() {
      if (!this.ytPlayer) {
        return 0; // NETWORK_EMPTY
      }
      switch (this.ytPlayer.getPlayerState()) {
        case -1: // unstarted
          return 0; // NETWORK_EMPTY
        case 3: // buffering
          return 2; // NETWORK_LOADING
        default:
          return 1; // NETWORK_IDLE
      }
    }

    readyState() {
      if (!this.ytPlayer) {
        return 0; // HAVE_NOTHING
      }
      switch (this.ytPlayer.getPlayerState()) {
        case -1: // unstarted
          return 0; // HAVE_NOTHING
        case 5: // video cued
          return 1; // HAVE_METADATA
        case 3: // buffering
          return 2; // HAVE_CURRENT_DATA
        default:
          return 4; // HAVE_ENOUGH_DATA
      }
    }

    supportsFullScreen() {
      return document.fullscreenEnabled ||
             document.webkitFullscreenEnabled ||
             document.mozFullScreenEnabled ||
             document.msFullscreenEnabled;
    }

    checkHighResPoster() {
      const uri = `https://img.youtube.com/vi/${this.url.videoId}/maxresdefault.jpg`;

      try {
        const image = new Image();
        image.onload = () => {
          if ('naturalHeight' in image) {
            if (image.naturalHeight > 90 && image.naturalWidth > 120) {
              this.poster_ = uri;
              this.trigger('posterchange');
            }
          } else if (image.height > 90 && image.width > 120) {
            this.poster_ = uri;
            this.trigger('posterchange');
          }
        };
        image.onerror = () => {};
        image.src = uri;
      } catch (e) {}
    }
  }

  // Define static properties and methods
  Youtube.isSupported = () => true;

  Youtube.canPlaySource = (e) => Youtube.canPlayType(e.type);

  Youtube.canPlayType = (e) => (e === 'video/youtube');

  Youtube.parseUrl = (url) => {
    const result = { videoId: null };
    const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regex);

    if (match && match[2].length === 11) {
      result.videoId = match[2];
    }

    const regPlaylist = /[?&]list=([^#\&\?]+)/;
    const playlistMatch = url.match(regPlaylist);

    if (playlistMatch && playlistMatch[1]) {
      result.listId = playlistMatch[1];
    }

    return result;
  };

  function apiLoaded() {
    YT.ready(() => {
      Youtube.isApiReady = true;
      while (Youtube.apiReadyQueue.length > 0) {
        const tech = Youtube.apiReadyQueue.shift();
        tech.initYTPlayer();
      }
    });
  }

  function loadScript(src, callback) {
    let loaded = false;
    const tag = document.createElement('script');
    const firstScriptTag = document.getElementsByTagName('script')[0];

    if (!firstScriptTag) {
      return; // No script tag found
    }

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    tag.onload = () => {
      if (!loaded) {
        loaded = true;
        callback();
      }
    };
    tag.onreadystatechange = () => {
      if (!loaded && (this.readyState === 'complete' || this.readyState === 'loaded')) {
        loaded = true;
        callback();
      }
    };
    tag.src = src;
  }

  function injectCss() {
    const css = `
      .vjs-youtube .vjs-iframe-blocker { display: none; }
      .vjs-youtube.vjs-user-inactive .vjs-iframe-blocker { display: block; }
      .vjs-youtube .vjs-poster { background-size: cover; }
      .vjs-youtube-mobile .vjs-big-play-button { display: none; }
    `;

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  Youtube.apiReadyQueue = [];

  if (typeof document !== 'undefined') {
    loadScript('https://www.youtube.com/iframe_api', apiLoaded);
    injectCss();
  }

  // Register the tech with Video.js
  videojs.registerTech('Youtube', Youtube);

  return Youtube;
}));