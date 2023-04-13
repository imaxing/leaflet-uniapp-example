<template>
  <leaflet-map ref="map" custom-class="w-screen h-screen" />
</template>

<script>
import LeafletMap from '@/components/leaflet'
export default {
  name: 'Home',
  components: { LeafletMap }
  // onLoad() {
  //   let zoom = 1
  //   setInterval(() => {
  //     ++zoom

  //     if (zoom > 18) zoom = 1
  //     this.$refs.map.callMap({ name: 'zoom', value: zoom })
  //   }, 2000)
  // }
}
</script>
