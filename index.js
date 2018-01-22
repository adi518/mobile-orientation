/* eslint-disable space-before-function-paren */

// https://davidwalsh.name/orientation-change
// https://stackoverflow.com/a/9039885/4106263
// https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
// https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
// https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad

// Resources
import debounce from 'lodash.debounce'
import Emitter from 'es6-emitter'

// Instances
const emitter = new Emitter()

// Event-Types
const RESIZE = 'resize'
const PORTRAIT = 'portrait'
const LANDSCAPE = 'landscape'

// Implementation
export class MobileOrientation {
  constructor(options = {}) {
    // Setup Options
    const {
      debounceTime = 50
    } = options

    // Initial State
    this.state = null

    // Setup Debounce
    this.detect = debounce(() => {
      this._detect()
      this.emit(RESIZE)
    }, debounceTime)

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
    const isTouchDevice = window.navigator.msMaxTouchPoints || 'ontouchstart' in document
    const isIos = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    const isIosFallback = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    tests.push(isTouchDevice, isIos, isIosFallback)
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
    return !this._isLandscape
  }
  get _isLandscape() {
    const tests = [window.screen.width > window.screen.height]
    if (window.matchMedia) {
      tests.push(window.matchMedia('all and (orientation:landscape)').matches)
    }
    return this.isTruthy(tests)
  }
  get events() {
    return [RESIZE, PORTRAIT, LANDSCAPE]
  }
  isTruthy(tests = []) {
    return tests.some(result => result === true)
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
