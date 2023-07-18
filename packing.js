const showItemsButton = document.getElementById('show-items');
const itemList = document.getElementById('item-list');
const destinations = {
  city: {
    spring: ['가벼운 옷', '운동화', '선크림', '모자', '물', '여행용 가방', '여분의 음식', '비상약품', '보조배터리', '손수건'],
    summer: ['가벼운 옷', '운동화', '선크림', '모자', '물', '여행용 가방', '여분의 음식', '비상약품', '보조배터리', '손수건'],
    autumn: ['가벼운 옷', '가벼운 외투', '운동화', '선크림', '모자', '물', '여행용 가방', '여분의 음식', '비상약품', '보조배터리'],
    winter: ['가벼운 옷', '패딩', '핫팩', '운동화', '선크림', '모자', '물', '여행용 가방', '여분의 음식', '비상약품', '보조배터리'],
  },
  beach: {
    spring: ['선크림', '선글라스', '모자', '샌들', '물', '해변 의자', '입수용 의류', '비상약품', '여분의 음식', '조리도구', '해변 텐트', '비치타올', '보조배터리'],
    summer: ['수영복', '스노클링 장비', '선크림', '선글라스', '모자', '샌들', '물', '해변 의자', '입수용 의류', '비상약품', '여분의 음식', '조리도구', '해변 텐트', '비치타올', '보조배터리'],
    autumn: ['선크림', '선글라스', '모자', '샌들', '물',  '비상약품', '여분의 음식', '해변 의자', '입수용 의류', '조리도구', '해변 텐트', '비치타올', '보조배터리'],
    winter: ['패딩', '핫팩', '보온병', '선크림', '선글라스', '모자', '샌들', '물', '해변 의자', '비상약품', '여분의 음식', '조리도구', '해변 텐트', '비치타올', '보조배터리'],
  },
  mountain: {
    spring: ['등산복', '등산화', '등산가방', '등산용 장갑', '등산용 손목보호대', '등산용 모자', '여분의 음식', '물', '등산용 선글라스', '보조배터리', '선크림', '비상약품', '손수건'],
    summer: ['등산복', '등산화', '등산가방', '등산용 장갑', '등산용 손목보호대', '등산용 모자', '여분의 음식', '물', '등산용 선글라스', '보조배터리', '선크림', '비상약품', '손수건', '수분보충용음료'],
    autumn: ['등산복', '등산화', '등산가방', '등산용 장갑', '등산용 손목보호대', '등산용 모자', '여분의 음식', '물', '등산용 선글라스', '보조배터리', '선크림', '비상약품', '손수건'],
    winter: ['등산복', '등산화', '등산가방', '등산용 장갑', '등산용 손목보호대', '등산용 모자', '등산용 선글라스', '여분의 음식', '물', '핫팩', '보조배터리', '선크림', '비상약품', '손수건'],
  },

  // 항목과 이미지 경로를 매칭한 객체를 추가합니다. 
  itemImages: {
    '가벼운 옷': 'images/clothes.png',
    '운동화': 'images/sneakers.jpg',
    '선크림': 'images/suncream.jpeg',
    '모자': 'images/hat.jpg',
    '물': 'images/water.jpg',
    '여행용 가방': 'images/bag.jpg',
    '여분의 음식': 'images/food.jpg',
    '비상약품': 'images/medicine.jpg',
    '보조배터리': 'images/battery.jpeg',
    '손수건': 'images/son.jpg',
    '핫팩': 'images/hot.png',
    '패딩': 'images/pading.jpg',
    '가벼운 외투': 'images/jacket.jpg',
    '선글라스': 'images/sunglass.jpg',
    '샌들': 'images/sandle.jpg',
    '해변 의자': 'images/chair.jpg',
    '조리도구': 'images/made.png',
    '해변 텐트': 'images/tent.jpeg',
    '입수용 의류': 'images/cloth.png',
    '비치타올': 'images/beach.jpg',
    '수영복': 'images/watercloth.jpg',
    '스노클링 장비': 'images/snocling.jpg',
    '보온병': 'images/hot.jpg',
    '등산화': 'images/hiking.jpg',
    '등산가방': 'images/hikingbag.jpeg',
    '등산용 장갑': 'images/glove.jpg',
    '등산용 손목보호대': 'images/guard.jpeg',
    '등산용 모자': 'images/hat1.jpg',
    '등산용 선글라스': 'images/sports.jpg',
    '수분보충용음료': 'images/sweat.jpg',
    '등산복': 'images/hikingclothes.jpg'
  },
};

showItemsButton.addEventListener('click', () => {
  const destination = document.getElementById('destination').value;
  const season = document.getElementById('season').value;
  const items = getItemsForDestinationAndSeason(destination, season);
  renderItems(items);
});

function getItemsForDestinationAndSeason(destination, season) {
  return destinations[destination][season];
}

function renderItems(items) {
    itemList.innerHTML = '';

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        const imageElement = document.createElement('img');

        imageElement.src = getImagePath(item);

        itemElement.appendChild(imageElement);

        const textElement = document.createElement('span');
        textElement.innerText = item;

        itemElement.appendChild(textElement);

        itemList.appendChild(itemElement);
    });
}

function getImagePath(item) {
    return destinations.itemImages[item];
}

function goBack() {
  window.open("trip.html");
  window.close();
}