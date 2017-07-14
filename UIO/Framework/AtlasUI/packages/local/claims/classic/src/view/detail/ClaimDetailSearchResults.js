/**
 * Created by b1343 on 5/24/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailSearchResults', {
    extend: 'Ext.Container',
    requires: [
        'Atlas.claims.controller.detail.ClaimDetailStatusClaimSearchResultsController',
        'Atlas.claims.model.detail.searchResultsModel'
    ],
    xtype: 'claimDetailSearchResults',
    controller: 'claimSearchResultsController',
    itemId: 'claimDetailSearchResultsID',

    items: [{
        xtype: 'fieldset',
        title: 'Claim History',
        items: [{
            xtype: 'grid',
            
            height: 250,

            viewModel:{
                type: 'claimDetailSearchResultsModel'
            },
            bind: {
                store: '{claimsDetailResult}'
            },

            listeners: {
                rowclick: 'conditionalView'
            },       

            columns: [{
                text: 'Claim ID',
                dataIndex: 'claimID',
                flex: 1
            },{
                text: 'Member Name',
                dataIndex: 'memberName',
                flex: 1
            },{
                text: 'Status',
                dataIndex: 'status',
                flex: 1
            },{
                text: 'Claim Type',
                dataIndex: 'claimType',
                flex: 1
            },{
                text: 'LOB',
                dataIndex: 'lob',
                flex: 1
            }],

            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true
            }]
        }]
    }]
});