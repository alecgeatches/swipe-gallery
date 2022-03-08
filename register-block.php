<?php

namespace AlecG\SwipeGallery;

defined('ABSPATH') or die();

class RegisterBlock {
    public static function init() {
        add_action('init', [__CLASS__, 'register_block']);
    }

    public static function register_block() {
        register_block_type(__DIR__);
    }
}

RegisterBlock::init();
