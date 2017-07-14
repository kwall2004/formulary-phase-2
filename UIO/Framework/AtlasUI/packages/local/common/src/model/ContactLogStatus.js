/**
 * Created by T4317 on 10/5/2016.
 */
Ext.define('Atlas.common.model.ContactLogStatus', {
    extend: 'Atlas.common.model.Base',
    fields: [
        'name',
        'value'
    ],

    proxy: {
        extraParams:{
            pListName:'contactLogStatus'
        },
        url: 'shared/rx/listitems'
    }
});
