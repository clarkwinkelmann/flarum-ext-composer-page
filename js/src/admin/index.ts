import app from 'flarum/admin/app';

app.initializers.add('clarkwinkelmann-composer-page', () => {
    app.extensionData
        .for('clarkwinkelmann-composer-page')
        .registerSetting({
            type: 'text',
            setting: 'composer-page.onlyInTags',
            label: app.translator.trans('clarkwinkelmann-composer-page.admin.settings.onlyInTags'),
            help: app.translator.trans('clarkwinkelmann-composer-page.admin.settings.onlyInTagsHelp'),
        })
        .registerSetting({
            type: 'boolean',
            setting: 'composer-page.forPrivateDiscussions',
            label: app.translator.trans('clarkwinkelmann-composer-page.admin.settings.forPrivateDiscussions'),
            help: app.translator.trans('clarkwinkelmann-composer-page.admin.settings.forPrivateDiscussionsHelp'),
        });
});
