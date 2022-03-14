<?php

namespace AlecG\SwipeGallery;

defined('ABSPATH') or die();

class RegisterBlock {
    public static function init() {
        add_action('init', [__CLASS__, 'register_block']);
        add_action('enqueue_block_assets', [__CLASS__, 'register_block_assets']);
    }

    public static function register_block() {
        register_block_type(__DIR__);
    }

    public static function register_block_assets() {
        $asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';
        $dependencies = array_unique(array_merge([
            'jquery-ui-sortable',
        ], $asset_file['dependencies']));

        wp_register_script(
            'alecg-swipe-gallery-editor',
            plugins_url('build/index.js', __FILE__),
            $dependencies,
            $asset_file['version'],
            true /* in_footer */
        );
    }

}

RegisterBlock::init();
