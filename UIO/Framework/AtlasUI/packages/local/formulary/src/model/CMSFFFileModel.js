/**
 * Created by s6627 on 10/5/2016.
 */
Ext.define('Atlas.formulary.model.CMSFFFileModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'RxCUI ', type: 'string'},
        {name: 'AHFS8', type: 'string'},
        {name: 'Description', type: 'string'},
        {name: 'Category', type: 'string'},
        {name: 'Class', type: 'string'}
    ],
    proxy: {
        extraParams: {
            FormularyID:'',
            FormularyVersion:'',
            RxCuiSearchID:'',
            ipistore:''
        },
        url: 'formulary/{0}/cmsrxcuidrugclass',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});
