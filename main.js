async function fetchImages() {
  const res = await fetch('images.json');
  const data = await res.json();
  return data.sort(() => Math.random() - 0.5);
}

async function renderGallery() {
  const images = await fetchImages();
  const container = document.getElementById('gallery');

  images.forEach(url => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <a href="${url}" download data-lg-size="1600-1200">
        <img src="${url}" loading="lazy">
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
