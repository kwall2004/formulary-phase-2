/**
 * Created by j2487 on 11/1/2016.
 */
Ext.define('Atlas.member.view.MTMController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mtmcontroller',
    recpId:'',
    init: function () {

        var parentViewModel = this.getView().up('panel').getViewModel();
        var recipientID = parentViewModel.recipientID;
        this.recpId = recipientID;
        this.loadCases(recipientID);
    },
    listen:{
        controller:{
            'member': {
                MemberChange: 'RefreshCases'
            }
        }

    },
    RefreshCases:function(recipientID,parentPanelId)
    {
        if(this.getView().up().id == parentPanelId) {

            this.loadCases(recipientID);
        }
    },

    loadCases:function(recipientID)
    {
        var view = this.getView();
        // var actTab = view.up('[reference = workspaceTabs]').getActiveTab();

        var ViewModel = this.getViewModel();
        var mtmcasestore = ViewModel.getStore('mtmcasestore'),
            where = 'RecipientId =' + recipientID;
        mtmcasestore.getProxy().setExtraParam('pWhere', where);
        mtmcasestore.getProxy().setExtraParam('ipcDirection', 'FWD');
        mtmcasestore.getProxy().setExtraParam('ipcBckRecPointer', '');
        mtmcasestore.getProxy().setExtraParam('ipcFwdRecPointer', '');
        mtmcasestore.getProxy().setExtraParam('pBatchSize', 0);
        mtmcasestore.getProxy().setExtraParam('ipiJumpStart', 0);
        mtmcasestore.load({
            scope: this,
            failure: function (record, operation) {
                //do something if the load failed
            },
            success: function (record, operation) {

            },
            callback: function (record, operation, success) {


            }
        });
    },
    getAllContactLog:function () {

        var view = this.getView();
        var vm = this.getViewModel();
        var parentViewModel = this.getView().up('panel').getViewModel();
        var masterRec = parentViewModel.get('masterrecord');
        var ContactLogWin =  Ext.create('Ext.window.Window',{
            title:'Competing Products',modal: true,
            closable: true,
            scrollable:false,height:'37%',width:'40%',
            title:'All Contact Log',
            layout:'vbox',itemId:'winContact',
            items:[
                {
                    xtype:'displayfield',fieldLabel:'Member Name',itemId:'mbrName'
                },
                {
                    xtype:'textarea',fieldLabel:'Contact Log',itemId:'txtArea',height:300,width:600
                }
            ],
            dockedItems:[{
                xtype:'toolbar',dock:'bottom',
                items:['->',{xtype:'button',text:'Cancel',handler:'onCancelClick'}]
            }]
        });
        view.add(ContactLogWin);
        ContactLogWin.show();
        var stTemp = '';

        var contactlogstore =  vm.getStore('contactlogstore'),
            RecipientId = this.recpId,
            where = " recipientId = " + RecipientId + " and MTMID NE 0 ",
            sort = 'callDateTime DESC' ;
        contactlogstore.getProxy().setExtraParam('pWhere',where);
        contactlogstore.getProxy().setExtraParam('pSort',sort);
        contactlogstore.getProxy().setExtraParam('pBatchSize',0);
        contactlogstore.getProxy().setExtraParam('pRowNum',0);
        contactlogstore.getProxy().setExtraParam('pDBRowID',"");
        contactlogstore.load({
            scope:this,
            failure: function (record, operation) {
                //do something if the load failed
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {


                if (record.length == 0){return;}
                for(var i = 0; i <record.length;i++)
                {
                    stTemp += record[i].data.contactUser + " - ";
                    if(!record[i].data.callDateTime)
                    stTemp += Ext.Date.format(record[i].data.callDateTime,'m/d/Y H:i:s') + "- (" + record[i].data.MTMCaseDesc + ") - ";
                    else {
                        stTemp += Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() ,'m/d/Y H:i:s') + "- (" + record[i].data.MTMCaseDesc + ") - ";
                    }
                    stTemp += record[i].data.subject + " - " + record[i].data.Reason1;
                    stTemp += ("  " + record[i].data.Reason2 + " - " + record[i].data.description);
                    stTemp += "\r\n\n";

                }
                this.getView().down('#txtArea').setValue(stTemp);
            }
        });

        //this.getView().down('#mbrName').setValue(masterRec.get('MemberName'));
        this.getView().down('#mbrName').setValue(masterRec.MemberName);

    },
    onCancelClick:function () {
        this.getView().down('#winContact').close();

    },
    onCancelMTMClick:function () {
        this.getView().down('#winMTMContact').close();
    },
    btnDisplayCase:function (grid,rowIndex,colIndex) {
        var me = this,
            vm = me.getViewModel(),
            myParent = vm.getParent(),
            rec = grid.getStore().getAt(rowIndex);
         var menuId = Atlas.common.Util.menuIdFromRoute('merlin/casemanagement/CaseInfo'),
            routeParams = menuId + '/' + rec.get('MTMId');

        me.fireEvent('openView','merlin','casemanagement','CaseInfo', {
            menuId: menuId,
            MTMId: rec.get('MTMId'),
            atlasId: rec.get('MTMId'),
            openView: true
        });
    },
    btnMTMCase:function (grid,rowIndex,colIndex) {
        var parentViewModel = this.getView().up('panel').getViewModel();
        var masterRec = parentViewModel.get('masterrecord');
        var rec = grid.getStore().getAt(rowIndex);
        var view = this.getView();
        var vm = this.getViewModel();
        var MTMContactLogWin =  Ext.create('Ext.window.Window',{
            title:'Competing Products',modal: true,
            closable: true,
            scrollable:true,height:'55%',width:'40%',
            title:'Contact Log',
            layout:'vbox',itemId:'winMTMContact',
            items: [
                {
                    xtype:'displayfield',fieldLabel:'Case ID',itemId:'caseId'
                },
                {
                    xtype:'displayfield',fieldLabel:'Case Description',itemId:'caseDesc'
                },
                {
                    xtype:'displayfield',fieldLabel:'Member Name',itemId:'mtmmbrName'
                },
                {
                    xtype:'textarea',fieldLabel:'Contact Log',itemId:'mtmtxtArea',height:300,width:600
                }
            ],
            dockedItems:[{
                xtype:'toolbar',dock:'bottom',
                items:['->',{xtype:'button',text:'Cancel',handler:'onCancelMTMClick'}]
            }]
        });
        view.add(MTMContactLogWin);
        MTMContactLogWin.show(); var stTemp = '';
        this.getView().down('#mtmmbrName').setValue(masterRec.MemberName);
        this.getView().down('#caseId').setValue(rec.get('MTMId'));
        this.getView().down('#caseDesc').setValue(rec.get('description'));
        var mtmcasecontactlogstore =  vm.getStore('mtmcasecontactlogstore');
        mtmcasecontactlogstore.getProxy().setExtraParam('pKeyValue',rec.get('MTMId'));
        mtmcasecontactlogstore.getProxy().setExtraParam('pKeyType','MTMID');
        mtmcasecontactlogstore.getProxy().setExtraParam('pStartDate',null);
        mtmcasecontactlogstore.getProxy().setExtraParam('pEndDate',null);
        mtmcasecontactlogstore.getProxy().setExtraParam('pBatchSize',0);
        mtmcasecontactlogstore.getProxy().setExtraParam('pDBRowID',0);
        mtmcasecontactlogstore.load({
            scope:this,
            failure: function (record, operation) {
                //do something if the load failed
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (record.length == 0){return;}
                for(var i = 0; i <record.length;i++)
                {
                    stTemp += record[i].data.contactUser + " - ";
                    stTemp += record[i].data.callDateTime + "- (" + record[i].data.MTMCaseDesc + ") - ";
                    stTemp += record[i].data.subject + " - " + record[i].data.Reason1;
                    stTemp += ("  " + record[i].data.Reason2 + " - " + record[i].data.description);
                    stTemp += "\n";

                }
                this.getView().down('#mtmtxtArea').setValue(stTemp);
            }
        });
    },
    btnExportClick:function()
    {
        var me = this,
            //theView = me.getView(),
            theViewModel = me.getViewModel(),
            ExportExcelStore = theViewModel.getStore('mtmcasestore');
        if(ExportExcelStore.data.length>0)
        Atlas.common.utility.Utilities.exportToExcel(ExportExcelStore);

    }
});
