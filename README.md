# ddj.map.js

ddj.map makes it easier working with data on maps

* [get the npm package](https://www.npmjs.com/package/ddj.map)
* [get some sample](https://tursics.github.io/ddj.map.js/sample/)

This is one of the very first version of this npm package.
Adding more functionality and removing the bugs occupy much time.
So the documentation suffers a lot.

## Write your own map

### 1. Create a HTML file template

Create a new and empty HTML file.
Copy the code below and get a blueprint of a simple website.
The lines beginning with ```<!--``` are placeholder for later use.

``` html
<!DOCTYPE HTML>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=7; IE=EmulateIE9; IE=10" />

    <!-- put in your app icon here -->
    <!-- put in the lib here -->
    <!-- put in the data here -->
    <!-- put in the map here -->
    <!-- put in the map pins here -->

    <!-- placeholder for Google, Facebook and Twitter -->
</head>
<body>
</body>
</html>
```

Language setting, e.g. ```lang="de"``` for map attribution.

``` html
<html lang="de" xmlns="http://www.w3.org/1999/xhtml">
```

### 2. use the lib and choose a theme

Replace ...

``` html
<!-- put in the lib here -->
<link rel="stylesheet" href="https://unpkg.com/ddj.map@1.0.19/dist/ddj.map.css" />
<script src="https://unpkg.com/ddj.map@1.0.19/dist/ddj.map.js"></script>
```

### 3. set a data source

Replace ...

``` html
<!-- put in the data here -->
<meta name="ddj:data" content="path/to/data.csv">
<meta name="ddj:dataType" content="csv">
<meta name="ddj:dataUniqueIdentifier" content="id">
```

```dataType``` is one of

* json (default)
* geojson
* csv
* wfs (in planning)

If you see CORS problems use

``` html
<meta name="ddj:dataUseCorsProxy" content="cors-anywhere.herokuapp.com">
```

Additional ...

``` html
<meta name="ddj:dataIgnoreSecondLine" content="false">
<meta name="ddj:dataIgnoreLastLine" content="false">
<meta name="ddj:dataNoCache" content="true">
<meta name="ddj:dataDelimiter" content=",">
<meta name="ddj:latitudeColumn" content="lat">
<meta name="ddj:longitudeColumn" content="lng">
```

Info ... CORS problems should be solved by 3rd party proxy

### 4. setup the map

Replace ...

``` html
<!-- put in the map here -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"></script>
<meta name="ddj:mapCenter" content="52.527040, 13.338440"> <!-- center old city hall of Berlin-Mitte -->
<meta name="ddj:mapZoom" content="13">

<body class="m-0">
    <div data-map id="map"></div>
</body>
```

openstreetmap style or mapbox style ...

``` html
<meta name="ddj:mapboxToken" content="pk.eyJ1IjoidHVyc2ljcyIsImEiOiI1UWlEY3RNIn0.U9sg8F_23xWXLn4QdfZeqg">
```

### 4b. attribute

Replace ...

``` html
<body class="m-0">
    <div data-map id="map">
        <div data-map="attribution">
            <a href="https://www.npmjs.com/package/ddj.map" title="ddj.map" target="_blank">ddj.map</a>
        </div>
    </div>
</body>
```

### 5. show map pins

Replace ...

* white
* red
* darkred
* lightred
* orange
* beige
* green
* darkgreen
* lightgreen
* blue
* darkblue
* lightblue
* purple
* darkpurple
* pink
* cadetblue
* gray
* lightgray
* black

Font Awesome 5.x [register for free...](https://fontawesome.com/start)

``` html
<!-- put in the map pins here -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.min.js"></script>
<script src="https://kit.fontawesome.com/d2a4339e1e.js" crossorigin="anonymous"></script>
<meta name="ddj:pinColor" content="cadetblue">
<meta name="ddj:pinIconPrefix" content="fas">
<meta name="ddj:pinIcon" content="fa-certificate">

<meta name="ddj:pinColorColumn" content="pin-color">
<meta name="ddj:pinIconPrefixColumn" content="pin-icon-prefix">
<meta name="ddj:pinIconColumn" content="pin-icon">

<meta name="ddj:borderColor" content="darkred">
<meta name="ddj:borderWeight" content="1">
<meta name="ddj:fillColor" content="red">
<meta name="ddj:fillOpacity" content=".25">

<meta name="ddj:invertPolygons" content="true">

<meta name="ddj:borderColorColumn" content="border-color">
<meta name="ddj:borderWeightColumn" content="border-weight">
<meta name="ddj:fillColorColumn" content="fill-color">
<meta name="ddj:fillOpacityColumn" content="fill-opacity">
```

### x. setup libs

``` html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.css" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="index.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.js"></script>
```

### x. other configuration

``` html
dataShareURI = tools.getMetaContent('ddj:shareURI')
searchTitleColumn = tools.getMetaContent('ddj:searchTitleColumn') || '',
searchDescriptionColumn = tools.getMetaContent('ddj:searchDescriptionColumn') || '',

data-hide-if-zero

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.4.11/jquery.autocomplete.min.js"></script>
```

### x. save parameter in url

``` html
<a href="#" data-key="city" data-value="Berlin">Berlin</a>

ddj.autostart.onInitURL(function(obj) {
    console.log(obj);
});
ddj.autostart.onKeyValueLinkClicked(function(key, value) {
    console.log(key, value);
});
ddj.url.replace({city: 'Berlin'});
ddj.url.push({city: 'Berlin'});
```

### x. prepare for Google, Facebook and Twitter

Replace ...

``` html
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

<!-- put in your app icon here -->
<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
```

### x. write a tutorial

``` html
<div data-role="popup" data-tutorial="dialog" id="popupTutorial" data-theme="b" class="ui-corner-all">
    <div data-tutorial="page">
        text for page 1
    </div>
    <div data-tutorial="page">
        text for page 2
    </div>
</div>
```

### x. advanced - add some interaction

``` html
<script>
    ddj.autostart.onDone(function() {
        ddj.map.get().scrollWheelZoom.disable();
    });

    ddj.autostart.onAddMarker(function(marker, value) {
        marker.index = key;
        marker.count = valCount;
        marker.lat = lat;
        marker.lng = lng;
        marker.color = 'blue';
        marker.opacity = 1;
        marker.clickable = 1;
        marker.iconPrefix = 'fa';
        marker.iconFace = 'fa-dot-circle-o';

        return true;
    });

    // for geojson files...
    ddj.autostart.onAddMarker(function(marker, value) {
        marker.borderColor = '#088';
        marker.borderWeight = 1;
        marker.fillColor = '#8ff';
        marker.fillOpacity = .5;
        marker.dashArray = null;
        marker.dashOffset = null;
    });

    ddj.autostart.onSelected(function(selectedItem) {
        console.log(selectedItem);
    });

</script>
```

### To Do

Include polyfill for

* [CSS.escape](https://github.com/mathiasbynens/CSS.escape)

## Build your own package

To build the package, use:

```npm run build```

To build the package and run a watcher, use:

```npm run watch```

To publish the package on npmjs.com:

* open ```package.json``` and increase the version number
* increase the version number in this ```README``` file
* increase the version number in ```sample/sample.js``` file
* ```npm run release```
* fill in the npmjs.com credencials
* push and tag the version in github
