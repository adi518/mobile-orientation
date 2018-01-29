/* eslint-disable space-before-function-paren */

// https://davidwalsh.name/orientation-change
// https://stackoverflow.com/a/9039885/4106263
// https://github.com/webpack/webpack-dev-server/issues/345
// https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
// https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange
// https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
// https://stackoverflow.com/questions/13270659/detect-virtual-keyboard-vs-hardware-keyboard/47396515#47396515
// https://stackoverflow.com/questions/28272274/how-to-detect-keyboard-show-hide-event-in-jquery-for-mobile-web-application
// https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad
// https://stackoverflow.com/questions/8883163/css-media-query-soft-keyboard-breaks-css-orientation-rules-alternative-solut

// Resources
import debounce from 'lodash.debounce'
import Emitter from 'es6-emitter'
import pkg from './package.json'
import capitalize from 'capitalize'

// Constants
const emitter = new Emitter()
const namespace = pkg.name

// Event-Types
const RESIZE = 'resize'
const PORTRAIT = 'portrait'
const LANDSCAPE = 'landscape'

// Implementation
export class MobileOrientation {
  constructor(options = {}) {
    // Setup Defaults
    const defaults = {
      debug: false,
      withTouch: false,
      debounceTime: 50,
      portraitMediaQuery: 'all and (max-device-aspect-ratio: 1/1), (max-aspect-ratio: 1/1)'
    }

    // Setup Options
    this.options = {
      ...defaults,
      ...options
    }

    // Initial State
    this.state = null

    // Setup Debounce
    this.detect = debounce(() => {
      this._detect()
      this.emit(RESIZE)
    }, this.options.debounceTime)

    // Bind Events
    window.addEventListener(RESIZE, this.detect)

    // Initial Detection
    this.detect()
  }
  get emitter() {
    return emitter
  }
  get isMobile() {
    const tests = []
    const isIos = !!window.navigator.platform && /iPad|iPhone|iPod/.test(window.navigator.platform)
    const isIosFallback = /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream
    const isTouchDevice = window.navigator.msMaxTouchPoints || 'ontouchstart' in document
    tests.push(isIos, isIosFallback)
    if (this.options.withTouch) {
      tests.push(isTouchDevice)
    }
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
    return !this._isPortrait
  }
  get events() {
    return [RESIZE, PORTRAIT, LANDSCAPE]
  }
  get isDebug() {
    return this.options.debug
  }
  log(message) {
    console.warn(`${capitalize.words(namespace)}: ${capitalize(message)}.`)
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
      this.state = 'portrait'
      this.emit(PORTRAIT)
    }
  }
  detectLandscape = () => {
    if (this._isLandscape && this.isMobile) {
      this.state = 'landscape'
      this.emit(LANDSCAPE)
    }
  }
  emit(event) {
    this.emitter.emit(event, this.state)
  }
  subscribe(event, callback = () => { }) {
    if (this.events.includes(event)) {
      this.emitter.subscribe(event, callback)
    }
  }
  destroy() {
    window.removeEventListener(RESIZE, this.detect)
  }
}
