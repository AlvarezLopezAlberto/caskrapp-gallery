// 🔧 Pega aquí tu URL pública de OneDrive (la que abre la carpeta en navegador)
const ONEDRIVE_FOLDER_URL = 'https://emeralddigitalsc-my.sharepoint.com/:f:/g/personal/alberto_alvarez_emerald_dev/Eh2NptUC9jNFolVkzSQiWagB-R78G0dPz0iBg5pywL4bzA?e=MlExSz'; 

async function fetchAndParseImages() {
  const res = await fetch(ONEDRIVE_FOLDER_URL);
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Busca links que terminen en .webp
  const links = Array.from(doc.querySelectorAll('a'))
    .map(a => a.href)
    .filter(href => href.endsWith('.webp'));

  return links.sort(() => Math.random() - 0.5); // mezcla aleatoria
}

async function renderGallery() {
  const images = await fetchAndParseImages();
  const container = document.getElementById('gallery');

  images.forEach(url => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <a href="${url}" data-lg-size="1400-900">
        <img src="${url}" loading="lazy">
      </a>
    `;
    container.appendChild(slide);
  });

  const swiper = new Swiper('.swiper-container', {
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
