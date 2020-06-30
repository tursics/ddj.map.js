# tursics.ddj.js

version 0.1

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
