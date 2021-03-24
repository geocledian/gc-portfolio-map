/*
 Vue.js Geocledian portfolio map component
 created:     2019-11-04, jsommer
 last update: 2020-11-24, jsommer
 version: 0.6.9
*/
"use strict";

Date.prototype.addDays = function (a) {
  var b = new Date(this.valueOf());
  return b.setDate(b.getDate() + a), b
}

Date.prototype.simpleDate = function () {
  var a = this.getFullYear(),
    b = this.getMonth() + 1,
    c = this.getDate();
  return a + "-" + (1 === b.toString().length ? "0" + b : b) + "-" + (1 === c.toString().length ? "0" + c : c)
}
//https://www.epochconverter.com/daynumbers
Date.prototype.getDOY = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((this - onejan) / 86400000);
}

const gcPortfolioMapLocales = {
    "en": {
        "options": { 
                    "title": "Map options",
                    "zoomLabel": "Zoom",
                    "zoomAfterFilter": "Zoom after filter"
        },
        "products": { 
                    "sos": "Start of season",
                    "pos": "Peak of season",
                    "eos": "End of season",
                    "vitality": "Vitality",
                    "ndvi": "NDVI",
                    "ndre1": "NDRE1",
                    "ndre2": "NDRE2",
                    "ndwi": "NDWI",
                    "savi": "SAVI",
                    "evi2": "EVI2",
                    "cire": "CIRE",
                    "npcri": "NPCRI"
        },
        "productSelector": { 
                            "choose": "Please choose...",
                            "phenology": ">> Phenology <<",
                            "indices": ">> Indices <<"
        },
        "layers": { 
                "parcels": "Parcels",
                "centroids": "Centroids"
        },
        "map": { 
                "zoomIn": "Zoom in",
                "zoomOut": "Zoom out",
                "searchLabel": "Search location",
                "buttons": {
                    "zoomToSelected": { "title": "Zoom to selected" },
                    "clearSelection": { "title": "Clear selection"},
                    "toggleLegend": { "title": "Toggle legend"},
                    "queryIndexValue": { "title": "Query Index Value"},
                    "showHints": { "title": "Show hints"}
                },
                "popups" : { 
                  "parcelID": "ParcelID",
                  "indexValue": "Index value",
                  "value": "Value"
                }
        },
        "legend": {"doy": "Day of year", "intervals": "Intervals"},
        "hints": {
                    "title": "General help",
                    "sentence_1": "Set an attribute filter or hit the button >Apply Filter<. The filtered centroids of the parcels are mapped as markers.",
                    "sentence_2": "Select a product from the dropdown list.",
                    "sentence_3": "Hover the mouse over the markers to explore the parcel's attributes.",
                    "sentence_4": "Click one or several markers of interest in the map to load the real parcel's geometries and the selected product.",
                    "sentence_5": "For Phenology products: set start and enddate of the season of interest in the date controls.",
                    "sentence_6": "For Index products: set date of interest in the date control.",
                    "selectProduct": "Select a product"
        },
        "status_msg": {
          "unauthorized_key" : "Sorry, the given API key is not authorized!",
          "invalid_key" : "Sorry, the given API key's validity expired!",
          "support": "Please contact <a href='https://www.geocledian.com'>geo|cledian</a> for support.",
          "parcel_id_not_found" : "Parcel ID not found!",
          "no_data_msg" : "No data available"
        },
    },
    "de": {
        "options": { "title": "Kartenoptionen",
                "zoomLabel": "Zoom",
                "zoomAfterFilter": "Zoom auf Zentroide nach Filteranwendung"
                },
        "products": { 
                    "sos": "Saisonbeginn",
                    "pos": "Saisonales Maximum",
                    "eos": "Saisonende",
                    "vitality": "Vitalität",
                    "ndvi": "NDVI",
                    "ndre1": "NDRE1",
                    "ndre2": "NDRE2",
                    "ndwi": "NDWI",
                    "savi": "SAVI",
                    "evi2": "EVI2",
                    "cire": "CIRE",
                    "npcri": "NPCRI"
        },
        "productSelector": { 
                            "choose": "Bitte wählen...",
                            "phenology": ">> Phenologie <<",
                            "indices": ">> Indices <<"
        },
        "layers": { 
                    "parcels": "Felder",
                    "centroids": "Zentroide"
        },
        "map": { 
            "zoomIn": "Hineinzoomen",
            "zoomOut": "Herauszoomen",
            "searchLabel": "Suche nach Ort",
            "buttons": {
                "zoomToSelected": { "title": "Zur Auswahl zoomen" },
                "clearSelection": { "title": "Auswahl aufheben" },
                "toggleLegend": { "title": "Legende an/aus" },
                "queryIndexValue": { "title": "Indexwert abfragen" },
                "showHints": { "title": "Hinweise zeigen" }
            },
            "popups" : { 
              "parcelID": "Parcel Nr",
              "indexValue": "Index Wert",
              "value": "Wert"
            }
        },
        "legend": {"doy": "Tag des Jahres", "intervals": "Intervalle"},
        "hints": {
            "title": "Allgemeine Hinweise",
            "sentence_1": "Setzen Sie einen Attributfilter oder klicken Sie auf die Schaltfläche >Filter anwenden<. Die gefilterten Zentroide der Flächen werden als Markierungen abgebildet.",
            "sentence_2": "Wählen Sie ein Produkt aus der Dropdown-Liste.",
            "sentence_3": "Fahren Sie mit der Maus über die Markierungen, um die Eigenschaften der Fläche zu zeigen.",
            "sentence_4": "Klicken Sie auf eine oder mehrere Markierungen in der Karte, um die Geometrien der Fläche und das ausgewählte Produkt zu laden.",
            "sentence_5": "Für Phänologie-Produkte: Legen Sie Beginn und Ende der betreffenden Saison in den Datumskontrollen fest.",
            "sentence_6": "Für Index-Produkte: Setzen Sie ein Datum in der Datumssteuerung am oberen Rand der Karte.",
            "selectProduct": "Wählen Sie ein Produkt"
        },
        "status_msg": {
          "unauthorized_key" : "Tut uns leid, der angegebene API Schlüssel existiert nicht!",
          "invalid_key" : "Tut uns leid, die Gültigkeit des angegebenen API Schlüssels ist abgelaufen.",
          "support": "Bitte kontaktieren Sie <a href='https://www.geocledian.com'>geo|cledian</a> für weitere Unterstützung.",
          "parcel_id_not_found" : "Parcel ID nicht gefunden!",
          "no_data_msg" : "Keine Daten verfügbar",
        },
    },
}

Vue.component('gc-portfolio-map', {
  props: {
    gcWidgetId: {
      type: String,
      default: 'map1',
      required: true
    },
    gcBasemap: {
      type: String,
      default: 'google'
    },
    gcApikey: {
      type: String,
      default: '39553fb7-7f6f-4945-9b84-a4c8745bdbec'
    },
    gcHost: {
      type: String,
      default: 'geocledian.com'
    },
    gcProxy: {
      type: String,
      default: undefined
    },
    gcApiBaseUrl: {
      type: String,
      default: "/agknow/api/v3"
    },
    gcApiSecure: {
      type: Boolean,
      default: true
    },  
    gcDataSource: {
      type: String,
      default: "" // "landsat8", "sentinel2" or "" [all]
    },
    // compare product value for a certain date, e.g. mean of ndvi
    // or sos, pos and eos of phenology
    gcAvailableProducts: {
      type: String,
      default: "vitality,ndvi,ndwi,ndre1,ndre2,savi,evi2,cire,npcri,sos,pos,eos"
    },
    gcParcels: {
      type: Array,
      default: []
    },
    gcCurrentParcelId: {
      type: Number,
      default: -1
    },
    imageChangeInterval: {
      type: String,
      default: "400" //milliseconds
    },
    gcAvailableTools: {
      type: String,
      default: "productSelector,queryDateSelector,queryIndexValue"
    },
    gcQueryDate: {
      type: String,
      default: "" // empty string means 'latest' of available scene data or ISO date string, e.g. '2018-07-01'
    },
    gcPhStartdate:  {
      type: String,
      default: "" // ISO date string, e.g. '2018-03-01'
    },
    gcPhEnddate:  {
      type: String,
      default: "" // ISO date string, e.g. '2018-10-01'
    },
    entity: {
      type: String,
      default: "" // entity filter
    },
    crop: {
      type: String,
      default: "" // crop filter
    },
    name: {
      type: String,
      default: "" // name filter
    },
    gcInitialLoading: {
      type: Boolean,
      default: true // true: load first parcels by filter or false: wait for parcels to be set later (e.g. from Portfolio)
    },
    gcCentroids: {
      type: Array,
      default: []
    },
    gcFilterString: {
      type: String,
      default: ""
    },
    gcLimit: {
      type: Number,
      default: 250
    },
    gcOffset: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: "centroids" // "centroids" || "polygons"
    },
    gcSelectedProduct: {
      type: String,
      default: ""
    },
    gcSelectedParcelIds: {
      type: Array,
      default: []
    },
    gcAvailableOptions: {
      type: String,
      default: 'optionsTitle,zoomToSelected'
    },
    gcOptionsCollapsed: {
      type: Boolean,
      default: true // or false
    },
    gcLanguage: {
      type: String,
      default: 'de' // 'en' | 'de'
    }
  },
  template: `<div :id="this.gcWidgetId" class="is-inline">
              <p class="gc-options-title is-size-6 is-inline-block is-orange" 
                  style="margin-bottom: 1.0rem; cursor: pointer;"
                  v-on:click="toggleMapOptions"
                  v-if="availableOptions.includes('optionsTitle')">
               {{ $t("options.title") }}
               <i :class="[gcOptionsCollapsed ? '': 'is-active', 'fas', 'fa-angle-down', 'fa-sm']"></i>
              </p>
              
              <div :id="'mapOptions_'+gcWidgetId" :class="[gcOptionsCollapsed ? 'is-hidden': '', 'mapOptions', 'is-horizontal', 'is-flex']">
                <div class="is-horizontal is-flex">
                  <div class="field is-vertical">
                    <div class="field-label"><label class="label has-text-left is-small is-grey">{{$t("options.zoomLabel")}}</label></div>
                    <div class="field-body">
                      <input :id="'chkZoomToBounds_'+ gcWidgetId" type="checkbox" class="is-checkradio is-orange is-small" v-model="zoomToBounds">
                      <label :for="'chkZoomToBounds_'+ gcWidgetId" class="">{{ $t("options.zoomAfterFilter")}}</label>
                    </div>
                  </div>
                  </div>
              </div><!-- map options -->

            <div :id="'map_'+ this.gcWidgetId" class="gc-portfolio-map">
            <!-- mobile: onclick and onblur events instead of onmouseover and onmouseout -->
            <div :id="'layerControl_'+gcWidgetId" class="layerControl" v-on:mouseover="growLayerControl"
                                    v-on:mouseout="shrinkLayerControl"
                                    v-on:click="growLayerControl"
                                    v-on:blur="shrinkLayerControl">
              <button gc-portfolio-map :id="'btnLayerControl_'+gcWidgetId" class="button is-light is-orange">
                <img :src="this.getBaseURL('js/gc-portfolio-map.js') + 'img/layers.png'" width="18px" height="18px">
              </button>
              <div :id="'layerControlContent_'+gcWidgetId" class="layerControlContent is-hidden" style="display: inline-grid;">
                <input :id="'rdBasemap1_'+mapid" type="radio" class="is-checkradio is-orange is-small" :name="'basemap_'+gcWidgetId" 
                    value="arcgis" v-model="currentBasemap"  v-if="this.isArcGISValid">
                <label :for="'rdBasemap1_'+gcWidgetId" class="is-orange is-small"  v-if="this.isArcGISValid">ArcGIS Online</label>  
                <input :id="'rdBasemap2_'+gcWidgetId" type="radio" class="is-checkradio is-orange is-small" :name="'basemap_'+gcWidgetId"
                  value="osm" v-model="currentBasemap">
                <label :for="'rdBasemap2_'+gcWidgetId" class="is-orange is-small">OpenstreetMap</label>
                <input :id="'rdBasemap3_'+gcWidgetId" type="radio" class="is-checkradio is-orange is-small" :name="'basemap_'+gcWidgetId"
                  value="google" v-model="currentBasemap" v-if="this.isGoogleValid">
                <label :for="'rdBasemap3_'+gcWidgetId" class="is-orange is-small" v-if="this.isGoogleValid">Google Hybrid</label>
              <hr>
                <input :id="'cbOperational1_'+gcWidgetId" type="checkbox" class="is-checkradio is-orange is-small"
                  v-model="parcelLayerVisible">
                <label :for="'cbOperational1_'+gcWidgetId" class="is-orange is-small">{{$t("layers.parcels")}}</label>
                <input :id="'cbOperational2_'+gcWidgetId" type="checkbox" class="is-checkradio is-orange is-small"
                v-model="centroidLayerVisible">
              <label :for="'cbOperational2_'+gcWidgetId" class="is-orange is-small">{{$t("layers.centroids")}}</label>
              </div>
            </div><!-- layerControl -->

            <div :id="'divMapBtns_'+gcWidgetId" class="divMapBtns">
              <button gc-portfolio-map class="button is-orange is-light" v-on:click="zoomToSelectedParcels" :title="$t('map.buttons.zoomToSelected.title')">
                <i class="fas fa-compress-arrows-alt"></i>
              </button>
              <button gc-portfolio-map class="button is-orange is-light" v-on:click="clearSelection" :title="$t('map.buttons.clearSelection.title')">
                <i class="fas fa-times-circle fa"></i>
              </button>
              <button gc-portfolio-map :id="'btnToggleLegend_' +gcWidgetId" class="button is-light is-orange is-active" v-on:click="toggleLegend" :title="$t('map.buttons.toggleLegend.title')">
                <i class="fas fa-list-ul"></i>
              </button>
              <button gc-portfolio-map :id="'btnQueryIndexValue_'+gcWidgetId" :title="$t('map.buttons.queryIndexValue.title')" class="button is-light is-orange" 
                    v-on:click="queryIndexValueAction" v-if="availableTools.includes('queryIndexValue')" disabled>
              <i class="fas fa-info-circle"></i>
            </button>
            <button gc-portfolio-map :id="'btnHints_'+gcWidgetId" :title="$t('map.buttons.showHints.title')" class="button is-light is-orange" 
                    v-on:click="showHintsAction" v-if="availableTools.includes('hints')">
              <i class="fas fa-question-circle"></i>
            </button>
            </div>

            <!-- product selector -->
            <span class="tag is-medium" :class="{'is-hidden': !showHints}"
                  style="z-index: 1000; position: absolute; left: 4px; bottom: 58px; margin-bottom: 2px!important; padding-left: 4px;">
                    <i class="fas fa-arrow-circle-down fa-lg is-orange"></i>&nbsp;{{ $t('hints.selectProduct') }}
                  </span>
            <div class="field product-selector" style="z-index: 1000; position: absolute; left: 4px; bottom: 24px; margin-bottom: 2px!important;"
                  v-if="availableTools.includes('productSelector')">
              <div class="field-body">
                <!-- vue syntax for binding additional class on condition -->
                <div class="select" :class="{'is-orange': selectedProduct.length===0}">
                  <select v-model="selectedProduct" class="is-small" :class="{'is-orange': selectedProduct.length===0}">
                  <!-- option value="" disabled selected>{{ $t("productSelector.choose") }}</option -->
                  <!-- option disabled selected> {{ $t("productSelector.phenology") }} </option -->
                  <!-- option v-if="['sos','pos','eos'].includes(p)" v-for="p in availableProducts" v-bind:value="p">
                    <span>{{$t("products."+p)}}</span>
                  </option -->
                  <!-- option disabled> >> Indices << </option -->
                  <option v-for="p in availableProducts" v-bind:value="p">
                    <span>{{$t("products."+p)}}</span>
                  </option>
                  </select>
                </div>
              </div>
            </div> <!-- product selector -->
            
            <!-- map notice -->
            <div :id="'mapNotice_'+this.gcWidgetId" class="has-text-centered notification is-light is-hidden box is-size-6" 
                  style="z-index: 1001; margin: 4px 120px; line-height: initial;" >
            </div
            <!-- map notice -->

            <!-- date picker query date -->
            <div :id="'queryDate_'+this.gcWidgetId" class="field-body is-hidden" style="z-index: 1000; position: relative; margin: 0 auto; margin-top: 2px!important; max-width: 7rem;"
                  v-if="availableTools.includes('queryDateSelector')">
              <div class="control" style="">
                <input type="text" class="input is-small has-text-centered"
                  placeholder="[YYYY-MM-DD]" v-model="queryDate">
                <!-- span class="icon is-small is-left">
                  <i class="fas fa-clock fa-lg"></i>
                </span -->
              </div>
            </div> <!-- date picker query date -->

            <!--  phenology date container -->
            <div class="field is-horizontal" style="z-index: 1000; position: relative; margin: 0 auto; margin-top: 2px!important; width: 14rem;">
              <div class="field-body">
                <!-- phenology date picker start date -->
                <div :id="'phStartDate_'+this.gcWidgetId" class="is-hidden"
                      v-if="availableTools.includes('queryDateSelector')">
                  <div class="control">
                    <input type="text" class="input is-small has-text-centered"
                      placeholder="[YYYY-MM-DD]" v-model="phStartdate">
                    <!-- span class="icon is-small is-left">
                      <i class="fas fa-clock fa-lg"></i>
                    </span -->
                  </div>
                </div> <!-- phenology date picker start date -->

                <!-- phenology date picker end date -->
                <div :id="'phEndDate_'+this.gcWidgetId" class="is-hidden"
                      v-if="availableTools.includes('queryDateSelector')">
                  <div class="control">
                    <input type="text" class="input is-small has-text-centered"
                      placeholder="[YYYY-MM-DD]" v-model="phEnddate">
                    <!-- span class="icon is-small is-left">
                      <i class="fas fa-clock fa-lg"></i>
                    </span -->
                  </div>
                </div> <!-- phenology date picker end date -->
              </div>
            </div><!--  phenology date container -->

            <!-- general map hint -->
            <div class="notification box is-light has-text-darkgrey" :class="{'is-hidden': !showHints}"
                  style="z-index: 1010; margin: 0 auto; margin: 4px 120px; line-height: initial;">
              <button class="delete is-orange" v-on:click="closeHints"></button>
              <strong class="is-size-5"><i class="fas fa-question-circle fa-lg is-orange"></i> {{ $t('hints.title') }}</strong>
              <p class="content is-size-6">
              <ol>
                <li> {{ $t('hints.sentence_1') }}</li>
                <li> {{ $t('hints.sentence_2') }}</li>
                <li> {{ $t('hints.sentence_3') }}</li>
                <li> {{ $t('hints.sentence_4') }}</li>
                <li> {{ $t('hints.sentence_5') }}</li>
                <li> {{ $t('hints.sentence_6') }}</li>
              </ol>
              </p>
            </div>

            <!-- div class="notification gc-api-message" 
                  v-show="this.api_err_msg.length > 0" 
                  v-html="this.api_err_msg">
            </div -->

            <div :id="'mapSpinner_'+gcWidgetId" class="mapSpinner spinner" v-show="this.isloading">
              <div class="rect1"></div>
              <div class="rect2"></div>
              <div class="rect3"></div>
              <div class="rect4"></div>
              <div class="rect5"></div>
            </div>

          </div><!-- map -->
            </div>
            </div><!-- gcWidgetId -->`,
  data: function () {
    return {
      mymap: {},
      osmBasemap: {},
      googleHybridBasemap: {},
      baseMaps: {
        arcgis: {},
        osm: {},
        google: {}
      },
      colormap: "",
      geojsonFeature: {},
      parcelLayer: undefined,
      parcelLayerRegistry: {},
      parcelLayerVisible: true,
      centroidLayer: undefined,
      centroidLayerRegistry: {},
      centroidLayerVisible: true,
      visibleParcelIds: [],
      currentBasemap: this.gcBasemap,
      pagingStep: 250,
      total_parcel_count: 250,
      popup: undefined,
      lastLatLng: {
        lat: 0,
        lng: 0
      },
      phenology : { phenology : { statistics: {}, status: {}, performance: {}, markers: [] }, summary: {} },
      timeline: undefined,
      isPlaying: false,
      myTimer: {},
      currentTimeSliderPosition: 0,
      bins: [],
      legend: undefined,
      mapLegendVisible: true,
      showHints: false,
      zoomToBounds: true,
      zoomControl: undefined,
      searchControl: undefined,
      isGoogleValid: true, //will be set automatically to false if Google Maps API fails
      //
      // Make sure you comply with terms of use for ESRI ArcGIS Online Services first: https://www.esri.com/en-us/legal/terms/full-master-agreement
      //
      isArcGISValid: false, //to be set manually from developer!
      isloading: false, // indicates if data is being loaded or not
      api_err_msg: "", // if there is an error from the API, it will stored here; if length > 0 it will be displayed
    }
  },
  computed: {
    apiKey: {
      get: function () {
          return this.gcApikey;
      }
    },
    apiHost: {
        get: function () {
            return this.gcHost;
        }
    },
    apiBaseUrl: {
        get: function () {
            return this.gcApiBaseUrl;
      }
    },
    apiSecure: {
      get: function () {
          return this.gcApiSecure;
      }
    },
    availableProducts: {
      get: function () {
        console.debug(this.gcAvailableProducts);
        return (this.gcAvailableProducts.split(","));
      },
    },
    selectedParcelIds: {
      get: function() {
        // will always reflect prop's value 
        return this.gcSelectedParcelIds;
      },
      set: function (newValue) {       
        //notify root - through props it will change this.gcSelectedParcelIds
        this.$root.$emit('selectedParcelIdsChange', newValue);
      }
    },
    dataSource: {
      get: function () {
        return this.gcDataSource;
      },
    },
    availableTools: {
      get: function () {
        return (this.gcAvailableTools.split(","));
      },
    },
    selectedProduct: {
      get: function() {
        // will always reflect prop's value 
        return this.gcSelectedProduct;
      },
      set: function (newValue) {  
        //console.debug("selectedProduct setter - "+newValue);
        //notify root - through props it will change this.gcSelectedProduct
        this.$root.$emit('selectedProductChange', newValue);
      }
    },
    limit: {
      get: function() {
        // will always reflect prop's value 
        return this.gcLimit;
      },
      set: function (newValue) {       
        //notify root - through props it will change this.gcLimit
        this.$root.$emit('limitChange', newValue);
      }
    },
    offset: {
      get: function() {
        // will always reflect prop's value 
        return this.gcOffset;
      },
      set: function (newValue) {       
        //notify root - through props it will change this.gcOffset
        this.$root.$emit('offsetChange', newValue);
      }
    },
    parcels: {
      get: function() {
        // will always reflect prop's value 
        return this.gcParcels;
      },
      set: function (newValue) {       
        //notify root - through props it will change this.gcParcels
        this.$root.$emit('parcelsChange', newValue);
      }
    },
    currentParcelId: {
      get: function() {
        // will always reflect prop's value 
        return this.gcCurrentParcelId;
      },
      set: function (newValue) {       
        //notify root - through props it will change this.gcCurrentParcelId
        this.$root.$emit('currentParcelIdChange', newValue);
      }
    },
    queryDate: {
      get: function() {
        // will always reflect prop's value 
        return this.gcQueryDate;
      },
      set: function (newValue) {       
        //notify root - through props it will change this.gcQueryDate
        this.$root.$emit('queryDateChange', newValue);
      }
    },
    phStartdate: {
      get: function() {
        // will always reflect prop's value 
        return this.gcPhStartdate;
      },
      set: function (newValue) {       
        //notify root - through props it will change this.gcPhStartdate
        this.$root.$emit('phStartdateChange', newValue);
      }
    },
    phEnddate: {
      get: function() {
        // will always reflect prop's value 
        return this.gcPhEnddate;
      },
      set: function (newValue) {       
        //notify root - through props it will change this.gcPhEnddate
        this.$root.$emit('phEnddateChange', newValue);
      }
    },
    //TODO
    filterString: {
      get: function() {
        //return "&crop="+this.crop+"&entity="+this.entity+"&name="+this.name;
        return this.gcFilterString;
      },
      set: function(newValue) {
        /*
        this.crop = this.getQueryVariable(newValue, "crop") ? this.getQueryVariable(newValue, "crop") : "";
        this.entity = this.getQueryVariable(newValue, "entity") ? this.getQueryVariable(newValue, "entity") : "";
        this.name = this.getQueryVariable(newValue, "name") ? this.getQueryVariable(newValue, "name") : "";*/

        //notify root - through props it will change this.gcFilterString
        this.$root.$emit('filterChange', newValue);
      }
    },
    availableOptions: {
      get: function() {
        return (this.gcAvailableOptions.split(","));
      }
    },
    currentLanguage: {
      get: function() {
        // will always reflect prop's value 
        return this.gcLanguage;
      },
    }
  },
  //i18n: new VueI18next(i18next), //init internationalization
  i18n: { 
          locale: this.currentLanguage,
          messages: gcPortfolioMapLocales
  },
  created: function () {
    console.debug("gc-portfolio-map created!");
    this.changeLanguage();
  },
  /* when vue component is mounted (ready) on DOM node */
  mounted: function () {
    
    try {
      this.changeLanguage();
    } catch (ex) {}
    
    // now init map
    try {
      /* init map */
      this.mymap = L.map("map_"+this.gcWidgetId, {
        zoomControl: false,
      });
    } catch (err) {
      // TODO notice for UI
      console.error("Error initializing the map with id '" + this.gcWidgetId + "'!");

      this.$el.innerHTML = "";
      this.$destroy();
      return;
    }

    //init popup for index value lat/lon
    this.popup = L.popup({autoClose: true, closeOnClick: false}).setContent('<span class="is-large"><b>'+this.$t("map.popups.indexValue")+ ': ');

    this.toggleProductsDatasourceCompat(this.dataSource);

    //set first of available products as selected 
    //this.selectedProduct = this.availableProducts[0];

    console.debug("Setting first product...");
    console.debug(this.availableProducts);
    // always select NDVI if available, else first available
    if (this.availableProducts.includes("ndvi")) {
      this.selectedProduct = "ndvi";
      console.debug("ndvi set");
    }
    else {
      this.selectedProduct = this.availableProducts[0];
      console.debug("from available product");
    }

    console.debug(this.selectedProduct);

    let osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let osmMapLink = '<a href="https://www.openstreetmap.org/">OpenstreetMap</a>';
    this.osmBasemap = new L.tileLayer(osmUrl, {
      maxZoom: 18,
      attribution: osmMapLink //+ wholink
    });

    if (this.isArcGISValid) {
      //
      // Make sure you comply with terms of use for ESRI ArcGIS Online Services first: https://www.esri.com/en-us/legal/terms/full-master-agreement
      //
      let esriUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      //TODO switch to esri Plugin for dynamic attribution on zoom level and map extent
      let esriMapLink = 'Powered by <a href="https://www.esri.com/">ESRI</a> | i-cubed, USDA, USGS, AEX, GeoEye, Getmapping,  Earthstar Geographics, Aerogrid, IGN, IGP, UPR-EGP, Microsoft, DigitalGlobe and the GIS User Community';
      this.esriBasemap = new L.tileLayer(esriUrl, {
        maxZoom: 20,
        attribution: esriMapLink
      });
    }

    // base maps
    try {
      this.googleHybridBasemap = L.gridLayer.googleMutant({
        type: 'hybrid' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
      });

      if (this.isArcGISValid) {
        this.baseMaps = {
          //
          // Make sure you comply with terms of use for ESRI ArcGIS Online Services first: https://www.esri.com/en-us/legal/terms/full-master-agreement
          //
          arcgis: this.esriBasemap,
          osm: this.osmBasemap,
          google: this.googleHybridBasemap
        };
      }
      else {
        this.baseMaps = {
          osm: this.osmBasemap,
          google: this.googleHybridBasemap
        };
      }
      
      //set base map
      if (this.currentBasemap == "google") {
        this.googleHybridBasemap.addTo(this.mymap);
      }
      if (this.currentBasemap == "osm") {
        this.osmBasemap.addTo(this.mymap);
      }
      if (this.isArcGISValid) {
        //
        // Make sure you comply with terms of use for ESRI ArcGIS Online Services first: https://www.esri.com/en-us/legal/terms/full-master-agreement
        //
        if (this.currentBasemap == "arcgis") {
          this.esriBasemap.addTo(this.mymap);
        }
      }
    }
    catch (ex) { //no google init possible - maybe API key is wrong!
      console.warn("Could not init Google API!");

      this.isGoogleValid = false;

      if (this.isArcGISValid) {
        // without google
        this.baseMaps = {
          //
          // Make sure you comply with terms of use for ESRI ArcGIS Online Services first: https://www.esri.com/en-us/legal/terms/full-master-agreement
          //
          arcgis: this.esriBasemap,
          osm: this.osmBasemap
        };
        if (this.currentBasemap == "osm") {
          this.osmBasemap.addTo(this.mymap);
        }
        if (this.currentBasemap == "arcgis") {
          //
          // Make sure you comply with terms of use for ESRI ArcGIS Online Services first: https://www.esri.com/en-us/legal/terms/full-master-agreement
          //
          this.esriBasemap.addTo(this.mymap);
        }
      }
      else {
        // without google & ArcGIS online
        this.baseMaps = {
          osm: this.osmBasemap
        };
        if (this.currentBasemap == "osm") {
          this.osmBasemap.addTo(this.mymap);
        }
      }
    }
    this.initZoomControl();

    // set map center to Landshut
    this.mymap.setView(new L.LatLng(48.535, 12.152), 10);

    this.addControlPlaceholders(this.mymap);

    this.initSearchControl();

    if (this.gcInitialLoading === true) {
      //initial loading data
      console.debug("initial data loading");
      this.getParcelTotalCount(this.filterString);
    }

    // set initial start/end date for phenology
    /*if (this.phStartdate == "")
      this.phStartdate = new Date().simpleDate();
    if (this.phEnddate == "")
      this.phEnddate = new Date().simpleDate();
    */

    //enable Query Index
    if (this.availableTools.includes('queryIndexValue')) {
      try { document.getElementById("btnQueryIndexValue_" + this.gcWidgetId).disabled = false; } catch(ex) {}
    }

    //init datepickers - load external Javascript file in this component
   this.loadJSscript("css/bulma-ext/bulma-calendar.min.js");

   document.onreadystatechange = () => {
      if (document.readyState == "complete") {   
        
        this.initQueryDatePicker();
        this.initPhStartDatePicker();
        this.initPhEndDatePicker();
      }
    }

  },
  watch: {
    currentBasemap: function (newValue, oldValue) {
      console.debug("event - currentBasemapChange");
      console.debug("new: " + newValue);

      let oldLayer = this.baseMaps[oldValue];
      this.mymap.removeLayer(oldLayer);
      let newLayer = this.baseMaps[newValue];
      this.mymap.addLayer(newLayer);
    },
    selectedProduct: function (newValue, oldValue) {

      // if (newValue != oldValue) {
        console.debug("event - selectedProductChange");

        console.debug(newValue);

        //this.toggleColormapOptions(this.selectedProduct);
        if (this.selectedProduct.length > 0) {
          if (["sos","pos","eos"].includes(this.selectedProduct)) {
            //only if valid parcel id
            if (this.parcels.length > 0) {
              for (var i=0;i<this.selectedParcelIds.length;i++){
                this.getPhenology(this.selectedParcelIds[i], this.phStartdate, this.phEnddate);
              }
            }
          }
          else {
            //remove phenology legend
            this.removeLegendControl(this.mymap);
            //only if valid parcel id
            if (this.parcels.length > 0) {
              for (var i=0;i<this.selectedParcelIds.length;i++){
                this.getParcelsProductData(this.selectedParcelIds[i], this.selectedProduct, this.dataSource);
              }
            }
          }
        }

        if (newValue != "visible") {
          console.debug("enabling btnQueryIndexValue");
          //enable Query Index
          try { document.getElementById("btnQueryIndexValue_" + this.gcWidgetId).disabled = false; } catch(ex) {}
        }
      // }
    },
    dataSource: function (newValue, oldValue) {

      console.debug("event - selectedSourceChange");

      //clear map and current raster first on change!
      this.map_removeAllRasters();
      let p = this.getCurrentParcel()
      p.timeseries = [];

      //activate / deactivate dynamic S2 indices dependent on data source
      this.toggleProductsDatasourceCompat(newValue);

      if (this.selectedProduct.length > 0) {
        if (["sos","pos","eos"].includes(this.selectedProduct)) {
          //only if valid parcel id
          if (this.parcels.length > 0) {
            for (var i=0;i<this.selectedParcelIds.length;i++){
              this.getPhenology(this.selectedParcelIds[i], this.phStartdate, this.phEnddate);
            }
          }
        }
        else {
          //only if valid parcel id
          if (this.parcels.length > 0) {
            for (var i=0;i<this.selectedParcelIds.length;i++){
              this.getParcelsProductData(this.selectedParcelIds[i], this.selectedProduct, this.dataSource);
            }
          }
        }
      }
    },
    queryDate(newValue, oldValue) {
      if (this.isDateValid(newValue)) {
        console.debug("event - queryDateChange");

        //refresh data
        if (this.selectedProduct.length > 0) {
          if (!["sos","pos","eos"].includes(this.selectedProduct)) {
            //only if valid parcel id
            if (this.parcels.length > 0) {
              for (var i=0;i<this.selectedParcelIds.length;i++){
                this.getParcelsProductData(this.selectedParcelIds[i], this.selectedProduct, this.dataSource);
              }
            }
          }
        }
      }
    },
    phStartdate: function (newValue, oldValue) {
      if (this.isDateValid(newValue) && (new Date(newValue) < new Date(this.phEnddate))) {
        console.debug("event - phStartdateChange");

        if (["sos","pos","eos"].includes(this.selectedProduct)) {
          //only if valid parcel id
          if (this.parcels.length > 0) {
            for (var i=0;i<this.selectedParcelIds.length;i++){
              this.getPhenology(this.selectedParcelIds[i], newValue, this.phEnddate);
            }
          }
        }
      }
    },
    phEnddate: function (newValue, oldValue) {
      if (this.isDateValid(newValue) && (new Date(newValue) > new Date(this.phStartdate))) {
        console.debug("event - phEnddateChange")

        if (["sos","pos","eos"].includes(this.selectedProduct)) {
          //only if valid parcel id
          if (this.parcels.length > 0) {
            for (var i=0;i<this.selectedParcelIds.length;i++){
              this.getPhenology(this.selectedParcelIds[i], this.phStartdate, newValue);
            }
          }
        }
      }
    },
    parcelLayerVisible: function (newValue, oldValue) {

      console.debug("event - parcelLayerVisibleChange");

      if (newValue === true) {
        this.mymap.addLayer(this.parcelLayer);
      } else {
        this.mymap.removeLayer(this.parcelLayer);
      }
    },
    centroidLayerVisible: function (newValue, oldValue) {

      console.debug("event - centroidLayerVisibleChange");

      if (newValue === true) {
        this.mymap.addLayer(this.centroidLayer);
      } else {
        this.mymap.removeLayer(this.centroidLayer);
      }
    },
    // used for parcels paging
    offset: function (newValue, oldValue) {

      console.debug("event - offsetChange");

      if (this.mode == "centroids") {
        this.updateCentroids(this.filterString);
        //TODO check this!
        this.updateParcels(this.filterString);
      }
    },
    currentParcelId: function (newValue, oldValue) {
      // highlight feature from external component (e.g. gc-list)
      if (newValue > 0) {
        
        if (this.parcelLayer) {
          // reset for all features
          this.parcelLayer.setStyle(this.parcelDefaultStyle);

          //highlight map feature
          let lyr = this.parcelLayerRegistry[newValue];
          
          if (lyr) {
            lyr.setStyle({
              fillOpacity: 0.75,
              weight: 4,
              opacity: 1,
              color: 'yellow',
            });
          }
        }
        if (this.centroidLayer) {
          // reset for all features
          this.centroidLayer.eachLayer(l=>l.setIcon(this.centroidStyle()));

          //highlight map feature
          let lyr = this.centroidLayerRegistry[newValue];
          
          if (lyr) {
            let goldIcon = this.centroidHighlightStyle();
            lyr.setIcon(goldIcon);
          }
          
        }
      }
    },
    parcelIds: function (newValue, oldValue) {

      console.debug("parcelIds changed!");

      // zoom to all features only once so zoomToBounds must be set with parcelIds change
      /*if (this.zoomToBounds == "true") {
        let currentBbox = undefined;
        //zoom to extent of current ids
        this.parcelLayer.eachLayer( function(l) {
          if (this.selectedParcelIds.includes(l.feature.properties.id+"")) {
            if (currentBbox)
              currentBbox.extend(l.getBounds());
            else {
              const lBbox = l.getBounds();
              currentBbox = new L.LatLngBounds(lBbox.getSouthWest(), lBbox.getNorthEast());
            }
          }

        }.bind(this));

        console.debug(currentBbox);
      
        this.mymap.fitBounds(currentBbox);
        this.zoomToBounds = "false";
      }*/
      
    },
    selectedParcelIds: function (newValue, oldValue) {

      console.debug("selectedParcelIdsChange() ");

      // TODO check time series - not parcel ids?
      const p = this.parcels[newValue];
      if (p !== undefined) {
        if (p.timeseries !== undefined) {
          if (p.timeseries.length == 0)
            this.removeLegendControl(this.mymap);
          else
            this.addLegendControl(this.mymap);
        }
      }
      else {
        this.removeLegendControl(this.mymap);
      }
      // zoom to selected features 

    },
    parcels: function (newValue, oldValue) {
      //update layers
      console.debug("parcels changed!");
      /* TODO too slow!
      let difference = oldValue.filter(x => !newValue.includes(x));
      for (var i=0; difference.length; i++ ) {
        try {
          this.map_removeParcel(difference[i]);
        } catch (ex) {}
      }*/
        
    },
    centroids: function (newValue, oldValue) {
      /* ATTENTION: works only correct if the whole centroids array is changed
        otherwise it will cause the browser to hang because of the multiple requests on each item */ 
      console.debug("centroids changed!");
      
    },
    filterString: function (newValue, oldValue) {
      console.debug("filterString changed!");
      console.debug(oldValue);
      console.debug(newValue);

      this.clearSelection();

      if (this.mode == "centroids") {
        this.updateCentroids(newValue);  
      }
    },
    visibleParcelIds: function (newValue, oldValue) {
      this.$root.$emit('visibleParcelIdsChange', newValue);
    },
    currentLanguage(newValue, oldValue) {
      this.changeLanguage();

      //refresh legend also if active - because HTML is created dynamically, translation changes will not fire as usual
      this.mapLegendVisible = document.getElementById("btnToggleLegend_" + this.gcWidgetId).classList.contains("is-active");
      if (this.parcels.length > 0 && this.mapLegendVisible) {
        this.addLegendControl(this.mymap);
      }
      //TODO refresh popups

      //refresh calendars
      this.initQueryDatePicker();
      this.initPhStartDatePicker();
      this.initPhEndDatePicker();

      //refresh leaflet map controls
      this.initZoomControl();
      this.initSearchControl();
    }
  },
  methods: {
    getApiUrl: function (endpoint) {
      /* handles requests directly against  geocledian endpoints with API keys
          or (if gcProxy is set)
        also requests against the URL of gcProxy prop without API-Key; then
        the proxy or that URL has to add the api key to the requests against geocledian endpoints
      */
      let protocol = 'http';

      if (this.apiSecure) {
        protocol += 's';
      }

      // if (this.apiEncodeParams) {
      //   endpoint = encodeURIComponent(endpoint);
      // }
      
      // with or without apikey depending on gcProxy property
      return (this.gcProxy ? 
                protocol + '://' + this.gcProxy + this.apiBaseUrl + endpoint  : 
                protocol + '://' + this.gcHost + this.apiBaseUrl + endpoint + "?key="+this.apiKey);
    },
    getParcelTotalCount: function (filterString, centroidsOnly) {

      // show spinner
      this.isloading = true;
      this.api_err_msg = ""; // empty api messages

      this.parcelLayerRegistry = {};
      this.centroidLayerRegistry = {};

      let params;
      const endpoint = "/parcels";

      if (filterString) {
        params = filterString + "&count=True";
      } else {
        params = "&count=True";
      }
      let xmlHttp = new XMLHttpRequest();
      let async = true;

      //Show requests on the DEBUG console for developers
      console.debug("getParcelTotalCount()");
      console.debug("GET " + this.getApiUrl(endpoint) + params);

      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          var tmp = JSON.parse(xmlHttp.responseText);

          if ("count" in tmp) {

            this.total_parcel_count = tmp.count;

            // minimum of 250
            if (this.total_parcel_count < this.pagingStep) {
              this.pagingStep = this.total_parcel_count;
            } /*else {
              this.pagingStep = 250;
            }*/

            if (this.total_parcel_count == 0) {
              // hide spinner
              this.api_err_msg = this.$t("status_msg.no_data_msg") + '<button class="delete" v-on:click="clearApiMessages"></button>';
              this.isloading = false;
              document.getElementById("queryDate_"+this.gcWidgetId).classList.add("is-hidden");
              document.getElementById("phStartDate_"+this.gcWidgetId).classList.add("is-hidden");
              document.getElementById("phEndDate_"+this.gcWidgetId).classList.add("is-hidden");
              return;

            } else {
                // now get all parcels
                this.getAllParcels(this.offset, filterString, centroidsOnly);
            }
          }
          else {
            // hide spinner
            this.api_err_msg = this.$t("status_msg.no_data_msg") + '<button class="delete" v-on:click="clearApiMessages"></button>';
            this.isloading = false;
          }
        }
      }.bind(this);
      xmlHttp.open("GET", this.getApiUrl(endpoint) + params, async);
      xmlHttp.send();
    },
    getAllParcels: function (offset, filterString, centroidsOnly) {

      // show spinner
      this.isloading = true;
      this.api_err_msg = ""; // empty api messages

      document.getElementById("queryDate_"+this.gcWidgetId).classList.add("is-hidden");
      
      //download in chunks of n parcels
      const endpoint = "/parcels";
      let params = "&limit=" + this.limit; //set limit to maximum (default 1000)

      if (offset) {
        params = params + "&offset=" + offset;
      }
      if (filterString) {
        params = params + filterString;
      }

      let xmlHttp = new XMLHttpRequest();
      let async = true;

      //Show requests on the DEBUG console for developers
      console.debug("getAllParcels()");
      console.debug("GET " + this.getApiUrl(endpoint) + params);

      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          var tmp = JSON.parse(xmlHttp.responseText);

          if (tmp.content == "key is not authorized") {
            // show message, hide spinner
            this.api_err_msg = this.$t('status_msg.unauthorized_key') + "<br>" + this.$t('status_msg.support');
            this.isloading = false;
            return;
          }
          if (tmp.content == 	"api key validity expired") {
            // show message, hide spinner
            this.api_err_msg = this.$t('status_msg.invalid_key') + "<br>" + this.$t('status_msg.support');
            this.isloading = false;
            return;
          }

          if (centroidsOnly) {   

            // temporary array - otherwise for each change the watcher function will be called!
            let tmpCentroids = [];

            if (tmp.content.length == 0) {
              //clear details and map
              //clearGUI();
              return;
            }

            for (var i = 0; i < tmp.content.length; i++) {
              let item = tmp.content[i];

              tmpCentroids.push(item);

              try {
                this.map_removeCentroid(item.parcel_id);
              }
              catch (ex) { console.debug("could not remove centroid");  }
  
              this.map_addCentroid(item.parcel_id, item.centroid, item);
            }
            // now set the all new centroids
            this.centroids = tmpCentroids;

            return;
          }
          else {
            this.parcels = [];

            if (tmp.content.length == 0) {
              //clear details and map
              //clearGUI();
              return;
            }

            for (var i = 0; i < tmp.content.length; i++) {
              var item = tmp.content[i];
              this.parcels.push(item);
            }
          }

          // init main image group layer here, in case of no parcels are given initially
          /*this.imageLayerGroup = L.layerGroup().addTo(this.mymap);

          // create sub imageLayerGroup for each parcel
          for (var i = 0; i < this.selectedParcelIds.length; i++) {
            let parcel_id = this.selectedParcelIds[i];
            let lyr = L.layerGroup();
            lyr["parcel_id"] = parcel_id; //tag for group layer
            lyr.addTo(this.imageLayerGroup);
          }*/

          try {
              for(var i = 0; i<this.selectedParcelIds.length;i++) {
                console.debug("parcel: "+ this.selectedParcelIds[i]);
                this.getParcelsAttributes(this.selectedParcelIds[i]);
              }
          } catch (err) {
            console.log("error selecting parcel_id");
            console.log(err);
          }

        }
      }.bind(this);
      xmlHttp.open("GET", this.getApiUrl(endpoint) + params, async);
      xmlHttp.send();
    },
    getParcelsAttributes(parcel_id) {

      // show spinner
      this.isloading = true;
      this.api_err_msg = ""; // empty api messages

      document.getElementById("queryDate_"+this.gcWidgetId).classList.add("is-hidden");
      document.getElementById("phStartDate_"+this.gcWidgetId).classList.add("is-hidden");
      document.getElementById("phEndDate_"+this.gcWidgetId).classList.add("is-hidden");

      const endpoint = "/parcels/" + parcel_id + "/";

      let xmlHttp = new XMLHttpRequest();
      let async = true;

      //Show requests on the DEBUG console for developers
      console.debug("getParcelsAttributes()");
      console.debug("GET " + this.getApiUrl(endpoint));

      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          let tmp = JSON.parse(xmlHttp.responseText);
          let row = this.getParcel(parcel_id);

          if (tmp.content.length > 0) {
            // add new attributes via Vue.set
            // it's ok always to use the first element, because it has been filtered
            // by unique parcel_id
            try {
              Vue.set(row, "area", tmp.content[0].area);
              Vue.set(row, "planting", tmp.content[0].planting);
              Vue.set(row, "harvest", tmp.content[0].harvest);
              Vue.set(row, "startdate", tmp.content[0].startdate);
              Vue.set(row, "enddate", tmp.content[0].enddate);
              Vue.set(row, "lastupdate", tmp.content[0].lastupdate);
              Vue.set(row, "centroid", tmp.content[0].centroid);
              Vue.set(row, "geometry", tmp.content[0].geometry);

              // propagate parcels to root's parcels if not already there
              if (!this.parcels.map(p=>p.parcel_id).includes(parcel_id)) {
                // insert
                this.parcels.push(row);
              }
              else { //update
                let idx = this.parcels.map(p=>p.parcel_id).indexOf(parcel_id);
                this.parcels.slice(idx, 1, row);
              }
            
              //console.debug(row);
              //console.debug(this.parcels);
              
              if (["sos","pos","eos"].includes(this.selectedProduct)) {
                this.getPhenology(parcel_id, this.phStartdate, this.phEnddate);
              }
              else {
                this.getParcelsProductData(parcel_id, this.selectedProduct, this.dataSource);
              }
            }
            catch (ex) {
              console.error("ERROR in getParcelsAttributes()!");
              console.error(ex);
            }
          }
        }
      }.bind(this);
      xmlHttp.open("GET", this.getApiUrl(endpoint), async);
      xmlHttp.send();
    },
    getParcelsProductData: function (parcel_id, productName, source) {

      // show spinner
      this.isloading = true;
      this.api_err_msg = ""; // empty api messages

      document.getElementById("queryDate_"+this.gcWidgetId).classList.add("is-hidden");
      document.getElementById("phStartDate_"+this.gcWidgetId).classList.add("is-hidden");
      document.getElementById("phEndDate_"+this.gcWidgetId).classList.add("is-hidden");

      const endpoint = "/parcels/" + parcel_id + "/" + productName;
      let params = "&source=" + source + "&order=date&statistics=true";

      let xmlHttp = new XMLHttpRequest();
      let async = true;

      //Show requests on the DEBUG console for developers
      console.debug("getParcelsProductData()");
      console.debug("GET " + this.getApiUrl(endpoint) + params);

      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          //console.log(xmlHttp.responseText);
          let tmp = JSON.parse(xmlHttp.responseText);
          let row = this.getParcel(parcel_id);

          // delete first
          Vue.set(row, "timeseries", []);

          // add new attributes via Vue.set()
          // one parcel can have 1-n rasters of the same product (time series!)
          Vue.set(row, "timeseries", tmp.content);

          if (tmp.content.length > 0) {

            //show selected product as thematic map
            // latest -> tmp.content[0]
            let index;
            if (this.queryDate == "") {
              index = 0;
              this.queryDate = tmp.content[index].date; // set the latest date as current
            }
            else {
              //get index for queryDate
              //TODO: serverside function for getting closest entry from timeseries to given date
              // at the moment it is implemented as client function
              index = this.getClosestTimeSeriesIndex(parcel_id, this.queryDate);
              //console.debug("closest index to date: "+index);
            }

            let value = tmp.content[index].statistics.mean;
            let date = tmp.content[index].date;

            // maybe only keep one entry as timeseries value
            Vue.set(row, "timeseries", [tmp.content[index]]);

            //enable time slider if we have the last timeseries loaded
            /*if (this.parcels.filter(p => p.hasOwnProperty("timeseries")).length == this.selectedParcelIds.length) {

              try { this.initTimeline(); } catch (err) { console.error(err);}
              try { this.disableTimeSlider(false); } catch (err) {}
            }*/

            try {
              //console.debug(this.parcelLayerRegistry[this.selectedParcelIds[i]]);
              this.map_removeParcel(parcel_id);
            }
            catch (ex) { console.debug("could not remove layer");  }

            this.map_addParcel(parcel_id, row.geometry, {"product": productName, "date": date, "value": value })

          }
          else {
            // hide spinner
            this.api_err_msg = this.$t("status_msg.no_data_msg") + '<button class="delete" v-on:click="clearApiMessages></button>';
            this.isloading = false;
            return;
          }

        }
      }.bind(this);
      xmlHttp.open("GET", this.getApiUrl(endpoint) + params, async);
      xmlHttp.send();
    },
    getPhenology: function (parcel_id, startdate, enddate) {

      // show spinner
      this.isloading = true;
      this.api_err_msg = ""; // empty api messages

      document.getElementById("mapNotice_" +this.gcWidgetId).innerText = "";
      document.getElementById("mapNotice_" +this.gcWidgetId).classList.add("is-hidden");
      document.getElementById("queryDate_"+this.gcWidgetId).classList.add("is-hidden");

      const productName = "phenology";

      if ( !(this.isDateValid(startdate) && this.isDateValid(enddate)) ) {
          return;
      }
      const endpoint = "/parcels/" + parcel_id + "/" + productName;
      let params = "&startdate="+startdate + //must be valid - empty string returns server error
                     "&enddate="+ enddate; //must be valid - empty string returns server error

      var xmlHttp = new XMLHttpRequest();
      const async = true;

      //Show requests on the DEBUG console for developers
      console.debug("getPhenology()");
      console.debug("GET " + this.getApiUrl(endpoint) + params);

      xmlHttp.onreadystatechange=function()
      {
        if (xmlHttp.readyState==4)
        {
          //console.log(xmlHttp.responseText);
          var tmp  = JSON.parse(xmlHttp.responseText);
          //console.log(tmp);
          let row = this.getParcel(parcel_id);

          if (tmp.errors) {
            this.api_err_msg = this.$t("status_msg.no_data_msg") + '<button class="delete" v-on:click="clearApiMessages"></button>';
            this.isloading = false;
            return;
          }
          else {
            if (tmp.phenology && tmp.summary) {
              Vue.set(row, "timeseries", {"phenology" : { "statistics" : tmp.phenology.statistics,
                                                  "status" : tmp.phenology.status,
                                                  "performance" : tmp.phenology.performance,
                                                  "markers" : []
                                                  },
                                      "summary": tmp.summary
                                });

              if (tmp.phenology.markers) {
                Vue.set(row, "timeseries", {"phenology" : { "statistics" : tmp.phenology.statistics,
                                                          "status" : tmp.phenology.status,
                                                          "performance" : tmp.phenology.performance,
                                                          "markers" : tmp.phenology.markers,
                                                      },
                                              "summary": tmp.summary
                                          });
              }

              //show selected product as thematic map
              let value = row.timeseries.phenology.markers.find(m => m.name == this.selectedProduct.toUpperCase()).mean;
              let date = row.timeseries.phenology.markers.find(m => m.name == this.selectedProduct.toUpperCase()).date;

              try {
                this.map_removeParcel(parcel_id);
              }
              catch (ex) { console.debug("could not remove layer");  }

              this.map_addParcel(parcel_id, row.geometry, {"product": this.selectedProduct, "date": date, "value": value })
            }
            else {
              //"Couldn't calculate phenology. Not enough data available for the defined monitoring period. Enlarge monitoring period."
                this.api_err_msg = this.$t("status_msg.parcel_id_not_found");
                this.isloading = false;              
                //show phenology query selectors
                document.getElementById("phStartDate_"+this.gcWidgetId).classList.remove("is-hidden");
                document.getElementById("phEndDate_"+this.gcWidgetId).classList.remove("is-hidden");
                document.getElementById("mapNotice_" +this.gcWidgetId).innerText = tmp.content;
                document.getElementById("mapNotice_" +this.gcWidgetId).classList.remove("is-hidden");
                return;
            }
          }
        }
      }.bind(this);
      xmlHttp.open("GET", this.getApiUrl(endpoint) + params, async);
      xmlHttp.send();
    },
    getParcel: function (parcel_id) {

      if (parcel_id > 0) {
        // parcel_id assumed unique, so return only the first
        // compare strings
        return this.parcels.filter(p => p.parcel_id + "" == parcel_id + "")[0];
      }
    },
    getClosestTimeSeriesIndex: function (parcel_id, queryDate) {
      /* returns the nearest Date to the given parcel_id and query date */
      const p = this.getParcel(parcel_id);
      const exactDate = this.getClosestDate(p.timeseries.map(d => new Date(d.date)), new Date(queryDate));
      console.debug("closest date of given date "+ queryDate + " is "+ exactDate.simpleDate());
      // find the index of the closest date in timeseries now
      return p.timeseries.map(d => d.date).indexOf(exactDate.simpleDate());
    },
    getMaxTimeSeries: function () {

      let maxLength = 0;
      let maxTimeseries;
      for (var i = 0; i < this.selectedParcelIds.length; i++) {
        // compare strings
        var p = this.getParcel(this.selectedParcelIds[i]);
        if (p.timeseries) {
          if (maxLength < p.timeseries.length) {
            maxLength = p.timeseries.length;
            maxTimeseries = p.timeseries;
          }
        }
      }
      return p.timeseries;
    },
    getIndexValueforCoordinate(latlng, parcel_id, productName, date) {

      const p = this.getParcel(parcel_id);
      const ts = p.timeseries.find( d => d.date == date);
      // get raster id of given date
      console.debug(ts);
      const raster_id = ts.raster_id;
      const source = ts.source;

      const endpoint = "/parcels/" + parcel_id + "/" + productName + "/" + source + "/" + raster_id;
      let params = "&lat=" + latlng.lat +
                   "&lon=" + latlng.lng;

      let xmlHttp = new XMLHttpRequest();
      const async = true;

      //Show requests on the DEBUG console for developers
      console.debug("GET " + this.getApiUrl(endpoint) + params);

      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          const tmp = JSON.parse(xmlHttp.responseText);
          console.debug(tmp);

          if (tmp.content.length > 0) {
            this.popup.setContent('<span style="font-size: 14px !important; line-height: 1.6;"><b>'+ this.$t("map.popups.parcelID") +': '+ parcel_id + '</b></span>'+
                                  '<span style="line-height: 1.6;"><br><b>'+ this.$t("map.popups.indexValue")+': ' + this.formatDecimal(tmp.content[0].pixel_value) + '</b>'+
                                  '<br><i class="fa fa-map-marked-alt" style="margin-right: 4px"></i>'+ this.formatDecimal(latlng.lng,5) + '|'+ this.formatDecimal(latlng.lat,5) + '</span>');
          }
        }
      }.bind(this);
      xmlHttp.open("GET", this.getApiUrl(endpoint) + params, async);
      xmlHttp.send();
    },
    initParcelLayer: function(geojsonFeature) {
      /* Inits parcelLayer with first geojsonFeature,
       thematic coloring with style function
        (rendering will happen while adding data to the layer!)
        and layer click event for getting the index value.
      */
      this.parcelLayer = L.geoJson(geojsonFeature,
        { style: this.parcelDefaultStyle,
          onEachFeature: function (feature, layer) {
            layer.on({ 
              click: this.onClickParcelLayer,
              mouseover: this.onMouseoverParcelLayer,
              mouseout: this.onMouseoutParcelLayer
            });

            // store reference on layer for deleting parcels
            this.parcelLayerRegistry[feature.properties.id] = layer;

          }.bind(this)
        }
      ).addTo(this.mymap);

      //add bbox listener to map
      this.mymap.on('moveend', function(e) {
        
        //get parcel ids in bbox (loop through parcels geoJSON layer and check if centroid is within bbox)
        this.parcelLayer.eachLayer( function(l) {
          
          let within_bbox = this.mymap.getBounds().contains(l.getBounds().getCenter());
          if (within_bbox) {
            //propagate them to the root's instance
            // but only, if a certain zoom level is reached!
            //if (this.mymap._zoom > 12) {
              // add only, if not already present
              let idx = this.visibleParcelIds.indexOf(l.feature.properties.id);
              if (idx < 0)
                this.visibleParcelIds.push(l.feature.properties.id);
            //}
          }
          else {
            this.removeFromArray(this.visibleParcelIds, l.feature.properties.id);
          }
        }.bind(this));
      }.bind(this));

      // listener for remove highlighting of parcel when clicked not inside parcel
      this.mymap.on('click', function (e) {

        //only if the clicked point is outside the parcels bbox
        //todo: real geometry - not only bounds checking!
        /*if (!this.parcelLayer.getBounds().contains(e.latlng)) {
            //this.highlightLayer.clearLayers();
            this.$root.$emit("currentParcelIdChange", -1);
            this.popup._close();
        }*/
      }.bind(this));
    },
    onClickParcelLayer: function (event) {
      
      let queryMode;
      try { queryMode = document.getElementById("btnQueryIndexValue_" + this.gcWidgetId).classList.contains("is-active"); } catch (ex) {}

      if (queryMode) {
        if (["sos","pos","eos"].includes(this.selectedProduct)) {
          this.popup.setContent('<span class="is-large"><b>'+ this.$t("map.popups.parcelID") +': '+ event.target.feature.properties.id +'<br>'+
                                                          this.$t("products."+this.selectedProduct) +': '
                                                          + event.target.feature.properties.date + '<br>'+
                                                          this.$t("map.popups.value") + ': ' + this.formatDecimal(event.target.feature.properties.value,2) +'</span>');
          //propagate parcelID to charts if available
          this.$root.$emit("currentParcelIdChange", event.target.feature.properties.id);
        }
        else {
          this.getIndexValueforCoordinate(event.latlng,
                                        event.target.feature.properties.id,
                                        event.target.feature.properties.product,
                                        event.target.feature.properties.date);
          //propagate parcelID to charts if available
          this.$root.$emit("currentParcelIdChange", event.target.feature.properties.id);
        }
        this.popup.setLatLng(event.latlng).openOn(this.mymap);
      }
      else { //toggle mode
        this.toggleParcelCentroid(event.target.feature.properties.id);
      }

    },
    onMouseoverParcelLayer: function (event) {
      //highlight
      let feature = event.target;
      feature.setStyle({
        fillOpacity: 0.75,
        weight: 4,
        opacity: 1,
        color: 'yellow',
      });

      //propagate parcelID to charts if available
      this.$root.$emit("currentParcelIdChange", event.target.feature.properties.id);
    },
    onMouseoutParcelLayer: function (event) {
      //reset highlight
      this.parcelLayer.resetStyle(event.target);
      //unset parcelID to chart if available
      this.$root.$emit("currentParcelIdChange", -1);
    },
    map_addParcel: function (parcel_id, geom, data ) {

      // console.debug(new Date().toISOString() + " map_addParcel()");

      this.geojsonFeature = {
        "type": "Feature",
        "properties": {
          "id": parcel_id,
          "product": data.product,
          "date" : data.date,
          "value": data.value
        },
        "geometry": geom
      };

      //if it is the first parcel: init parcelLayer
      if (!this.parcelLayer) {
        this.initParcelLayer(this.geojsonFeature);
      }
      else {
        this.parcelLayer.addData(this.geojsonFeature);
      }

      //fit to bounds when all parcels are ready
      //if ((this.total_parcel_count - this.offset) == this.parcelLayer.getLayers().length) {
      //if(this.selectedParcelIds.length == this.parcelLayer.getLayers().length) {

        //calculcate the histogram for dates if phenology
        if (["sos","pos","eos"].includes(this.selectedProduct)) {
          console.debug(new Date().toISOString() + " - calculating histogram..");

          let dates = [];
          //if(this.selectedParcelIds.length == this.parcelLayer.getLayers().length) {
            // calculates array with doy for histogram
            //TODO: change between Index and phenology causes exception sometimes
            // "cannot read 'markers' of undefined"
            this.parcels.filter(t=>t.hasOwnProperty("timeseries"))
                    .filter(t=>t.timeseries.hasOwnProperty("phenology"))
                    .map(t=>t.timeseries.phenology.markers)
                    .forEach( function(m) {
                      if (m) {
                        dates.push( new Date(m.filter(n=>n.name==this.selectedProduct.toUpperCase())[0].date).getDOY() );
                      }
                    }.bind(this));
            this.bins = this.histogram(dates.filter(d=>!isNaN(d))); //this.classify(dates.filter(d=>!isNaN(d)));
        
            console.debug(new Date().toISOString() + " ready!");

            this.parcelLayer.setStyle(this.parcelDefaultStyle);

            this.addLegendControl(this.mymap);

            //hide query date selector
            document.getElementById("queryDate_"+this.gcWidgetId).classList.add("is-hidden");
            //show phenology query selectors
            document.getElementById("phStartDate_"+this.gcWidgetId).classList.remove("is-hidden");
            document.getElementById("phEndDate_"+this.gcWidgetId).classList.remove("is-hidden");
            document.getElementById("mapNotice_" +this.gcWidgetId).innerText = "";
            document.getElementById("mapNotice_" +this.gcWidgetId).classList.add("is-hidden");
          //}
        }
        else {
          this.addLegendControl(this.mymap);

          //show query date selector
          document.getElementById("queryDate_"+this.gcWidgetId).classList.remove("is-hidden");
          //hide phenology query selectors
          document.getElementById("phStartDate_"+this.gcWidgetId).classList.add("is-hidden");
          document.getElementById("phEndDate_"+this.gcWidgetId).classList.add("is-hidden");
          document.getElementById("mapNotice_" +this.gcWidgetId).innerText = "";
          document.getElementById("mapNotice_" +this.gcWidgetId).classList.add("is-hidden");
        }

        // zoom to all features only once
        /*if (this.zoomToBounds == "true") {
          this.mymap.fitBounds(this.parcelLayer.getBounds());
          this.zoomToBounds = "false";
        }*/

        this.parcelLayer.bringToFront();
        // hide spinner
        this.isloading = false;
      //}
    },
    parcelDefaultStyle: function (feature) {
      let fillColor;
      if (["sos","pos","eos"].includes(this.selectedProduct)) {
        fillColor = this.getColor(feature.properties.product, feature.properties.date, true);
      } else {
        fillColor = this.getColor(feature.properties.product, feature.properties.value, true);
      }
      
      return {
        fillColor: fillColor,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '4',
        fillOpacity: 0.95
      };
    },
    centroidHighlightStyle: function (feature) {
      return new L.Icon({
        iconUrl: this.getBaseURL('js/gc-portfolio-map.js') + 'css/leaflet/images/marker-icon-orange.png',
        shadowUrl: this.getBaseURL('js/gc-portfolio-map.js') + 'css/leaflet/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

    },
    centroidStyle: function (feature) {

      /*return new L.Icon({
        iconUrl: 'img/marker-icon-grey.png',
        shadowUrl: 'img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });*/
      return new L.Icon.Default();

    },
    getColor: function (product, value, transform) {
      if (product == "vitality") {
        return value >= 0.8 ? '#1a9850' : // green
              value > 0.7  ? '#66bd63' :
              value > 0.6  ? '#a6d96a' :
              value > 0.5  ? '#d9ef8b' :
              value > 0.3  ? '#ffffbf' : // beige
              value > 0.25  ? '#fee08b' :
              value > 0.15  ? '#fdae61' :
              value > 0.1  ? '#f46d43' :
                        '#d73027'; //red
      }
      if (product == "ndvi") {
        return value >= 0.8 ? '#1a9850' : // green
              value > 0.7  ? '#66bd63' :
              value > 0.6  ? '#a6d96a' :
              value > 0.5  ? '#d9ef8b' :
              value > 0.3  ? '#ffffbf' : // beige
              value > 0.25  ? '#fee08b' :
              value > 0.15  ? '#fdae61' :
              value > 0.1  ? '#f46d43' :
                        '#d73027'; //red
      }
      if (product == "ndwi") {
        return value >= 0.55 ? '#0D98BA' : // bluegreen
              value > 0.5 ? '#1a9850' : // green
              value > 0.45  ? '#66bd63' :
              value > 0.4  ? '#a6d96a' :
              value > 0.35  ? '#d9ef8b' :
              value > 0.3  ? '#ffffbf' : // beige
              value > 0.25  ? '#fee08b' :
              value > 0.2  ? '#fdae61' :
              value > 0.15  ? '#f46d43' :
                        '#d73027'; //red
      }
      if (product == "ndre1") {
        return value >= 0.5 ? '#1a9850' : // green
              value > 0.45  ? '#66bd63' :
              value > 0.4  ? '#a6d96a' :
              value > 0.35  ? '#d9ef8b' :
              value > 0.3  ? '#ffffbf' : // beige
              value > 0.25  ? '#fee08b' :
              value > 0.2  ? '#fdae61' :
              value > 0.15  ? '#f46d43' :
                        '#d73027'; //red
      }
      if (product == "ndre2") {
        return value >= 0.5 ? '#1a9850' : // green
              value > 0.45  ? '#66bd63' :
              value > 0.4  ? '#a6d96a' :
              value > 0.35  ? '#d9ef8b' :
              value > 0.3  ? '#ffffbf' : // beige
              value > 0.25  ? '#fee08b' :
              value > 0.2  ? '#fdae61' :
              value > 0.15  ? '#f46d43' :
                        '#d73027'; //red
      }
      if (product == "savi") {
        return value >= 0.5 ? '#1a9850' : // green
              value > 0.45  ? '#66bd63' :
              value > 0.4  ? '#a6d96a' :
              value > 0.35  ? '#d9ef8b' :
              value > 0.3  ? '#ffffbf' : // beige
              value > 0.25  ? '#fee08b' :
              value > 0.2  ? '#fdae61' :
              value > 0.15  ? '#f46d43' :
                        '#d73027'; //red
      }
      if (product == "evi2") {
        return value >= 0.5 ? '#1a9850' : // green
              value > 0.45  ? '#66bd63' :
              value > 0.4  ? '#a6d96a' :
              value > 0.35  ? '#d9ef8b' :
              value > 0.3  ? '#ffffbf' : // beige
              value > 0.25  ? '#fee08b' :
              value > 0.2  ? '#fdae61' :
              value > 0.15  ? '#f46d43' :
                        '#d73027'; //red
      }
      if (product == "cire") {
        return value >= 3.5 ? '#1a9850' : // green
              value > 3.0  ? '#66bd63' :
              value > 2.5  ? '#a6d96a' :
              value > 1.75  ? '#d9ef8b' :
              value > 1.25  ? '#ffffbf' : // beige
              value > 1.0  ? '#fee08b' :
              value > 0.75  ? '#fdae61' :
              value > 0.5  ? '#f46d43' :
                        '#d73027'; //red
      }
      if (product == "npcri") {
        return value > 0.5 ? '#1a9850' : // green
              value > 0.45  ? '#66bd63' :
              value > 0.4  ? '#a6d96a' :
              value > 0.35  ? '#d9ef8b' :
              value > 0.3  ? '#ffffbf' : // beige
              value > 0.25  ? '#fee08b' :
              value > 0.2  ? '#fdae61' :
              value > 0.15  ? '#f46d43' :
                        '#d73027'; //red
      }
      // rank compared to other parcels
      if (["pos","eos"].includes(product)) {
        //remap value (ISO date string) to bin index
        if (transform) {
          value = this.bins.indexOf(this.bins.find(m=>m.includes(new Date(value).getDOY())));
          //value = this.bins.indexOf(this.bins.filter(m=>m>=new Date(value).getDOY() && m<new Date(value).getDOY() ));
        }
        //console.debug(value);
        /*return value > 9 ? '#1a9850' : // green
              value > 8  ? '#66bd63' :
              value > 7  ? '#a6d96a' :
              value > 6  ? '#d9ef8b' :
              value > 5  ? '#ffffbf' : // beige
              value > 4  ? '#fee08b' :
              value > 3  ? '#fdae61' :
              value > 2  ? '#f46d43' :
              value >= 1  ? '#d73027' ://red
                        '#ffffff'; //-1 -> white */
        //http://colorbrewer2.org/?type=qualitative&scheme=Paired&n=10
        // light blue to green to red to orange to violet
        let colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a'];
        // spectral red to blue
        //['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2']
        return colors[value];
      }
      if (["sos"].includes(product)) {
        //remap value (ISO date string) to bin index
        if (transform) {
          value = this.bins.indexOf(this.bins.find(m=>m.includes(new Date(value).getDOY())));
          //value = this.bins.indexOf(this.bins.filter(m=>m>=new Date(value).getDOY() && m<new Date(value).getDOY() ));
        }

        //console.debug(value);
        /*return value > 9 ? '#d73027' : // red
              value > 8  ? '#f46d43' :
              value > 7  ? '#fdae61' :
              value > 6  ? '#fee08b' :
              value > 5  ? '#ffffbf' : // beige
              value > 4  ? '#d9ef8b' :
              value > 3  ? '#a6d96a' :
              value > 2  ? '#66bd63' :
              value >= 1  ? '#1a9850' ://green
                        '#ffffff'; //-1 -> white*/

        //http://colorbrewer2.org/?type=qualitative&scheme=Paired&n=10
        // light blue to green to red to orange to violet
        let colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a'];
        // spectral red to blue
        //['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2']
        return colors[value];
      }
    },
    map_removeParcel: function (parcel_id) {
      this.parcelLayer.removeLayer(this.parcelLayerRegistry[parcel_id]);
      //delete this.parcelLayerRegistry[parcel_id];
    },
    initCentroidLayer: function(geojsonFeature) {
      /* Inits centroidLayer with first geojsonFeature
      */
      this.centroidLayer = L.geoJson(geojsonFeature,
        { //special function for setting marker style to geojson layer
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: this.centroidStyle() });
          }.bind(this),
          
          onEachFeature: function (feature, layer) {
            layer.on({ 
              click: this.onClickCentroidLayer,
              mouseover: this.onMouseoverCentroidLayer,
              mouseout: this.onMouseoutCentroidLayer
             });

            // store reference on layer for deleting parcels
            this.centroidLayerRegistry[feature.properties.id] = layer;

          }.bind(this)
        }
      ).addTo(this.mymap);

      //add bbox listener to map
      this.mymap.on('moveend', function(e) {
        
        //get parcel ids in bbox (loop through parcels geoJSON layer and check if centroid is within bbox)
        this.centroidLayer.eachLayer( function(l) {
          
          let within_bbox = this.mymap.getBounds().contains(l.getLatLng());
          if (within_bbox) {
            //propagate them to the root's instance
            // add only, if not already present
            let idx = this.visibleParcelIds.indexOf(l.feature.properties.id);
            if (idx < 0)
              this.visibleParcelIds.push(l.feature.properties.id);
          }
          else {
            this.removeFromArray(this.visibleParcelIds, l.feature.properties.id);
          }
        }.bind(this));
      }.bind(this));

    },
    onClickCentroidLayer: function (event) {
                
      // playing memory: show parcel on click & hide marker then
      if (!this.parcelLayer)
        this.initParcelLayer();

      this.toggleParcelCentroid(event.target.feature.properties.id);

    },
    onMouseoverCentroidLayer: function (event) {
      //console.debug("centroidLayer - mouseover!");
      //highlight
      let feature = event.target;

      let goldIcon = this.centroidHighlightStyle();
      feature.setIcon(goldIcon);

      //propagate parcelID to charts if available
      this.$root.$emit("currentParcelIdChange", event.target.feature.properties.id);

    },
    onMouseoutCentroidLayer: function (event) {
      //console.debug("centroidLayer - mouseout!");
      //reset highlight
      this.centroidLayer.eachLayer(l=>l.setIcon(this.centroidStyle()));

      //unset parcelID to chart if available
      this.$root.$emit("currentParcelIdChange", -1);
    },
    map_addCentroid: function (parcel_id, geom, data ) {

      // console.debug(new Date().toISOString() + " map_addCentroid()");

      data.id = data.parcel_id;
      
      this.geojsonFeature = {
        "type": "Feature",
        "properties": data,
        "geometry": geom
      };

      //if it is the first parcel: init centroidLayer
      if (!this.centroidLayer) {
        this.initCentroidLayer(this.geojsonFeature);
      }
      else {
        this.centroidLayer.addData(this.geojsonFeature);
      }

      //fit to bounds when all parcels are ready
      // this.centroidLayer.getLayers().length  == this.limit is true for beginning
      // offset = 0, limit = 250, total_parcel_count = 287, this.centroidLayer.getLayers().length = 250
      // if paged +250 it is not true because of the offset!
      // offset = 250, limit = 250, total_parcel_count = 287, this.centroidLayer.getLayers().length = 37
      let allLayersLoaded = false;
      let layersToLoad = -1;

      if ((this.total_parcel_count - this.limit) > 0) {
        layersToLoad = this.limit;
      }
      if ((this.total_parcel_count - this.limit) <= 0) {
        layersToLoad = this.total_parcel_count;
      }

      if (this.centroidLayer.getLayers().length == layersToLoad) {
        allLayersLoaded = true;
      }
      if (allLayersLoaded) {
        //hide query date selector
        document.getElementById("queryDate_"+this.gcWidgetId).classList.add("is-hidden");
        //hide phenology query selectors
        document.getElementById("phStartDate_"+this.gcWidgetId).classList.add("is-hidden");
        document.getElementById("phEndDate_"+this.gcWidgetId).classList.add("is-hidden");

        if (this.zoomToBounds === true) {
          this.mymap.fitBounds(this.centroidLayer.getBounds());
          this.zoomToBounds = false;
        }

        this.centroidLayer.bringToFront();
        // hide spinner
        this.isloading = false;
      }
    },
    map_removeCentroid: function (parcel_id) {
      this.centroidLayer.removeLayer(this.centroidLayerRegistry[parcel_id]);
    },
    updateCentroids: function (filterString) {
      console.debug("updateCentroids()");
      if (this.centroidLayer)
        this.centroidLayer.clearLayers();
          
      this.initCentroidLayer();
      
      this.getParcelTotalCount(filterString, true);
    },
    updateParcels: function (filterString) {
      console.debug("updateParcels()");
      if (this.parcelLayer)
        this.parcelLayer.clearLayers();
          
      this.initParcelLayer();
      
      this.getParcelTotalCount(filterString);
    },
    // https://stackoverflow.com/questions/33614912/how-to-locate-leaflet-zoom-control-in-a-desired-position
    // Create additional Control placeholders
    addControlPlaceholders: function (map) {
      var corners = map._controlCorners,
        l = 'leaflet-',
        container = map._controlContainer;

      function createCorner(vSide, hSide) {
        var className = l + vSide + ' ' + l + hSide;

        corners[vSide + hSide] = L.DomUtil.create('div', className, container);
      }

      createCorner('verticalcenter', 'left');
      createCorner('verticalcenter', 'right');
    },
    addLegendControl: function (map) {
      
      // remove first
      this.removeLegendControl(map);

      this.legend = L.control({position: 'topright'});

      if (["sos","pos","eos"].includes(this.selectedProduct)) {
        this.legend.onAdd = function (map) {
          let div = L.DomUtil.create('div', 'gc-legend');

          // loop through the bins and generate a label with a colored square for each interval
          let colors = [0,1,2,3,4,5,6,7,8,9];
          div.innerHTML = '<p class="is-title"><b>'+this.$t("products."+this.selectedProduct) +'</b></p>'
                                  +'<p>'+ this.phStartdate + ' to ' + this.phEnddate +'</p>'+
                                  '<p class="is-subtitle"><b>' + this.$t("legend.doy") + '</b></p>';
          for (var i = 0; i < colors.length; i++) {
            try {
              div.innerHTML +=
                '<i style="background:' + this.getColor(this.selectedProduct, colors[i], false) + '"></i> ' +
                (this.bins[i][0] != undefined ? this.bins[i][0] : '') + ' &ndash; ' + (this.bins[i][this.bins[i].length-1] != undefined ? this.bins[i][this.bins[i].length-1] : '') + '<br>';
            } catch (ex) {}
          }
          return div;

        }.bind(this);
      }
      else {
        this.legend.onAdd = function (map) {
          let div = L.DomUtil.create('div', 'gc-legend');

          // loop through the ranges and generate a label with a colored square for each interval
          let colorRanges = { "vitality": [0.8,0.7,0.6,0.5,0.3,0.25,0.15,0.1],
                              "ndvi": [0.8,0.7,0.6,0.5,0.3,0.25,0.15,0.1],
                              "ndwi": [0.55,0.5,0.45,0.4,0.35,0.3,0.25,0.2,0.15],
                              "ndre1": [0.5,0.45,0.4,0.35,0.3,0.25,0.2,0.15],
                              "ndre2": [0.5,0.45,0.4,0.35,0.3,0.25,0.2,0.15],
                              "savi": [0.5,0.45,0.4,0.35,0.3,0.25,0.2,0.15],
                              "evi": [0.5,0.45,0.4,0.35,0.3,0.25,0.2,0.15],
                              "cire": [3.5,3.0,2.5,1.75,1.25,1.0,0.75,0.5],
                              "npcri": [0.5,0.45,0.4,0.35,0.3,0.25,0.2,0.15] };

          let colors = colorRanges[this.selectedProduct];
          div.innerHTML = '<p class="is-title"><b>'+this.$t("products."+this.selectedProduct) +'</b></p>'
                                  +'<p>'+ this.queryDate +'</p>'+
                                  '<p class="is-subtitle"><b>' + this.$t("legend.intervals") + '</b></p>';
          for (var i = 0; i < colors.length; i++) {
            try {
              div.innerHTML +=
                '<span><i style="background:' + this.getColor(this.selectedProduct, colors[i], false) + '"></i> ' +
                (i == 0 ? '> ' + colors[i] : //max element -> '> value'
                  (i == colors.length-1 ? ' < ' + colors[i] : // min element -> '< value'
                    (colors[i]) + ' &ndash; ' + (colors[i+1]) ) // intermediate values -> 'val1 - val2'
                  ) + '<br></span>';             
            } catch (ex) { console.debug(ex);}
          }
          return div;

        }.bind(this);
      }

      this.legend.addTo(map);

    },
    removeLegendControl: function (map) {
      
      if (this.legend)
        map.removeControl(this.legend);
    },
    zoomToSelectedParcels: function() {

      let currentBbox = undefined;
      //zoom to extent of current ids
      this.parcelLayer.eachLayer( function(l) {
      
        if (this.selectedParcelIds.includes(l.feature.properties.id)) {
          if (currentBbox) {
            currentBbox.extend(l.getBounds());
          }
          else {
            const lBbox = l.getBounds();
            currentBbox = new L.LatLngBounds(lBbox.getSouthWest(), lBbox.getNorthEast());
          }
        }

      }.bind(this));

      if (currentBbox)
        this.mymap.fitBounds(currentBbox);
      
    },
    clearSelection: function () {
      
      for (var i=0; i<this.selectedParcelIds.length; i++) {
        let parcel_id = this.selectedParcelIds[i];
        let parcelLyr = this.parcelLayerRegistry[parcel_id];
        let centroid = this.centroidLayerRegistry[parcel_id];

        centroid.setIcon(this.centroidStyle());

        // show centroid marker
        this.centroidLayer.addLayer(centroid); 

        // hide parcel
        this.parcelLayer.removeLayer(parcelLyr);
      }

      // deselect all
      this.$root.$emit("selectedParcelIdsChange", []);

    },
    clearApiMessages: function () {
      this.api_err_msg="";
    },
    toggleParcelCentroid: function (parcel_id) {
      
      /* only valid if the product has been chosen first */
      if (this.selectedProduct.length>0) {

        let centroid = this.centroidLayerRegistry[parcel_id];
        let parcelLyr = this.parcelLayerRegistry[parcel_id];

        if (this.parcelLayer.getLayers().includes(parcelLyr)) {
          // show centroid marker
          this.centroidLayer.addLayer(centroid); 

          // hide parcel
          this.parcelLayer.removeLayer(parcelLyr);

          // deselect
          this.removeFromArray(this.selectedParcelIds, parcel_id);
          
        }
        else {
          // hide centroid marker 
          this.centroidLayer.removeLayer(centroid);

          // show parcel
          if (parcelLyr) {
            this.parcelLayer.addLayer(parcelLyr);
          }
          else {
              this.getParcelsAttributes(parcel_id);
          }
          // select
          if (!this.selectedParcelIds.includes(parseInt(parcel_id)))
            this.selectedParcelIds.push(parseInt(parcel_id));
        }
      }
    },
    /* GUI helpers */
    growLayerControl: function (event) {
      document.getElementById("btnLayerControl_" + this.gcWidgetId).classList.add("is-hidden");
      document.getElementById("layerControlContent_" + this.gcWidgetId).classList.remove("is-hidden");
    },
    shrinkLayerControl: function (event) {
      document.getElementById("layerControlContent_" + this.gcWidgetId).classList.add("is-hidden");
      document.getElementById("btnLayerControl_" + this.gcWidgetId).classList.remove("is-hidden");
    },
    queryIndexValueAction: function () {
      const isQueryModeActive = document.getElementById("btnQueryIndexValue_" + this.gcWidgetId).classList.contains("is-active");
      if (isQueryModeActive) {
        document.getElementById("btnQueryIndexValue_" + this.gcWidgetId).classList.remove("is-active");
      }
      else {
        document.getElementById("btnQueryIndexValue_" + this.gcWidgetId).classList.add("is-active");
      }
    },
    disableQueryBtn: function () {
      document.getElementById("btnQueryIndexValue_" + this.gcWidgetId).classList.remove("is-active");
      document.getElementById("btnQueryIndexValue_" + this.gcWidgetId).classList.remove("is-dark");
      document.getElementById("btnQueryIndexValue_" + this.gcWidgetId).classList.add("is-light");

      //works only if the map has an active parcel layer!
      if (document.getElementById("map_"+this.gcWidgetId).getElementsByClassName("leaflet-interactive").length > 0) {
        //leaflet has its own interactive region within the map (bbox of layers)
        //so change cursor only for this element
        document.getElementById("map_"+this.gcWidgetId).getElementsByClassName("leaflet-interactive")[0].style.cursor = "pointer";

        // enable panning and zooming in map
        this.mymap.dragging.enable();
        this.mymap.doubleClickZoom.enable();

        // remove event handler for identify click in map
        this.mymap.off('click');
      }
    },
    showHintsAction: function () {
      //show all app's hints
      this.showHints = !this.showHints;
    },
    closeHints: function () {
      this.showHints = false;
    },
    /* date pickers */
    initQueryDatePicker() {

      if (this.queryDatePicker) {
        this.queryDatePicker.destroy();
      }

      this.queryDatePicker = new bulmaCalendar( document.getElementById( 'queryDate_'+this.gcWidgetId ), {
        startDate: new Date(Date.parse(this.queryDate)), // Date selected by default
        dateFormat: 'yyyy-mm-dd', // the date format `field` value
        lang: this.gcLanguage, // internationalization
        overlay: false,
        closeOnOverlayClick: true,
        closeOnSelect: true,
        // callback functions
        onSelect: function (e) { 
                    // hack +1 day
                    var a = new Date(e.valueOf() + 1000*3600*24);
                    this.queryDate = a.toISOString().split("T")[0]; //ISO String splits at T between date and time
                    }.bind(this),
      });
    },
    initPhStartDatePicker() {
      
      if (this.phStartDatePicker) {
        this.phStartDatePicker.destroy();
      }

      this.phStartDatePicker = new bulmaCalendar( document.getElementById( 'phStartDate_'+this.gcWidgetId ), {
        startDate: new Date(Date.parse(this.phStartdate)), // Date selected by default
        dateFormat: 'yyyy-mm-dd', // the date format `field` value
        lang: this.gcLanguage, // internationalization
        overlay: false,
        closeOnOverlayClick: true,
        closeOnSelect: true,
        // callback functions
        onSelect: function (e) { 
                    // hack +1 day
                    var a = new Date(e.valueOf() + 1000*3600*24);
                    this.phStartdate = a.toISOString().split("T")[0]; //ISO String splits at T between date and time
                    }.bind(this),
      });
    },
    initPhEndDatePicker() {
      
      if (this.phEndDatePicker) {
        this.phEndDatePicker.destroy();
      }
      this.phEndDatePicker = new bulmaCalendar( document.getElementById( 'phEndDate_'+this.gcWidgetId ), {
        startDate: new Date(Date.parse(this.phEnddate)), // Date selected by default
        dateFormat: 'yyyy-mm-dd', // the date format `field` value
        lang: this.gcLanguage, // internationalization
        overlay: false,
        closeOnOverlayClick: true,
        closeOnSelect: true,
        // callback functions
        onSelect: function (e) { 
                    // hack +1 day
                    var a = new Date(e.valueOf() + 1000*3600*24);
                    this.phEnddate = a.toISOString().split("T")[0]; //ISO String splits at T between date and time
                    }.bind(this),
      });
    },
    initZoomControl() {
      if (this.zoomControl) {
        this.mymap.removeControl(this.zoomControl);
      }
      // add zoom control (position)
      this.zoomControl = new L.Control.Zoom({
        position: 'bottomright',
        zoomInTitle: this.$t("map.zoomIn"),
        zoomOutTitle: this.$t("map.zoomOut"),
      }).addTo(this.mymap);
    },
    initSearchControl() {
      // GeoSearch Control
      if (this.searchControl) {
        this.mymap.removeControl(this.searchControl);
      }
      let provider = new window.GeoSearch.OpenStreetMapProvider();

      this.searchControl = new window.GeoSearch.GeoSearchControl({
        provider: provider,
        //style: 'bar',
        autoComplete: true,
        autoCompleteDelay: 250,
        animateZoom: true,
        autoClose: true,
        searchLabel: this.$t("map.searchLabel"),
        keepResult: true,
        position: 'bottomright'
      }).addTo(this.mymap);
    },
    /* time slider */
    initTimeline: function () {

      console.debug("initTimeline()");

      // destroy existing first
      if (this.timeLine) {
        this.timeLine.off("click");
        this.timeLine.destroy();
      }

      //let parcel = this.getCurrentParcel();
      let today = new Date().getTime();

      const MS_IN_A_DAY = 864e5;

      /* timeline test */
      var _visOptions = {
        width: "auto",
        height: "100%",
        type: "box",
        showCurrentTime: false,
        clickToUse: false,
        selectable: false,
        editable: false,
        moveable: true,
        stack: false,
        orientation: "bottom",
        showMajorLabels: false,
        showMinorLabels: true,
        zoomMin: MS_IN_A_DAY*7, //1 week zoom min
        // zoomMax is the timespan of start and endate + buffer of +20%
        // zoomMax: (new Date(parcel.enddate) - new Date(parcel.startdate).getTime()) *1.2,
        snap: function (date, scale, step) {
          return Math.round( date / MS_IN_A_DAY) * MS_IN_A_DAY;
        }
      };

      var _visDs1;

      _visDs1 = new vis.DataSet;

      for (var i = 0; i < this.selectedParcelIds.length; i++) {

        let parcel = this.getParcel(this.selectedParcelIds[i]);

        _visDs1.add([{
          id: parcel.parcel_id + "_1",
          start: parcel.startdate,
          type: "point",
          className: "start",
          group: parcel.parcel_id
        }, {
          id: parcel.parcel_id + "_2",
          start: parcel.planting,
          type: "point",
          className: "planting",
          group: parcel.parcel_id
        }, {
          id: parcel.parcel_id + "_3",
          start: parcel.harvest,
          type: "point",
          className: "harvest",
          title: parcel.harvest,
          group: parcel.parcel_id
        }, {
          id: parcel.parcel_id + "_4",
          start: today,
          type: "point",
          className: "today",
          group: parcel.parcel_id
        }, {
          id: parcel.parcel_id + "_5",
          start: parcel.enddate,
          type: "point",
          className: "end",
          group: parcel.parcel_id
        }]),

        _visDs1.add(parcel.timeseries.map(function (a, b) {
          //console.log(a.parcel_id + "_"+(b+6));
          return {
            id: a.parcel_id + "_"+(b+6), //begin with id 6 because all others are already taken
            start: new Date(a.date + ' 00:00:00'),
            type: "point",
            className: "special",//a.parcel_id,
            title: a.date,
            group: a.parcel_id
          }
        }));

      }

      // fill dates
      /*
      for (var i = parcel.timeseries.length + 10, p_dates = this.fillDates(parcel.startdate, parcel.enddate), j = 0; j < p_dates.length; j ++)
          _visDs1.add([{
              id: i,
              start: p_dates[j],
              type: "point",
              className: "otherdays",
              title: p_dates[j].simpleDate(),
              group: 0
          }]), i++; */

      this.timeLine = new vis.Timeline(document.getElementById("timeline_" + this.gcWidgetId), _visDs1, _visOptions);

      // margin of 10 days left and right of the timeline
      //this.timeLine.setWindow(new Date(parcel.startdate).getTime() - (180 * MS_IN_A_DAY), new Date(parcel.enddate).getTime() + (40 * MS_IN_A_DAY));

      this.timeLine.on("click", function (a) {
        //show raster of this datetime

        //do we have an item witch class special?
        let item = this.timeLine.itemsData._data[a.item];
        if (item) {
          if (item.className == "special") {
            let r = parcel.timeseries.map(d => d.date).indexOf(item.start.simpleDate());
            if (r >= 0) {
              this.currentRasterIndex = r;
            }
          }
        }

      }.bind(this));

      // fires on move of customeTime
      this.timeLine.on("timechanged", function (a) {
        //do we have an item witch class special?
        // snap it
        let snappedDate = new Date(this.timeLine.itemSet.options.snap(a.time)).simpleDate();
        let r = parcel.timeseries.map(r => r.date).indexOf(snappedDate);
        if (r >= 0) {
          this.currentRasterIndex = r;
        }

      }.bind(this));

      // first call: set marker on current time if ready
      let p = this.getCurrentParcel();
      if (p) {
        console.debug("setting first marker on: "+ p.timeseries[this.currentRasterIndex].date);
        this.showCurrentTimeMarker(p.timeseries[this.currentRasterIndex].date);
      }
      //show timeline container
      document.getElementById("timelineContainer_"+this.gcWidgetId).classList.remove('is-hidden');
    },
    startPauseVideo: function () {

      console.log("startPauseVideo()");

      //playing -> pause
      if (this.isPlaying) {
        this.isPlaying = false;
        document.getElementById("player_" + this.gcWidgetId).children.btnPlayerOnOff.innerHTML = '<i class="fas fa-play"></i>';
        clearInterval(this.myTimer);
        document.getElementById("player_" + this.gcWidgetId).children.btnPlayerOnOff.classList.remove("is-active");
      }
      //paused -> play
      else {
        //reset to start?
        //this.currentTimeSliderPosition = 0;

        this.isPlaying = true;
        document.getElementById("player_" + this.gcWidgetId).children.btnPlayerOnOff.classList.add("is-active");

        document.getElementById("player_" + this.gcWidgetId).children.btnPlayerOnOff.innerHTML = '<i class="fas fa-pause"></i>';
        var timeSeriesCount = this.getMaxTimeSeries().length;

        clearInterval(this.myTimer);
        //set slider +1 every interval
        this.myTimer = setInterval(function () {

          if (this.currentTimeSliderPosition <= timeSeriesCount) {
            //loop condition; set to min again
            if (this.currentTimeSliderPosition == timeSeriesCount) {
              this.currentTimeSliderPosition = 0;
            }

            this.currentRasterIndex = this.currentTimeSliderPosition + "";
            this.currentTimeSliderPosition++;
          }
        }.bind(this), this.imageChangeInterval);
      }
    },
    forwardTimeSeries: function () {
      var j = parseInt(this.currentRasterIndex);
      j += 1;
      if (j >= 0 && j < this.getMaxTimeSeries().length) {
        this.currentRasterIndex = j + "";
      }
    },
    backwardTimeSeries: function () {
      var j = parseInt(this.currentRasterIndex);
      j -= 1;
      if (j >= 0 && j < this.getMaxTimeSeries().length) {
        this.currentRasterIndex = j + "";
      }
    },
    disableTimeSlider: function (state) {

      document.getElementById("player_" + this.gcWidgetId).children.btnPlayerOnOff.disabled = state;
      /*document.getElementById("player_"+this.gcWidgetId).children.btnPlayerBackward.disabled = state;
      document.getElementById("player_"+this.gcWidgetId).children.btnPlayerForward.disabled = state;*/
    },
    showCurrentTimeMarker: function (date) {
      // add marker to timeline
      if (this.timeLine) {
        try {
          this.timeLine.removeCustomTime("current");
        } catch (err) {}
        // add marker on current image
        this.timeLine.addCustomTime(new Date(date).getTime(), "current");
      }
    },
    toggleLegend: function () {

      this.mapLegendVisible = document.getElementById("btnToggleLegend_" + this.gcWidgetId).classList.contains("is-active");

      if (this.mapLegendVisible) {

        document.getElementById("btnToggleLegend_" + this.gcWidgetId).classList.remove("is-active");
        document.getElementById("btnToggleLegend_" + this.gcWidgetId).classList.add("is-light");
        document.getElementById("btnToggleLegend_" + this.gcWidgetId).classList.remove("is-dark");

        this.removeLegendControl(this.mymap);

        this.mapLegendVisible = false;

      } else {

        this.addLegendControl(this.mymap);

        document.getElementById("btnToggleLegend_" + this.gcWidgetId).classList.add("is-active");
        document.getElementById("btnToggleLegend_" + this.gcWidgetId).classList.remove("is-light");
        document.getElementById("btnToggleLegend_" + this.gcWidgetId).classList.add("is-dark");

        this.mapLegendVisible = true;
      }
    },
    toggleMapOptions: function() {
      this.gcOptionsCollapsed = !this.gcOptionsCollapsed;
    },
    toggleProductsDatasourceCompat: function(source) {
      /*
          Handles compatibility of products & data_source
      */
      console.debug("toggleProductsDatasourceCompat("+source+")");

      let matrix = {"landsat8": ["visible", "vitality", "variations"],
                    "sentinel2": ["visible", "vitality", "variations", "ndvi", "ndre1", "ndre2", "ndre3",
                                      "ndwi", "savi", "evi2", "cire", "npcri"]
                    };

      // "landsat8", "sentinel2" or "" so check for length
      if (source.length > 0){
        //don't change the initial products!
        let potentialProducts = matrix[source];
        for (var i = 0; i < this.availableProducts.length;i++) {
          // if it is not in the potential products remove it
          if (!potentialProducts.includes(this.availableProducts[i])) {
            //this.availableProducts.remove(this.availableProducts[i]);
          }
        }
      }
      else {
        //don't change the initial products!
        let potentialProducts = matrix["sentinel2"];
        //this.products =
      }
    },
    disableLeafletClick: function(event) {
      /*console.debug("disableLeafletClick");
      var div = event.target;
      console.log(event.target);
      //var subEl = event.target.children[0];
      try {
        if (!L.Browser.touch) {
          console.debug("touch");
          L.DomEvent.disableClickPropagation(div);
          //L.DomEvent.disableClickPropagation(subEl);
          L.DomEvent.on(div, 'mousewheel', L.DomEvent.stopPropagation);
          //L.DomEvent.on(subEl, 'mousewheel', L.DomEvent.stopPropagation);
        } else {
          console.debug("not touch");
          L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation);
          //L.DomEvent.on(subEl, 'click', L.DomEvent.stopPropagation);
        }
      }catch (err) {}*/
    },
    enableLeafletClick: function(event) {
      /*console.debug("enableLeafletClick");
      console.debug(event);
      var div = L.DomUtil.get(this.gcWidgetId);
      try {
        if (!L.Browser.touch) {
          console.debug("touch");
          L.DomEvent.enableClickPropagation(div);
          L.DomEvent.on(div, 'mousewheel', L.DomEvent.startPropagation);
        } else {
          console.debug("not touch");
          L.DomEvent.on(div, 'click', L.DomEvent.startPropagation);
        }
      } catch (err) {}*/
    },
    /* helper functions */
    removeFromArray: function(arry, value) {
      let index = arry.indexOf(value);
      if (index > -1) {
          arry.splice(index, 1);
      }
      return arry;
    },
    formatDecimal: function (decimal, numberOfDecimals) {
      /* Helper function for formatting numbers to given number of decimals */

      var factor = 100;

      if (isNaN(parseFloat(decimal))) {
        return NaN;
      }
      if (numberOfDecimals == 1) {
        factor = 10;
      }
      if (numberOfDecimals == 2) {
        factor = 100;
      }
      if (numberOfDecimals == 3) {
        factor = 1000;
      }
      if (numberOfDecimals == 4) {
        factor = 10000;
      }
      if (numberOfDecimals == 5) {
        factor = 100000;
      }
      return Math.ceil(decimal * factor) / factor;
    },
    capitalize: function (s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    isDateValid: function (date_str) {
      /* Validates a given date string */
      if (!isNaN(new Date(date_str))) {
          return true;
      }
      else {
          return false;
      }
    },
    fillDates: function (a, b) {
      for (var c = new Date(a), d = new Date(b), e = [], f = c; d >= f;) {
        e.push(f), f = f.addDays(1);
      }
      return e;
    },
    getClosestDate: function (arr, queryDate) {
      console.debug("getClosestDate()");
      /* Returns the closest date in a array of dates
         with the sort function */
      let i = arr.sort(function(a, b) {
        var distancea = Math.abs(queryDate - a);
        var distanceb = Math.abs(queryDate - b);
        return distancea - distanceb; // sort a before b when the distance is smaller
      });
      return i[0];
    },
    // sort array ascending
    asc: function(arr) {
      return arr.sort((a, b) => a - b);
    },
    sum: function (arr) {
      return arr.reduce((a, b) => a + b, 0);
    },
    mean: function (arr) {
      return this.sum(arr) / arr.length;
    },
    // sample standard deviation
    std: function (arr) {
      const mu = this.mean(arr);
      const diffArr = arr.map(a => (a - mu) ** 2);
      return Math.sqrt(this.sum(diffArr) / (arr.length - 1));
    },
    quantile:  function (arr, q) {
      const sorted = this.asc(arr);
      const pos = ((sorted.length) - 1) * q;
      const base = Math.floor(pos);
      const rest = pos - base;
      if ((sorted[base + 1] !== undefined)) {
          return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
      } else {
          return sorted[base];
      }
    },
    histogram: function (arr) {
      /* computes the histogram for the given array to 9 bins with d3 */
      const sorted = this.asc(arr);
      console.debug(sorted);

      // compute thresholds array
      const stddev = this.std(arr);
      console.debug(stddev);
      let thresholds = [];
      let threshVal = sorted[0];
      // array shall have a defined length of 10 for color classes
      for (var i=0; i < 10; i++) {
        thresholds.push(threshVal);
        threshVal = threshVal + Math.round(stddev*0.5);
      }
      console.debug(thresholds);

      var histGenerator = d3.histogram()
      .domain([sorted[0],sorted[sorted.length-1]])
      .thresholds(thresholds); // number is only approximately - array with thresholds is fix (n-1)

      return histGenerator(sorted);
    },
    classify: function (arr) {
      console.debug(arr.sort());
      let data = new geostats(arr.sort());
      data.setPrecision(0);
   			
      // we get Eq interval classification
      //var a = data.getClassQuantile(9);
      //var a = data.getClassEqInterval(6);
      let minClassSize = Math.round(arr.length / 2.5) - 1;
      let classSize = 9;
      if (classSize > minClassSize)
        classSize = minClassSize;
      console.debug(classSize);

      var a = data.getClassJenks(classSize);

      return a;
    },
    //https://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
    getQueryVariable: function (query, variable) {
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) == variable) {
              return decodeURIComponent(pair[1]);
          }
      }
      console.log('Query variable %s not found', variable);
    },
    loadJSscript: function (url) {
      var script = document.createElement("script");  // create a script DOM node
      script.src = url;  // set its src to the provided URL
      document.body.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    },
    changeLanguage() {
      //this.$i18n.i18next.changeLanguage(this.currentLanguage);
      this.$i18n.locale = this.currentLanguage;
    },
    getBaseURL(js_file_to_find) {
      /* gets the complete base URL of the current script. Used for loading css and images dynamically
          e.g. in leaflet!
      */
      for (var i=0; i< document.head.children.length; i++) {
        const script = document.head.children[i];

        // only scripts or links (css) are of interest
        if (!["SCRIPT"].includes(script.tagName))  { continue; }

        if (script.src.includes(js_file_to_find)) {
          //console.debug("Script base URL: "+ script.src.split(js_file_to_find)[0]);
          return script.src.split(js_file_to_find)[0];
        }
      }
    },
  }
});
