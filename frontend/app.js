// The live Vercel API endpoint we built earlier
const API_URL = 'https://quickbites-sage.vercel.app/api/restaurants';

async function fetchRestaurants() {
    const loadingElement = document.getElementById('loading');
    const gridElement = document.getElementById('restaurants-grid');

    try {
        // 1. Fetch live JSON data from the backend
        const response = await fetch(API_URL);
        const restaurants = await response.json();

        // 2. Hide the loading spinner and show the grid
        loadingElement.classList.add('hidden');
        gridElement.classList.remove('hidden');

        // 3. Clear out any placeholder content
        gridElement.innerHTML = '';

        // 4. Loop through each restaurant and render it dynamically
        restaurants.forEach(restaurant => {
            // Map over menu items array to build standard bullet layouts
            const menuHTML = restaurant.menu_items && restaurant.menu_items.length > 0
                ? restaurant.menu_items.map(item => `
                    <div class="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                        <div>
                            <p class="font-semibold text-gray-800 text-sm">${item.name}</p>
                            <p class="text-xs text-gray-500">${item.description}</p>
                        </div>
                        <span class="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                            R${(item.price_cents / 100).toFixed(2)}
                        </span>
                    </div>
                `).join('')
                : '<p class="text-xs text-gray-400 italic">No menu items available right now.</p>';

            // Create the individual restaurant card template
            const cardHTML = `
                <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h2 class="text-xl font-bold text-gray-900">${restaurant.name}</h2>
                            <span class="text-xs font-semibold bg-red-50 text-red-600 px-2.5 py-1 rounded-full">
                                ${restaurant.cuisine_type ? restaurant.cuisine_type.join(', ') : 'General'}
                            </span>
                        </div>
                        <p class="text-sm text-gray-500 mb-4 flex items-center">
                            📍 ${restaurant.address}
                        </p>
                        
                        <div class="border-t border-gray-100 pt-4">
                            <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Popular Items</h3>
                            <div class="space-y-2">
                                ${menuHTML}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Inject the complete card directly into the HTML grid container
            gridElement.innerHTML += cardHTML;
        });

    } ca} catch (error) {
        console.error('Error fetching data:', error);
        loadingElement.innerHTML = `
            <p class="text-red-500 font-semibold">Failed to load restaurants.</p>
            <p class="text-xs text-gray-400 mt-1">${error.message}</p>
        `;
    }
}

// Fire off the function immediately when the page loads up
document.addEventListener('DOMContentLoaded', fetchRestaurants);