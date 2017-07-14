/**
 * Created by s6627 on 2/7/2017.
 */
Ext.define('Atlas.casemanagement.model.Options',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'opcKeyValue',  type: 'string'}
    ],
    proxy: {
        url: 'system/{0}/optionsvalue'
    }
});