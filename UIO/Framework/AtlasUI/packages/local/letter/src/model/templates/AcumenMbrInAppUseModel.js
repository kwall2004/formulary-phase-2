Ext.define('Atlas.letter.model.templates.AcumenMbrInAppUseModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.acumenmbrinappusemdl',
    fields: [
        {name: 'name', type: 'string', dataIndex: 'name' },
        {name: 'id', type: 'string', dataIndex: 'id' }
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});