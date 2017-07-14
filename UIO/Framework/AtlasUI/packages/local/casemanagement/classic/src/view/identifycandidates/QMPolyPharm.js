/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 7/18/2016
 * Origin: MERLIN - Case Management
 * Description: Page for "QM - PolyPharm" Case Type
 * * Changes Made on: 11/17/2016  by s6303 - Refactor the screen
 **/

Ext.define('Atlas.caseManagement.view.identifycandidates.QMPolyPharm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.casemanagement-identifyCandidatesQMPolyPharm',
    title: 'QM - PolyPharm Case Type',
    autoScroll: true,
    overflow:'scroll',
    items: [
        {
            layout: 'column',
            defaults: {
                xtype: 'container',
                layout: 'anchor',
                columnWidth: 0.5,
                margin: 5,
                autoScroll:true,
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
                            name:'QMPolyPharmFromDate',
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
                            name:'QMPolyPharmToDate',
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
                            fieldLabel: '# of Part D drugs filled',
                            maskRe: /[0-9]/,
                            maxLength:2,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 2,
                            name:'noOfDrugsFilledQMPolyPharm'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '# of Prescribers',
                            name:'noOfPrescribersQMPolyPharm',
                            maskRe: /[0-9]/,
                            maxLength:2,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 2
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