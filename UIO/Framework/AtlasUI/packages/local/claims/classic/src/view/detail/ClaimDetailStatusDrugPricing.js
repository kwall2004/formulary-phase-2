Ext.define('Atlas.claims.view.detail.ClaimDetailStatusDrugPricing', {
    extend: 'Ext.grid.Panel',
    xtype: 'ClaimDetailStatusDrugPricing',
    bind: {
        title: '{dispensedquantity}',
        store: '{drugpricing}'
    },
    height: 300,
    columns: [{
        text: 'Description',
        dataIndex:'DESCRIPTION',
        //renderer: function (value, record, dataindex) {
        //    debugger;
        //    if (dataindex.data.PlanPricing === '90') {
        //        dataindex.store.removeAt(0);
        //    }
        //},
        flex: 2
    },{
        text: 'Submitted',
        dataIndex:'formatSubmitted',
        align:'right',
        flex: 1
    }, {
        text: 'Pharmacy Pricing',
        dataIndex:'formatPaid',
        align:'right',
        flex: 1
    }, {
        text: 'Plan Pricing',
        dataIndex:'formatPrice',
        align:'right',
        bind:{
            hidden:'{!planpricing}'
        },
        flex: 1
    }]
});