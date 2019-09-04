import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Plugin = videojs.getPlugin('plugin');

// Default options for the plugin.
const defaults = {
  loginText: '观看完整视频请%登录%',
  loginBtn: '立即登录',
  login: 'aaa',
  register: '',
  registerText: '没有账号？请%注册%',
  endText: '需要登录与非账号才能观看完整视频',
};

const setupLogin = (player, options) => {
  if (options.format !== '' && options.login !== '') {
    const videoEl = player.el();
    const div = document.createElement('div');
  
    div.classList.add('vjs-login-content');
  
    div.innerHTML = options.loginText.replace(/%/, '<a href="' + options.login + '">').replace(/%/, '</a>');
    videoEl.appendChild(div);
  }

  if (options.login !== '') {
    player.on('ended', function() {
      // show login & register
    });
  }
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
      this.player.addClass('vjs-login');
      setupLogin(player, this.options)
    });
  }
}

// Define default values for the plugin's `state` object here.
Login.defaultState = {};

// Include the version number.
Login.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('login', Login);

export default Login;
