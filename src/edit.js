/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useBlockProps, MediaPlaceholder } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';
import SwipeEditorImage from './SwipeEditorImage';

const Edit = (props) => {
	const { attributes, setAttributes, isSelected } = props;

	const blockProps = useBlockProps();
	const [ currentImages, setCurrentImages ] = useState(attributes.images ?? []);

	function isImageLoading(image) {
		return image.url.indexOf('blob:') === 0 && !image.id;
	}

	function handleMediaSelect(newImages) {
		// When appending to an existing set of images, newImages will only store the current set of uploaded images.
		// Combine the existing images with the new set.
		const allImages = lodash.uniqBy([...currentImages, ...newImages], (image) => {
			return image.id ? image.id : image.url;
		}).map(image => {
			return {
				id: image.id,
				url: image.url,
			};
		});

		// Store partially- and fully-loaded images together in internal state, so that a half-loaded blob
		// image isn't saved with block attributes
		setCurrentImages(allImages);

		// Persist fully-loaded images to attributes
		const loadedImages = allImages.filter(image => !isImageLoading(image));
		setAttributes({ images: loadedImages });
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

		return <View { ...blockProps }>
			<div className="swipe-gallery">
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
