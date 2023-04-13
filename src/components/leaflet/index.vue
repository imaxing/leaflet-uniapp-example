<template>
  <view id="map" :options="options" :change:options="callMap" :class="customClass" class="w-full h-full" />
</template>

<script>
export default {
  props: { customClass: { type: String, default: '' } },
  data: () => ({ options: {} }),
  methods: {
    callMap(options) {
      this.options = { ...options, date: Date.now() }
    }
  }
}
</script>

<script module="map" lang="renderjs">
import L, { icon } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

const app = new Vue({
  el: 'body',
  components: { LMap, LTileLayer, LMarker },
  data: () => ({
    zoom: 2,
    center: [],
    markers: [],
    layers: ['https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png']
  }),
  render(h) {
    console.log('render');
    const { zoom, center, layers, markers } = this
    const vlayers = layers.map(layer => h('l-tile-layer', { props: { detectRetina: true, url: layer } }))
    const vmarkers = markers.map(marker => {
      return h('l-marker', {
        props: {
          'lat-lng': [marker.latitude, marker.longitude],
          icon: icon({
            iconUrl: marker.icon,
            iconSize: [20, 20],
            iconAnchor: [20, 20]
          })
        }
      })
    })
    return h(
      'l-map',
      {
        class: 'h-screen w-screen',
        props: { zoom, options: { zoomControl: false, attributionControl: false, touchZoom: false, preferCanvas: true } },
        on: {
          'update:zoom': v => this.$emit('zoom-change', v),
          touchstart: e => e.preventDefault()
        }
      },
      vlayers.concat(vmarkers)
    )
  }
})

export default {
  methods: {
    callMap({ name, value }) {
      if (!(name in app)) return
      app[name] = value
    }
  }
}
</script>
<style lang="scss">
// #ifndef MP-WEIXIN
@import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.css');
// #endif
</style>
