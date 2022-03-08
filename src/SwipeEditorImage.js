import { Spinner } from '@wordpress/components';

const SwipeEditorImage = (props) => {
	const { image, index } = props;
	const figureProps = {
		key: index,
		'data-index': index,
	};

	if (image.url.indexOf('blob:') === 0 && !image.id) {
		return <figure className="swipe-gallery-item-loading" { ...figureProps }>
			<img src={ image.url } />
			<Spinner />
		</figure>;
	}

	return <figure { ...figureProps }>
		<img src={ image.url } />
	</figure>;
};

export default SwipeEditorImage;
