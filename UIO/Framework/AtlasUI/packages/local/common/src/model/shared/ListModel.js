/**
 * Created by agupta on 9/16/2016.
 */
Ext.define('Atlas.common.model.shared.ListModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pListName:''
        },
        // url: 'pharmacy/services/rx/pharmacymasterdata/',
        url: 'shared/{0}/listitems'
    }
});