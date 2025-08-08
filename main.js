async function fetchImages() {
  const res = await fetch('images.json');
  const data = await res.json();
  return data.sort(() => Math.random() - 0.5);
}

async function renderGallery() {
  const images = await fetchImages();
  const container = document.getElementById('gallery');

  images.forEach(({ thumb, full }) => {
    const a = document.createElement('a');
    a.href = full;
    a.dataset.downloadUrl = full;
    a.innerHTML = `<img src="${thumb}" loading="lazy">`;
    container.appendChild(a);
  });

  lightGallery(container, {
    selector: 'a',
    download: true,
    zoom: true
  });
}

renderGallery();
