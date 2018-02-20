<template>
  <div class="demo">
    <img class="preview" :class="[computedOrientation]" :src="preview" :alt="computedOrientation">
    <h4>
      Keyboard tester
    </h4>
    <input class="keyboard-tester">
  </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
// https://css-tricks.com/almanac/properties/i/image-rendering/

// Resources
import { MobileOrientation } from '@@/dist'

// Assets
import portrait from '@@/portrait-iphone-x.png'
import landscape from '@@/landscape-iphone-x.png'

export default {
  name: 'HelloWorld',
  data() {
    return {
      portrait,
      landscape,
      orientation: new MobileOrientation({ withTouch: true })
    }
  },
  created() {
    this.orientation.subscribe('resize', state => {
      console.warn(`Event: 'Resize', Orientation: '${state}'`)
    })
    this.orientation.subscribe('portrait', () => {
      console.warn(`Event: 'Portrait'`)
    })
    this.orientation.subscribe('landscape', () => {
      console.warn(`Event: 'Landscape'`)
    })
  },
  computed: {
    computedOrientation() {
      return this.orientation.state || ''
    },
    preview() {
      if (this.orientation.isPortrait) {
        return this.portrait
      }
      return this.landscape
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo {
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.preview {
  max-height: 640px;
  image-rendering: -webkit-optimize-contrast;
  @media screen and (max-width: 640px) {
    max-height: 420px;
  }
}

.preview.landscape {
  max-width: 640px;
  @media screen and (max-width: 640px) {
    max-width: 360px;
    max-height: 100%;
  }
}

.keyboard-tester {
  outline: none;
  border-radius: 0.5em;
}
</style>
