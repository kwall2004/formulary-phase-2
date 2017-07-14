/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Member Demographics - Print Options
 * Description: Gives users a place to view Print Options
 */
Ext.define('Atlas.portals.view.provider.MemberPrintOptionsDialog', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsMemberPrintOptionsDialog',
  //  title: 'Print Member Report ',
    controller: 'memberprintoptionscontroller',

    items:[{
        xtype:'container',
        layout: 'vbox',
        defaults: {
            style: { padding: '5px' }
        },
        items:[{
            xtype: 'displayfield',
            fieldLabel: 'Include'
        },{
            boxLabel: 'Family Members',
            xtype:'checkboxfield',
            name: 'familyMembers',
            reference: 'familyMembers',
            listeners: {
                change: 'onFamilyMembersClick'
            }
        },{
            boxLabel: 'Eligibility History',
            xtype:'checkboxfield',
            name: 'eligibilityHistory',
            reference: 'eligibilityHistory',
            listeners: {
                change: 'onEligibilityHistoryClick'
            }
        },{
            boxLabel: 'HEDIS',
            xtype:'checkboxfield',
            name: 'hedis',
            reference: 'hedis',
            listeners: {
                change: 'onHedisClick'
            }
        },{
            boxLabel: 'Member Profile',
            xtype:'checkboxfield',
            name: 'memberProfile',
            reference: 'memberProfile',
            listeners: {
                change: 'onMemberProfileClick'
            }
        },{
            xtype:'container',
            layout:'hbox',
            items:[{
                boxLabel: 'Print HRA Summary',
                xtype:'checkboxfield',
                name: 'printHraSummary',
                reference: 'printHraSummary',
                listeners: {
                    change: 'onPrintHraSummaryClick'
                }
            },{
                boxLabel: 'Six-Month Pharmacy Detail',
                xtype:'checkboxfield',
                name: 'pharmacyDetail',
                reference: 'pharmacyDetail',
                listeners: {
                    change: 'onPharmacyDetailClick'
                },
                style: { padding: '0 0 0 20px' }
            }]
        }
        ]
    },{
        xtype: 'toolbar',

        items: ['->',{
            xtype: 'button',
            text: 'Ok',
            handler: 'onOkClick'
        },{
            xtype: 'button',
            text: 'Cancel',
            handler: function () {
                this.up('window').close();
            }
        },'->']
    }]
});