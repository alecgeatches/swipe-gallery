<?php

namespace AlecG\SwipeGallery;

defined('ABSPATH') or die();

class RegisterBlock {
    public static function init() {
        add_action('init', [__CLASS__, 'register_block']);

        // Backend assets
        add_action('enqueue_block_assets', [__CLASS__, 'register_block_editor_assets']);

        // Frontend assets
        add_action('init', [__CLASS__, 'register_frontend_assets']);
        add_action('render_block', [__CLASS__, 'maybe_enqueue_frontend_assets'], 10, 2);
    }

    #region Block Registration

    public static function register_block() {
        register_block_type(__DIR__);
    }

    #endregion Block Registration

    #region Backend assets

    public static function register_block_editor_assets() {
        $asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';
        $dependencies = array_unique(array_merge([
            'jquery-ui-sortable',
        ], $asset_file['dependencies']));

        wp_register_script(
            'alecg-swipe-gallery-editor-js',
            plugins_url('build/index.js', __FILE__),
            $dependencies,
            $asset_file['version'],
            true /* in_footer */
        );
    }

    #endregion Backend assets

    #region Frontend assets

    public static function register_frontend_assets() {
        // Required Photoswipe CSS
        wp_register_style(
            'alecg-photoswipe-css',
            plugins_url('lib/photoswipe-4.1.3/photoswipe.css', __FILE__),
            [] /* dependencies */,
            SWIPE_GALLERY_VERSION
        );

        wp_register_style(
            'alecg-photoswipe-skin-css',
            plugins_url('lib/photoswipe-4.1.3/photoswipe-default-skin.css', __FILE__),
            [] /* dependencies */,
            SWIPE_GALLERY_VERSION
        );

        // Custom JS
        $asset_file = include plugin_dir_path(__FILE__) . 'build/script.asset.php';

        wp_register_script(
            'alecg-swipe-gallery-frontend-js',
            plugins_url('build/script.js', __FILE__),
            $asset_file['dependencies'],
            $asset_file['version'],
            true /* in_footer */
        );

        // Custom CSS
        wp_register_style(
            'alecg-swipe-gallery-frontend-css',
            plugins_url('css/frontend.css', __FILE__),
            [
                'alecg-photoswipe-css',
                'alecg-photoswipe-skin-css'
            ],
            SWIPE_GALLERY_VERSION,
        );
    }

    public static function maybe_enqueue_frontend_assets($block_content, $block) {
        if(empty($block['blockName'])) {
            return $block_content;
        }

        if ('alecg/swipe-gallery' === $block['blockName']) {
            wp_enqueue_script('alecg-swipe-gallery-frontend-js');
        }

        return $block_content;
    }

    #endregion Frontend assets
}

RegisterBlock::init();
