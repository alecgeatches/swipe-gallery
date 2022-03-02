<?php
/*
Plugin Name: Swipe Gallery
Plugin URI: https://example.com
Description: Gutenburg block for displaying a gallery of images with PhotoSwipe.
Version: 1.0.0
Author: Alec Geatches
Author URI: https://github.com/alecgeatches
License: MIT
Text Domain: swipe-gallery
Domain Path: /languages
*/

defined('ABSPATH') or die();

define('SWIPE_GALLERY_VERSION', '1.0.0');

if (!defined('SWIPE_GALLERY_ROOT_PLUGIN_FILE')) {
    define('SWIPE_GALLERY_ROOT_PLUGIN_FILE', __FILE__);
}

require_once 'constants.php';
require_once 'includes.php';
