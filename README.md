# ddj.map.js

ddj.map makes it easier working with data on maps

https://www.npmjs.com/package/ddj.map

## Write your own map

### 1. Create a HTML file template

todo

```
<!DOCTYPE HTML>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=7; IE=EmulateIE9; IE=10" />

	<!-- placeholder for Google, Facebook and Twitter -->
	<!-- placeholder for data source -->
</head>
<body>
	<div data-role="page" id="map"></div>
</body>
</html>
```

### x. set data source

Replace ...

```
	<meta name="ddj:data" content="path/to/data.csv">
	<meta name="ddj:dataIgnoreSecondLine" content="false">
	<meta name="ddj:dataIgnoreLastLine" content="false">
	<meta name="ddj:dataUniqueIdentifier" content="id">
```

### x. setup libs
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.min.js"></script>

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
	<link rel="stylesheet" href="ddj.map.css" />
	<link rel="stylesheet" href="theme/realestate/index.css" />

	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="https://unpkg.com/ddj.map@1.0.4/dist/ddj.map.js"></script>
	<script src="index.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.js"></script>

### x. setup the map

	<meta name="ddj:mapboxId" content="tursics.l7ad5ee8">
	<meta name="ddj:mapboxToken" content="pk.eyJ1IjoidHVyc2ljcyIsImEiOiI1UWlEY3RNIn0.U9sg8F_23xWXLn4QdfZeqg">
	<meta name="ddj:mapCenter" content="52.527040, 13.338440"> <!-- center old city hall of Berlin-Mitte -->
	<meta name="ddj:mapZoom" content="13">

### x. setup the map pins

	<meta name="ddj:pinColor" content="white">
	<meta name="ddj:pinIconPrefixColumn" content="pin-prefix">
	<meta name="ddj:pinIconColumn" content="pin">

### x. other configuration

```
	dataShareURI = tools.getMetaContent('ddj:shareURI')
	pinColorColumn = tools.getMetaContent('ddj:pinColorColumn') || '',
	pinIcon = tools.getMetaContent('ddj:pinIcon') || '',
	pinIconPrefix = tools.getMetaContent('ddj:pinIconPrefix') || '',
	searchTitleColumn = tools.getMetaContent('ddj:searchTitleColumn') || '',
	searchDescriptionColumn = tools.getMetaContent('ddj:searchDescriptionColumn') || '',

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.4.11/jquery.autocomplete.min.js"></script>
```

### x. prepare for Google, Facebook and Twitter

Replace ...

```
	<meta name="author" content="My name" />
	<meta name="keywords" content="comma,separated,list,of,keywords" />
	<meta name="robots" content="index,follow" />

 	<title>Website title</title>
	<meta property="og:title" content="Website title" />

	<meta name="description" content="Website description" />
	<meta property="og:description" content="Website description" />

	<link rel="image_src" type="image/png" href="http://path/to/website/assets/social.png" />
	<meta property="og:image" content="http://path/to/website/assets/social.png" />

	<meta property="og:url" content="http://path/to/website/">

	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary">
	<meta name="twitter:site" content="@twitter_handle">
	<meta name="twitter:creator" content="@twitter_handle">
```

### x. write a tutorial

```
<div data-role="popup" data-tutorial="dialog" id="popupTutorial" data-theme="b" class="ui-corner-all">
	<div data-tutorial="page">
		text for page 1
	</div>
	<div data-tutorial="page">
		text for page 2
	</div>
</div>
```


## Build your own package

To build the package, use:

```npm run build```

To build the package and run a watcher, use:

```npm run watch```

To publish the package on npmjs.com:

- open ```package.json``` and increase the version number
- ```npm run watch```
- fill in the npmjs.com credencials
- tag the version in github
