async function fetchImages() {
  const res = await fetch('images.json');
  const data = await res.json();
  return data.sort(() => Math.random() - 0.5);
}

async function renderGallery() {
  const images = await fetchImages();
  const container = document.getElementById('gallery');

  images.forEach(url => {
    const a = document.createElement('a');
    a.href = url;
    a.dataset.downloadUrl = url;
    a.innerHTML = `<img src="${url}" loading="lazy">`;
    container.appendChild(a);
  });

  lightGallery(container, {
    selector: 'a',
    download: true,
    zoom: true
  });
}

renderGallery();
