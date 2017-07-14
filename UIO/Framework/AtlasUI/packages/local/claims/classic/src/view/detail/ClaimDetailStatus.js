/**
 * Created by b1343 on 5/20/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatus', {
    extend: 'Ext.panel.Panel',
    xtype: 'claimDetailStatus',

    itemId: 'claimDetailStatusID',

    title: 'Status',
    layout:'hbox',
    scrollable:true,
    defaults:{
        flex:1
    },
    items: [{
        items: [{
            xtype: 'claimDetailStatusPharmacyInfo'
        }, {
            xtype: 'claimDetailStatusPrescriberInfo'
        },{
            xtype: 'claimdetailpatientsegment'
        },{
            xtype: 'ClaimDetailStatusRejectionInfo'
        }, {
            xtype: 'claimDetailStatusHoldPayment'
        }]
    }, {
        items:[{
            xtype: 'claimDetailStatusDrugDetail'
        },{
            xtype: 'fieldset',
            title: 'Drug Pricing',
            collapsible: true,
            items:[{
                xtype: 'ClaimDetailStatusDrugPricing',
                height:400
            }]
        }]
    }]
});