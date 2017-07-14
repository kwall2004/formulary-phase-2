/**
 * Created by s6627 on 10/3/2016.
 */
Ext.define('Atlas.formulary.model.DrugCommonNameSetupModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'GCNSeqNo', type: 'string'},
        {name: 'drugCommonName', type: 'string'},
        {name: 'lastModifiedBy', type: 'string'},
        {name: 'lastModified', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/drugcommonnames',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});