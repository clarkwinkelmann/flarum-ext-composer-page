# Composer Page

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/clarkwinkelmann/flarum-ext-composer-page/blob/master/LICENSE.txt) [![Latest Stable Version](https://img.shields.io/packagist/v/clarkwinkelmann/flarum-ext-composer-page.svg)](https://packagist.org/packages/clarkwinkelmann/flarum-ext-composer-page) [![Total Downloads](https://img.shields.io/packagist/dt/clarkwinkelmann/flarum-ext-composer-page.svg)](https://packagist.org/packages/clarkwinkelmann/flarum-ext-composer-page) [![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/clarkwinkelmann)

This extension replaces the floating discussion composer with a complete dedicated page.

This improves the user experience on mobile and allows the composer to display infinitely more fields without the need for modals and dropdowns.

Optionally, you can choose for the page to only be used for select tags.
This feature might not work with all extensions, and the data entered prior to changing the tag might be lost.

Extensions whose data is confirmed to be preserved when the composer switches from floating to page:

- Native fields (title and content)
- Flarum Tags
- KILOWHAT Formulaire
- Flamarkt Taxonomies (since version 0.1.5 of Taxonomies)
- FriendsOfFlarum Polls (since version 1.2.0 of Polls)
- FriendsOfFlarum Mason (since version 1.2.0 of Mason)

Composer switch not supported:

- FriendsOfFlarum Byobu - Cannot switch tags, so irrelevant. Byobu will use the composer page the same way as a discussion without tags does

Extensions completely incompatible:

- FriendsOfFlarum Upload - App crashes when trying to write discussion - [PR opened](https://github.com/FriendsOfFlarum/upload/pull/327)

All other extensions should be compatible when the feature is used globally for any tag.

Using the "Uniform discussion composer layout" option in KILOWHAT Formulaire makes the page even more complete by adding labels and horizontal layout styling to the full composer.

The composer page is also perma-linkable. Use `https://<forum>/compose` or `https://<forum>/t/<tag slug>/compose` to link directly to the composer.
Additionally, you can include a `?title=` and/or `?content=` query string to pre-fill the form.

When the composer page is enabled globally, the start discussion button is replaced with a link, so it's possible to open it in a new tab using the browser controls.

When you quit the composer page without submitting, it becomes minimized just like the native composer.
Clicking the minimized composer re-opens the composer page.

When the composer page is active, the start discussion button is replaced with a button to quit or resume the composer.

On mobile, there are 2 different links to submit the form, one is the original paper plane icon from Flarum in the top right.
Another button is added at the very bottom of the page to improve the user experience.

## Installation

    composer require clarkwinkelmann/flarum-ext-composer-page

## Support

This extension is under **active maintenance**.

Bugfixes and compatibility updates will be published for free as time allows.

You can [contact me](https://clarkwinkelmann.com/flarum) to sponsor additional features.

Support is offered on a "best effort" basis through the Flarum community thread.

## Links

- [GitHub](https://github.com/clarkwinkelmann/flarum-ext-composer-page)
- [Packagist](https://packagist.org/packages/clarkwinkelmann/flarum-ext-composer-page)
- [Discuss](https://discuss.flarum.org/d/31564)
