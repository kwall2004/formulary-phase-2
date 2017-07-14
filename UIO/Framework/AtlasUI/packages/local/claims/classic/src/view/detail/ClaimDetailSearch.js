/**
 * Created by b1343 on 5/20/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailSearch', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.form.Panel',
        'Atlas.claims.view.detail.ClaimDetailSearchResults',
        'Atlas.claims.view.detail.ClaimsAdvancedSearchForm'
    ],
    xtype: 'claimDetailSearch',
    title: { _tr: 'claimdetailstitle'},

    items: [{
        xtype: 'container',
        title: 'Claim Search',

        items: [{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Claim ID:',
                name: 'claimId',
                bind: {
                    fieldLabel: 'hi'
                },
                padding: 10
            },{
                xtype: 'textfield',
                fieldLabel: 'Member ID:',
                name: 'memberId',
                padding: 10
            },{
                xtype: 'button',
                text: 'Search',
                cls: 'claimdetail_button'
            },{
                xtype: 'button',
                cls: 'claimdetail_advSearch',
                baseCls: 'none',
                text: 'Advanced Search',
                listeners: {
                    click: {
                        fn: function(){ 
                            //Ext.getBody().mask();
                            Ext.create('Ext.window.Window', {
                                title: 'Claims Advanced Search',
                                height: '75%',
                                width: '75%',
                                layout: 'fit',
                                modal: true,
                                beforeclose: Ext.getBody().unmask(),
                                items: [
                                {
                                    xtype: 'claimsAdvancedSearchForm'
                                }
                                ]
                            }).show(); 
                        }
                    }
                }
            }]
        },{
            xtype: 'claimDetailSearchResults'
        }]
    }]
});
