/**
 * Created by d4662 on 11/21/2016.
 */
Ext.define('Atlas.common.model.PbmTypes', {
    extend: 'Atlas.common.model.Base',
    fields: [
        'pbmType'
],
        proxy: {
        url: 'shared/rx/pbmruletypes'//,
           // timeout: 120000
    }
});