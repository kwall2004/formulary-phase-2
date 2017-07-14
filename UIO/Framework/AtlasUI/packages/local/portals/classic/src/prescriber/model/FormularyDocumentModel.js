Ext.define('Atlas.portals.view.prescriber.model.FormularyDocumentModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'portal/{0}/formularydocument',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }

});