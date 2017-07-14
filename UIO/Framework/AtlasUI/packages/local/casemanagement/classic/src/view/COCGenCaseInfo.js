/**
 * Created by mkorivi on 11/9/2016.
 */
Ext.define('Atlas.casemanagement.view.COCGenCaseInfo', {
    /*extend: 'Ext.form.Panel',*/
    extend: 'Ext.tab.Panel',
    reference:'COCTabPanelRef',
    xtype: 'COCGenCaseInfo',
    layout: 'border',
   items:[
       {
           xtype: 'panel',
           title: 'Consult Case Details',
           layout: {
               type: 'vbox',
               align: 'stretch'
           },
           items: [
               {
                   xtype: 'form',
                   region: 'center',
                   layout: {
                       type: 'hbox',
                       align: 'stretch'
                   },
                   autoScroll: true,
                   dockedItems: [
                       {
                           xtype: 'toolbar',
                           dock: 'top',
                           items: [
                               {
                                   xtype: 'displayfield',
                                   itemId: 'lblCaseManager',
                                   fieldLabel: 'Case Manager'

                               }, '|',
                               //{
                               //    xtype: 'label',
                               //    text: 'Case Status:'
                               //},
                               {
                                   xtype: 'displayfield',
                                   itemId: 'lblCaseStatus',
                                   fieldLabel: 'Case Status'
                               },
                               '->',
                               {
                                   xtype: 'button',
                                   text: 'Case Notes',
                                   itemId:'btnCaseNotes',
                                   handler:'Notes_Click',
                                   disabled: true,
                                   tooltip: 'Case Notes'
                               }
                           ]
                       },

                       {
                           xtype: 'toolbar',
                           dock: 'bottom',
                           items: [
                               '->',
                               {
                                   xtype: 'button',
                                   iconCls: 'x-fa fa-paper-plane-o',
                                   itemId: 'btnCloseCase',
                                   text: 'Close Case',
                                   disabled: true,
                                   handler:'CloseCaseClick',
                                   tooltip:'Close PH Consult Case'
                               },
                               {
                                   xtype: 'button',
                                   itemId: 'btnReassign',
                                   disabled:true,
                                   iconCls: 'x-fa fa-trash',
                                   text: 'Reassign Case',
                                   handler:'ReassignClick',
                                   tooltip:'Reassign PH Consult Case'
                               }
                           ]
                       }
                   ],
                    flex: 1.1,
                   items: [{
                       // left panel -----------------------------------------------------------------------------------
                       xtype: 'fieldset',
                       title:'PH Consult Case Information',
                       disabled: false,
                       autoScroll: true,
                       defaults: {
                           labelWidth: 195,
                           flex: 1,
                           minWidth: 400
                       },
                       items: [
                           // leftpanel content ---------------------------------------------------- //
                           {xtype: 'displayfield', name:'lbStartDate', itemId: 'lblStartDate',  fieldLabel: 'Start Date', renderer: Ext.util.Format.dateRenderer('m/d/Y')},
                           {xtype: 'displayfield', name:'lbEffDate', itemId: 'lblEffDate', fieldLabel: 'Eff. Date', renderer: Ext.util.Format.dateRenderer('m/d/Y')},
                           {xtype: 'displayfield', name:'lbTermDate', itemId: 'lblTermDate', fieldLabel: 'Term. Date', renderer: Ext.util.Format.dateRenderer('m/d/Y')},
                           {xtype: 'displayfield', name:'lbAcuityLevel1',itemId:'lblAcuityLevel1', fieldLabel: 'Acuity Level'},
                           {xtype: 'displayfield', name: 'lbStrat1', itemId:'lblStrat1', fieldLabel: 'Strat'},
                           {xtype: 'displayfield', name: 'lbClosedReason', itemId:'lblClosedReason', fieldLabel: 'Closed Reason'},
                           {xtype: 'displayfield', name: 'lbDescription', itemId:'lblDescription', fieldLabel: 'Description'},
                           {xtype: 'displayfield', name: 'lbReferralType', itemId:'lblReferralType', fieldLabel: 'Referral Type'},
                           {xtype: 'displayfield', name: 'lbReferralSource', itemId:'lblReferralSource', fieldLabel: 'Referral Source'},
                           {xtype: 'displayfield', name: 'lbReferralReason', itemId:'lblReferralReason', fieldLabel: 'Referral Reason'}
                       ]
                   },
                       { //start right panel -----------------------------------------------------------------------------------------------------
                           xtype: 'fieldset',
                           autoScroll: true,
                           title: 'Coordinated Care Information',
                           disabled: false,
                           defaults: {
                               labelWidth: 195,
                               flex: 1,
                               minWidth: 400
                           },
                           items: [
                               {xtype: 'displayfield', name:'lblEffDate2', itemId: 'lblEffDate2',  fieldLabel: 'Eff. Date',  renderer: Ext.util.Format.dateRenderer('m/d/Y')},
                               {xtype: 'displayfield', name:'lblCoordinator', itemId: 'lblCoordinator', fieldLabel: 'Coordinator'},
                               {xtype: 'displayfield', name:'lblStrat2', itemId: 'lblStrat2', fieldLabel: 'Strat'},
                               {xtype: 'displayfield', name: 'lblAcuityLevel2', itemId:'lblAcuityLevel2', fieldLabel: 'Acuity Level'}


                           ]
                       }
                   ]
               },
               {
                   xtype: 'panel',
                   autoScroll: true,
                   bodyPadding: 0,
                   region: 'south',
                   flex: .9,
                   layout: {
                       type: 'vbox',
                       align: 'stretch',
                       pack: 'start'
                   },
                   items: [{
                       xtype: 'grid',
                       width: '100%',
                       border: true,
                       flex: 1,
                       overflowY: 'scroll',
                       title: 'Case Alerts',
                       bind: {
                           store: '{StoreCOCAlerts}'
                       },

                       columns: {
                           defaults: {
                               flex: 1
                           },
                           items: [
                               {text: 'Alert Type', dataIndex: 'alertType', width: 200},
                               {text: 'Alert Description', dataIndex: 'alertDescription'},
                               {text: 'Create User', dataIndex: 'createUser'},
                               {
                                   text: 'Create Date/Time',
                                   dataIndex: 'createDate',
                                   format: 'm/d/Y',
                                   xtype: 'datecolumn'
                               },
                               {
                                   text: 'Complete User',
                                   dataIndex: 'completeUser'

                               },
                               {
                                   text: 'Complete Date',
                                   dataIndex: 'completeDate',
                                   format: 'm/d/Y',
                                   xtype: 'datecolumn'
                               },
                               {
                                   text: 'Medication Alert',
                                   xtype: 'actioncolumn',
                                   itemId: 'medAlert',
                                   hideable: false,
                                   iconCls: 'x-fa fa-arrow-circle-right',
                                   width: 40,
                                   items:[{
                                       isDisabled: function(grid, rowIndex, colIndex, items, rec) {
                                           var flagDisabled = true;
                                           var alertType = rec.get("alertType");
                                           var alertdesc = rec.get("alertDescription");
                                           var completeDateTime = rec.get("completeDate");
                                           var completeUser = rec.get('completeUser');

                                           if (alertType == "RX" && alertdesc == "Medication Discrepancy") {
                                               if (completeDateTime == '' || completeDateTime == null || completeDateTime == 'undefined'
                                                   || completeUser == '' || completeUser == null || completeUser == 'undefined') {
                                                   flagDisabled =  false;
                                               }
                                           }
                                           return flagDisabled;
                                       }
                                   }],
                                   handler: 'GetMedicationAlert'
                               }

                           ]
                       },
                       dockedItems: [
                           {
                               xtype: 'pagingtoolbar',
                               bind: '{StoreCOCAlerts}',
                               displayInfo: true,
                               dock: 'bottom'
                           }
                       ]
                   }]

               }
           ]
       }
   ]
});