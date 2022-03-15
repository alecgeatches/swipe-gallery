import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps, MediaPlaceholder } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';
import _ from 'lodash';
import SortableGallery from './sortable-gallery';
import SwipeEditorImage from './swipe-editor-image';
import SwipeInspectorControls from './swipe-inspector-controls';

const Edit = (props) => {
	const { attributes, setAttributes, isSelected } = props;
	const blockProps = useBlockProps();
	const [ currentImages, setCurrentImages ] = useState(attributes.images || []);

	useEffect(() => {
		// Persist fully-loaded images to attributes. Ignore loading images so that a half-loaded blob
		// image isn't saved with block attributes
		const loadedImages = currentImages.filter(image => image.id && image.url && image.thumbnailUrl && image.width && image.height);
		setAttributes({ images: loadedImages });
	}, [currentImages]);

	function handleMediaSelect(newImages) {
		// When appending to an existing set of images, newImages will only store the current set of uploaded images.
		// Combine any existing images with the new set.
		const allImages = _.uniqBy([...currentImages, ...newImages], image => {
			return image.id ? image.id : image.url;
		}).map(image => {
			const { width, height } = image.media_details ? image.media_details : image;
			const thumbnailUrl = image.media_details ? image.media_details.sizes?.medium?.source_url : image.thumbnailUrl;

			return {
				id: image.id,
				url: image.url,
				title: image.title,
				thumbnailUrl,
				width,
				height,
			};
		});

		setCurrentImages(allImages);
	}

	function handleGalleryChange(changedItems) {
		setCurrentImages(changedItems);
	}

	function isImageLoading(image) {
		return image.url.indexOf('blob:') === 0 && !image.id;
	}

	const mediaPlaceholderDefaults = {
		allowedTypes: ['image'],
		multiple: true,
		onSelect: handleMediaSelect,
	};

	const swipeInspectorControls = <SwipeInspectorControls attributes={ attributes } setAttributes={ setAttributes }></SwipeInspectorControls>;

	if(currentImages.length === 0) {
		return <View { ...blockProps }>
			{ swipeInspectorControls }

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
			{ swipeInspectorControls }

			<SortableGallery
				items={ currentImages }
				onItemsChange={ handleGalleryChange }
				isDisabled={ isAnyImageLoading }
				desktopItemsPerRow={ attributes.desktopItemsPerRow }
				mobileItemsPerRow={ attributes.mobileItemsPerRow }
			>
				{ currentImages.map(image => <SwipeEditorImage image={ image } aspectRatio={ attributes.aspectRatio } />) }
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
