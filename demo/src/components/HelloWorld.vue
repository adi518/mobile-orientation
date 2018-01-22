<template>
  <div class="demo">
    <h1>Orientation:
      <i>{{computedOrientation.toUpperCase()}}</i>
    </h1>
  </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
import { MobileOrientation } from '@@/dist'

export default {
  name: 'Demo',
  data() {
    return {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo {
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
