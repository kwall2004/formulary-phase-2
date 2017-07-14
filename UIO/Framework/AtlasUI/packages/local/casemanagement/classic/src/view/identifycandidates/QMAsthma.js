/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 7/18/2016
 * Origin: MERLIN - Case Management
 * Description: Page for "QM - Asthma" Case Type
 * * Changes Made on: 11/17/2016  by s6303 - Refactor the screen
 **/

Ext.define('Atlas.caseManagement.view.identifycandidates.QMAsthma', {
    extend: 'Ext.form.Panel',
    alias: 'widget.casemanagement-identifyCandidatesQMAsthma',
    title: 'QM - Asthma Case Type',
    autoScroll: true,
    overflow:'scroll',
    items: [
        {
            layout: 'column',
            defaults: {
                xtype: 'container',
                layout: 'anchor',
                autoScroll:true,
                columnWidth: 0.5,
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
                            name:'QMAsthmaFromDate',
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
                            name:'QMAsthmaToDate',
                            itemId: 'MTMToDate',
                            format : 'm/d/Y',
                            allowBlank: false,
                            listeners: {
                                focusleave: 'onLeaveDate',
                                select: 'validateDateRange'
                            }
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '# Short Acting Inhalers',
                            maskRe: /[0-9]/,
                            maxLength:2,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 2,
                            name:'noOfShortActingQMAsthma'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Short Acting Inhalers ETC',
                            name:'noOfShortActingETC',
                            value:'5970',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Long Acting Inhalers ETC',
                            name:'noOfLongActingETC',
                            value:'371,3719',
                            allowBlank: false

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