Ext.define('Atlas.letter.model.templates.GeneralCoverLetterTypeModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.generalcoverlettertypemdl',
    fields: [
        {name: 'name', type: 'string', mapping: 'name' },
        {name: 'value', type: 'string', mapping: 'value' }
    ],
    pageSize: 50,
    proxy: {
        url: 'shared/{0}/listitems',
        extraParams: {
            pListName: 'CoverLetterType'
        }
    }
});