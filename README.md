# gc-portfolio-map widget
## Description
gc-portfolio-map is an JavaScript/HTML widget for visualizing the outputs of the ag|knowledge REST API from [geocledian](https://www.geocledian.com).
It is built as a reusable [Vue.js](https://www.vuejs.org) component which allows the integration in [Vue.js](https://www.vuejs.org) applications smoothly. 
You may but you don't have to build the rest of the container application with [Vue.js](https://www.vuejs.org).

## Purpose
With this widget you have an interactive map component for visualizing outputs from the REST API of ag|knowledge from geocledian.com. gc-portfolio-map may load many parcels and supports comparing them by a selected agknowledge product (e.g. ndvi or phenology products).

## Configuration
This widget is customizeable via HTML attributes and supports the setting of the following attributes.

### Basic options
- gc-apikey: API Key from geocledian, e.g. "39553fb7-7f6f-4945-9b84-a4c8745bdbec"; default: '39553fb7-7f6f-4945-9b84-a4c8745bdbec'
- gc-host: base host, e.g. "geocledian.com"; default: 'geocledian.com'
- gc-basemap: background (basemap) to use in the map, e.g. "osm", "google" or "arcgis"; default: "osm"
- gc-selected-product: set selected product for the comparison of the parcels in the map, e.g. "$root.selectedProduct" or static e.g. "savi"; default: "" (empty)
- gc-data-source: current datasource, e.g. "$root.dataSource" (synchro from root) or static e.g. "sentinel2", "landsat8" or "" (all); default: "" (all)
- gc-query-date: date as simple ISO date string to compare the parcels for an index product, e.g. '2020-03-01' or "$root.queryDate"; default: ""
- gc-language: initial locale language for translation, e.g. "en" for english; default: "en"
  
### UI options
- gc-available-products: limit the available products, e.g. "ndvi,ndwi"; default: "vitality,ndvi,ndwi,ndre1,ndre2,savi,evi2,cire,npcri,sos,pos,eos"
- gc-available-tools: limit the available tools in the UI, e.g. "queryDateSelector,productSelector"; default: "productSelector,queryDateSelector,queryIndexValue,hints"
- gc-available-options: limit the available options in the UI, e.g. "" for not title at all; default: "optionsTitle,zoomToSelected"
- gc-options-collapsed: start the widget with options collapsed; default: "true"

### Advanced options
#### Proxy mode / URL options
- gc-proxy: string which defines an alternative URL for sending the requests made by the widget instead of gc-host, e.g. "someproxy.someserver.com/app"; default: undefined

> __Note__: in proxy mode both gc-host and gc-api-key attributes are ignored and will not be sent to the given gc-proxy URL! It is assumed, that the Proxy will add the key parameter to the URL and sends the modified URL to the agknowledge service.

- gc-api-base-url: string for changing the base API URL for the agknowledge service; default: "/agknow/api/v3"
- gc-api-secure: boolean for specifying if HTTPS or HTTP shall be used sending the requests made by the widget;  default: true

#### Other
- gc-filter-string: filter string which may be defined externally; e.g. "&crop=bla"; default: ""
- gc-offset: offset in request which may be defined externally; e.g. 1000; default: 0
- gc-limit: limit of total parcels per request which may be defined externally; e.g. 100; default: 250
- gc-parcels: array of parcel objects to be displayed in the map; may be passed externally or loaded by the widget itself; default: []
- gc-selected-parcel-ids: array of parcel ids, which contain the parcel ids of the user selected parcels in the map, e.g. "$root.selectedParcelIds"; default: []
- gc-ph-startdate: startdate as simple ISO date string for phenology product, e.g. '2020-04-01'; default: ""
- gc-ph-enddate: enddate as simple ISO date string for phenology product, e.g. '2020-11-01'; default: ""
- gc-current-parcel-id: used to highlight a parcel in the map; may be set externally; default: -1
- gc-initial-loading: loads the parcels within this map component itself; if set to false the widget waits for gc-parcels to be set; default: "true"


>Note: As there are defaults you will only have to set an attribute to change the default internal value.

## Integration
For the integration of the widget you have two options.
<br> 
Either 
- run the widget with the provided init script `gc-portfolio-init.js` which cares of loading dependent libraries like Vue, Leaflet, etc. **This is the recommended way!**
- run the widget with the regular `gc-portfolio-map.js` script. Then you'll have to load the libraries and you'll have to create the root Vue instance which controls the child by yourself. **Embedded mode**

You have to add some dependencies in the head tag of the container website.
>Please ensure, that you load Vue.js (v.2.6.x) before loading the component first!
Also note that <a href="www.bulma.org">bulma.css</a> and <a href="www.fontawesome.org">Font awesome</a> wll be loaded through gc-portfolio-map.css.


```html
<html>
  <head>

    <!--GC component begin -->

    <!-- loads also dependent css files via @import -->
    <link href="css/gc-portfolio-map.css" rel="stylesheet">
    <!-- init script for components -->
    <script src="js/gc-portfolio-map.js"></script> 

    <!--GC component end -->
  </head>
```

Then you may create the widget(s) with custom HTML tags anywhere in the body section of the website. Make sure to use an unique identifier for each component. 


```html
<div id="gc-app">
    <gc-portfolio-map       
        gc-widget-id="map1" 
        :gc-apikey="$root.gcApikey" 
        :gc-host="$root.gcHost"
        gc-basemap="osm"
        gc-available-tools="productSelector,queryDateSelector,queryIndexValue,hints" 
        gc-available-products="ndvi,cire"
        :gc-selected-product="$root.selectedProduct"
        :gc-ph-startdate="$root.phStartdate"
        :gc-ph-enddate="$root.phEnddate"
        :gc-query-date="$root.queryDate"
        :gc-current-parcel-id="$root.selectedParcelId"
        :gc-selected-parcel-ids="$root.selectedParcelIds"
        :gc-parcels="$root.parcels"
        :gc-filter-string="$root.filterString"
        :gc-limit="$root.limit"
        :gc-offset="$root.offset"
        :gc-initial-loading="false"
        gc-available-options=""
        :gc-options-collapsed="true"
        :gc-language="$root.language">
    </gc-portfolio-map>
</div>
```
## Support
The widget is provided as is and we accept no liability for the source code. In case of bugs or questions please contact us at [us](mailto:info@geocledian.com). We are also happy to receive feedback. Unfortunately we can only offer very limited technical support, especially about integration in third party software.

## Used Libraries
- [Vue.js](https://www.vuejs.org)
- [Vue I18n](https://kazupon.github.io/vue-i18n/)
- [Leaflet](https://leafletjs.com/)
- [Leaflet Draw Plugin](http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html)
- [Leaflet GeoSearch Plugin](https://github.com/smeijer/leaflet-geosearch)

## Legal: Terms of use from third party data providers
- You have to add the copyright information of the used data. At the time of writing the following text has to be visible for [Landsat](https://www.usgs.gov/information-policies-and-instructions/crediting-usgs) and [Sentinel](https://scihub.copernicus.eu/twiki/pub/SciHubWebPortal/TermsConditions/TC_Sentinel_Data_31072014.pdf) data:

```html
 contains Copernicus data 2020.
 U.S. Geological Service Landsat 8 used in compiling this information.
```

**geocledian is not responsible for illegal use of third party services.**
