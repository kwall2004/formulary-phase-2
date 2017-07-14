/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 7/18/2016
 * Origin: MERLIN - Case Management
 * Description: Page for "MAP" Case Type
 * * Changes Made on: 11/17/2016  by s6303 - Refactor the screen
 **/

Ext.define('Atlas.casemanagement.view.identifycandidates.MAP', {
    extend: 'Ext.form.Panel',
    alias: 'widget.casemanagement-identifyCandidatesMAP',
    title: 'MAP Case Type',
    autoScroll: true,
    overflow:'scroll',
    items: [
        {
            layout: 'column',
            defaults: {
                xtype: 'container',
                layout: 'anchor',
                columnWidth: 0.3,
                autoScroll:true,
                margin: 5,
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    labelWidth: 150
                }
            },

            items: [
                {
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Service Date From',
                            name: 'MAPFromDate',
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
                            name: 'MAPToDate',
                            format : 'm/d/Y',
                            fieldLabel: 'Service Date To',
                            allowBlank: false,
                            itemId: 'MTMToDate',
                            listeners: {
                                focusleave: 'onLeaveDate',
                                select: 'validateDateRange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'MPR%',
                            name: 'MAPMPRPercent',
                            maskRe: /[0-9]/,
                            maxLength:3,
                            value:'80',
                            allowBlank: false,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 3
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'etctypeahead',
                            name: 'MAPETC',
                            itemId: 'cbxETC',
                            fieldLabel: 'ETC',
                            displayField: 'ETC_NAME',
                            valueField: 'ETC_ID',
                            typeAhead: false,
                            allowBlank: false,
                            loadingText: 'Searching...',
                            emptyText: '[e.g. Analgesics]',
                            listWidth: '500',
                            width: 450
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: 'Maintenance Drug',
                            name: 'MAPMaintenanceDrug'
                        }

                    ]
                },
                {
                    items: [
                        {
                            xtype: 'radiogroup',
                            columns: 1,
                            vertical: true,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'radio',
                                            boxLabel: 'Member',
                                            name: 'rb',
                                            checked:true,
                                            inputValue: '1',
                                            itemId:'rdMember'
                                        },
                                        {
                                            xtype: 'splitter'
                                        },
                                        {
                                            xtype: 'membertypeahead',
                                            name: 'MAPMember',
                                            itemId:'cbxMember'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radio',
                                            boxLabel: 'Member File Upload',
                                            name: 'rb',
                                            itemId:'rbMemberFileUpload',
                                            inputValue: '2'
                                        },
                                        {
                                            xtype: 'splitter'
                                        },
                                        /* {
                                         xtype: 'filefield',
                                         reference: 'fileUpload',
                                         name: 'memberFileUpload',
                                         emptyText: 'Select a file',
                                         regex: new RegExp('\.(xlsx)|(xls)$'),
                                         regexText: 'Only Excel files are allowed.',
                                         buttonText: '',
                                         buttonConfig: {
                                         iconCls: 'x-fa fa-upload'
                                         }
                                         },*/
                                        {
                                            xtype: 'merlin.fileuploader',
                                            name: 'memberFileUpload',
                                            layout: 'fit',
                                            keyType: 'faxImage',
                                            fileType: 'pdf,xls,xlsx',
                                            endpoint: 'shared/rx/document/update'
                                        }

                                    ]
                                }

                            ]
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
                },
                '->',
                {
                    xtype:'button',text:'Plan Groups', itemId:'btnPlanGroups',width:150,
                    listeners: {
                        mouseover: function () {
                            var planGroupName= this.up().up().down('#hdnPlanGroups').getValue();
                            Ext.create('Ext.tip.ToolTip', {
                                width:600,
                                height:700,
                                title: 'Plan Groups',
                                autoHide: false,
                                closable: true,
                                target: this.el,
                                html: planGroupName,
                                autoShow: true,
                                autoScroll: true,
                                dismissDelay: 10000
                            });
                        }
                    }
                },
                {
                    xtype: 'hidden', itemId: 'hdnPlanGroups'
                },
                {
                    xtype: 'hidden', itemId: 'hdnDocumentId'
                }
            ]
        }]

});