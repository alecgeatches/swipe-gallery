import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import { useRefEffect, useMergeRefs } from '@wordpress/compose';
import Sortable from 'sortablejs';

const SortableGallery = (props) => {
	const { items, onItemsChange, children, isDisabled = false } = props;

	const swipeGalleryRef = useRef();
	const swipeGallerySetupRef = useRefEffect((element) => {
		Sortable.create(element, {
			draggable: '.sortable-gallery-item',
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

	// Rearrange internal state after DOM change
	useEffect(() => {
		if(swipeGalleryRef.current === null) {
			return;
		}

		Sortable.get(swipeGalleryRef.current).option('onEnd', (event) => {
			if(event.oldIndex === event.newIndex) {
				return;
			}

			// Revert DOM changes
			const domChildren = swipeGalleryRef.current.children;
			if (event.oldIndex > event.newIndex) {
				event.from.insertBefore(event.item, domChildren[event.oldIndex+1]);
			} else {
				event.from.insertBefore(event.item, domChildren[event.oldIndex]);
			}

			// Send changed items to parent
			let reorderedItems = [...items];
			const [itemToMove] = reorderedItems.splice(event.oldIndex, 1);
			reorderedItems.splice(event.newIndex, 0, itemToMove);

			onItemsChange(reorderedItems);
		});
	}, [items]);

	useEffect(() => {
		if(swipeGalleryRef.current) {
			Sortable.get(swipeGalleryRef.current).option('disabled', isDisabled);
		}
	}, [isDisabled]);

	function handleRemoveClick(index) {
		const newItems = [...items.slice(0, index), ...items.slice(index + 1)];
		onItemsChange(newItems);
	}

	if(items.length === 0) {
		return null;
	} else {
		return <div className={`sortable-gallery sortable-gallery-last-row-${items.length % 4}`} ref={useMergeRefs([swipeGalleryRef, swipeGallerySetupRef])}>
			{ children.map((child, index) => {
				child.props.onRemoveClick = () => handleRemoveClick(index);

				return <div className="sortable-gallery-item" key={ index } data-id={ index }>
					{ child }
				</div>;
			}) }
		</div>
	}
};

export default SortableGallery;
