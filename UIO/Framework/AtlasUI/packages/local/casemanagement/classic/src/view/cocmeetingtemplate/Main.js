/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/15/2016
* Origin: MERLIN - Case Management
* Description: Main page for the COC Meeting Template page
**/

Ext.define('Atlas.casemanagement.view.cocmeetingtemplate.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCOCMeetingTemplateMain',
    title: 'COC Meeting Template',

    items: [{
        xtype: 'panel',
        title: 'Care Coordination Team Meetings',

        items: [{
            xtype: 'container',
            layout: 'hbox',

            items: [{
                xtype: 'combo',
                fieldLabel: 'State Info'
            },{
                xtype: 'textfield',
                fieldLabel: 'Member ID'
            },{
                xtype: 'datefield',
                fieldLabel: 'From'
            },{
                xtype: 'datefield',
                fieldLabel: 'To'
            },{
                xtype: 'button',
                iconCls: 'fa fa-search',
                text: 'Search'
            },{
                xtype: 'button',
                iconCls: 'fa fa-repeat',
                text: 'Reset'
            }]
        },{
            xtype: 'panel',
            title: 'Member Info',
            frame: true,

            items: [{
                xtype: 'container',
                layout: 'hbox',

                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Care Coordinator\'s Name'
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Date of Presentation'
                }]
            },{
                xtype: 'container',
                layout: 'hbox',

                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Member ID'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'PCP'
                }]
            },{
                xtype: 'container',
                layout: 'hbox',

                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Member Name'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'BMI'
                }]
            },{
                xtype: 'container',
                layout: 'hbox',

                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'County'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Follow up Date'
                }]
            },{
                xtype: 'displayfield',
                fieldLabel: 'Age'
            },{
                xtype: 'displayfield',
                fieldLabel: 'HRA Completed Date'
            }]
        },{
            xtype: 'COCMeetingTemplateAccordion'
        }]
    }]
});