/**
 * Created by agupta on 11/4/2016.
 */
Ext.define('Atlas.common.model.shared.DelDocumentModel',{
    extend: 'Atlas.common.model.Base',
    fields: [

    ],
    proxy: {
        extraParams: {
            pDocumentID:''
        },
        url: 'shared/{0}/deldocument'
    }
});