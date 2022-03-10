import { __ } from '@wordpress/i18n';
import { Spinner, Button, Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';

const SwipeEditorImage = (props) => {
	const [ isDeleteModalVisible, setIsDeleteModalVisible ] = useState(false);

	const { image, index, onRemoveClick } = props;
	const figureProps = {
		'data-id': index,
	};

	if (image.url.indexOf('blob:') === 0 && !image.id) {
		return <figure className="swipe-gallery-item swipe-gallery-item-loading" { ...figureProps }>
			<img src={ image.url } />
			<Spinner />
		</figure>;
	}

	function handleRemoveClick() {
		setIsDeleteModalVisible(false);
		onRemoveClick(index);
	}

	return <figure className="swipe-gallery-item swipe-gallery-item-loaded" { ...figureProps }>
		<img src={ image.url } />

		<button className="swipe-gallery-item-remove" title={ __('Remove Image', 'alecg-swipe-gallery') } onClick={ () => setIsDeleteModalVisible(true) }>
			<span class="dashicons dashicons-no-alt"></span>
		</button>

		{ isDeleteModalVisible && <Modal className="swipe-gallery-item-remove-modal" title={ __('Remove image from gallery?', 'alecg-swipe-gallery') } onRequestClose={ () => setIsDeleteModalVisible(false) }>
			<Button variant="primary" onClick={ () => handleRemoveClick() }>{ __('Remove', 'alecg-swipe-gallery') }</Button>
			<Button onClick={ () => setIsDeleteModalVisible(false) }>{ __('Cancel', 'alecg-swipe-gallery') }</Button>
		</Modal>}
	</figure>;
};

export default SwipeEditorImage;
