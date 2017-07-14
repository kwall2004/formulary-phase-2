Ext.define('Atlas.letter.model.templates.AcumenPvdNotfModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.acumenpvdnotfmdl',
    fields: [
        {name: 'name', type: 'string', dataIndex: 'name' },
        {name: 'id', type: 'string', dataIndex: 'id' }
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});