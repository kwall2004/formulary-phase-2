Ext.define('Atlas.pharmacy.view.CredentialingWorkQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.credentialingworkqueuecontroller',

    init: function () {
        console.log('---- CredentialingWorkQueueController.init --- ');
        var vm, vw, me;
        me = this;
        vw = me.getView();
        vm = me.getViewModel();
        me.loadMainStore();
        vm.data.panelToShowOnLoad = vm.data.addOnsReceivedPnl;
    },
    loadMainStore: function (screenIndex) {
        var vm, vw, me;
        me = this;
        vw = me.getView();
        vm = me.getViewModel();

        //vw.loadMask(true);

        var bigStore = vm.getStore('pharmcredqueues');
        bigStore.on({
            scope: me,
            single: true,
            load: 'onLoadMainStore'
        });
        bigStore.load();
    },
    onLoadMainStore: function (store, records, success, operation, opts) {

        var objResp = Ext.decode(operation.getResponse().responseText);
        var metadataList = [];
        metadataList = objResp.metadata;
        this.loadAccordionPanelItems(metadataList);
    },
    loadAccordionPanelItems: function (metadataList) {

        var vm, addOnsReceivedStore;
        var vw, me;
        me = this;
        vw = me.getView();
        vm = me.getViewModel();
         var recCreddata =[], lettersdata =[], InProcdata =[], Intialdata =[], addOndata =[], missData =[], veridata = [], signdata =[],execdata =[], findata =[];
        var refs = me.getReferences();

        addOndata = metadataList.ttAddOnsQueue.ttAddOnsQueue;
        vm.getStore('addOnsReceived').proxy.data = addOndata;
        vm.getStore('addOnsReceived').load();
        vm.data.addOnsReceivedLbl = "Add Ons Received (" + addOndata.length + ")";

        Intialdata = metadataList.ttIntialCredQueue.ttIntialCredQueue;
        vm.getStore('initialReceived').proxy.data = Intialdata;
        vm.getStore('initialReceived').load();
        vm.data.initialReceivedLbl = "Initial Received (" + Intialdata.length + ")";

        InProcdata = metadataList.ttInProcessQueue.ttInProcessQueue;
        vm.getStore('inProcess').proxy.data = InProcdata;
        vm.getStore('inProcess').load();
        vm.data.inProcessLbl = "In Process ("  + InProcdata.length + ")";

        lettersdata = metadataList.ttLettersQueue.ttLettersQueue;
        vm.getStore('letters').proxy.data = lettersdata;
        vm.getStore('letters').load();
        vm.data.lettersLbl = "Letters (" + lettersdata.length + ")";

        recCreddata = metadataList.ttReCredQueue.ttReCredQueue;
        vm.getStore('reCredReceived').proxy.data = recCreddata;
        vm.getStore('reCredReceived').load();
        vm.data.reCredReceivedLbl = "ReCred Received (" + recCreddata.length + ")";

        missData = metadataList.ttMissingInfoQueue.ttMissingInfoQueue;
        vm.getStore('missingInfo').proxy.data = missData;
        vm.getStore('missingInfo').load();
        vm.data.missingInfoLbl = "Missing Info (" + missData.length + ")";

        veridata = metadataList.ttVerificationQueue.ttVerificationQueue;
        vm.getStore('verification').proxy.data = veridata;
        vm.getStore('verification').load();
        vm.data.verificationLbl = "Verification ("  + veridata.length + ")";

        signdata = metadataList.ttSignRequiredQueue.ttSignRequiredQueue;
        vm.getStore('signRequired').proxy.data = signdata;
        vm.getStore('signRequired').load();
        vm.data.signRequiredLbl = "Signature/Committee Approval (" + signdata.length + ")";

        execdata = metadataList.ttExecutiveSignQueue.ttExecutiveSignQueue;
        vm.getStore('executiveSign').proxy.data = execdata;
        vm.getStore('executiveSign').load();
        vm.data.executiveSignLbl = "Executive Signature ("+ execdata.length + ")";

        findata = metadataList.ttFinanceQueue.ttFinanceQueue;
        vm.getStore('finance').proxy.data = findata;
        vm.getStore('finance').load();
        vm.data.financeLbl = "Finance (" + findata.length + ")";


        var credentilingListContainer = this.getView().down('[reference=accordianpanel]');

        credentilingListContainer.removeAll();

        //if (vm.getStore('addOnsReceived').getCount()>0) {
            credentilingListContainer.add({
                xtype: 'credworkqueue-addonsrecieved'
            });
        //}


        //if (vm.getStore('initialReceived').getCount()>0) {
            credentilingListContainer.add({
                xtype: 'credworkqueue-initialrecieved'
            });

        //}

        //if (vm.getStore('inProcess').getCount()>0) {
            credentilingListContainer.add({
                xtype: 'credworkqueue-inprocess'
            });

        //}

        //if (vm.getStore('letters').getCount()>0) {
            credentilingListContainer.add({
                xtype: 'credworkqueue-letters'
            });

        //}

        //if (vm.getStore('reCredReceived').getCount()>0) {
            credentilingListContainer.add({
                xtype: 'credworkqueue-recredrecieved'
            });

        //}
        //if (vm.getStore('missingInfo').getCount()>0) {
            credentilingListContainer.add({
                xtype: 'credworkqueue-missinginfo'
            });
        //}

        //if (vm.getStore('verification').getCount()>0) {
            credentilingListContainer.add({
                xtype: 'credworkqueue-verification'
            });
        //}

        //if (vm.getStore('signRequired').getCount()>0) {
            credentilingListContainer.add({
                xtype: 'credworkqueue-signrequired'
            });
        //}

        //if (vm.getStore('executiveSign').getCount()>0) {
            credentilingListContainer.add({
                xtype: 'credworkqueue-executivesign'
            });
        //}

        //if (vm.getStore('finance').getCount()>0) {
            credentilingListContainer.add({
                xtype: 'credworkqueue-finance'
            });
        //}

      //  me.assignPanelTitleCounts();
        me.showPanelByReference(vm.data.panelToShowOnLoad);
        me.showStoresWithNoRecords();

        //vw.loadMask(false);
    },
   /* assignPanelTitleCounts: function () {
        var vm, me;
        me = this;
        vm = me.getViewModel();

        vm.data.addOnsReceivedLbl = "Add Ons Received (" + vm.getStore('addOnsReceived').getCount() + ")";
        vm.data.initialReceivedLbl = "Initial Received (" + vm.getStore('initialReceived').getCount() + ")";
        vm.data.inProcessLbl = "In Process (" + vm.getStore('inProcess').getCount() + ")";
       // vm.data.lettersLbl = "Letters (" + vm.getStore('letters').getCount() + ")";
       // vm.data.reCredReceivedLbl = "ReCred Received (" + vm.getStore('reCredReceived').getCount() + ")";
        vm.data.missingInfoLbl = "Missing Info (" + vm.getStore('missingInfo').getCount() + ")";
        vm.data.verificationLbl = "Verification (" + vm.getStore('verification').getCount() + ")";
        vm.data.signRequiredLbl = "Signaure/Committee Approval (" + vm.getStore('signRequired').getCount() + ")";
        vm.data.executiveSignLbl = "Executive Signature (" + vm.getStore('executiveSign').getCount() + ")";
        vm.data.financeLbl = "Finance (" + vm.getStore('finance').getCount() + ")";

    },*/
    onAcknowledgeClick: function (grid, rowIndex, scnIndex) {

        var vm, rowRec, rowRec, ackAction, myUser;
        var me = this;
        vm = this.getViewModel();
        rowRec = grid.getStore().getAt(rowIndex);

        // -----------------------
        // #1 Initialize Vars for Load
        // -----------------------
        ackAction = "Ack";

        Ext.MessageBox.show({
            title: 'Acknowledge Queue Item',
            msg: "Are you sure you would like to Acknowledge Credentialing Log Id '" + rowRec.data.credLogId + "' ?",
            buttons: Ext.MessageBox.OKCANCEL,
            callback: function (btn) {
                //user.portalPlanId = Ext.get('planListCombo').getValue();
                // stops the user from continuing before a plan is selected
                if (btn == 'cancel') {
                    console.log("-------------------------")
                    console.log("CANCEL DELETE")
                    console.log("-------------------------")
                    return;
                }
                else if (btn == 'ok') {
                    // ----------------------------------------
                    // #4 Convert Array to JSON without Leading "
                    // ----------------------------------------
                  //  debugger;
                    var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                    var extraParameters = {
                        'ttPharmCredMaster': {
                            'ttPharmCredMaster': {
                                "ncpdpid": "",
                                "RelationshipID": "",
                                "CredLogID": rowRec.data.credLogId,
                                "CredCreateDate":  null,
                                "CredCompleteDate" : null,
                                "ApplicationSource" : "",
                                "CredResult" : "",
                                "expectedReCredDate" : null,
                                "ReCredFileReceivedDate" : null,
                                "Comments" : "",
                                "Action" : ackAction,
                                "KeyType" : "",
                                "systemID" : null

                            }
                        }
                    }
                    var saveReturn = Atlas.common.utility.Utilities.saveData([{}], 'pharmacy/rx/pharmcredmaster/update', null, [true], extraParameters,
                        saveAction, null);
                    var retMessage = "";
                    if(saveReturn.code == 0)
                    {
                        retMessage = "Successfully Acknowledged!";
                        vm.data.panelToShowOnLoad = scnIndex;
                        me.loadMainStore();
                    }
                    else{

                       Ext.MessageBox.show({
                            title: 'PBM',
                            msg: saveReturn.message,
                            buttons: Ext.MessageBox.OK
                        });
                    }

                }
            }
        });


    },
    removeRecordFromGrid: function () {

    },
    assignPanelTitles: function () {

    },

    showPanelByReference: function(reftype) {

        var me = this, curPanel;

        //debugger;

        switch(reftype) {
            case 0:
                curPanel = me.lookupReference('credworkqueue-addonsrecieved');
                break;
            case 1:
                curPanel = me.lookupReference('credworkqueue-initialrecieved');
                break;
            case 2:
                curPanel = me.lookupReference('credworkqueue-inprocess');
                break;
            case 3:
                curPanel = me.lookupReference('credworkqueue-letters');
                break;
            case 4:
                curPanel = me.lookupReference('credworkqueue-recredrecieved');
                break;
            case 5:
                curPanel = me.lookupReference('credworkqueue-missinginfo');
                break;
            case 6:
                curPanel = me.lookupReference('credworkqueue-verification');
                break;
            case 7:
                curPanel = me.lookupReference('credworkqueue-signrequired');
                break;
            case 8:
                curPanel = me.lookupReference('credworkqueue-executivesign');
                break;
            case 9:
                curPanel = me.lookupReference('credworkqueue-finance');
                break;
            default:
                curPanel = me.lookupReference('credworkqueue-addonsrecieved');
        }
        curPanel.expand();
        curPanel.getStore().load();


    },
    convertObjectToJSONManually: function (object) {
        var dq = '"';
        var json = "{";
        var last = Object.keys(object).length;
        var count = 0;
        for (x in object) {
            json += dq + x + dq + ":" + dq + object[x] + dq;
            count++;
            if (count < last)
                json += ",";
        }
        json += "}";
        console.log(json);
        return json;
    },
    onRouteToPharmacyClick: function (grid, rowIndex) {
        var me = this,
            rowRec = grid.getStore().getAt(rowIndex);
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/credentialing_Credentialing');
          /*  var  menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
            node =  menuItems.findNode('route', 'merlin/pharmacy/credentialing_Credentialing'),
            client = me.getView().atlasClient,
            route = node.get('route') || node.get('routeId'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle');*/

        // -------------------
        // OLD WAY OF DOING IT;
        // -------------------
        //this.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
        //    isNCPDPPassedIn: true,
        //    inNCPDP: rowRec.data.NCPDPId
        //})

        // -------------------
        // NEW WAY OF DOING IT;
        // -------------------
        this.fireEvent('openView','merlin','pharmacy','credentialing_Credentialing',{
                      atlasId: rowRec.data.NCPDPId,
                      ncpdpId: rowRec.data.NCPDPId,
                      QueueRec: rowRec,
                      openView:true,
                      menuId: menuId,
                      title: 'Credentialing'


        }, null);


        //     text: 'open Pharmacy 2311239',
        //     handler: function () {
        //         var menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/Pharmacy'),
        //             id = 2311239;
        //         //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        //         me.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
        //             atlasId: id,
        //             ncpdpId: id,
        //             menuId: menuId
        //         }, null);
        //     }




    },
    onCredWorkQueueExportClick: function (gridPanel, panelName) {
        //debugger;

        var panelNameTimestamp = panelName + "_" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'Ymd_His');

        var store = gridPanel.getStore();
        if (store.data.items.length > 0) {
//            this.getView().saveDocumentAs({
            gridPanel.saveDocumentAs({
                type: 'xlsx',
                title: panelName,
                fileName: panelNameTimestamp + '.xlsx'
            });
        }
        else {
            Ext.Msg.alert('PBM', 'No record(s) found for ' + panelName, Ext.emptyFn);
        }
    },
    showStoresWithNoRecords: function () {

        var vm, vw, me;
        me = this;
        vw = me.getView();
        vm = me.getViewModel();

        var refs = me.getReferences();

        if (vm.getStore('addOnsReceived').getCount() <= 0) {
            console.log("addOnsReceived has no records");
        }

        if (vm.getStore('initialReceived').getCount() <= 0) {
            console.log("initialReceived has no records");
        }

        if (vm.getStore('inProcess').getCount() <= 0) {
            console.log("inProcess has no records");
        }

        if (vm.getStore('letters').getCount() <= 0) {
            console.log("letters has no records");
        }

        if (vm.getStore('reCredReceived').getCount() <= 0) {
            console.log("reCredReceived has no records");
        }

        if (vm.getStore('missingInfo').getCount() <= 0) {
            console.log("missingInfo has no records");
        }

        if (vm.getStore('verification').getCount() <= 0) {
            console.log("verification has no records");
        }

        if (vm.getStore('signRequired').getCount() <= 0) {
            console.log("signRequired has no records");
        }

        if (vm.getStore('executiveSign').getCount() <= 0) {
            console.log("executiveSign has no records");
        }

        if (vm.getStore('finance').getCount() <= 0) {
            console.log("finance has no records");
        }
    }

});