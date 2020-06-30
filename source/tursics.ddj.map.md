# tursics.ddj.map.js

version 0.3

## description

to be done

it's required to include leaflet
```
	<script src="lib/leaflet-0.7.7/leaflet.js"></script>
```

include in HTML header
```
	<script src="lib/tursics.ddj.js"></script>
	<script src="lib/tursics.ddj.map.js"></script>
```


call in your JavaScript file
```
	ddj.map.init(elementName, settings);
```

A sample for settings 
```
var settings = {
	mapboxId: 'username.hash',
	mapboxToken: 'pk.mapbox.token',
	attribution: 'made with love',
	centerLat: 52.518413,
	centerLng: 13.408368,
	zoom: 13,
	onFocusOnce: null // callback function
};
```
