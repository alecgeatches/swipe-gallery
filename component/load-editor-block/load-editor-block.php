<?php

namespace SwipeGallery\Component;

defined('ABSPATH') or die();

class LoadEditorBlock {
    public static function init() {
        add_action('init', [__CLASS__, 'register_block']);
        add_action('enqueue_block_assets', [__CLASS__, 'register_block_assets']);
    }

    public static function register_block() {
        register_block_type(
            'alecg/swipe-gallery', [
                'style'         => 'alecg-swipe-gallery',
                'editor_script' => 'alecg-swipe-gallery-editor',
                'editor_style'  => 'alecg-swipe-gallery-editor',
            ]
        );
    }

    public static function register_block_assets() {
        // Styles for frontend and backend
        wp_register_style(
            'alecg-swipe-gallery',
            plugins_url('dist/blocks.style.build.css', SWIPE_GALLERY_BUILD_ROOT),
            is_admin() ? ['wp-editor'] : null,
            SWIPE_GALLERY_VERSION,
        );

        // Block editor script for backend
        wp_register_script(
            'alecg-swipe-gallery-editor',
            plugins_url('dist/blocks.build.js', SWIPE_GALLERY_BUILD_ROOT),
            ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
            SWIPE_GALLERY_VERSION,
            true /* in_footer */
        );

        // Block editor styles for backend
        wp_register_style(
            'alecg-swipe-gallery-editor',
            plugins_url('dist/blocks.editor.build.css', SWIPE_GALLERY_BUILD_ROOT),
            ['wp-edit-blocks'],
            SWIPE_GALLERY_VERSION
        );

        wp_localize_script(
            'alecg-swipe-gallery-editor',
            'ALECG_SWIPE_GALLERY',
            []
        );
    }
}

LoadEditorBlock::init();
