/**
 * This example demonstrates using a paging display.
 */
Ext.define('Atlas.portals.view.rxmember.MyClaimsMemberPagingGrid', {
    extend: 'Ext.grid.Panel',
  /*  viewModel:'myclaimsmembermodel',
    controller: 'claimSearchController',
    items:[{
        xtype: 'grid',
        layout:'fit',
        columns:[{
            text: "",
            xtype: 'widgetcolumn',
            dataIndex: '',
            widget: {
                xtype: 'button',
                iconCls:'fa fa-medkit',
                handler: 'onDrugSearchClick'
            }
        },{
            text: "Medication",
            flex:3,
            dataIndex: 'medication'
        },{

            text: 'Brand Name',
            flex:3,
            dataIndex: 'brandname'
        },{
            text: "Claim Date",
            dataIndex: 'svcdate',
            flex:2
        },{
            text: "Quantity",
            dataIndex: 'qty'
        },{
            text: "Days Supply",
            dataIndex: 'supply'
        },{
            text: 'Pharmacy Name',
            xtype: 'widgetcolumn',
            dataIndex: 'rxname',
            flex:3,
            widget: {
                xtype: 'button',
                iconCls: 'fa fa-home',
                handler: 'onPharmacyClick'
            }
        },{
            text:'Prescriber Name',
            xtype: 'widgetcolumn',
            dataIndex:'drname',
            flex:3,
            widget: {
                xtype: 'button',
                iconCls: 'fa fa-user-md',
                handler: 'onPrescriberClick'
            }
        },{
            text: "Your Paid Amount",
            dataIndex: 'patPaidAmt',
            flex:2
        },{
            text: ""
        }],
        bind: {
            store: '{claimSearchStore}'
        },
        // paging bar on the bottom
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            pageSize: 10,
            bind: {
                store: '{claimSearchStore}'
            },
            displayInfo: true
        }]
}]*/

    height: 500,
    width: 1150,
    frame: true,
    disableSelection: true,
    loadMask: true,

    initComponent: function(uniqueId){
        this.width = 1160;

        var pluginExpanded = true;

        // create the Data Store
        var store = "";//Ext.create('MemberPortal.store.MoreInfoForMyClaimsStore');

        Ext.apply(this, {
            store: store,
            plugins: [{
                ptype: 'preview',
                bodyField: 'excerpt',
                expanded: pluginExpanded,
                pluginId: 'preview'
            }],
            viewConfig: {
                trackOver: false,
                stripeRows: false
            },
            // grid columns
            columns:[{
                // id assigned so we can apply custom css (e.g. .x-grid-cell-topic b { color:#333 })
                // TODO: This poses an issue in subclasses of Grid now because Headers are now Components
                // therefore the id will be registered in the ComponentManager and conflict. Need a way to
                // add additional CSS classes to the rendered cells.
                id: 'medication' + this.renderTo,
                text: "Medication",
                dataIndex: 'id',
                flex: 1,
                sortable: false
            },{
                id: 'brandName' + this.renderTo,
                text: "Brand Name",
                dataIndex: 'id',
                flex: 1,
                sortable: false
            },{
                id: 'claimDate' + this.renderTo,
                text: "Claim Date",
                dataIndex: 'date',
                flex: 1,
                sortable: false
            },{
                id: 'quantity' + this.renderTo,
                text: "Quantity",
                dataIndex: 'title',
                flex: 1,
                sortable: false
            },{
                id: 'daysSupply' + this.renderTo,
                text: "Days Supply",
                dataIndex: 'title',
                flex: 1,
                sortable: false
            },{
                id: 'pharmacyName' + this.renderTo,
                text: "Pharmacy Name",
                dataIndex: 'title',
                flex: 1,
                sortable: false
            },{
                id: 'prescriberName' + this.renderTo,
                text: "Prescriber Name",
                dataIndex: 'title',
                flex: 1,
                sortable: false
            },{
                id: 'yourPaidAmount' + this.renderTo,
                text: "Your Paid Amount",
                dataIndex: 'title',
                flex: 1,
                sortable: false
            }
            ],
            // paging bar on the bottom
            bbar: {
                xtype:'pagingtoolbar',
                store: store,
                displayInfo: true,
                emptyMsg: "No topics to display"
            }
        });
        this.callParent();
    }

});
