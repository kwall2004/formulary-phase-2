Ext.define('Atlas.letter.model.templates.DefaultLetterTemplateModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.defaultlettertemplatemdl',
    fields: ['id', 'name'],
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});