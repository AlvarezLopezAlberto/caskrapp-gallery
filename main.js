async function fetchImages() {
  const res = await fetch('images.json');
  const data = await res.json();
  return data.sort(() => Math.random() - 0.5);
}

async function renderGallery() {
  const images = await fetchImages();
  const container = document.getElementById('gallery');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px'
  });

  images.forEach(url => {
    const a = document.createElement('a');
    a.href = url;
    a.dataset.downloadUrl = url;

    const img = document.createElement('img');
    img.dataset.src = url;
    img.loading = 'lazy';
    img.alt = '';
    img.style.opacity = 0;
    img.onload = () => img.style.opacity = 1;

    a.appendChild(img);
    container.appendChild(a);
    observer.observe(img);
  });

  lightGallery(container, {
    selector: 'a',
    download: true,
    zoom: true
  });
}

renderGallery();
