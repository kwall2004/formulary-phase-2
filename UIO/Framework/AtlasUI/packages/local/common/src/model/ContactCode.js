/**
 * Created by T4317 on 10/3/2016.
 */
Ext.define('Atlas.common.model.ContactCode', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'ACTIVE',
        'Category' ,
        'Description',
        'GroupPermisions' ,
        'ReasonCode',
        'ShortDescription' ,
        'SystemID' ,
        'rowNum'
    ],
    extraParams:{
        pShowAll:true,
        iplGetGeneral:true
    },
    proxy: {
        url: 'shared/rx/contactcode'
    }
});

