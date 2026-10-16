let activeCategory = 'all';
let activeFaculty = 'all';

function filterCategory(category) {
    activeCategory = category;
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
        <div class="product-card bg-white rounded-3xl border-2 border-stone-900 overflow-hidden shadow-[4px_4px_0px_0px_#1c1917] flex flex-col justify-between" data-category="${category}" data-faculty="${faculty}" data-title="${title}">
            <div>
                <div class="relative h-56 bg-amber-50 border-b-2 border-stone-900 p-4 flex items-center justify-center overflow-hidden">
                    <div class="sticker-badge bg-[#D9381E] text-white">
                        <span class="text-[9px] font-black uppercase">Baru</span>
                    </div>
                    <img src="${defaultImg}" alt="${title}" class="w-full h-full object-cover rounded-xl border border-stone-900">
                </div>
                <div class="p-5">
                    <div class="flex items-center justify-between text-[10px] font-extrabold mb-1">
                        <span class="bg-amber-100 text-stone-900 px-2 py-0.5 rounded-md border border-stone-900">${faculty} &bull; Mahasiswa</span>
                        <span class="text-stone-400">Baru</span>
                    </div>
                    <h3 class="font-black text-stone-900 text-sm leading-snug mt-2">${title}</h3>
                    <p class="text-xs text-stone-500 font-medium mt-1">${desc}</p>
                </div>
            </div>
            <div class="p-5 pt-0">
                <div class="pt-3 border-t-2 border-stone-100 flex items-center justify-between">
                    <div>
                        <span class="text-[9px] font-black text-stone-400 uppercase block">Harga Pas</span>
                        <p class="text-base font-black text-stone-900">Rp ${price}</p>
                    </div>
                    <button onclick="openModal('${title}', 'Rp ${price}', '${category}', '${faculty}', '${seller}', '2024', '${location}', '${desc}', '${defaultImg}')" class="bg-stone-900 hover:bg-[#D9381E] text-white text-xs font-black px-4 py-2 rounded-xl border border-stone-900 transition cursor-pointer">
                        Detail
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('product-grid').insertAdjacentHTML('afterbegin', newCardHTML);
    closePostModal();
    alert('Iklan barang preloved berhasil ditayangkan!');
}