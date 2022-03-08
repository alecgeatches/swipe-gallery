/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useBlockProps, MediaPlaceholder } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';
import SwipeEditorImage from './SwipeEditorImage';

const Edit = (props) => {
	const { attributes, setAttributes, isSelected } = props;

	const blockProps = useBlockProps();
	const [ currentImages, setCurrentImages ] = useState(attributes.images ?? []);
	const swipeGalleryRef = useRef();

	useEffect(() => {
		jQuery(swipeGalleryRef.current).sortable({
			placeholder: 'swipe-gallery-drag-placeholder',
			cursor: 'grabbing',
			tolerance: 'pointer',
		});
	}, []);

	useEffect(() => {
		const $swipeGallery = jQuery(swipeGalleryRef.current);

		$swipeGallery.sortable('option', 'stop', (event, ui) => {
			const galleryElements = [...ui.item.get(0).parentElement.children];
			const newIndexOrder = galleryElements.map(e => e.dataset.index);
			const newImageOrder = newIndexOrder.map(index => currentImages[index]);

			$swipeGallery.sortable('cancel');

			setCurrentImages(newImageOrder);
		});
	}, [currentImages])

	useEffect(() => {
		// Persist fully-loaded images to attributes. Ignore loading images so that a half-loaded blob
		// image isn't saved with block attributes
		const loadedImages = currentImages.filter(image => !isImageLoading(image));
		setAttributes({ images: loadedImages });
	}, [currentImages]);

	function isImageLoading(image) {
		return image.url.indexOf('blob:') === 0 && !image.id;
	}

	function handleMediaSelect(newImages) {
		// When appending to an existing set of images, newImages will only store the current set of uploaded images.
		// Combine any existing images with the new set.
		const allImages = lodash.uniqBy([...currentImages, ...newImages], (image) => {
			return image.id ? image.id : image.url;
		}).map(image => {
			return {
				id: image.id,
				url: image.url,
			};
		});

		setCurrentImages(allImages);
	}

	const mediaPlaceholderDefaults = {
		allowedTypes: ['image'],
		multiple: true,
		onSelect: handleMediaSelect,
	};

	if(currentImages.length === 0) {
		return <View { ...blockProps }>
			<MediaPlaceholder
				{ ...mediaPlaceholderDefaults }
				labels={ {
					title: __('Swipe Gallery', 'swipe-gallery'),
					instructions: __('Drag, upload, or select images to be displayed in the gallery.'),
				} }
			/>
		</View>;
	} else {
		const isAnyImageLoading = currentImages.some(isImageLoading);
		const lastRowCount = currentImages.length % 4;

		return <View { ...blockProps }>
			<div className={`swipe-gallery swipe-gallery-last-row-${lastRowCount}`} ref={swipeGalleryRef}>
				{ currentImages.map((image, index) => <SwipeEditorImage image={ image } index={ index } />) }
			</div>

			{ (!isSelected && !isAnyImageLoading) && <p className="swipe-gallery-upload-text">
				{ __('Add to swipe gallery...') }
			</p> }

			{ (isSelected && !isAnyImageLoading) && <MediaPlaceholder
				{ ...mediaPlaceholderDefaults }
				className="swipe-gallery-append-media-placeholder"
				isAppender={ true }
				labels={ {
					instructions: false,
					title: false,
				} }
			/> }
		</View>;
	}
};

export default Edit;
