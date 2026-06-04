const API_URL = '/api/restaurants';

async function fetchRestaurants() {
    const loadingElement = document.getElementById('loading');
    const gridElement = document.getElementById('restaurants-grid');

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();

        // Clear out the loading spinner
        if (loadingElement) loadingElement.style.display = 'none';

        // Check if we have valid restaurant data arrays
        if (!data || data.length === 0) {
            gridElement.innerHTML = `<p class="text-gray-500 text-center col-span-full">No restaurants found nearby.</p>`;
            return;
        }

        // Reset grid container to clear old states
        gridElement.innerHTML = '';

        // Loop through data and build out the HTML card layouts
        data.forEach(restaurant => {
            // Safe array validation check for cuisine tags
            let tags = 'General Cuisine';
            if (restaurant.cuisine_type) {
                if (Array.isArray(restaurant.cuisine_type)) {
                    tags = restaurant.cuisine_type.join(', ');
                } else {
                    tags = restaurant.cuisine_type; // fallback if it's stored as plain text
                }
            }
            
            // Look for nested menu items safely
            let menuHTML = '';
            if (restaurant.menu_items && restaurant.menu_items.length > 0) {
                menuHTML = `<div class="mt-4 pt-3 border-t border-gray-100">
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Popular Items</p>
                    ${restaurant.menu_items.map(item => `
                        <div class="flex justify-between items-center mt-1 text-sm">
                            <span class="text-gray-700 font-medium">${item.name}</span>
                            <span class="text-orange-600 font-semibold">R${(item.price_cents / 100).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>`;
            } else {
                menuHTML = `<div class="mt-4 pt-3 border-t border-gray-100 text-center text-xs text-gray-400 italic">
                    No menu items posted yet.
                </div>`;
            }

            const cardHTML = `
                <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-5 hover:shadow-lg transition">
                    <div class="flex justify-between items-start">
                        <div class="w-full">
                            <span class="text-xs bg-orange-50 text-orange-600 font-semibold px-2 py-1 rounded-full">${tags}</span>
                            <h3 class="text-lg font-bold text-gray-900 mt-2">${restaurant.name}</h3>
                            <p class="text-sm text-gray-500 mt-1">${restaurant.address || 'Address not listed'}</p>
                        </div>
                    </div>
                    ${menuHTML}
                </div>
            `;
            gridElement.innerHTML += cardHTML;
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        if (loadingElement) {
            loadingElement.innerHTML = `
                <p class="text-red-500 font-semibold">Failed to load restaurants.</p>
                <p class="text-xs text-gray-400 mt-1">${error.message}</p>
            `;
        }
    }
}

// Fire off the data fetch automatically when the web page mounts
document.addEventListener('DOMContentLoaded', fetchRestaurants);