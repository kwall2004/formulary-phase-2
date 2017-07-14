/**
 * Created by T4317 on 10/5/2016.
 */
Ext.define('Atlas.common.model.UserList', {
    extend: 'Atlas.common.model.Base',
    fields: [
        'RowNum',
        'dbRowID' ,
        'systemId',
        'userName'
    ],

    proxy: {
        extraParams:{
            pShowActive:'Yes'
        },
        url: 'system/rx/userlist'
    }
});


