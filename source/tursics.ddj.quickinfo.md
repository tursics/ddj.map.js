# tursics.ddj.quickinfo.js

version 0.3

## description

to be done


include in HTML header
```
	<script src="lib/tursics.ddj.js"></script>
	<script src="lib/tursics.ddj.quickinfo.js"></script>
```


call in your JavaScript file
```
	ddj.quickinfo.init();

	ddj.quickinfo.show(obj); // show quick info for the given object

	ddj.quickinfo.setVisible(show); // show or hide (true | false) quickinfo window
```

sample HTML file
```
	data-quickinfo="box"
	data-quickinfo="close"
	data-quickinfo="group"
	'#rec' + key
	hasClass('number')
	hasClass('boolean')
	data-quickinfo="list"
	data-quickinfo="item"
```
