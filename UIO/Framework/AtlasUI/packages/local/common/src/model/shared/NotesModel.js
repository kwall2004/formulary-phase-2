/**
 * Created by mkorivi on 10/10/2016.
 */
Ext.define('Atlas.common.model.shared.NotesModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'CreateUser', type: 'string'},
        {name: 'CreateDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'CreateTime', type: 'string'},
        {name: 'Subject', type: 'string'},
        {name: 'Note', type: 'string'},
        {name: 'Access', type: 'string'},
        {name: 'SystemID', type: 'string'},
        {name: 'rowNUm', type: 'string'}

    ],

    proxy: {
        extraParams: {
            pParentSystemID:''
        },

        url: 'shared/{0}/notes'
    }


});