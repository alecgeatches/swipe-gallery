import { Spinner } from '@wordpress/components';

const SwipeEditorImage = (props) => {
	const { image, index } = props;

	if (image.url.indexOf('blob:') === 0 && !image.id) {
		return <figure className="swipe-gallery-item-loading">
			<img src={ image.url } />
			<Spinner />
		</figure>;
	}

	return <figure>
		<img src={ image.url } />
	</figure>;
};

export default SwipeEditorImage;
