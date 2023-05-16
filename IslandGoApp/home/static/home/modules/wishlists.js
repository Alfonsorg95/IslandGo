import {
    USERNAME,
} from './index.js';

import {
    renderWishlists,
    updateWishlistNode,
} from './helpers.js';

import {
    SELECTED_STORE_ID,
} from './stores.js';

import {
    fetchNearbyWishlists,
    addWishlist,
    updateWishlist,
} from './api.js';


export function removeWishLists() {
    const previousWishlist = document.getElementsByClassName('wishlist')
    if (previousWishlist) {
        const wishlistArray = Array.from(previousWishlist)
        for (let i=0; i<wishlistArray.length; i++) {
            wishlistArray[i].remove();
        }
    }
    
}

/**
 * Fetch and display wishlists from users nearby you
 * @param {number} latitude
 * @param {number} longitude
 */
export async function displayNearbyWishlists(latitude, longitude) {
    removeWishLists()
    try {
        const nearbyWishlists = await fetchNearbyWishlists(latitude, longitude);
        renderWishlists('nearby-wishlists', nearbyWishlists);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Fetch and display wishlists that you created in a neighborhood
 * @param {number} latitude
 * @param {number} longitude
 */
export async function displayMyRequests(latitude, longitude) { 
    removeWishLists() 
    try {  
        const myWishlists = await fetchNearbyWishlists(latitude, longitude, {buyer: USERNAME});  
        renderWishlists('my-wishlists', myWishlists);  
    } catch(error) {  
        console.error(error);  
    }  
}

/**
 * Fetch and display wishlists that you picked up
 * @param {number} latitude
 * @param {number} longitude
 */
export async function displayMyTrips(latitude, longitude) {  
    removeWishLists()
    try {  
        const myTrips = await fetchNearbyWishlists(latitude, longitude, {wishmaster: USERNAME});  
        renderWishlists('my-trips', myTrips);  
    } catch(error) {  
        console.error(error);  
    }  
}

/**
 * Create a new wishlist
 */
export async function createWishlist() {  
    const wishlistInput = document.getElementById("wishlist-items").value.trim(); 
    if (USERNAME && SELECTED_STORE_ID && wishlistInput) {  
        addWishlist(USERNAME, wishlistInput.split(",").map(element => {return element.trim()}), SELECTED_STORE_ID);  
    }  
}


/**
 * Update a wishlist's status
 * @param {Event} event
 */
export async function updateWishlistStatus(event) {  
    switch(event.target.className) {  
        case 'accept':  
            event.preventDefault();  
            updateWishlist(  
                event.target.getAttribute('data-id'),  
                {  
                    status: 'ACCEPTED',  
                    wishmaster: USERNAME  
                }  
            ).then((result) => {  
                updateWishlistNode(event.target, 'ACCEPTED');  
            }).catch(error => console.error(error));
            
            break;  
        case 'accepted':  
            event.preventDefault();  
            updateWishlist(  
                event.target.getAttribute('data-id'),  
                {  
                    status: 'FULFILLED',  
                    wishmaster: USERNAME  
                }  
            ).then((result) => {  
                updateWishlistNode(event.target, 'FULFILLED');  
            }).catch(error => console.error(error));
            
            break;  
    }  
}

