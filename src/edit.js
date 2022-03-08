/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaPlaceholder } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { View } from '@wordpress/primitives';

const Edit = (props) => {
	const blockProps = useBlockProps();
	const { attributes, setAttributes } = props;

	function handleMediaSelect(newImages) {
		console.log('newImages:', newImages);


		const images = newImages.map(image => {
			return {
				id: image.id,
				url: image.url,
				isLoading: !image.id && image.url.indexOf('blob:') === 0,
			};
		});

		setAttributes({ images: images });
	}

	const images = attributes.images ?? [];

	if(images.length === 0) {
		return <View { ...blockProps }>
			<MediaPlaceholder
				labels={ {
					title: __('Swipe Gallery', 'swipe-gallery'),
					instructions: __('Drag, upload, or select images to be displayed in the gallery.'),
				} }
				allowedTypes={ [ 'image' ] }
				multiple={ true }
				onSelect={ handleMediaSelect }
			/>
		</View>;
	}

	return <View { ...blockProps }>
		<ul>
			{ images.map(image => {
				return <li>
					{ image.isLoading && <Spinner />}
					{ !image.isLoading && <img src={ image.url } /> }
				</li>
			}) }
		</ul>
	</View>;
};
export default Edit;
