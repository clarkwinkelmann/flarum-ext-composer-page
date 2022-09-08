import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import listItems from 'flarum/common/helpers/listItems';
import extractText from 'flarum/common/utils/extractText';
import Stream from 'flarum/common/utils/Stream';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import IndexPage from 'flarum/forum/components/IndexPage';
import Tag from 'flarum/tags/common/models/Tag';

// Copied from flarum-tags addTagFilter()
const findTag = (slug: string) => app.store.all<Tag>('tags').find((tag) => tag.slug().localeCompare(slug, undefined, {sensitivity: 'base'}) === 0);

export default class ComposerPage extends Page {
    loading: boolean = false
    handlers: any = {}

    currentTag(): Promise<Tag | null | undefined> {
        return new Promise(resolve => {
            const {slug} = m.route.param();

            if (!slug) {
                return resolve(null);
            }

            const tag = findTag(slug);

            if (tag) {
                return resolve(tag);
            }

            this.loading = true;

            // Same code as in flarum-tags IndexPage.prototype.currentTag
            // Maybe the number of relationships is overkill for our use case here
            app.store
                .find('tags', slug, {include: 'children,children.parent,parent,state'})
                .then(() => {
                    this.loading = false;
                    resolve(findTag(slug));
                });
        });
    }

    oninit(vnode: any) {
        super.oninit(vnode);

        app.setTitle(extractText(app.translator.trans('clarkwinkelmann-composer-page.forum.page.title')));
        app.setTitleCount(0);

        // Invoke the preloaded payload to get access to the current tag(s)
        app.preloadedApiDocument();

        const {user} = app.session;

        if (!user) {
            this.loading = true;

            // If user is logged out, redirect to index page
            m.route.set(app.route('index'));

            return;
        }

        if (!app.composer.bodyMatches(DiscussionComposer)) {
            app.composer.load(DiscussionComposer, {
                user,
            });
            // Will not actually show the real composer, but that's where our logic to set the default when leaving the standalone page resides
            // so we need to call it at some point to prepare the composer
            app.composer.show();

            const fields = app.composer.fields as any;

            if (fields) {
                const {title, content} = m.route.param();

                if (title) {
                    // Most likely, the title field won't exist yet at this point
                    // but we'll handle both options just to be sure
                    if (fields.title) {
                        fields.title(title);
                    } else {
                        fields.title = Stream(title);
                    }
                }

                if (content && fields.content) {
                    fields.content(content);
                }

                const currentRouteName = (app.current.data as any).routeName;

                if (currentRouteName === 'composeTag') {
                    this.currentTag().then(tag => {

                        if (tag) {
                            const parent = tag.parent();
                            fields.tags = parent ? [parent, tag] : [tag];
                        } else {
                            fields.tags = [];
                        }

                        m.redraw();

                        this.updateHeight();
                    });
                }
            }
        }
    }

    view() {
        return m('.ComposerPageContainer', m('.container', m('.sideNavContainer', [
            m('nav.IndexPage-nav.sideNav', m('ul', listItems(IndexPage.prototype.sidebarItems().toArray()))),
            m('.sideNavOffset', m('.ComposerPage', [
                m('h2.App-titleControl', app.translator.trans('clarkwinkelmann-composer-page.forum.page.heading')),
                this.body(),
            ])),
        ])));
    }

    body() {
        const body = app.composer.body as any;

        if (!body.componentClass || this.loading) {
            return LoadingIndicator.component();
        }

        return body.componentClass.component({
            ...body.attrs,
            composer: app.composer,
            disabled: false,
        });
    }

    oncreate(vnode: any) {
        super.oncreate(vnode);

        $(window).on('resize', (this.handlers.onresize = this.updateHeight.bind(this)));

        // We need a little delay before the first height update because the TextEditor doesn't initialize the textarea in the same rendering thread
        setTimeout(() => {
            this.updateHeight();
        }, 10);
    }

    onremove(vnode: any) {
        super.onremove(vnode);

        $(window).off('resize', this.handlers.onresize);

        // If we leave the page without quitting the composer, switch to the floating composer
        if (app.composer.bodyMatches(DiscussionComposer)) {
            app.composer.minimize();
        }
    }

    updateHeight() {
        const $flexible = this.$('.Composer-flexible');

        // Adapted from Composer.prototype.updateHeight
        // The comparison is now done directly against the full document
        if ($flexible.length) {
            const headerHeight = $flexible.offset()!.top;
            const paddingBottom = parseInt($flexible.css('padding-bottom'), 10);
            const footerHeight = this.$('.Composer-footer').outerHeight(true)!;

            $flexible.height(Math.max(window.innerHeight - headerHeight - paddingBottom - footerHeight, 200));
        }
    }
}
