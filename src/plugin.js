import videojs from "video.js";
import { version as VERSION } from "../package.json";

const Plugin = videojs.getPlugin("plugin");

// Default options for the plugin.
const defaults = {
  loginText: "观看完整视频请%%%登录%%%",
  loginBtn: "立即登录",
  loginUrl: "",
  registerUrl: "",
  registerText: "没有账号？请%%%注册%%%",
  endText: "观看完整视频请登录"
};

const setupLogin = (player, options) => {
  if (options.format !== "" && options.login !== "") {
    const videoEl = player.el();
    const div = document.createElement("div");

    div.classList.add("vjs-login-content");

    div.innerHTML = options.loginText
      .replace(/%%%/, '<a href="' + options.loginUrl + '">')
      .replace(/%%%/, "</a>");

    videoEl.appendChild(div);
  }

  if (options.login !== "") {
    player.on("ended", function() {
      // show login & register
      const videoEl = player.el();
      const loginMask = document.createElement("div");
      let registerHtml = "";

      loginMask.classList.add("vjs-login-mask");

      registerHtml = options.registerText
        .replace(/%%%/, '<a href="' + options.registerUrl + '">')
        .replace(/%%%/, "</a>");

      loginMask.innerHTML +=
        '<div class="login-box"><div class="title">' +
        options.endText +
        '</div><div class="login"><a href="' +
        options.loginUrl +
        '">' +
        options.loginBtn +
        '</a></div><div class="register">' +
        registerHtml +
        "</div></div>";

      videoEl.appendChild(loginMask);
    });
  }
};

const css =
  ".video-js .vjs-time-tooltip{top: -3.9em;}.video-js .vjs-control:focus, .video-js .vjs-control:focus:before, .video-js .vjs-control:hover:before{text-shadow: 0 0 0em #fff;}.vjs-menu li.vjs-menu-item:focus,.vjs-menu li.vjs-menu-item:hover{outline: none}.video-js.vjs-fullscreen{font-size:18px}.video-js button{outline: none}.video-js .vjs-controls-disabled .vjs-big-play-button{display: none!important}.vjs-paused.vjs-has-started.video-js .vjs-big-play-button,.video-js.vjs-ended .vjs-big-play-button,.video-js.vjs-paused .vjs-big-play-button{display: block}.video-js .vjs-load-progress div,.vjs-seeking .vjs-big-play-button,.vjs-waiting .vjs-big-play-button {display: none!important}.video-js.vjs-ended .vjs-big-play-button{display: block!important}.video-js .vjs-big-play-button{top: 50%;left: 50%;margin-left: -1em;margin-top: -1em;width: 2em;height: 2em;line-height: 2em;border: none;border-radius: 50%;font-size: 3.5em;background-color: rgba(0, 0, 0, .45);color: #fff;-webkit-transition: border-color .4s, outline .4s, background-color .4s;-moz-transition: border-color .4s, outline .4s, background-color .4s;-ms-transition: border-color .4s, outline .4s, background-color .4s;-o-transition:border-color .4s, outline .4s, background-color .4s;transition: border-color .4s, outline .4s, background-color .4s}.video-js .vjs-big-play-button{background-color: rgba(0, 0, 0, 0);font-size: 12em;border-radius: 0%;height: 1em!important;line-height: 1em!important;margin-top: -0.5em!important}.video-js:hover .vjs-big-play-button,.video-js .vjs-big-play-button:focus,.video-js .vjs-big-play-button:active{background-color: rgba(0, 0, 0, 0)}.video-js .vjs-remaining-time-display{display: none}.video-js .vjs-duration{display: block;left: 0em}.video-js .vjs-current-time{display: block;left: 0}.vjs-live .vjs-time-control{display: none}";
const head = document.head || document.getElementsByTagName("head")[0];
const style = document.createElement("style");

style.type = "text/css";
if (style.styleSheet) {
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
head.appendChild(style);
videojs.options.controlBar = {
  volumePanel: { inline: !1, vertical: !0 },
  children: [
    "playToggle",
    "volumePanel",
    "liveDisplay",
    "currentTimeDisplay",
    "progressControl",
    "durationDisplay",
    "chaptersButton",
    "descriptionsButton",
    "subsCapsButton",
    "audioTrackButton",
    "fullscreenToggle"
  ]
};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class Login extends Plugin {
  /**
   * Create a Login plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.options = videojs.mergeOptions(defaults, options);

    this.player.ready(() => {
      this.player.addClass("vjs-login");
      setupLogin(player, this.options);
    });
  }
}

// Define default values for the plugin's `state` object here.
Login.defaultState = {};

// Include the version number.
Login.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin("login", Login);

export default Login;
