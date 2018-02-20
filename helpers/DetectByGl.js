// https://github.com/joyqi/mobile-device-js
// TODO: Add Android

// Constants
const DEVICES = {
  'Apple A7 GPU': {
    1136: ['iPhone 5', 'iPhone 5s'],
    2048: ['iPad Air', 'iPad Mini 2', 'iPad Mini 3']
  },
  'Apple A8 GPU': {
    1136: ['iPod touch (6th generation)'],
    1334: ['iPhone 6'],
    2001: ['iPhone 6 Plus'],
    2048: ['iPad Air 2', 'iPad Mini 4']
  },
  'Apple A9 GPU': {
    1136: ['iPhone SE'],
    1334: ['iPhone 6s'],
    2001: ['iPhone 6s Plus'],
    2224: ['iPad Pro (9.7-inch)'],
    2732: ['iPad Pro (12.9-inch)']
  },
  'Apple A10 GPU': {
    1334: ['iPhone 7'],
    2001: ['iPhone 7 Plus']
  }
}

// Implementation
export class DetectByGl {
  constructor(options = {}) {
    this.devices = { ...DEVICES, ...options.devices }
  }
  get canvas() {
    return document.createElement('canvas')
  }
  get gl() {
    return this.canvas.getContext('experimental-webgl')
  }
  get renderer() {
    const { gl } = this
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    }
    return 'unknown'
  }
  get screenWidth() {
    const { screen, devicePixelRatio } = window
    return Math.max(screen.width, screen.height) * (devicePixelRatio || 1)
  }
  get models() {
    const { devices, renderer, screenWidth } = this
    const device = devices[renderer] || []
    const models = device[screenWidth] || ['unknown']
    return models
  }
}
