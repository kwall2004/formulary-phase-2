/**
 * Created by S4505 on 11/23/2016.
 */
Ext.define('Atlas.plan.model.PlanBenefitPricingDetail',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    //idProperty: 'systemId',
    fields: [

        {name: 'DiscPercent',  type: 'number'},
        {name:'systemID',type:'number'},
        {name:'dispFeeGER',type:'number'},
        {name: 'DrugType',  type: 'number'},
        {name: 'CostBasis',  type: 'string'},
        {name: 'Maintenance',  type: 'number'},
        {name:'RowNum',type:'number'},
        {name: 'DiscAmount',  type: 'number'},
        {name: 'OTCInd',  type: 'string'},
        {name: 'PriceId',  type: 'number'},
        {name:'addlDispFee',type:'number'},
        {name: 'DispFee',  type: 'number'},
        {name:'maxDispFee',type:'number'}

    ],
    proxy: {
        url: 'pharmacy/{0}/pricingdetail'
    }
});

