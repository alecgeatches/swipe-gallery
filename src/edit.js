/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useBlockProps, MediaPlaceholder } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';
import SwipeEditorImage from './SwipeEditorImage';
import Sortable from 'sortablejs';

import { useRefEffect, useMergeRefs } from '@wordpress/compose';

const Edit = (props) => {
	const { attributes, setAttributes, isSelected } = props;
	const blockProps = useBlockProps();
	const [ currentImages, setCurrentImages ] = useState(attributes.images ?? []);

	const swipeGalleryRef = useRef();
	const swipeGalleryRefEffect = useRefEffect((element) => {
		Sortable.create(element, {
			draggable: '.swipe-gallery-item',
			filter: 'button',
		});

		// Prevent parent block from canceling dragstart event
		function onGalleryDrag(event) {
			event.stopPropagation();
		}

		element.addEventListener('dragstart', onGalleryDrag);

		return () => {
			element.removeEventListener('dragstart', onGalleryDrag);
			Sortable.get(element).destroy();
		};
	}, []);

	useEffect(() => {
		if(swipeGalleryRef.current === null) {
			return;
		}

		Sortable.get(swipeGalleryRef.current).option('onEnd', (event) => {
			if(event.oldIndex === event.newIndex) {
				return;
			}

			// Revert DOM changes
			const items = swipeGalleryRef.current.children;
			if (event.oldIndex > event.newIndex) {
				event.from.insertBefore(event.item, items[event.oldIndex+1]);
			} else {
				event.from.insertBefore(event.item, items[event.oldIndex]);
			}

			// Persist changes to state
			let reorderedImages = [...currentImages];
			const [imageToMove] = reorderedImages.splice(event.oldIndex, 1);
			reorderedImages.splice(event.newIndex, 0, imageToMove);

			setCurrentImages(reorderedImages);
		});
	}, [currentImages]);

	useEffect(() => {
		// Persist fully-loaded images to attributes. Ignore loading images so that a half-loaded blob
		// image isn't saved with block attributes
		const loadedImages = currentImages.filter(image => !isImageLoading(image));
		setAttributes({ images: loadedImages });

		const isLoading = loadedImages.length !== currentImages.length;

		if(swipeGalleryRef.current) {
			Sortable.get(swipeGalleryRef.current).option('disabled', isLoading);
		}
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

	function handleRemoveClick(index) {
		const newImages = [...currentImages.slice(0, index), ...currentImages.slice(index + 1)];
		setCurrentImages(newImages);
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
			<div className={`swipe-gallery swipe-gallery-last-row-${currentImages.length % 4}`} ref={useMergeRefs([swipeGalleryRef, swipeGalleryRefEffect])}>
				{ currentImages.map((image, index) => <SwipeEditorImage image={ image } index={ index } key={ index } onRemoveClick={ handleRemoveClick } />) }
			</div>

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
