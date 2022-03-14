import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';

const SwipeInspectorControls = (props) => {
	const { attributes, setAttributes } = props;
	const { aspectRatio, desktopItemsPerRow, mobileItemsPerRow } = attributes;

	// Aspect ratio controls
	const aspectRatioOptions = [
		{ value: '16-9', label: __('16:9') },
		{ value: '4-3', label: __('4:3') },
		{ value: '3-2', label: __('3:2') },
		{ value: '1-1', label: __('1:1') },
	];

	function handleAspectRatioChange(value) {
		setAttributes({ aspectRatio: value });
	}

	// Desktop items per row controls
	function handleDesktopItemsPerRowChange(value) {
		setAttributes({ desktopItemsPerRow: value });
	}

	// Mobile items per row controls
	function handleMobileItemsPerRowChange(value) {
		setAttributes({ mobileItemsPerRow: value });
	}

	return <InspectorControls>
		<PanelBody title={ __('Display Settings') }>
			<SelectControl
				label={ __('Thumbnail Aspect Ratio') }
				value={ aspectRatio }
				onChange={ handleAspectRatioChange }
				options={ aspectRatioOptions }
			/>

			<RangeControl
				label={ __('Items per Row on Desktop') }
				value={ desktopItemsPerRow }
				onChange={ handleDesktopItemsPerRowChange }
				min={ 1 }
				max={ 6 }
			/>

			<RangeControl
				label={ __('Items per Row on Mobile') }
				value={ mobileItemsPerRow }
				onChange={ handleMobileItemsPerRowChange }
				min={ 1 }
				max={ 6 }
			/>
		</PanelBody>
	</InspectorControls>;
};

export default SwipeInspectorControls;
