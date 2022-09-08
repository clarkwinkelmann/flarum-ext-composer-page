<?php

namespace ClarkWinkelmann\ComposerPage;

use Flarum\Extend;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less')
        ->route('/compose', 'clarkwinkelmann-composer-page.compose')
        ->route('/t/{slug}/compose', 'clarkwinkelmann-composer-page.composeTag', Content\TagComposer::class),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Settings())
        ->serializeToForum('composerPageTags', 'composer-page.onlyInTags'),
];
