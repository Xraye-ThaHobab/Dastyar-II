// Data Storage
let formData = {
    fullName: '',
    phone: '',
    units: 4,
    entries: 1,
    monitors: {},
    panel: null,
    accessories: {},
    services: {
        installation: false
    }
};

// Products Data - بر اساس تحقیقات از سایت دستیار امنیت [[0]](#__0) [[1]](#__1)
const monitors = {
    taknama: [
        { id: 'c43m', name: 'مانیتور C43 M', brand: 'تکنما', price: 5350000, desc: 'با حافظه و ارتباط داخلی' },
        { id: 'c43plus', name: 'مانیتور C43 PLUS', brand: 'تکنما', price: 4790000, desc: 'مدل پیشرفته' },
        { id: 'd43', name: 'مانیتور D43', brand: 'تکنما', price: 3690000, desc: 'مدل استاندارد' },
        { id: 'f70', name: 'مانیتور F70', brand: 'تکنما', price: 6500000, desc: 'صفحه نمایش 7 اینچ' }
    ],
    unibell: [
        { id: 'u2243', name: 'مانیتور 2243', brand: 'یونیبل', price: 3450000, desc: 'کیفیت بالا' },
        { id: 'u2443', name: 'مانیتور 2443', brand: 'یونیبل', price: 4200000, desc: 'مدل حرفه‌ای' }
    ]
};

const panels = [
    { 
        id: 'k1', 
        name: 'پنل 1 واحدی دیجیتال', 
        brand: 'تکنما', 
        price: 2690000, 
        capacity: 1,
        features: ['دیجیتال', 'کارتی', 'دید در شب']
    },
    { 
        id: 'k6', 
        name: 'پنل 6 واحدی کارتی', 
        brand: 'تکنما', 
        price: 3790000, 
        capacity: 6,
        features: ['کارتی RFID', 'دید در شب', 'ضد آب']
    },
    { 
        id: 'e11', 
        name: 'پنل لمسی E11', 
        brand: 'تکنما', 
        price: 3740000, 
        capacity: 1,
        features: ['لمسی', 'کارتی', 'طراحی مدرن'],
        badge: 'پرفروش'
    },
    { 
        id: 'e35', 
        name: 'پنل لمسی E35-LC', 
        brand: 'تکنما', 
        price: 6380000, 
        capacity: 35,
        features: ['کدینگ', 'پسوردی', 'کارتی', 'ظرفیت بالا']
    },
    { 
        id: 'u1', 
        name: 'پنل یونیبل 1 واحدی', 
        brand: 'یونیبل', 
        price: 2850000, 
        capacity: 1,
        features: ['بدنه آلومینیومی', 'دید در شب', 'مقاوم']
    }
];

// بر اساس تحقیقات از محصولات تکنما [[2]](#__2) [[3]](#__3)
const accessories = [
    { id: 'card', name: 'کارت RFID تکنما', price: 85000, icon: 'fa-id-card' },
    { id: 'tag', name: 'تگ RFID چرمی', price: 120000, icon: 'fa-key' },
    { id: 'switcher', name: 'ماژول سوئیچر', price: 1330000, icon: 'fa-plug' },
    { id: 'memory', name: 'ماژول حافظه جانبی', price: 850000, icon: 'fa-sd-card' },
    { id: 'multiplexer', name: 'ماژول مالتی پلکسر', price: 1200000, icon: 'fa-network-wired' },
    { id: 'lock', name: 'قفل برقی', price: 2500000, icon: 'fa-lock' }
];

let currentStep = 1;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    initializeAccessories();
});

// Step Navigation
function nextStep(step) {
    if (!validateStep(step)) return;
    
    if (step === 2) {
        generateUnitsGrid();
        updateSmartGuide();
    }
    
    if (step === 3) {
        updatePanelGuide();
        generatePanelsGrid();
    }
    
    if (step === 4) {
        updateAccessoryGuide();
    }
    
    document.getElementById(`step${step}`).classList.remove('active');
    document.getElementById(`step${step + 1}`).classList.add('active');
    
    currentStep = step + 1;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(step) {
    document.getElementById(`step${step}`).classList.remove('active');
    document.getElementById(`step${step - 1}`).classList.add('active');
    
    currentStep = step - 1;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validation
function validateStep(step) {
    if (step === 1) {
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (!fullName) {
            alert('⚠️ لطفا نام و نام خانوادگی خود را وارد کنید');
            return false;
        }
        
        if (!phone || phone.length !== 11 || !phone.startsWith('09')) {
            alert('⚠️ لطفا شماره تماس معتبر وارد کنید (11 رقم)');
            return false;
        }
        
        formData.fullName = fullName;
        formData.phone = phone;
    }
    
    if (step === 2) {
        formData.units = parseInt(document.getElementById('units').value);
        formData.entries = parseInt(document.getElementById('entries').value);
    }
    
    if (step === 3) {
        const selectedCount = Object.keys(formData.monitors).length;
        if (selectedCount < formData.units) {
            alert(`⚠️ لطفا برای تمام ${formData.units} واحد، مانیتور انتخاب کنید`);
            return false;
        }
    }
    
    if (step === 4) {
        if (!formData.panel) {
            alert('⚠️ لطفا یک پنل انتخاب کنید');
            return false;
        }
    }
    
    return true;
}

// Progress Bar
function updateProgress() {
    const progress = (currentStep / 6) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Counter
function changeValue(id, delta) {
    const input = document.getElementById(id);
    let value = parseInt(input.value);
    const min = id === 'units' ? 1 : 1;
    const max = id === 'units' ? 50 : 10;
    
    value += delta;
    
    if (value >= min && value <= max) {
        input.value = value;
    }
}

// Smart Guide
function updateSmartGuide() {
    const units = formData.units;
    document.getElementById('guideUnits').textContent = units;
    
    let guideText = '';
    if (units <= 4) {
        guideText = `برای ساختمان شما با ${units} واحد، مانیتورهای سری C یا D تکنما مناسب هستند. این مانیتورها قیمت مناسب و کیفیت عالی دارند.`;
    } else if (units <= 10) {
        guideText = `برای ساختمان شما با ${units} واحد، توصیه می‌کنیم از مانیتورهای سری C43 M یا F70 استفاده کنید که قابلیت ارتباط داخلی دارند.`;
    } else {
        guideText = `برای ساختمان بزرگ شما با ${units} واحد، حتما از مانیتورهای حرفه‌ای با قابلیت حافظه و ارتباط داخلی استفاده کنید.`;
    }
    
    document.getElementById('guideText').innerHTML = guideText;
}

function updatePanelGuide() {
    const units = formData.units;
    let guideText = '';
    
    if (units === 1) {
        guideText = 'برای ساختمان تک واحدی، پنل‌های 1 واحدی یا لمسی E11 مناسب هستند.';
    } else if (units <= 6) {
        guideText = `برای ${units} واحد، پنل 6 واحدی کارتی یا پنل لمسی E11 (با ماژول توسعه) پیشنهاد می‌شود.`;
    } else if (units <= 20) {
        guideText = `برای ${units} واحد، حتما از پنل E35-LC با قابلیت کدینگ و پسورد استفاده کنید.`;
    } else {
        guideText = `برای ساختمان بزرگ با ${units} واحد، پنل E35-LC با ماژول‌های توسعه ضروری است.`;
    }
    
    document.getElementById('panelGuide').textContent = guideText;
}

function updateAccessoryGuide() {
    const units = formData.units;
    const cardCount = units * 2; // 2 کارت برای هر واحد
    
    let guideText = `توصیه می‌کنیم حداقل ${cardCount} عدد کارت یا تگ RFID تهیه کنید (2 عدد برای هر واحد). `;
    
    if (units > 6) {
        guideText += 'همچنین ماژول سوئیچر برای مدیریت بهتر ضروری است. ';
    }
    
    if (units > 10) {
        guideText += 'برای ساختمان بزرگ شما، ماژول حافظه و مالتی پلکسر نیز پیشنهاد می‌شود.';
    }
    
    document.getElementById('accessoryGuide').textContent = guideText;
}

// Generate Units Grid
function generateUnitsGrid() {
    const grid = document.getElementById('unitsGrid');
    grid.innerHTML = '';
    
    const allMonitors = [...monitors.taknama, ...monitors.unibell];
    
    for (let i = 1; i <= formData.units; i++) {
        const unitCard = document.createElement('div');
        unitCard.className = 'unit-card';
        
        let optionsHTML = '';
        allMonitors.forEach(monitor => {
            const isSelected = formData.monitors[`unit${i}`] === monitor.id ? 'selected' : '';
            optionsHTML += `
                <div class="monitor-option ${isSelected}" onclick="selectMonitor(${i}, '${monitor.id}')">
                    <div class="monitor-info">
                        <h5>${monitor.name}</h5>
                        <div class="brand">${monitor.brand} - ${monitor.desc}</div>
                        <div class="price">${monitor.price.toLocaleString()} تومان</div>
                    </div>
                    <div class="monitor-check">
                        <i class="fas fa-check"></i>
                    </div>
                </div>
            `;
        });
        
        unitCard.innerHTML = `
            <h4><i class="fas fa-home"></i> واحد ${i}</h4>
            <div class="monitor-options">
                ${optionsHTML}
            </div>
        `;
        
        grid.appendChild(unitCard);
    }
}

// Select Monitor
function selectMonitor(unitNumber, monitorId) {
    formData.monitors[`unit${unitNumber}`] = monitorId;
    
    // Update UI
    const unitCards = document.querySelectorAll('.unit-card');
    const unitCard = unitCards[unitNumber - 1];
    const options = unitCard.querySelectorAll('.monitor-option');
    
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    event.currentTarget.classList.add('selected');
}

// Generate Panels Grid
function generatePanelsGrid() {
    const grid = document.getElementById('panelsGrid');
    grid.innerHTML = '';
    
    // Filter panels based on units count
    const suitablePanels = panels.filter(panel => panel.capacity >= formData.units || panel.capacity === 1);
    
    suitablePanels.forEach(panel => {
        const isSelected = formData.panel === panel.id ? 'selected' : '';
        const badge = panel.badge ? `<div class="product-badge">${panel.badge}</div>` : '';
        
        let featuresHTML = '';
        panel.features.forEach(feature => {
            featuresHTML += `<li><i class="fas fa-check-circle"></i> ${feature}</li>`;
        });
        
        const card = document.createElement('div');
        card.className = `product-card ${isSelected}`;
        card.onclick = () => selectPanel(panel.id);
        
        card.innerHTML = `
            ${badge}
            <div class="product-icon">
                <i class="fas fa-tablet-alt"></i>
            </div>
            <h3>${panel.name}</h3>
            <div class="brand">${panel.brand} - ظرفیت ${panel.capacity} واحد</div>
            <div class="price">${panel.price.toLocaleString()} تومان</div>
            <ul class="product-features">
                ${featuresHTML}
            </ul>
        `;
        
        grid.appendChild(card);
    });
}

// Select Panel
function selectPanel(panelId) {
    formData.panel = panelId;
    
    // Update UI
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    event.currentTarget.classList.add('selected');
}

// Initialize Accessories
function initializeAccessories() {
    const grid = document.getElementById('accessoriesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    accessories.forEach(accessory => {
        formData.accessories[accessory.id] = 0;
        
        const card = document.createElement('div');
        card.className = 'accessory-card';
        
        card.innerHTML = `
            <div class="accessory-icon">
                <i class="fas ${accessory.icon}"></i>
            </div>
            <h4>${accessory.name}</h4>
            <div class="price">${accessory.price.toLocaleString()} تومان</div>
            <div class="quantity-selector">
                <button onclick="changeAccessory('${accessory.id}', -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span id="${accessory.id}-qty">0</span>
                <button onclick="changeAccessory('${accessory.id}', 1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Change Accessory Quantity
function changeAccessory(id, delta) {
    formData.accessories[id] = Math.max(0, formData.accessories[id] + delta);
    document.getElementById(`${id}-qty`).textContent = formData.accessories[id];
}

// Update Services
function updateServices() {
    formData.services.installation = document.getElementById('installation').checked;
}

// Generate Invoice
function generateInvoice() {
    let items = [];
    let rowNumber = 1;
    
    // Monitors
    const monitorGroups = {};
    Object.values(formData.monitors).forEach(monitorId => {
        monitorGroups[monitorId] = (monitorGroups[monitorId] || 0) + 1;
    });
    
    const allMonitors = [...monitors.taknama, ...monitors.unibell];
    Object.entries(monitorGroups).forEach(([monitorId, count]) => {
        const monitor = allMonitors.find(m => m.id === monitorId);
        if (monitor) {
            items.push({
                row: rowNumber++,
                description: `${monitor.name} (${monitor.brand})`,
                quantity: count,
                unitPrice: monitor.price,
                totalPrice: monitor.price * count
            });
        }
    });
    
    // Panel
    if (formData.panel) {
        const panel = panels.find(p => p.id === formData.panel);
        if (panel) {
            items.push({
                row: rowNumber++,
                description: `${panel.name} (${panel.brand})`,
                quantity: 1,
                unitPrice: panel.price,
                totalPrice: panel.price
            });
        }
    }
    
    // Accessories
    Object.entries(formData.accessories).forEach(([id, qty]) => {
        if (qty > 0) {
            const accessory = accessories.find(a => a.id === id);
            if (accessory) {
                items.push({
                    row: rowNumber++,
                    description: accessory.name,
                    quantity: qty,
                    unitPrice: accessory.price,
                    totalPrice: accessory.price * qty
                });
            }
        }
    });
    
    // Services
    if (formData.services.installation) {
        items.push({
            row: rowNumber++,
            description: 'نصب و راه‌اندازی',
            quantity: 1,
            unitPrice: 5000000,
            totalPrice: 5000000
        });
    }
    
    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = Math.round(subtotal * 0.09);
    const total = subtotal + tax;
    
    // Fill invoice
    const invoiceNumber = 'DS-' + Math.floor(Math.random() * 90000 + 10000);
    const today = new Date();
    const persianDate = today.toLocaleDateString('fa-IR');
    
    document.getElementById('invoiceNumber').textContent = invoiceNumber;
    document.getElementById('invoiceDate').textContent = persianDate;
    document.getElementById('inv-name').textContent = formData.fullName;
    document.getElementById('inv-phone').textContent = formData.phone;
    
    const itemsHTML = items.map(item => `
        <tr>
            <td>${item.row}</td>
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>${item.unitPrice.toLocaleString()} تومان</td>
            <td>${item.totalPrice.toLocaleString()} تومان</td>
        </tr>
    `).join('');
    
    document.getElementById('invoiceItems').innerHTML = itemsHTML;
    document.getElementById('subtotal').textContent = subtotal.toLocaleString() + ' تومان';
    document.getElementById('tax').textContent = tax.toLocaleString() + ' تومان';
    document.getElementById('total').textContent = total.toLocaleString() + ' تومان';
    
    // Show invoice
    document.getElementById('step5').classList.remove('active');
    document.getElementById('step6').classList.add('active');
    
    currentStep = 6;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Download Invoice
function downloadInvoice() {
    const invoice = document.getElementById('invoiceContent');
    const buttons = document.querySelector('#step6 .button-group');
    
    // Hide buttons temporarily
    buttons.style.display = 'none';
    
    html2canvas(invoice, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        const invoiceNumber = document.getElementById('invoiceNumber').textContent;
        link.download = `invoice-${invoiceNumber}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Show buttons again
        buttons.style.display = 'flex';
    });
}

// Reset Form
function resetForm() {
    // Reset data
    formData = {
        fullName: '',
        phone: '',
        units: 4,
        entries: 1,
        monitors: {},
        panel: null,
        accessories: {},
        services: {
            installation: false
        }
    };
    
    // Reset inputs
    document.getElementById('fullName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('units').value = 4;
    document.getElementById('entries').value = 1;
    document.getElementById('installation').checked = false;
    
    // Reset accessories
    accessories.forEach(accessory => {
        formData.accessories[accessory.id] = 0;
        const qtyElement = document.getElementById(`${accessory.id}-qty`);
        if (qtyElement) {
            qtyElement.textContent = '0';
        }
    });
    
    // Go to first step
    document.getElementById('step6').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    
    currentStep = 1;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            e.target.value = value;
        });
    }
});
