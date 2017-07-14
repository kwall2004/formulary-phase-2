/**
 * Created by s6627 on 2/7/2017.
 */
Ext.define('Atlas.formulary.model.FormularyImportFields',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'opcKeyValue',  type: 'string'}
    ],
    proxy: {
        extraParams: {
            ipcKeyName:'FormularyImportFields'
        },
        url: 'system/{0}/optionsvalue',
        reader: {
            type    : 'json',
            rootProperty    : 'metadata'
        }
    }
});