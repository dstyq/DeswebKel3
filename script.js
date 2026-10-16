let activeCategory = 'all';
let activeFaculty = 'all';

function filterCategory(category) {
    activeCategory = category;
    
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.classList.remove('bg-stone-900', 'text-white');
    });

    const activeTab = document.getElementById(`tab-${category}`);
    if(activeTab) {
        activeTab.classList.add('bg-stone-900', 'text-white');
    }

    applyFilters();
}

function filterFaculty() {
    activeFaculty = document.getElementById('faculty-select').value;
    applyFilters();
}

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function applyFilters() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const categoryMatch = (activeCategory === 'all' || card.getAttribute('data-category') === activeCategory);
        const facultyMatch = (activeFaculty === 'all' || card.getAttribute('data-faculty') === activeFaculty);

        if (categoryMatch && facultyMatch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function openModal(title, price, category, faculty, seller, year, location, desc, img) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('modal-badge').innerText = category;
    document.getElementById('modal-seller').innerText = seller;
    document.getElementById('modal-faculty').innerText = `${faculty} • Angkatan '${year}`;
    document.getElementById('modal-loc').innerText = location;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-img').src = img;

    document.getElementById('product-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

function openPostModal() {
    document.getElementById('post-modal').classList.remove('hidden');
}

function closePostModal() {
    document.getElementById('post-modal').classList.add('hidden');
}

function submitProduct(e) {
    e.preventDefault();

    const title = document.getElementById('input-title').value;
    const category = document.getElementById('input-category').value;
    const faculty = document.getElementById('input-faculty').value;
    const price = parseInt(document.getElementById('input-price').value).toLocaleString('id-ID');
    const seller = document.getElementById('input-seller').value;
    const location = document.getElementById('input-location').value;
    const desc = document.getElementById('input-desc').value || "Kondisi baik & layak pakai.";

    const defaultImg = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80";

    const newCardHTML = `
        <div class="product-card bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs flex flex-col justify-between" data-category="${category}" data-faculty="${faculty}" data-title="${title}">
            <div>
                <div class="relative h-52 bg-stone-100 overflow-hidden border-b border-stone-100">
                    <span class="absolute top-3 left-3 bg-stone-900 text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">${category}</span>
                    <span class="absolute top-3 right-3 bg-sky-100 text-sky-800 text-[9px] font-extrabold px-2 py-1 rounded-md">Baru Diunggah</span>
                    <img src="${defaultImg}" alt="${title}" class="w-full h-full object-cover">
                </div>
                <div class="p-5">
                    <div class="flex items-center justify-between text-[11px] font-bold text-stone-500 mb-1">
                        <span class="text-[#991B1B] uppercase tracking-wider">${faculty} &bull; Mahasiswa</span>
                        <span>Baru</span>
                    </div>
                    <h3 class="font-bold text-stone-900 text-sm leading-snug">${title}</h3>
                    <p class="text-xs text-stone-500 mt-2 line-clamp-2">${desc}</p>
                </div>
            </div>
            <div class="p-5 pt-0">
                <div class="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                        <span class="text-[10px] font-bold text-stone-400 uppercase block">Harga Pas</span>
                        <p class="text-base font-extrabold text-stone-900">Rp ${price}</p>
                    </div>
                    <button onclick="openModal('${title}', 'Rp ${price}', '${category}', '${faculty}', '${seller}', '2024', '${location}', '${desc}', '${defaultImg}')" class="bg-stone-900 hover:bg-[#991B1B] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer">
                        Detail
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('product-grid').insertAdjacentHTML('afterbegin', newCardHTML);
    closePostModal();
    alert('Iklan barang preloved kamu berhasil ditayangkan!');
}