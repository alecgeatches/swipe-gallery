/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useBlockProps, MediaPlaceholder } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';
import SortableGallery from './sortable-gallery';
import SwipeEditorImage from './swipe-editor-image';

const Edit = (props) => {
	const { attributes, setAttributes, isSelected } = props;
	const blockProps = useBlockProps();
	const [ currentImages, setCurrentImages ] = useState(attributes.images ?? []);

	useEffect(() => {
		// Persist fully-loaded images to attributes. Ignore loading images so that a half-loaded blob
		// image isn't saved with block attributes
		const loadedImages = currentImages.filter(image => !isImageLoading(image));
		setAttributes({ images: loadedImages });

		const isLoading = loadedImages.length !== currentImages.length;
		sortableGalleryProps.isDisabled = isLoading;
	}, [currentImages]);

	const sortableGalleryProps = {
		isDisabled: false
	};

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

	function handleGalleryChange(changedItems) {
		setCurrentImages(changedItems);
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
					title: __('Swipe Gallery', 'alecg-swipe-gallery'),
					instructions: __('Drag, upload, or select images to be displayed in the gallery.', 'alecg-swipe-gallery'),
				} }
			/>
		</View>;
	} else {
		const isAnyImageLoading = currentImages.some(isImageLoading);

		return <View { ...blockProps }>
			<SortableGallery items={ currentImages } onItemsChange={ handleGalleryChange } >
				{ currentImages.map(image => <SwipeEditorImage image={ image } />) }
			</SortableGallery>

			{ (!isSelected && !isAnyImageLoading) && <p className="swipe-gallery-upload-text">
				{ __('Add to swipe gallery...', 'alecg-swipe-gallery') }
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
