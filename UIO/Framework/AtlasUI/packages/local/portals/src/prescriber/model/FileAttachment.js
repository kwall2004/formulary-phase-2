Ext.define('Atlas.portals.prescriber.model.FileAttachment', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'FaxAttach',   type: 'string' },
        { name: 'AttcDescr',   type: 'string' },
        { name: 'DocumentID',  type: 'string' },
        { name: 'AttcDate',    type: 'string' }
    ]
});