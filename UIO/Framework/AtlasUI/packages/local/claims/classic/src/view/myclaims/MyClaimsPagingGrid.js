/**
 * This example demonstrates using a paging display.
 */
Ext.define('Atlas.claims.view.myclaims.MyClaimsPagingGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.ux.PreviewPlugin'
    ],
    xtype: 'claims-myclaims-myclaimspaginggrid',


    height: 500,
    width: 1150,
    frame: true,
    title: 'My Claims',
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
                displayMsg: 'Displaying topics {0} - {1} of {2}',
                emptyMsg: "No topics to display",
                items:[
                    '-', {
                    text: pluginExpanded ? 'Hide Preview' : 'Show Preview',
                    pressed: pluginExpanded,
                    enableToggle: true,
                    toggleHandler: function(btn, pressed) {
                        btn.up('grid').getPlugin('preview').toggleExpanded(pressed);
                        btn.setText(pressed ? 'Hide Preview' : 'Show Preview');
                    }
                }]
            }
        });
        this.callParent();
    }

});
