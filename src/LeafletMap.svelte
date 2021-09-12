<script>
  import L from 'leaflet';
  import { onMount, afterUpdate } from 'svelte';
  export let events;
  export let year;
  export let all;

  let mapContainer;
  let leafletMap;
  let yearLayers = [];
  let layerGroups = [];

  const corner1 = L.latLng(28.865583069965584, -104.0892633488044);
  const corner2 = L.latLng(26.609405211367722, -100.21897745762217);
  const bounds = L.latLngBounds(corner1, corner2);

  onMount(async () => {
    
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '',
      maxZoom: 18,
      id: 'elsonny/ckr0mte00008w17nub12vdyxp',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZWxzb25ueSIsImEiOiJjazkwYWQ2d28wMDJ4M25vNjR3b2h5bWpiIn0.iQk1NtwS-2bJafmWg5Ol9w',
    });

    events.forEach(e => {
      let offset = e.offset ? 'margin-left: '+e.offset+'px' : '';
      let icon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div class='event-marker'></div>",
        iconSize: [10, 10],
        iconAnchor: [e.offset || 0, 0]
      });
      let tooltip = {
        className : 'event-tooltip',
        permanent: false,
        direction: 'right',
        permanent: false,
        offset: [-e.offset || 0, 0]
      }
      let marker = L.marker([e.lat, e.long],{icon:icon}).bindTooltip('<p class="date">'+e.year+'</p>'+e.company,tooltip);
      let yearIndex = e.year - 2006;
      if(yearLayers[yearIndex]){
        yearLayers[yearIndex].push(marker);
      }else{
        yearLayers[yearIndex] = [marker];
      }
    });
   layerGroups = yearLayers.map(year => L.layerGroup(year));

    leafletMap = L.map(mapContainer, { 
      scrollWheelZoom: false,
      attributionControl: false,
      zoomControl : false,
      layers : [tiles,...layerGroups]
    }).fitBounds(bounds);

    resize();


  });
    const addLayers = (index,layerGroups) => {
      if(leafletMap){
        layerGroups.forEach(layerGroup => {
          layerGroup.remove();
        });
        if(year >= 0){
          leafletMap.addLayer(layerGroups[index]);
        }else{
          layerGroups.forEach(g => leafletMap.addLayer(g));
        }
      }
    }

    $: addLayers(year-2006,layerGroups);
  
  const resize = () => {
    leafletMap.invalidateSize().fitBounds(bounds);
  };

</script>
<div class="map" bind:this="{mapContainer}">
</div>

<style>
  .map {
    height:calc(100vh - 150px);
    width: 100%;
  }

</style>