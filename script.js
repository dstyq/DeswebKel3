// Fungsi Filter Katalog Produk Interaktif
function filterCatalog(category) {
    const cards = document.querySelectorAll('.item-card');
    const btnAll = document.getElementById('btn-all');
    const btnBuku = document.getElementById('btn-buku');
    const btnKos = document.getElementById('btn-kos');
    const btnElektronik = document.getElementById('btn-elektronik');

    const allButtons = [btnAll, btnBuku, btnKos, btnElektronik];

    // Reset Style Tombol
    allButtons.forEach(btn => {
        if(btn) btn.className = "text-stone-600 hover:text-stone-900 px-4 py-2 rounded-xl transition cursor-pointer";
    });

    if (category === 'all') {
        if(btnAll) btnAll.className = "bg-white text-stone-900 px-4 py-2 rounded-xl shadow-xs transition cursor-pointer font-bold";
        cards.forEach(card => card.style.display = 'flex');
    } else {
        const activeBtn = document.getElementById(`btn-${category}`);
        if(activeBtn) activeBtn.className = "bg-white text-stone-900 px-4 py-2 rounded-xl shadow-xs transition cursor-pointer font-bold";
        
        cards.forEach(card => {
            if (card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Fungsi Modal Detail Produk
function openModal(title, price, badge, imgUrl, location) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('modal-badge').innerText = badge;
    document.getElementById('modal-img').src = imgUrl;
    document.getElementById('modal-loc').innerText = location || "Area Kampus";
    document.getElementById('product-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

// Fungsi Modal Form Pasang Iklan
function openPostModal() {
    document.getElementById('post-modal').classList.remove('hidden');
}

function closePostModal() {
    document.getElementById('post-modal').classList.add('hidden');
}

// Simulasi Tambah Produk Baru ke Grid (Client-Side Rendering)
function submitProduct(event) {
    event.preventDefault();
    
    const title = document.getElementById('input-title').value;
    const category = document.getElementById('input-category').value;
    const price = parseInt(document.getElementById('input-price').value).toLocaleString('id-ID');
    const location = document.getElementById('input-location').value;

    const categoryNames = {
        'buku': 'Buku & Modul',
        'kos': 'Perabotan Kos',
        'elektronik': 'Elektronik'
    };

    const defaultImages = {
        'buku': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
        'kos': 'https://images.unsplash.com/photo-1618961734760-466979ce35b0?auto=format&fit=crop&w=600&q=80',
        'elektronik': 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80'
    };

    const newCardHTML = `
        <div class="item-card editorial-card rounded-3xl overflow-hidden flex flex-col bg-white border border-stone-200/80" data-category="${category}">
            <div class="relative h-52 bg-stone-100 border-b border-stone-100 overflow-hidden">
                <div class="absolute top-3 left-3 z-10">
                    <span class="bg-stone-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">${categoryNames[category]}</span>
                </div>
                <img src="${defaultImages[category]}" alt="${title}" class="w-full h-full object-cover">
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <span class="text-[10px] font-bold text-orange-700 uppercase tracking-wider">Milik Anda</span>
                    <h3 class="font-bold text-stone-900 mt-1 text-sm leading-snug">${title}</h3>
                    <div class="mt-4">
                        <span class="text-[10px] text-stone-400 font-medium">Harga Penawaran</span>
                        <p class="text-base font-bold text-stone-900">Rp ${price}</p>
                    </div>
                </div>
                <div class="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span class="text-stone-500 font-medium text-[11px]"><i class="fa-solid fa-location-dot mr-1 text-stone-400"></i> ${location}</span>
                    <button onclick="openModal('${title}', 'Rp ${price}', '${categoryNames[category]}', '${defaultImages[category]}', '${location}')" class="btn-primary bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 font-bold px-3.5 py-2 rounded-xl text-xs transition">Tinjau</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('product-grid').insertAdjacentHTML('afterbegin', newCardHTML);
    closePostModal();
    alert('Iklan barang preloved berhasil ditayangkan di katalog RE:CAMPUS!');
}