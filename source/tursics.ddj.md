# tursics.ddj.js

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
```


call in your JavaScript file
```
	ddj.init(data);   // init DDJ lib and set user data

	ddj.getData();    // return the data given as parameter in init() function
	ddj.getData(key); // return the value of user data[key].
	                  // If key is null, complete data will return
					  // If an unique identifier is set, this function return an array of data

	ddj.setUniqueIdentifier('stationID'); // set key to identify equal values, like 1:n data
	ddj.getUniqueIdentifier();            // get the unique key or null

```

## workflow

- waiting on 'page show' event
- search div for map with the id 'map'
- initialize the map with with informations from meta tags

## boilerplate

```
<head>
	<!-- setup the map -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.min.js"></script>
	<meta name="ddj:mapboxId" content="username.mapboxID">
	<meta name="ddj:mapboxToken" content="pk.mapbox.token">
	<meta name="ddj:mapCenter" content="52.524889, 13.367792"> <!-- center the main station in Berlin-Mitte -->
	<meta name="ddj:mapZoom" content="13">

	<!-- other -->
	<link rel="stylesheet" href="../../source/tursics.ddj.css" />
	<script src="../../source/tursics.ddj.js"></script>
	<script src="../../source/tursics.ddj.map.js"></script>
	<script src="../../source/tursics.ddj.marker.js"></script>
	<script src="../../source/tursics.ddj.quickinfo.js"></script>
	<script src="../../source/tursics.ddj.search.js"></script>
	<script src="../../source/tursics.ddj.voronoi.js"></script>
</head>
<body>
	<div id="map">
		<div class="attribution">
			<a href="http://tursics.de" title="tursics.ddj">tursics.ddj</a>
		</div>
	</div>
</body>
```
