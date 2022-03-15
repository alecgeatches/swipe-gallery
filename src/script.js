import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import $ from 'jquery';

$(() => {
    const swipeGalleryBlocks = document.querySelectorAll('.wp-block-alecg-swipe-gallery');

    [...swipeGalleryBlocks].forEach((swipeGalleryBlock) => {
        const swipeGalleryItems = swipeGalleryBlock.querySelectorAll('.swipe-gallery-item');

        [...swipeGalleryItems].forEach((swipeGalleryItem, index) => {
            swipeGalleryItem.addEventListener('click', (event) => {
                openSwipeGallery(swipeGalleryBlock, swipeGalleryItem, index);
            });
        });
    });
});

function openSwipeGallery(swipeGalleryBlock, swipeGalleryItem, index) {
    const items = [...swipeGalleryBlock.querySelectorAll('.swipe-gallery-item')].map((item) => {
        const img = item.querySelector('img');

        return {
            src: img.src,
            msrc: img.dataset.thumbnailUrl,
            w: img.dataset.width,
            h: img.dataset.height,
        };
    });

    const pswpElement = swipeGalleryBlock.querySelector('.pswp');
    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
        history: false,
        index: index,
        loop: false,
        showHideOpacity: true,
    });

    gallery.init();
}
