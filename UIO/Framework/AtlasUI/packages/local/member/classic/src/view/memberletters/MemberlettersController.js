/**
 * Created by T4317 on 7/28/2016.
 * Controller for Member-->Menu-Letters screen
 */
Ext.define('Atlas.member.view.memberletters.MemberlettersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberletters',

    init: function(){

        var parentViewModel = this.getView().up('panel').getViewModel();
        var recipientID = parentViewModel.recipientID;
        this.loadLetter(recipientID);
    },
    listen:{
        controller:{
            'member': {
                MemberChange: 'RefreshLetter'
            }
        }

    },

    RefreshLetter: function (recipientID,parentPanelId) {
        if(this.getView().up().id == parentPanelId) {
            this.loadLetter(recipientID);
        }
    },

    loadLetter: function (recipientID,initial) {
        var view = this.getView();
        // var actTab = view.up('[reference = workspaceTabs]').getActiveTab();

        var ViewModel = this.getViewModel();
        var memberlettersstore = ViewModel.getStore('memberlettersstore');
        memberlettersstore.getProxy().setExtraParam('pRecipientId', recipientID);
        memberlettersstore.load();

        var memberplanstore = ViewModel.getStore('memberplanstore');
        memberplanstore.getProxy().setExtraParam('pRecipientId', recipientID);
        memberplanstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                ViewModel.set('memberplan', record)
            }

        });

    },


    onPrescSelect:function(combo,record){
        var view = this.getView();
        var vm = this.getViewModel();
        var fax = record.get('locfax');
        view.down('#txtPresc').setValue(record.get('fullname'));
        vm.set('prescriberrecord',record);
        view.down('#txtFax').setValue(Atlas.common.Util.formatfax(record.get('locfax')));
    },
    onDrugSelect:function (combo,record) {
        //debugger;
        var vm = this.getViewModel();
        vm.set('drugrecord',record);
    },
    PreviewFax:function () {
        //debugger;
        var view = this.getView();
        var vm = this.getViewModel();
        var PrescriberId = vm.get('prescriberrecord').get('npi') ;
        var faxNumber = vm.get('prescriberrecord').get('locfax');
        var message = view.down('#txtNotes').getValue();
        var parentViewModel = this.getView().up('panel').getViewModel();
        var recipientID = parentViewModel.recipientID;
        var PlangroupId = vm.get('memberplan')[0].get('planGroupId');
        var NDC = vm.get('drugrecord').get('NDC');
        if(faxNumber == '' || NDC == '' || PrescriberId == ''){return;}
        var programType = '';
        var pParameters = PrescriberId + "|" + "MeridianRx" + "|" + faxNumber + "|" +  Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() ,'m/d/Y') + "|" + "" + "|" + "" + "|" + message + "|" + "" + "|" +
            recipientID + "|" + PlangroupId + "|" + PrescriberId + "|" + NDC;
        var description = 'Prior Auth Form',programName = 'ltrPAForm.p',parameters = pParameters,runMode = 1,programType,saveDoc = false;
        var documentInfo = Atlas.common.utility.Utilities.submitJobViewDoc(description, programName, parameters, runMode, programType, saveDoc, faxNumber);
        if (documentInfo.code == 0) Atlas.common.utility.Utilities.displayDocument(documentInfo.type, documentInfo.data);
        else{
            Ext.Msg.alert('PBM',documentInfo.message);
        }
    },
    SendFax:function () {
        //debugger;
        var view = this.getView();
        var vm = this.getViewModel();
        var PrescriberId = vm.get('prescriberrecord').get('npi') ;
        var faxNumber = vm.get('prescriberrecord').get('locfax');
        var message = view.down('#txtNotes').getValue();
        var parentViewModel = this.getView().up('panel').getViewModel();
        var recipientID = parentViewModel.recipientID;
        var PlangroupId = vm.get('memberplan')[0].get('planGroupId');
        var NDC = vm.get('drugrecord').get('NDC');
        if(faxNumber == '' || NDC == '' || PrescriberId == ''){return;}
        var programType = 'Report';
        var dtCodeList=[];
        var dtCode={};
        var ttContactReasonCode = {};
        var pParameters = PrescriberId + "|" + "MeridianRx" + "|" + faxNumber + "|" +  Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() ,'m/d/Y') + "|" + "" + "|" + "" + "|" + message + "|" + "" + "|" +
            recipientID + "|" + PlangroupId + "|" + PrescriberId + "|" + NDC;
        var description = 'Prior Auth Fax' + PrescriberId ,programName = 'ltrPAForm.p',parameters = pParameters,runMode = 1,programType,saveDoc = true;
        var documentInfo = Atlas.common.utility.Utilities.submitJobViewDoc(description, programName, parameters, runMode, programType, saveDoc, faxNumber);
        if (documentInfo.code == 0) {
            this.getViewModel().getStore('memberlettersstore').reload();
            var docId = documentInfo.ID;
            if (docId != 0) {
                var faxParameters = docId + '|';
                var faxObj = Atlas.common.utility.Utilities.submitJobViewDoc('Prior Auth Fax - ' + PrescriberId, 'faxDocument.p', faxParameters, runMode, 'Fax', true, faxNumber);
                dtCode.CodeType = "Reason1";
                dtCode.CodeValue = "P3";
                ttContactReasonCode.ttContactReasonCode = dtCodeList;
                var ContactLogfield = "updatedBy,callDateTime,recipientID,subject,callStatus,contactType,Contactuser,callDateTime,LastModifiedUser,updatedDatetime";
                var ContactLogValue = Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s') + "|" + recipientID + "|" + "Coverage Determination Request Form Faxed" + "|" + "C" + "|" + "F" + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s') + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s');
                var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                var extraParameters = {
                    pKeyValue: '0',
                    pKeyType: 'CaseNum',
                    pFieldList: ContactLogfield,
                    pFields: ContactLogValue,
                    ttContactReasonCode: ttContactReasonCode

                };
                var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/contactlogdata/update', null, [true], extraParameters,
                    saveAction, null);
                if (result.code == 0) {
                    this.setAttachmentList(docId,recipientID);
                    this.getView().down('#faxWindow').destroy();
                    Ext.Msg.alert('Success', 'PA Form has been faxed successfully. Please check your fax status in Job Queue. Job Number:' + faxObj.jobNumber);
                }
                else {
                    Ext.Msg.alert('Error', faxObj.message);
                }
            }
            else {
                Ext.Msg.alert('Error', 'Document not created');
            }
        }
        else{
                  Ext.Msg.alert('Error',documentInfo.message);
        }
    },
    setAttachmentList:function (docId,recipientID) {
        var saveAction = [{"Save": {"key": "pcKeyAction", "value": "A"}}];
        var extraParameters = {
            pcKeyType: 'RecipientID',
            pcKeyValue:recipientID,
            pcDocIDList:docId,
            pcPlanID:'HPM',
            pcDescrData:'Prior Auth Form'
        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], extraParameters,
            saveAction, null);
    },
    onRowDoubleClick:function(me , record , tr , rowIndex , e , eOpts){
        var me = this,
            vm = me.getViewModel(),
            myParent = vm.getParent(),
            menuId;
        if(record.data.LetterCategory == 'G')
        {
            if(record.data.letterName =='COBC')
            {

                  var recipientID = myParent.recipientID;
                  menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberCOBC');
                 /*  var menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
                    node =  menuItems.findNode('route', 'merlin/member/MemberCOBC'),
                    client = me.getView().atlasClient,
                    route = node.get('route') || node.get('routeId'),
                    parentMenuId = node.get('parentMenuID'),
                    menuId = node.get('menuID'),
                    menuTitle = node.get('menuTitle'),
                    routeParams = menuId + '/' + recipientID;*/

                me.fireEvent('openView','merlin','member','MemberCOBC', {
                    ID: menuId,
                    menuId: menuId,
                    RecipientID:recipientID,
                    keyValue: '0',
                    openView: true
                });
            }
            else{
                menuId = Atlas.common.Util.menuIdFromRoute('merlin/letter/CreateEditLetter');
                  /* var menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
                    node =  menuItems.findNode('route', 'merlin/letter/CreateEditLetter'),
                    client = me.getView().atlasClient,
                    route = node.get('route') || node.get('routeId'),
                    parentMenuId = node.get('parentMenuID'),
                    menuId = node.get('menuID'),
                    menuTitle = node.get('menuTitle'),
                    routeParams = menuId + '/' + record.data.LetterID + '/' + record.data.letterName + '/' + record.data.letterType;*/

                me.fireEvent('openView','merlin','letter','CreateEditLetter', {
                    ID: menuId,
                    menuId: menuId,
                    LetterID: record.data.LetterID,
                    LetterType: record.data.letterType,
                    LetterName:record.data.letterName,
                    keyValue: '0',
                    openView: true
                });
            }
        }
        else if(record.data.LetterCategory == 'A'){
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain');
          /*  var menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
                node =  menuItems.findNode('route', 'merlin/authorization/cdag_CDAGMain'),
                client = me.getView().atlasClient,
                route = node.get('route') || node.get('routeId'),
                parentMenuId = node.get('parentMenuID'),
                menuId = node.get('menuID'),
                menuTitle = node.get('menuTitle'),
                routeParams = menuId + '/' + record.data.authID;*/
            me.fireEvent('openView','merlin','authorization','cdag_CDAGMain', {
                menuId: menuId,
                atlasId : record.data.authID,
                activeTab: 3

            });
        }
    },
    /**
     * Called when the view is created
     */
    openSendFaxDialog: function() {
        var view = this.getView();
        var faxWindow =     Ext.create('Ext.window.Window', {
            itemId: 'faxWindow',
            height:'35%',width:'30%',
            xtype:'panel',
            defaults: {
                labelWidth: 165
            },
            title:'Fax Form',
            items: [
                {
                    xtype:'combobox',disabled:true,itemId:'cbxMember',
                    fieldLabel:'Plan Group', bind:{store:'{memberplanstore}',value:'{planGroupName}'}, displayField: 'planGroupName', valueField: 'planGroupId'
                },
                {
                    xtype:'prescribertypeahead',itemId:'txtPresc',listeners:{select:'onPrescSelect'},
                    fieldLabel:'Prescriber',
                    emptyText: '[e.g. Dr. Smith]',allowBlank:false
                },
                {
                    xtype:'drugtypeahead',itemId:'txtDrug',listeners:{select:'onDrugSelect'},
                    fieldLabel:'Medication',
                    emptyText: '[e.g. Nexium]',/*matchFieldWidth: true, */allowBlank:false
                },
                {
                    xtype:'textfield',
                    itemId:'txtFax',
                    fieldLabel:'Prescriber Fax #',
                    emptyText:'xxx-xxx-xxx',
                    allowBlank:false,
                    enableKeyEvents: true,
                    listeners:{
                        keyup:function(e) {
                            var val = e.rawValue;
                            this.setValue(Atlas.common.Util.formatfax(val));
                        }
                    }
                },
                {
                    xtype:'textarea',itemId:'txtNotes',
                    fieldLabel:'Notes For Coverage Page'
                }
            ],
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'bottom',
                    items:['->',{
                        xtype:'button',
                        text:'Preview',handler:'PreviewFax',itemId:'btnPreview'
                    },{
                        xtype:'button',
                        text:'Send Fax',handler:'SendFax',itemId:'btnSendFax'
                    },{
                        xtype:'button',
                        text:'Cancel',
                        handler: function() {
                            this.up().up().destroy();
                        }
                    }]
                }
            ]
        });
        var obj =  view.add(faxWindow);
        obj.show();
    }
});