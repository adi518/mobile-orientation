// https://davidwalsh.name/orientation-change
// https://stackoverflow.com/a/9039885/4106263
// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
// https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
// https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad

// Resources
import _debounce from 'lodash.debounce'

// Implementation
export class MobileOrientation {
  constructor() {
    window.addEventListener('resize', this.detectPortrait)
    window.addEventListener('resize', this.debouncedDetectLandscape)
    this.detectLandscape()
    this.detectPortrait()
  }
  get isMobile() {
    const isTouchDevice = window.navigator.msMaxTouchPoints || 'ontouchstart' in document
    const isIos = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    const isIosFallback = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    return isTouchDevice || isIos || isIosFallback
  }
  get isDesktop() {
    return !this.isMobile
  }
  get isPortrait() {
    return !this.isLandscape
  }
  get isLandscape() {
    return screen.width > screen.height || window.matchMedia('all and (orientation:landscape)').matches
  }
  detectPortrait = () => {
    if (this.isPortrait || this.isDesktop) {
      this.state = 'portrait'
    }
  }
  detectLandscape = () => {
    if (this.isLandscape && this.isMobile) {
      this.state = 'landscape'
    }
  }
  debouncedDetectLandscape = () => {
    return _debounce(this.detectLandscape, 500)
  }
  destroy = () => {
    window.removeEventListener('resize', this.detectPortrait)
    window.removeEventListener('resize', this.debouncedDetectLandscape)
  }
}
