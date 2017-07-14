Ext.define('Atlas.letter.model.templates.MAPNonComplianceLetterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.mapnoncompliancelettermdl',
    fields: [
        {name: 'name', type: 'string', dataIndex: 'name' },
        {name: 'id', type: 'string', dataIndex: 'id' }
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});