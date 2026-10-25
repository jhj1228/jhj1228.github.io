// 원하시는 핸드폰 정보를 아래 양식에 맞게 추가/수정/삭제해 주세요.
const phones = [
    {
        id: 1,
        name: "Galaxy S23 Ultra",
        brand: "삼성",
        storage: "512GB",
        color: "팬텀 블랙",
        status: "사용 중", // '사용 중', '보관 중', '처분 완료' 중 선택
        buyDate: "2023-02-17",
        memo: "ㅁㄴㅇㄹ",
    },
    {
        id: 2,
        name: "iPhone 13 Pro",
        brand: "Apple",
        storage: "256GB",
        color: "시에라 블루",
        status: "보관 중",
        buyDate: "2021-10-08",
        memo: "ㅁㄴㅇㄹ",
    }
];

// DOM 요소를 가져옵니다.
const phoneContainer = document.getElementById('phone-list-container');
const totalCountEl = document.getElementById('total-count');
const activeCountEl = document.getElementById('active-count');
const storedCountEl = document.getElementById('stored-count');

const searchInput = document.getElementById('search-input');
const brandFilter = document.getElementById('brand-filter');
const statusFilter = document.getElementById('status-filter');

// 1. 화면에 핸드폰 목록 출력
function renderPhones(data) {
    phoneContainer.innerHTML = '';

    if (data.length === 0) {
        phoneContainer.innerHTML = `<div class="no-data">등록되거나 조건에 맞는 핸드폰이 없습니다.</div>`;
        return;
    }

    data.forEach(phone => {
        const defaultImg = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop';
        const cardHTML = `
            <article class="phone-card">
                <img src="${phone.image || defaultImg}" alt="${phone.name}" class="phone-img" onerror="this.src='${defaultImg}'">
                <div class="phone-body">
                    <div class="phone-header">
                        <span class="brand-badge">${phone.brand}</span>
                        <span class="status-badge status-${phone.status.replace(/\s+/g, '')}">${phone.status}</span>
                    </div>
                    <h2 class="phone-title">${phone.name}</h2>
                    <p class="phone-info"><strong>용량:</strong> ${phone.storage || '-'}</p>
                    <p class="phone-info"><strong>색상:</strong> ${phone.color || '-'}</p>
                    <p class="phone-info"><strong>구입일:</strong> ${phone.buyDate || '-'}</p>
                    ${phone.memo ? `<p class="phone-memo">${phone.memo}</p>` : ''}
                </div>
            </article>
        `;
        phoneContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// 2. 상단 통계 수치 업데이트
function updateStats() {
    const total = phones.length;
    const active = phones.filter(p => p.status === '사용 중').length;
    const stored = phones.filter(p => p.status === '보관 중').length;

    totalCountEl.textContent = total;
    activeCountEl.textContent = active;
    storedCountEl.textContent = stored;
}

// 3. 검색 및 필터링 기능
function filterPhones() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedBrand = brandFilter.value;
    const selectedStatus = statusFilter.value;

    const filtered = phones.filter(phone => {
        const matchesQuery = 
            phone.name.toLowerCase().includes(query) ||
            phone.brand.toLowerCase().includes(query) ||
            (phone.memo && phone.memo.toLowerCase().includes(query));

        const matchesBrand = selectedBrand === 'all' || phone.brand === selectedBrand;
        const matchesStatus = selectedStatus === 'all' || phone.status === selectedStatus;

        return matchesQuery && matchesBrand && matchesStatus;
    });

    renderPhones(filtered);
}

// 이벤트 리스너 등록
searchInput.addEventListener('input', filterPhones);
brandFilter.addEventListener('change', filterPhones);
statusFilter.addEventListener('change', filterPhones);

// 초기화 실행
updateStats();
renderPhones(phones);
