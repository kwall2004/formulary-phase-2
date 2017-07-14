/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 7/18/2016
 * Origin: MERLIN - Case Management
 * Description: Page for "QM - High Risk" Case Type
 * * Changes Made on: 11/17/2016  by s6303 - Refactor the screen
 **/

Ext.define('Atlas.caseManagement.view.identifycandidates.QMHighRisk', {
    extend: 'Ext.form.Panel',
    alias: 'widget.casemanagement-identifyCandidatesQMHighRisk',
    title: 'QM - High Risk Case Type',
    autoScroll: true,
    overflow:'scroll',
    items: [
        {
            layout: 'column',
            defaults: {
                xtype: 'container',
                layout: 'anchor',
                columnWidth: 0.5,
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
                            name:'QMHighRiskFromDate',
                            format : 'm/d/Y',
                            itemId: 'MTMFromDate',
                            allowBlank: false,
                            listeners: {
                                focusleave: 'onLeaveDate',
                                select: 'validateDateRange'
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Service Date To',
                            name:'QMHighRiskToDate',
                            format : 'm/d/Y',
                            itemId: 'MTMToDate',
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
                            fieldLabel: '# TDS Over',
                            name:'noOfTDSOver',
                            maskRe: /[0-9]/
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