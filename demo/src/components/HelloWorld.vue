<template>
  <div class="demo">
    <div class="wrap">
      <img class="preview" :class="[computedOrientation]" :src="preview" :alt="computedOrientation">
      <div class="keyboard-tester">
        <h4> keyboard tester </h4>
        <input>
      </div>
    </div>
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
      orientation: new MobileOrientation()
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
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  touch-action: none;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.wrap {
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
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
  max-width: 480px;
  max-height: 100%;
  @media screen and (max-width: 640px) {
    max-width: 320px;
    max-height: 100%;
  }
}

.keyboard-tester {
  h4 {
    text-align: center;
  }

  input {
    width: 100%;
    outline: none;
    border-radius: 0.5em;
  }
}
</style>
