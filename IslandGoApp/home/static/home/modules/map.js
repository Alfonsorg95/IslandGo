import TOKEN from './config.js';

import {
    updateSelectedStore,
} from './stores.js';

mapboxgl.accessToken = TOKEN;

/**
 * @typedef {import('./api').Store} Store
 */

/**
 * Stores GeoJSON Feature object
 * @typedef {Object} StoreFeatureObject
 * @property {'Feature'} type
 * @property {{type: 'Point', coordinates: [number, number] }} geometry
 * @property {Store} properties
 */

/**
 * Stores GeoJSON FeatureCollection
 * @typedef {Object} StoresGeoJSON
 * @property {'FeatureCollection'} type
 * @property {StoreFeatureObject[]} features
 */

/**
 * Create a new mapbox map instance
 * @return {Object} Map
 */
export function addMap() {
    const map = new mapboxgl.Map({  
        container: 'map',  
        style: 'mapbox://styles/mapbox/light-v10',  
        center: [14.375416, 35.937496],  
        zoom: 10 
    });
    
    map.addControl(new mapboxgl.NavigationControl());  
    
    return map;
    
}

/**
 * Add a geoCoder control to a mapbox map
 * @param {Object} map
 * @param {function} geocoderCallback - The callback that handles the response.
 */
export function addGeocoder(map, geocoderCallback) {
    const geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl });map.addControl(geocoder);geocoder.on("result", (data) => {  
        geocoderCallback(data);  
    });
    
}

/**
 * Converts array of stores to GeoJSON format
 * @param {Store[]} stores
 * @return {StoresGeoJSON} Stores in GeoJSON
 */
export function convertToGeoJson(stores) {return {  
    type: "FeatureCollection",  
    features: stores.map(store => {  
        return {  
            type: "Feature",  
            geometry: {  
                type: 'Point',  
                coordinates: [store.longitude, store.latitude]  
            },  
            properties: {  
                id: store.id,  
                name: store.name,  
                address: store.address,  
                phone: store.phone,  
                distance: store.distance,  
                rating: store.rating,  
            }  
        }  
    })  
}}

/**
 * Display stores on map
 * @param {Object} map
 * @param {StoresGeoJSON} storesGeoJson
 */
export function plotStoresOnMap(map, storesGeoJson) {  
    for(let store of storesGeoJson.features) {  
        // create a HTML element for each feature  
        let el = document.createElement('div');  
        el.className = 'store';  
        el.title = `${store.properties.name}\n` +  
        `approximately ${store.properties.distance.toFixed(2)} km away\n` +  
        `Address: ${store.properties.address || "N/A"}\n` +  
        `Phone: ${store.properties.phone || "N/A"}\n` +  
        `Rating: ${store.properties.rating || "N/A"}`; // make a marker for each feature and add to the map  
        new mapboxgl.Marker(el)  
            .setLngLat(store.geometry.coordinates)  
            .addTo(map); el.addEventListener('click', function(e) {  
            updateSelectedStore(store.properties.id);  
        });
    }  
}

/**
 * Zoom in-to a specific point on a map
 * @param {Object} map
 * @param {StoreFeatureObject} point
 */
export function flyToStore(map, point) {

}

/**
 * Display store info on the map using a popup
 * @param {Object} map
 * @param {StoreFeatureObject} point
 */
export function displayStoreDetails(map, point) {
    
}
