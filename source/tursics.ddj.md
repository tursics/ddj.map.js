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
	<!-- setup the data -->
	<meta name="ddj:data" content="data.json">
	<meta name="ddj:dataIgnoreSecondLine" content="false">
	<meta name="ddj:dataIgnoreLastLine" content="false">
	<meta name="ddj:dataUniqueIdentifier" content="title">

	<!-- setup the map -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.min.js"></script>
	<meta name="ddj:mapboxId" content="username.mapboxID">
	<meta name="ddj:mapboxToken" content="pk.mapbox.token">
	<meta name="ddj:mapCenter" content="52.524889, 13.367792"> <!-- center the main station in Berlin-Mitte -->
	<meta name="ddj:mapZoom" content="13">

	<!-- setup the map pins -->
	<meta name="ddj:pinColor" content="green">
	<meta name="ddj:pinIcon" content="fa-times">
	<meta name="ddj:pinIconPrefix" content="fa">
	<meta name="ddj:pinColorColumn" content="pinColor">
	<meta name="ddj:pinIconColumn" content="pinIcon">
	<meta name="ddj:pinIconPrefixColumn" content="pinIconPrefix">

	<!-- setup the welcome screen -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.4.11/jquery.autocomplete.min.js"></script>

	<!-- setup the search -->
	<meta name="ddj:searchTitleColumn" content="title">
	<meta name="ddj:searchDescriptionColumn" content="description">

	<!-- other -->
	<link rel="stylesheet" href="../../source/tursics.ddj.css" />
	<script src="../../source/tursics.ddj.js"></script>
	<script src="../../source/tursics.ddj.autostart.js"></script>
	<script src="../../source/tursics.ddj.map.js"></script>
	<script src="../../source/tursics.ddj.marker.js"></script>
	<script src="../../source/tursics.ddj.quickinfo.js"></script>
	<script src="../../source/tursics.ddj.search.js"></script>
	<script src="../../source/tursics.ddj.tutorial.js"></script>
	<script src="../../source/tursics.ddj.voronoi.js"></script>
</head>
<body>

	<!-- show the map -->
	<div id="map">
		<div class="attribution">
			<a href="http://tursics.de" title="tursics.ddj">tursics.ddj</a>
		</div>
	</div>

	<!-- show the welcome screen -->
	<div class="visibleWithoutErrors" data-welcome="box">
		<h3>
			Best data visualization
		</h3>
		<div>
			Short description
		</div>
		<div data-search="box" class="visibleWithData hideMobile">
			<input type="text" name="searchterm" id="autocomplete" data-search="textinput" placeholder="search" />
			<div><i class="fa fa-search" aria-hidden="true"></i></div>
			<div data-search="noSuggestion">
				<i class="fa fa-info-circle" aria-hidden="true"></i> Please enter a valid text
			</div>
		</div>
		<div class="visibleWithoutData">
			<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
		</div>
	</div>

	<!-- show the tutorial screen -->
	<div data-role="popup" data-tutorial="dialog" id="popupTutorial" data-theme="b" class="ui-corner-all">
		<div data-tutorial="page">
			Some text
		</div>
	</div>

	<!-- starting point for own settings screen -->
	<script>
		ddj.autostart.onDone(function() {
			// todo
		});
	</script>
</body>
```
