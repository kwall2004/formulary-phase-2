/*
 Developer: Tremaine Grant
 Description: model for gpi
 Origin: Merlin
 9/29/16

 */
Ext.define('Atlas.common.model.GPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'LN',type: 'string'},
        {name: 'LBLRID',type: 'string'},
        {name: 'NDC',type: 'string'},
        {name: 'GCN_SEQNO',type: 'string'},
        {name: 'BN',type: 'string'},
        {name: 'GNN60',type: 'string'},
        {name: 'HICL_SEQNO',type: 'string'},
        {name: 'ProtectedClassDrug',type: 'string'},

        {name: 'GPICode',type: 'string'}, // added fields which required for GYI Typeahead under Compound GPI windwow
        {name: 'GPIName',type: 'string'},
        {name: 'GPPC',type: 'string'}
    ],
    proxy: {
        // url: 'pharmacy/services/rx/pharmacymasterdata/',
        url: 'formulary/rx/gpimasterext'
    }
});
