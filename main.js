const API_URL = 'https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbxukxb2Y0o9ju0Eo57ECo_4sOiNLW912O70XP71lDSeukr2HXpN9PCb4h0BFLMkUqicZA/exec';

async function fetchImages() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.sort(() => Math.random() - 0.5);
}

async function renderGallery() {
  const images = await fetchImages();
  const container = document.getElementById('gallery');

  images.forEach(({ url, name }) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <a href="${url}" download="${name}" data-lg-size="1600-1200">
        <img src="${url}" alt="${name}" loading="lazy">
      </a>`;
    container.appendChild(slide);
  });

  new Swiper('.swiper-container', {
    pagination: { el: '.swiper-pagination' },
    loop: true
  });

  lightGallery(document.querySelector('.swiper-container'), {
    selector: 'a',
    download: true,
    zoom: true
  });
}

renderGallery();
