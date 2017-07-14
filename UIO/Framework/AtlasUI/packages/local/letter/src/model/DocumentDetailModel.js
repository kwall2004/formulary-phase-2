Ext.define('Atlas.letter.model.DocumentDetailModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.documentdetailmdl',
    fields: [
        'ListName', 'ListValue'
    ],
    proxy: {
        url: 'shared/{0}/documentdetails',
        root: 'message'
    }
});