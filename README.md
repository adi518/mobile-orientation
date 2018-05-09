# Mobile-Orientation
Detect Mobile Portrait/Landscape on resize. See [demo](https://adi518.github.io/mobile-orientation/).
## Browser compatibility
See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).
## Install
```
npm install --save mobile-orientation
```
## Usage
```js
import { MobileOrientation } from 'mobile-orientation'

const orientation = new MobileOrientation()

console.log(orientation.state) // 'portrait'

orientation.on('resize', state => console.log(state)) // portrait or landscape
orientation.on('portrait', state => console.log(state)) // portrait
orientation.on('landscape', state => console.log(state)) // landscape
```
Alternatively, the state can be utilized within a computed property, a la [Vue.js Computed Property](https://vuejs.org/v2/guide/computed.html).
```js
// Vue Component
export default {
    data() {
        return {
            orientation: new MobileOrientation()
        }
    },
    computed: {
        isPortrait() {
            return this.orientation.isPortrait
        },
        isLandscape() {
            return this.orientation.isLandscape
        }
    }
}
```
## Options

#### `debounceTime`
* Type: `Number`
* Default: `50`
* Format: Milliseconds
* Description: Time to wait before invoking detection.

#### `withTouch`
* Type: `Boolean`
* Default: `false`
* Description: Include touch-device when testing mobile.

#### `portraitMediaQuery`
See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) for media queries syntax.

* Type: `String`
* Default: `screen and (max-device-aspect-ratio: 1/1)`
* Format: CSS Media Query
* Description: CSS Media Query to test against portrait.

#### `landscapeMediaQuery`
See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) for media queries syntax.

* Type: `String`
* Default: `all`
* Format: CSS Media Query
* Description: CSS Media Query to test against landscape.