/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';

const Save = (props) => {
	const blockProps = useBlockProps.save();

	const { attributes } = props;

	const images = attributes.images ?? [];

	return <View { ...blockProps }>
		<ul>
			{ images.map(image => {
				return <li>
					<div class="swipe-gallery-media-item" data-id={image.id}>{image.id}</div>
				</li>
			}) }
		</ul>
	</View>;
};

export default Save;
