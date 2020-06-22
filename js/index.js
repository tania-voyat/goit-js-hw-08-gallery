import galleryItems from './gallery-items.js';
``;

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  closeLightboxBtn: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxContent: document.querySelector('.lightbox__content'),
};

refs.galleryList.addEventListener('click', onImgClick);
refs.closeLightboxBtn.addEventListener('click', closeLightbox);
refs.lightboxContent.addEventListener('click', onBackdropClick);

function createGallery(objects) {
  const gallery = objects
    .map(
      object =>
        `<li class="gallery__item"><a class="gallery__link" href=${object.original}><img class="gallery__image" src=${object.preview} data-source=${object.original} alt=${object.description} data-index=${object.index}></img></a></li>`,
    )
    .join('');
  refs.galleryList.insertAdjacentHTML('afterbegin', gallery);
}

createGallery(galleryItems);

function onImgClick(event) {
  event.preventDefault();
  const imageRef = event.target;
  if (imageRef.nodeName !== 'IMG') {
    return;
  }
  const largeImgUrl = imageRef.dataset.source;

  openLightbox();
  setLightboxImg(largeImgUrl);
}

function openLightbox() {
  window.addEventListener('keydown', onEscPress);
  refs.lightbox.classList.add('is-open');
}

function closeLightbox() {
  window.removeEventListener('keydown', onEscPress);
  refs.lightbox.classList.remove('is-open');
  clearingSrc();
}

function setLightboxImg(url) {
  refs.lightboxImg.src = url;
}

function clearingSrc() {
  refs.lightboxImg.src = '';
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeLightbox();
  }
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    closeLightbox();
  }
}
