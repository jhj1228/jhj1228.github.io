// 핸드폰 데이터를 담을 변수
let phones = [];

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

// 1. index.json 파일에서 데이터 불러오기
async function loadPhonesData() {
    try {
        const response = await fetch('index.json');
        if (!response.ok) {
            throw new Error(`HTTP 에러 발생! 상태: ${response.status}`);
        }
        phones = await response.json();
        renderPhones(phones);
    } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
        phoneContainer.innerHTML = `<div class="no-data">데이터를 불러올 수 없습니다. Live Server 환경인지 확인해주세요.</div>`;
    }
}

// 2. 카드를 클릭했을 때 실행되는 모달 열기 함수
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

// 3. 모달 닫기
function closeModal() {
    modal.classList.add('hidden');
}

// 4. 화면에 핸드폰 카드 출력
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

// 5. 검색 및 제조사 필터링 기능
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

// 초기 데이터 로드 실행
loadPhonesData();
