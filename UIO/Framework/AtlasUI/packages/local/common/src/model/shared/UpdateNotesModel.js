/**
 * Created by mkorivi on 10/13/2016.
 */
Ext.define('Atlas.common.model.shared.UpdateNotesModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: "pResult" , type: "number"},
        { name: "pMessage", type: "string"}
    ],

    proxy: {
        extraParams: {
            systemID : '',
            mode : '',
            fieldList : '',
            fields : ''

        },

        updateUrl: 'shared/{0}/Notes'
    }


});