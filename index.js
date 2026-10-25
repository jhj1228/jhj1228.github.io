// ==========================================
// 📱 내 핸드폰 목록 & 상세 스펙 데이터
// ==========================================
// 원하시는 핸드폰 정보를 아래 구조에 맞게 직접 추가/수정해 보세요.
const phones = [
    {
        id: 1,
        name: "Galaxy S23 Ultra",
        brand: "삼성",
        color: "팬텀 블랙",
        buyDate: "2023-02-17",
        purchasePlace: "삼성 스토어 공식 홈페이지",
        serialNumber: "358912345678901",
        
        // 상세 스펙 정보
        ap: "Snapdragon 8 Gen 2 for Galaxy",
        ram: "12GB",
        storage: "512GB",
        externalStorage: "미지원",
        display: '6.8인치 Quad HD+ Dynamic AMOLED 2X (120Hz)',
        network: "5G / Wi-Fi 6E",
        camera: "전면 12MP / 후면 200MP + 12MP + 10MP + 10MP",
        battery: "5,000 mAh (45W 고속충전)",
        releaseDate: "2023년 2월 17일",
        
        memo: "자급제로 구매함. 강화유리 필름 장착 중."
    },
    {
        id: 2,
        name: "iPhone 13 Pro",
        brand: "Apple",
        color: "시에라 블루",
        buyDate: "2021-10-08",
        purchasePlace: "쿠팡",
        serialNumber: "FK2X9102K31A",
        
        // 상세 스펙 정보
        ap: "Apple A15 Bionic",
        ram: "6GB",
        storage: "256GB",
        externalStorage: "미지원",
        display: '6.1인치 Super Retina XDR (ProMotion 120Hz)',
        network: "5G / Wi-Fi 6",
        camera: "전면 12MP / 후면 12MP(메인) + 12MP(초광각) + 12MP(망원)",
        battery: "3,095 mAh (20W 고속충전)",
        releaseDate: "2021년 10월 8일",
        
        memo: "배터리 효율 84%. 서브용으로 보관 중."
    }
];

// DOM 요소 참조
const phoneContainer = document.getElementById('phone-list-container');
const searchInput = document.getElementById('search-input');
const brandFilter = document.getElementById('brand-filter');

// 모달 DOM 요소 참조
const modal = document.getElementById('detail-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalBrand = document.getElementById('modal-brand');
const modalTitle = document.getElementById('modal-title');
const modalColor = document.getElementById('modal-color');
const modalBuyDate = document.getElementById('modal-buy-date');
const modalPurchasePlace = document.getElementById('modal-purchase-place');
const modalSerial = document.getElementById('modal-serial');

// 스펙 DOM 요소 참조
const modalAp = document.getElementById('modal-ap');
const modalRam = document.getElementById('modal-ram');
const modalStorage = document.getElementById('modal-storage');
const modalExternalStorage = document.getElementById('modal-external-storage');
const modalDisplay = document.getElementById('modal-display');
const modalNetwork = document.getElementById('modal-network');
const modalCamera = document.getElementById('modal-camera');
const modalBattery = document.getElementById('modal-battery');
const modalReleaseDate = document.getElementById('modal-release-date');

const modalMemo = document.getElementById('modal-memo');

// 1. 카드를 클릭했을 때 실행되는 모달 열기 함수
function openModal(phone) {
    modalBrand.textContent = phone.brand || '-';
    modalTitle.textContent = phone.name || '-';
    modalColor.textContent = phone.color || '-';
    modalBuyDate.textContent = phone.buyDate || '-';
    modalPurchasePlace.textContent = phone.purchasePlace || '-';
    modalSerial.textContent = phone.serialNumber || '-';

    // 스펙 데이터 매핑
    modalAp.textContent = phone.ap || '-';
    modalRam.textContent = phone.ram || '-';
    modalStorage.textContent = phone.storage || '-';
    modalExternalStorage.textContent = phone.externalStorage || '-';
    modalDisplay.textContent = phone.display || '-';
    modalNetwork.textContent = phone.network || '-';
    modalCamera.textContent = phone.camera || '-';
    modalBattery.textContent = phone.battery || '-';
    modalReleaseDate.textContent = phone.releaseDate || '-';

    modalMemo.textContent = phone.memo || '등록된 메모가 없습니다.';

    modal.classList.remove('hidden');
}

// 2. 모달 닫기
function closeModal() {
    modal.classList.add('hidden');
}

// 3. 화면에 핸드폰 카드 출력
function renderPhones(data) {
    phoneContainer.innerHTML = '';

    if (data.length === 0) {
        phoneContainer.innerHTML = `<div class="no-data">등록되거나 검색 조건에 맞는 핸드폰이 없습니다.</div>`;
        return;
    }

    data.forEach(phone => {
        const card = document.createElement('article');
        card.className = 'phone-card';
        card.innerHTML = `
            <div class="phone-header">
                <span class="brand-badge">${phone.brand}</span>
            </div>
            <h2 class="phone-title">${phone.name}</h2>
            <p class="phone-info"><strong>용량:</strong> ${phone.storage || '-'}</p>
            <p class="phone-info"><strong>RAM:</strong> ${phone.ram || '-'}</p>
            <p class="phone-info"><strong>구입일:</strong> ${phone.buyDate || '-'}</p>
        `;

        // 카드 클릭 시 상세 모달 표시
        card.addEventListener('click', () => openModal(phone));
        phoneContainer.appendChild(card);
    });
}

// 4. 검색 및 제조사 필터링 기능
function filterPhones() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedBrand = brandFilter.value;

    const filtered = phones.filter(phone => {
        const matchesQuery = 
            phone.name.toLowerCase().includes(query) ||
            phone.brand.toLowerCase().includes(query) ||
            (phone.ap && phone.ap.toLowerCase().includes(query)) ||
            (phone.memo && phone.memo.toLowerCase().includes(query));

        const matchesBrand = selectedBrand === 'all' || phone.brand === selectedBrand;

        return matchesQuery && matchesBrand;
    });

    renderPhones(filtered);
}

// 이벤트 리스너 등록
searchInput.addEventListener('input', filterPhones);
brandFilter.addEventListener('change', filterPhones);
modalCloseBtn.addEventListener('click', closeModal);

// 모달 바깥 배경 클릭 시 닫기
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// 초기화 실행
renderPhones(phones);
