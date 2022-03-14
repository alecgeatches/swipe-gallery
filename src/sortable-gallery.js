import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import { useRefEffect, useMergeRefs } from '@wordpress/compose';
import $ from 'jquery';

const SortableGallery = (props) => {
	const { items, onItemsChange, children, isDisabled = false } = props;

	const sortableRef = useRef();
	const sortableRefEffect = useRefEffect((element) => {
		const sortable = $(element).sortable({
			cursor: 'grabbing',
			tolerance: 'pointer',
			classes: {
				'ui-sortable-disabled': 'sortable-gallery-disabled',
				'ui-sortable-helper': 'item-dragged',
				'ui-sortable-placeholder': 'sortable-gallery-item',
			},
			placeholder: 'item-placeholder',
		});

		return () => {
			sortable.sortable('destroy');
		};
	}, []);
	const mergedSortableRef = useMergeRefs([sortableRef, sortableRefEffect]);

	// Send reordered items to parent on sortable end event and cancel DOM mutations
	useEffect(() => {
		if(sortableRef.current === undefined) {
			return;
		}

		const $sortable = $(sortableRef.current);

		$sortable.sortable('option', 'stop', (event, ui) => {
			const galleryItems = [...ui.item.get(0).parentElement.children];
			const newOrder = galleryItems.map(e => e.dataset.id);
			const reorderedItems = newOrder.map(index => items[index]);
			$sortable.sortable('cancel');

			onItemsChange(reorderedItems);
		});
	}, [items]);

	useEffect(() => {
		if(sortableRef.current) {
			$(sortableRef.current).sortable('option', 'disabled', isDisabled);
		}
	}, [isDisabled]);

	function handleRemoveClick(index) {
		const newItems = [...items.slice(0, index), ...items.slice(index + 1)];
		onItemsChange(newItems);
	}

	if(items.length === 0) {
		return null;
	} else {
		return <div className={ `sortable-gallery sortable-gallery-last-row-${items.length % 4}` } ref={ mergedSortableRef }>
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
