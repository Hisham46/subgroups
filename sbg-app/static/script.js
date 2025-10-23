// Application state
let appState = {
    date: '',
    outlet: '',
    division: '',
    beverages: {},
    softDrinks: {}
};

// Beverages data structure - Updated with 3 columns
const beveragesData = {
    "OFC STAR": {
        sizes: ["750", "375", "180", "90"]
    },
    "C.M": {
        sizes: ["750", "375", "180", "90"]
    },
    "D K": {
        sizes: ["180", "90", "180", "90"]
    },
    "JUBILLE": {
        sizes: ["750", "375", "180"]
    },
    "100 PIPERS": {
        sizes: ["750", "375", "180", "60"]
    },
    "TEACHERS": {
        sizes: ["750", "375", "180", "60"]
    },
    "B & WHITE": {
        sizes: ["750", "375", "180", "60"]
    },
    "VAT 69": {
        sizes: ["750", "60", "750", "60"]
    },
    "TEACHERS 50": {
        sizes: ["750", "60", "750", "60"]
    },
    "BLACK DOG C": {
        sizes: ["750", "180", "60"]
    },
    "J W BLACK": {
        sizes: ["750"]
    },
    "J W RED": {
        sizes: ["750"]
    },
    "CHIVASREGAL": {
        sizes: ["750"]
    },
    "MUSCKOV": {
        sizes: ["180", "90"]
    },
    "OXYGEN": {
        sizes: ["180"]
    },
    "WINDSOR": {
        sizes: ["90"]
    },
    "UB": {
        sizes: ["650", "330"]
    },
    "UB STRONG": {
        sizes: ["650", "330"]
    },
    "TIN": {
        sizes: ["500"]
    },
    "RC STRONG": {
        sizes: ["650", "330"]
    },
    "POWER COOL": {
        sizes: ["650", "330"]
    },
    "BULLET": {
        sizes: ["650", "330"]
    },
    "KF": {
        sizes: ["650", "330"]
    },
    "KF STORM": {
        sizes: ["650"]
    },
    "KF ULTRA": {
        sizes: ["650"]
    },
    "KF U MAX": {
        sizes: ["650"]
    },
    "KFS": {
        sizes: ["650"]
    },
    "KFS PINT": {
        sizes: ["330"]
    },
    "KFS CAN": {
        sizes: ["330", "500"]
    },
    "COISURG": {
        sizes: ["650"]
    },
    "COISURG (E)": {
        sizes: ["650"]
    },
    "TUBOR G GREEN": {
        sizes: ["650"]
    },
    "TUBOR G STRONG": {
        sizes: ["650", "330"]
    },
    "BUDWISER": {
        sizes: ["650"]
    },
    "MAGNUM": {
        sizes: ["500", "650"]
    },
    "BIG SIZE": {
        sizes: ["650"]
    },
    "BIG CAN": {
        sizes: ["500"]
    },
    "B BREEZER": {
        sizes: ["275"]
    },
    "BACADI +": {
        sizes: ["275"]
    },
    "HOEGARDEN": {
        sizes: ["500"]
    },
    "BLACK FORT": {
        sizes: ["650", "330", "500"]
    }
};

// Soft drinks data structure
const softDrinksData = {
    "WATER": {
        sizes: ["2LT", "1LTR", "500 ML"]
    },
    "SODA": {
        sizes: ["750", "250"]
    },
    "SPRITE": {
        sizes: ["2.25 LTR", "600", "250"]
    },
    "COCA-COLA": {
        sizes: ["600", "250"]
    },
    "FANTA": {
        sizes: ["600", "250", "2.25 LTR"]
    },
    "RIMZIM": {
        sizes: ["250"]
    },
    "CHARGAR": {
        sizes: ["250"]
    },
    "THUMBS UP": {
        sizes: ["250"]
    }
};

// DOM elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    date: document.getElementById('date-screen'),
    outlet: document.getElementById('outlet-screen'),
    beverages: document.getElementById('beverages-screen'),
    softDrinks: document.getElementById('soft-drinks-screen'),
    review: document.getElementById('review-screen'),
    confirmation: document.getElementById('confirmation-screen')
};

// Navigation functions
function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the requested screen
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
    } else {
        console.error(`Screen '${screenName}' not found`);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    const datePicker = document.getElementById('date-picker');
    if (datePicker) {
        datePicker.value = today;
        appState.date = today;
    }
    
    // Generate beverages selection UI
    generateBeveragesUI();
    
    // Generate soft drinks selection UI
    generateSoftDrinksUI();
    
    // Set up event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Welcome screen
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            showScreen('date');
        });
    }
    
    // Date screen
    const datePicker = document.getElementById('date-picker');
    if (datePicker) {
        datePicker.addEventListener('change', function(e) {
            appState.date = e.target.value;
        });
    }
    
    const dateNext = document.getElementById('date-next');
    if (dateNext) {
        dateNext.addEventListener('click', function() {
            showScreen('outlet');
        });
    }
    
    // Outlet screen
    const outletButtons = document.querySelectorAll('.outlet-btn');
    outletButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selection from all buttons
            outletButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Select this button
            this.classList.add('selected');
            
            // Store selection
            appState.outlet = this.textContent;
            appState.division = this.getAttribute('data-division');
            
            // Enable next button
            const outletNext = document.getElementById('outlet-next');
            if (outletNext) {
                outletNext.disabled = false;
            }
            
            // Lock other divisions
            const divisionSections = document.querySelectorAll('.division-section');
            divisionSections.forEach(section => {
                const firstBtn = section.querySelector('.outlet-btn');
                if (firstBtn && firstBtn.getAttribute('data-division') !== appState.division) {
                    section.classList.add('locked');
                } else {
                    section.classList.remove('locked');
                }
            });
        });
    });
    
    const outletBack = document.getElementById('outlet-back');
    if (outletBack) {
        outletBack.addEventListener('click', function() {
            showScreen('date');
        });
    }
    
    const outletNext = document.getElementById('outlet-next');
    if (outletNext) {
        outletNext.addEventListener('click', function() {
            showScreen('beverages');
        });
    }
    
    // Beverages screen
    const beveragesBack = document.getElementById('beverages-back');
    if (beveragesBack) {
        beveragesBack.addEventListener('click', function() {
            showScreen('outlet');
        });
    }
    
    const beveragesNext = document.getElementById('beverages-next');
    if (beveragesNext) {
        beveragesNext.addEventListener('click', function() {
            showScreen('softDrinks');
        });
    }
    
    // Soft drinks screen
    const softDrinksBack = document.getElementById('soft-drinks-back');
    if (softDrinksBack) {
        softDrinksBack.addEventListener('click', function() {
            showScreen('beverages');
        });
    }
    
    const softDrinksNext = document.getElementById('soft-drinks-next');
    if (softDrinksNext) {
        softDrinksNext.addEventListener('click', function() {
            updateOrderSummary();
            showScreen('review');
        });
    }
    
    // Review screen
    const reviewBack = document.getElementById('review-back');
    if (reviewBack) {
        reviewBack.addEventListener('click', function() {
            showScreen('softDrinks');
        });
    }
    
    const submitOrder = document.getElementById('submit-order');
    if (submitOrder) {
        submitOrder.addEventListener('click', function() {
            submitOrderFunction();
        });
    }
    
    // Confirmation screen
    const newOrder = document.getElementById('new-order');
    if (newOrder) {
        newOrder.addEventListener('click', function() {
            resetApp();
            showScreen('welcome');
        });
    }
}

function generateBeveragesUI() {
    const container = document.getElementById('beverages-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (const [category, data] of Object.entries(beveragesData)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'beverage-category';
        
        const heading = document.createElement('h3');
        heading.textContent = category;
        categoryDiv.appendChild(heading);
        
        const table = document.createElement('table');
        table.className = 'beverage-table';
        
        // Create header row - Only 3 columns as requested
        const headerRow = document.createElement('tr');
        const sizeHeader = document.createElement('th');
        sizeHeader.textContent = 'Size (ml)';
        headerRow.appendChild(sizeHeader);
        
        // Only two box columns instead of four
        const boxHeader = document.createElement('th');
        boxHeader.textContent = 'Box';
        headerRow.appendChild(boxHeader);
        
        const pieceHeader = document.createElement('th');
        pieceHeader.textContent = 'Piece';
        headerRow.appendChild(pieceHeader);
        
        table.appendChild(headerRow);
        
        // Create rows for each size
        data.sizes.forEach(size => {
            const row = document.createElement('tr');
            
            const sizeCell = document.createElement('td');
            sizeCell.textContent = size;
            row.appendChild(sizeCell);
            
            // Box input
            const boxCell = document.createElement('td');
            const boxInput = document.createElement('input');
            boxInput.type = 'number';
            boxInput.min = '0';
            boxInput.value = '0';
            boxInput.className = 'quantity-input';
            boxInput.dataset.category = category;
            boxInput.dataset.size = size;
            boxInput.dataset.type = 'box';
            boxInput.addEventListener('input', function() {
                updateBeverageQuantity(category, size, 'box', parseInt(this.value) || 0);
            });
            boxCell.appendChild(boxInput);
            row.appendChild(boxCell);
            
            // Piece input
            const pieceCell = document.createElement('td');
            const pieceInput = document.createElement('input');
            pieceInput.type = 'number';
            pieceInput.min = '0';
            pieceInput.value = '0';
            pieceInput.className = 'quantity-input';
            pieceInput.dataset.category = category;
            pieceInput.dataset.size = size;
            pieceInput.dataset.type = 'piece';
            pieceInput.addEventListener('input', function() {
                updateBeverageQuantity(category, size, 'piece', parseInt(this.value) || 0);
            });
            pieceCell.appendChild(pieceInput);
            row.appendChild(pieceCell);
            
            table.appendChild(row);
        });
        
        categoryDiv.appendChild(table);
        container.appendChild(categoryDiv);
    }
}

function generateSoftDrinksUI() {
    const container = document.getElementById('soft-drinks-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (const [drink, data] of Object.entries(softDrinksData)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'soft-drink-category';
        
        const heading = document.createElement('h3');
        heading.textContent = drink;
        categoryDiv.appendChild(heading);
        
        const table = document.createElement('table');
        table.className = 'soft-drink-table';
        
        // Create header row - Updated to 3 columns
        const headerRow = document.createElement('tr');
        const sizeHeader = document.createElement('th');
        sizeHeader.textContent = 'Size';
        headerRow.appendChild(sizeHeader);
        
        const boxHeader = document.createElement('th');
        boxHeader.textContent = 'Box';
        headerRow.appendChild(boxHeader);
        
        const pieceHeader = document.createElement('th');
        pieceHeader.textContent = 'Piece';
        headerRow.appendChild(pieceHeader);
        
        table.appendChild(headerRow);
        
        // Create rows for each size
        data.sizes.forEach(size => {
            const row = document.createElement('tr');
            
            const sizeCell = document.createElement('td');
            sizeCell.textContent = size;
            row.appendChild(sizeCell);
            
            // Box input
            const boxCell = document.createElement('td');
            const boxInput = document.createElement('input');
            boxInput.type = 'number';
            boxInput.min = '0';
            boxInput.value = '0';
            boxInput.className = 'quantity-input';
            boxInput.dataset.drink = drink;
            boxInput.dataset.size = size;
            boxInput.dataset.type = 'box';
            boxInput.addEventListener('input', function() {
                updateSoftDrinkQuantity(drink, size, 'box', parseInt(this.value) || 0);
            });
            boxCell.appendChild(boxInput);
            row.appendChild(boxCell);
            
            // Piece input
            const pieceCell = document.createElement('td');
            const pieceInput = document.createElement('input');
            pieceInput.type = 'number';
            pieceInput.min = '0';
            pieceInput.value = '0';
            pieceInput.className = 'quantity-input';
            pieceInput.dataset.drink = drink;
            pieceInput.dataset.size = size;
            pieceInput.dataset.type = 'piece';
            pieceInput.addEventListener('input', function() {
                updateSoftDrinkQuantity(drink, size, 'piece', parseInt(this.value) || 0);
            });
            pieceCell.appendChild(pieceInput);
            row.appendChild(pieceCell);
            
            table.appendChild(row);
        });
        
        categoryDiv.appendChild(table);
        container.appendChild(categoryDiv);
    }
}

function updateBeverageQuantity(category, size, type, quantity) {
    if (!appState.beverages[category]) {
        appState.beverages[category] = {};
    }
    
    if (!appState.beverages[category][size]) {
        appState.beverages[category][size] = {};
    }
    
    appState.beverages[category][size][type] = quantity;
}

function updateSoftDrinkQuantity(drink, size, type, quantity) {
    if (!appState.softDrinks[drink]) {
        appState.softDrinks[drink] = {};
    }
    
    if (!appState.softDrinks[drink][size]) {
        appState.softDrinks[drink][size] = {};
    }
    
    appState.softDrinks[drink][size][type] = quantity;
}

function updateOrderSummary() {
    const summaryContainer = document.getElementById('order-summary');
    if (!summaryContainer) return;
    
    let summaryHTML = `
        <p><strong>Date:</strong> ${appState.date}</p>
        <p><strong>Outlet:</strong> ${appState.outlet}</p>
        <p><strong>Division:</strong> ${appState.division}</p>
        
        <h3>Beverages Order:</h3>
    `;
    
    // Add beverages summary
    let hasBeverages = false;
    for (const [category, items] of Object.entries(appState.beverages)) {
        let categoryItems = [];
        
        for (const [size, types] of Object.entries(items)) {
            if (types.box > 0) {
                categoryItems.push(`${size}ml - ${types.box} box(es)`);
            }
            if (types.piece > 0) {
                categoryItems.push(`${size}ml - ${types.piece} piece(s)`);
            }
        }
        
        if (categoryItems.length > 0) {
            hasBeverages = true;
            summaryHTML += `<p><strong>${category}:</strong> ${categoryItems.join(', ')}</p>`;
        }
    }
    
    if (!hasBeverages) {
        summaryHTML += '<p>No beverages selected</p>';
    }
    
    summaryHTML += '<h3>Soft Drinks Order:</h3>';
    
    // Add soft drinks summary
    let hasSoftDrinks = false;
    for (const [drink, items] of Object.entries(appState.softDrinks)) {
        let drinkItems = [];
        
        for (const [size, types] of Object.entries(items)) {
            if (types.box > 0) {
                drinkItems.push(`${size} - ${types.box} box(es)`);
            }
            if (types.piece > 0) {
                drinkItems.push(`${size} - ${types.piece} piece(s)`);
            }
        }
        
        if (drinkItems.length > 0) {
            hasSoftDrinks = true;
            summaryHTML += `<p><strong>${drink}:</strong> ${drinkItems.join(', ')}</p>`;
        }
    }
    
    if (!hasSoftDrinks) {
        summaryHTML += '<p>No soft drinks selected</p>';
    }
    
    summaryContainer.innerHTML = summaryHTML;
}

function submitOrderFunction() {
    const submitButton = document.getElementById('submit-order');
    if (!submitButton) return;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    fetch('/submit_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appState)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showScreen('confirmation');
        } else {
            alert('Error submitting order: ' + data.message);
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Order';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting order. Please try again.');
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Order';
    });
}

function resetApp() {
    // Reset app state
    appState = {
        date: new Date().toISOString().split('T')[0],
        outlet: '',
        division: '',
        beverages: {},
        softDrinks: {}
    };
    
    // Reset UI
    const datePicker = document.getElementById('date-picker');
    if (datePicker) {
        datePicker.value = appState.date;
    }
    
    // Clear outlet selection
    document.querySelectorAll('.outlet-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    document.querySelectorAll('.division-section').forEach(section => {
        section.classList.remove('locked');
    });
    
    const outletNext = document.getElementById('outlet-next');
    if (outletNext) {
        outletNext.disabled = true;
    }
    
    // Clear quantity inputs
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.value = '0';
    });
}