let allImages = [];
let loadedCount = 0;
const batchSize = 20;

async function fetchImages() {
  const res = await fetch('images.json');
  const data = await res.json();
  return data.sort(() => Math.random() - 0.5);
}

function loadNextBatch() {
  const container = document.getElementById('gallery');
  const nextBatch = allImages.slice(loadedCount, loadedCount + batchSize);

  nextBatch.forEach(url => {
    const a = document.createElement('a');
    a.href = url;
    a.dataset.downloadUrl = url;
    a.innerHTML = `<img src="${url}" loading="lazy">`;
    container.appendChild(a);
  });

  loadedCount += batchSize;
}

function setupInfiniteScroll() {
  const sentinel = document.createElement('div');
  sentinel.id = 'sentinel';
  document.body.appendChild(sentinel);

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadNextBatch();
    }
  }).observe(sentinel);
}

async function renderGallery() {
  allImages = await fetchImages();
  loadNextBatch();
  setupInfiniteScroll();

  lightGallery(document.getElementById('gallery'), {
    selector: 'a',
    download: true,
    zoom: true
  });
}

renderGallery();
