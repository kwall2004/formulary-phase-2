/**
 * Created by T4317 on 10/13/2016.
 */
Ext.define('Atlas.common.model.Notes',{
    extend: 'Atlas.common.model.Base',

    fields: [
        { name:'CreateUser', type: 'string'},
        { name: 'CreateDate', type: 'date', dateFormat: 'Y-m-d'},
        { name:'CreateTime', type: 'string'},
        { name:'Subject', type: 'string'},
        { name:'Note', type: 'string'},
        { name:'SystemID', type: 'string'},
        { name:'rowNUm', type: 'string'}

    ],
    proxy: {
        extraParams: {
            pagination: true,
            remoteSort: true
        },
        url: 'shared/rx/notes'
    }
});

