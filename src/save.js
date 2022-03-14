import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';
import PhotoswipeGallery from './photoswipe-gallery';

const Save = (props) => {
	const blockProps = useBlockProps.save();

	const { attributes } = props;
	const { aspectRatio, desktopItemsPerRow, mobileItemsPerRow, images = [] } = attributes ;

	const aspectRatioClassName = `swipe-gallery-item-aspect-ratio-${aspectRatio}`;
	const desktopClassName = `swipe-items-per-row-desktop-${desktopItemsPerRow}`;
	const mobileClassName = `swipe-items-per-row-mobile-${mobileItemsPerRow}`;

	return <View { ...blockProps }>
		<div class={ `swipe-gallery ${desktopClassName} ${mobileClassName}` }>
			{ images.map(image => {
				return <figure class={`swipe-gallery-item ${aspectRatioClassName}`}>
					<img src={ image.url } alt={ image.title || '' } data-width={ image.width } data-height={ image.height } />
				</figure>
			}) }
		</div>

		<PhotoswipeGallery />
	</View>;
};

export default Save;
