## Swipe Gallery

![Gallery with PhotoSwipe Demonstration](https://github.com/alecgeatches/swipe-gallery/blob/assets/swipe-gallery-photoswipe.gif)

Swipe gallery is a WordPress 5.0+ Gutenberg editor plugin that uses [PhotoSwipe](https://photoswipe.com/) to create responsive lightbox galleries.

### Installation

To get started, download the [latest release ZIP from this page](https://github.com/alecgeatches/swipe-gallery/releases), and add it to your WordPress website's plugins. For more information on installing a plugin from a ZIP, see [this help article](https://wordpress.org/support/article/managing-plugins/#upload-via-wordpress-admin).

Once the plugin is installed and activated, the "Swipe Gallery" Gutenberg block should be ready for use. To use the block:

1. Open the Gutenberg Editor for a post or page
2. Click the "+" button
3. Search "Swipe" and click the "Swipe Gallery" block
4. Use the "Upload" button or drag-drop images into the Swipe gallery box.


![Adding a Swipe Gallery block](https://github.com/alecgeatches/swipe-gallery/blob/assets/swipe-gallery-block.gif)

---

### Swipe Gallery Controls

When editing on a desktop, images can be rearranged by dragging and dropping:


![Image drag-drop demonstration](https://github.com/alecgeatches/swipe-gallery/blob/assets/swipe-gallery-dragdrop.gif)

---

Swipe Gallery blocks also have additional controls for fine-tuning the gallery shown below:

![Swipe Gallery block settings demonstration](https://github.com/alecgeatches/swipe-gallery/blob/assets/swipe-gallery-inspector-controls.gif)

---

These settings are:

1. **Thumbnail Aspect Ratio**: The aspect ratio that should be used for images in this gallery, defaults to 3:2.
2. **Items per Row on Desktop**: The number of images shown per-line on large-sized screens, defaults to 4.
2. **Items per Row on Mobile**: The number of images shown per-line on mobile-sized screens, defaults to 2.

## Building

To build the plugin, open the `swipe-gallery/` directory and run:

```bash
$ npm install
$ npm run build
```

For development, use `npm start` for building on file changes. The release ZIP was created by running this command in the `swipe-gallery/` directory:

```bash
# Creates a swipe-gallery-version.zip file in the directory above the swipe-gallery repository

$ zip -r ../swipe-gallery-version.zip . -x '*.git*' 'node_modules/*' 'src/*' 'package.json' 'package-lock.json'
```
