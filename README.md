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
	<div data-role="page" id="pageMap">
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

### x. other configuration

```
	mapCenter = tools.getMetaContent('ddj:mapCenter')
	mapboxId: tools.getMetaContent('ddj:mapboxId')
	mapboxToken: tools.getMetaContent('ddj:mapboxToken')
	zoom: tools.getMetaContent('ddj:mapZoom')
	dataShareURI = tools.getMetaContent('ddj:shareURI')
	var pinColor = tools.getMetaContent('ddj:pinColor') || '',
		pinColorColumn = tools.getMetaContent('ddj:pinColorColumn') || '',
		pinIcon = tools.getMetaContent('ddj:pinIcon') || '',
		pinIconColumn = tools.getMetaContent('ddj:pinIconColumn') || '',
		pinIconPrefix = tools.getMetaContent('ddj:pinIconPrefix') || '',
		pinIconPrefixColumn = tools.getMetaContent('ddj:pinIconPrefixColumn') || '';
		pinColor = tools.getMetaContent('ddj:pinColor') || '',
		pinColorColumn = tools.getMetaContent('ddj:pinColorColumn') || '',
		pinIcon = tools.getMetaContent('ddj:pinIcon') || '',
		pinIconColumn = tools.getMetaContent('ddj:pinIconColumn') || '',
		pinIconPrefix = tools.getMetaContent('ddj:pinIconPrefix') || '',
		pinIconPrefixColumn = tools.getMetaContent('ddj:pinIconPrefixColumn') || '',
		searchTitleColumn = tools.getMetaContent('ddj:searchTitleColumn') || '',
		searchDescriptionColumn = tools.getMetaContent('ddj:searchDescriptionColumn') || '',

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
