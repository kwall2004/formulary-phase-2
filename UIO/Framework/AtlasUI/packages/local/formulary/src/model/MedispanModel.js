/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.model.MedispanModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'NDC', type: 'string'},
        {name: 'GCN', type: 'string'},
        {name: 'LN', type: 'string'},
        {name: 'SystemID', type: 'string'},
        {name: 'isUpdated', type: 'boolean'}
    ],
    proxy: {
        extraParams: {
            pNDC:'',
            pagination: true
        },
        url: 'formulary/{0}/medispanfdbdrug',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});

