/**
 * Created by c4539 on 11/7/2016.
 */
Ext.define('Atlas.portals.rxpharmacy.model.MaxPricePharmacyP', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'GNN',type: 'string'},
        {name: 'HICL_seqNo',type: 'int'},
        {name: 'Labelname',type: 'string'},
        {name: 'MacPrice',type: 'string'},
        {name: 'NDC',type: 'string'}
    ],

    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'portal/rx/macpricepharmacyp'
    }
});