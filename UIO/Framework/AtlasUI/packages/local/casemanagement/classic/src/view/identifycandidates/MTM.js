/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/18/2016
* Origin: MERLIN - Case Management
* Description: Page for "MTM" Case Type
 * Changes Made on: 11/17/2016  by s6303 - Refactor the screen
**/

Ext.define('Atlas.caseManagement.view.identifycandidates.MTM', {
    extend: 'Ext.form.Panel',
    alias: 'widget.casemanagement-identifyCandidatesMTM',
    title: 'MTM Case Type' ,
    autoScroll: true,
    overflow:'scroll',
    items: [
    {
        layout: 'column',
        defaults: {
            xtype: 'container',
            layout: 'anchor',
            columnWidth: 0.4,
            autoScroll:true,
            margin: 5,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                labelWidth: 250
            }
        },

        items: [
            {
                items: [
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Service Date From',
                        name:'MTMFromDate',
                        itemId: 'MTMFromDate',
                        format : 'm/d/Y',
                        allowBlank: false,
                        listeners: {
                            focusleave: 'onLeaveDate',
                            select: 'validateDateRange'
                        }
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Service Date To',
                        format : 'm/d/Y',
                        name:'MTMToDate',
                        itemId: 'MTMToDate',
                        allowBlank: false,
                        listeners: {
                            focusleave: 'onLeaveDate',
                            select: 'validateDateRange'
                        }
                    },
                    {
                         xtype:'plangrouptypeahead',
                         fieldLabel:'Plan Group',
                         name:'plangroupname',
                         emptyText:'[e.g. MHP Medicare 2011]',
                         allowBlank: false
                     }
                ]
            },
            {
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '# of Part D drugs filled',
                        name:'noOfDrugsFilled',
                        maskRe: /[0-9]/,
                        maxLength:2,
                        enableKeyEvents: true,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        enforceMaxLength: 2
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '# of qualifying diseases',
                        name:'noOfQualifying',
                        maskRe: /[0-9]/,
                        maxLength:2,
                        enableKeyEvents: true,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        enforceMaxLength: 2
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Min. Amount of TDS',
                        name:'minAmountTDS',
                        maskRe: /[0-9]/,
                        maxLength:6,
                        enableKeyEvents: true,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        enforceMaxLength: 6

                    }
                ]
            },
            {
                items: [
                    {
                        xtype: 'checkboxfield',
                        fieldLabel: 'Include currently active members',
                        name:'includeActiveChk',
                        listeners: {
                            change: 'onIncludeActiveChanged'
                        }
                    },

                    {
                        xtype: 'checkboxfield',
                        fieldLabel: 'Include members with existing cases',
                        name:'includeExistingChk'
                    }
                ]
            }
            ,
            {
                items: [
                    {
                        xtype:'combobox',
                        name: 'cbActiveType',
                        fieldLabel: 'Include Type',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        bind:
                        {
                            store: '{StoreIncludeType}',
                            disabled: '{!isIncludeActive}'

                        },
                        forceSelection:true

                    }
                ]
            }
        ]
    }
        ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    text: 'Submit Job',
                    handler: 'btnSearch_click',
                    itemId: 'btnSearch'
                },
                {
                    xtype: 'button',
                    text: 'Reset',
                    iconCls: 'x-action-col-icon x-fa fa-undo',
                    handler: 'ResetClick',
                    itemId: 'btnReset'
                }
            ]
        }]
});