Ext.define('Atlas.letter.model.templates.UCFClaimDetailModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.ucfclaimdetailmdl',
    fields: [
        'field1', 'field2'
    ],
    pageSize: 50,
    proxy: {
        url: 'claims/{0}/ucfclaimdetail'
    }
});