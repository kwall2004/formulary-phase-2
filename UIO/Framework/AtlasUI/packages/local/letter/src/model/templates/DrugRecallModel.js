Ext.define('Atlas.letter.model.templates.DrugRecallModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.drugrecallmdl',
    fields: [
        {name: 'name', type: 'string', dataIndex: 'name' },
        {name: 'id', type: 'string', dataIndex: 'id' }
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});