/* eslint-disable space-before-function-paren */

// https://github.com/joyqi/mobile-device-js
// https://davidwalsh.name/orientation-change
// https://stackoverflow.com/a/9039885/4106263
// https://stackoverflow.com/a/14283643/4106263
// https://github.com/webpack/webpack-dev-server/issues/345
// https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
// http://robandlauren.com/2014/04/03/aspect-ratio-media-queries/
// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
// https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange
// https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/aspect-ratio
// https://stackoverflow.com/questions/8712036/dom-event-fired-by-window-resize
// https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/device-aspect-ratio
// https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
// https://stackoverflow.com/questions/1818474/how-to-trigger-the-window-resize-event-in-javascript
// https://stackoverflow.com/questions/13270659/detect-virtual-keyboard-vs-hardware-keyboard/47396515#47396515
// https://stackoverflow.com/questions/28272274/how-to-detect-keyboard-show-hide-event-in-jquery-for-mobile-web-application
// https://stackoverflow.com/questions/8883163/css-media-query-soft-keyboard-breaks-css-orientation-rules-alternative-solut
// https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad

// Resources
import pkg from './package.json'
import Emitter from 'es6-emitter'
import capitalize from 'capitalize'
import debounce from 'lodash.debounce'
import { DetectByGl } from './helpers/DetectByGl'

// Instances
const emitter = new Emitter()
// const device = new DetectByGl()
const device = { models: [] }

// Constants
const NAMESPACE = pkg.name
const RESIZE = 'resize'
const PORTRAIT = 'portrait'
const LANDSCAPE = 'landscape'
const IOS_REGEX = /iPad|iPhone|iPod/

// Implementation
export class MobileOrientation {
  constructor(options = {}) {
    const defaults = {
      debug: false,
      withTouch: false,
      debounceTime: 50,
      portraitMediaQuery: 'screen and (max-device-aspect-ratio: 1/1)',
      landscapeMediaQuery: ''
    }
    this.options = { ...defaults, ...options }
    this.setState(null)
    this.debounceDetect()
    window.addEventListener(RESIZE, this.detect)
    window.dispatchEvent(new Event(RESIZE))
  }
  get isMobile() {
    const tests = []
    const { isIos, isIosFallback, isIosOrAndroid, isTouchDevice } = this
    tests.push(isIosOrAndroid, isIos, isIosFallback)
    if (this.options.withTouch) {
      tests.push(isTouchDevice)
    }
    return this.isTruthy(tests)
  }
  get isIos() {
    const tests = []
    tests.push(!!window.navigator.platform)
    tests.push(IOS_REGEX.test(window.navigator.platform))
    return this.isAllTruthy(tests)
  }
  get isIosFallback() {
    const tests = []
    tests.push(!window.MSStream)
    tests.push(IOS_REGEX.test(window.navigator.userAgent))
    return this.isAllTruthy(tests)
  }
  get isIosOrAndroid() {
    return device.models.length
  }
  get isTouchDevice() {
    const tests = []
    tests.push(window.navigator.msMaxTouchPoints)
    tests.push('onmsgesturechange' in window)
    tests.push('ontouchstart' in document)
    return this.isTruthy(tests)
  }
  get isDesktop() {
    return !this.isMobile
  }
  get isPortrait() {
    return this.state === 'portrait'
  }
  get isLandscape() {
    return this.state === 'landscape'
  }
  get _isPortrait() {
    const tests = []
    if (window.matchMedia) {
      tests.push(window.matchMedia(this.options.portraitMediaQuery).matches)
    } else if (this.isDebug) {
      this.log('incompatible browser')
    }
    return this.isTruthy(tests)
  }
  get _isLandscape() {
    const tests = []
    tests.push(!this._isPortrait)
    if (window.matchMedia) {
      tests.push(window.matchMedia(this.options.landscapeMediaQuery).matches)
    } else if (this.isDebug) {
      this.log('incompatible browser')
    }
    return this.isAllTruthy(tests)
  }
  get events() {
    return [RESIZE, PORTRAIT, LANDSCAPE]
  }
  get isDebug() {
    return this.options.debug
  }
  debounceDetect() {
    this.detect = debounce(() => {
      this._detect()
      this.emit(RESIZE)
    }, this.options.debounceTime)
  }
  setState(payload) {
    this.state = payload
  }
  log(message) {
    console.warn(`${capitalize.words(NAMESPACE)}: ${capitalize(message)}.`)
  }
  isTruthy(tests = []) {
    return tests.some(result => result === true)
  }
  isAllTruthy(tests = []) {
    return tests.every(result => result === true)
  }
  _detect = () => {
    this.detectPortrait()
    this.detectLandscape()
  }
  detectPortrait = () => {
    if (this._isPortrait || this.isDesktop) {
      this.setState('portrait')
      this.emit(PORTRAIT)
    }
  }
  detectLandscape = () => {
    if (this._isLandscape && this.isMobile) {
      this.setState('landscape')
      this.emit(LANDSCAPE)
    }
  }
  emit(event) {
    emitter.emit(event, this.state)
  }
  on(event, callback = () => { }) {
    if (this.events.includes(event)) {
      emitter.subscribe(event, callback)
    }
  }
  destroy() {
    window.removeEventListener(RESIZE, this.detect)
  }
}
