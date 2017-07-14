/**
 * Created by agupta on 10/6/2016.
 */
Ext.define('Atlas.common.view.sharedviews.NCPDPErrorCodeCombo', {
    extend: 'Ext.panel.Panel',
    xtype:'ncpdperrorcodecombo',
    viewModel: 'ncpdperrorcodeviewmodel',
    items : [
        {
            xtype : 'textfield',
            itemId : 'txtRejectionCodes',
            width : '99%',
            bind: '{selectedValues.value}'
        },
        {
            xtype: 'tagfield',
            itemId:'tagcontrol',
            bind: {
                store:'{storencpdperrorcodes}'
            },
            width : '100%',
            reference: 'selectedValues',
            publishes: 'value',
            typeAhead: false,
            hideTrigger:false,
            displayField: 'Name',
            valueField: 'Id',
            queryMode: 'local',
            forceSelection: false,
            triggerOnClick: false,
            createNewOnEnter: true
        }
    ]
});