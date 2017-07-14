/**
 * Created by agupta on 9/19/2016.
 */
Ext.define('Atlas.authorization.model.cdag.CustomPriceModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        { name: 'LineOfBusiness ', type : 'string'},
        { name: 'PharmacyType', type : 'string'},
        { name: 'NDC', type : 'string'},
        { name: 'labelName', type : 'string'},
        { name: 'costBasis', type : 'string'},
        { name: 'NDCPrice', type : 'string'},
        { name: 'CustomUnitPrice', type : 'string'},
        { name: 'customDiscount', type : 'string'},
        { name: 'CustomPrice', type : 'string'},
        { name: 'dispFee', type : 'string'},
        { name: 'contractId', type : 'string'},
        { name: 'pharmacyChain', type : 'string'},
        { name: 'pharmacyName', type : 'string'},
        { name: 'pharmacyAddress', type : 'string'},
        { name: 'pharmacyPhone', type : 'string'}
    ],

    proxy: {
        extraParams: {
            pGCNSEQ: '',
            iCarrierLOBId : '',
            pCustomPriceListId : '',
            pCustomPriceListVersion : '',
            pServiceDate : ''
        },
        url: 'formulary/{0}/custompricingnew'
    }
    /*proxy: {
        url: 'resources/data/dummydata/authorization/cdagmain.json'
    }*/

});
