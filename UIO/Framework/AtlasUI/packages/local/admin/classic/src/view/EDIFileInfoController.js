Ext.define('Atlas.admin.view.EDIFileInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-edifileinfo',
    init: function () {

        var vm = this.getViewModel();
        var edifileinfo = vm.getStore('edifileinfo');
        var allCarrierInfo = vm.getStore('allCarrierInfo');
        var ediPartners = vm.getStore('ediPartners');
        //var edifileinfo = vm.getStore('edifileinfo');
        var listDetails = vm.getStore('listDetails');
        var ediFileInfoComplete = vm.getStore('ediFileInfoComplete');
        var grid = this.getView();
        grid.on("select", 'selectedGrid', this);
        grid.on("itemdblclick", 'loadCarrierAccountInfoExt', this);
        grid.on('edit', function (editor, context) {
            //console.log('on edit');
            // var data =
            context.record.set('carrierName', grid.lookupReference('carrierNameCombo').getRawValue());
            context.record.set('carrierAcctName', grid.lookupReference('carrierAcctNumberCombo').getRawValue());//carrierLobNameCombo
            context.record.set('carrierLOBName', grid.lookupReference('carrierLobNameCombo').getRawValue());//partnerNameCombo
            context.record.set('partnerName', grid.lookupReference('partnerNameCombo').getRawValue());
            //context.record.set('filePattern',grid.lookupReference('fileTypeCombo').getRawValue());
            if (context.record.dirty && context.record.crudState != 'C') {
                context.record.set('isNeedUpdate', true);

            }
            this.lookupReference('saveButton').setDisabled(false);
            this.lookupReference('removeButton').setDisabled(false);
        });
        grid.on('canceledit', function (editor, context) {
            //debugger;
            if (context.record && context.record.crudState == 'C' && context.record.dirty) {
                edifileinfo.remove(grid.getSelection());
            }
            grid.lookupReference('addButton').setDisabled(false);
            if (grid.getSelection().length>0) {
                grid.lookupReference('removeButton').setDisabled(false);
            }
            else
                grid.lookupReference('removeButton').setDisabled(true);
            if (vm.getStore('edifileinfo').getModifiedRecords().length > 0)
                grid.lookupReference('saveButton').setDisabled(false);
            else
                grid.lookupReference('saveButton').setDisabled(true);

        });
        edifileinfo.on('load', function (store, recordInfo, successful, operation, eOpts) {
            //debugger
            var whereStatement = ' carrierId = ';
            for (var i = 0; i < recordInfo.length; i++) {
                var caid = recordInfo[i].get('carrierId');
                var index = whereStatement.indexOf(caid);
                if (index == -1) {
                    if (i != 0) {
                        whereStatement += ' OR carrierId = ';
                    }
                    whereStatement += recordInfo[i].get('carrierId');
                }
                /*if (i<recordInfo.length-1)
                 {

                 }*/
                var rp = ediPartners.findRecord('partnerId', recordInfo[i].get('partnerId'));
                if (rp) {
                    var n = rp.get('partnerName');
                    recordInfo[i].set('partnerName', n);
                    /*recordInfo[i].crudStateWas='C';
                     recordInfo[i].crudState='C';
                     recordInfo[i].dirty=false;*/
                }
                var cp = allCarrierInfo.findRecord('carrierId', recordInfo[i].get('carrierId'));
                if (cp) {
                    var cn = cp.get('carrierName');
                    recordInfo[i].set('carrierName', cn);
                    /* recordInfo[i].crudStateWas='C';
                     recordInfo[i].crudState='C';
                     recordInfo[i].dirty=false;*/

                }
                //var record = recordInfo[i];
                // debugger;

            }
            ;
            //debugger;
            var carrierAccountInfoExt = vm.getStore('carrierAccountInfoExt');
            carrierAccountInfoExt.getProxy().setExtraParam('pWhere', whereStatement);
            carrierAccountInfoExt.getProxy().setExtraParam('pBatchSize', 0);
            carrierAccountInfoExt.load(
                {
                    scope: this,
                    callback: function (recordInfoCA, operation, success) {
                        //debugger;
                        for (var i = 0; i < recordInfo.length; i++) {
                            var record = recordInfo[i];
                            for (var j = 0; j < recordInfoCA.length; j++) {
                                // console.log(recordInfoCA[j].get('carrierAcctNumber') +' == ' +record.get('carrierAcctNumber')+'?');

                                if (recordInfoCA[j].get('carrierAcctNumber') == record.get('carrierAcctNumber')) {
                                    record.set('carrierAcctName', recordInfoCA[j].get('accountName'));
                                    /*record.crudStateWas='C';
                                     record.crudState='C';
                                     record.dirty=false;*/
                                }
                            }
                        }


                    }
                }
            );
            var carrierLobExt = vm.getStore('carrierLobExt');
            //carrierLobExt.getProxy().setExtraParam('pWhere',' carrierId = '+ '50 OR  carrierId = '+ ' 60 OR carrierId = '+ ' 65');
            carrierLobExt.getProxy().setExtraParam('pWhere', whereStatement);
            carrierLobExt.getProxy().setExtraParam('pBatchSize', 0);
            carrierLobExt.load(
                {
                    scope: this,
                    callback: function (recordInfoLOB, operation, success) {
                        //debugger;
                        for (var i = 0; i < recordInfo.length; i++) {
                            var record = recordInfo[i];
                            for (var j = 0; j < recordInfoLOB.length; j++) {
                                //console.log(recordInfoLOB[j].get('carrierLOBId') +' == ' +record.get('carrierLOBId')+'?');

                                if (recordInfoLOB[j].get('carrierLOBId') == record.get('carrierLOBId')) {
                                    record.set('carrierLOBName', recordInfoLOB[j].get('lobName'));
                                    /*record.crudStateWas='C';
                                     record.crudState='C';
                                     record.dirty=false;*/
                                }
                            }
                        }
                        edifileinfo.commitChanges();


                    }
                }
            );
            /*for (var i=0;i<recordInfo.length;i++)
             {
             recordInfo[i].crudStateWas='C';
             recordInfo[i].crudState='C';// need to reset the update status after change to store values
             recordInfo[i].dirty=false;
             }*/
            //debugger;
        });

        allCarrierInfo.load(
            {
                scope: this,
                callback: function (recordInfo, operation, success) {
                    ediPartners.load({
                        scope: this,
                        callback: function (recordInfo, operation, success) {
                            listDetails.load({
                                scope: this,
                                callback: function (recordInfo, operation, success) {
                                    //this.loadEDIFileInfo();
                                    edifileinfo.load();

                                }
                            });
                        }

                    });
                }

            }
        );


    },
    filterCarrierName: function () {

        //console.log('filter');

    },
    refresh: function () {
        this.init();
    },
    editGrid: function () {
        var grid = this.getView();
        grid.lookupReference('saveButton').setDisabled(false);

    },

    selectedGrid: function () {
        var grid = this.getView();
        grid.lookupReference('addButton').setDisabled(false);
        grid.lookupReference('removeButton').setDisabled(false);
    },


    loadCarrierAccountInfoExt: function () {

        if (!this.DonotLoad) {
            var me = this;
            var gridSelectedRow = this.getView().getSelection()[0];
            var carrierAccountInfoExt = this.getViewModel().getStore('carrierAccountInfoExt');
            var caid = gridSelectedRow.get('carrierId');
            carrierAccountInfoExt.getProxy().setExtraParam('pWhere', ' carrierId = ' + caid);
            //carrierAccountInfoExt.getProxy().setExtraParam('pWhere',whereStatement);
            carrierAccountInfoExt.getProxy().setExtraParam('pBatchSize', 0);
            this.getView().lookupReference('carrierAcctNumberCombo').setStore(carrierAccountInfoExt);
            carrierAccountInfoExt.load(
                {
                    callback: function (record, operation, success) {
                        me.getView().lookupReference('carrierAcctNumberCombo').setValue(gridSelectedRow.get('carrierAcctNumber'));
                    }
                });
            var carrierLobExt = this.getViewModel().getStore('carrierLobExt');
            //carrierLobExt.getProxy().setExtraParam('pWhere',' carrierId = '+ '50 OR  carrierId = '+ ' 60 OR carrierId = '+ ' 65');
            carrierLobExt.getProxy().setExtraParam('pWhere', ' carrierId = ' + caid);
            carrierLobExt.getProxy().setExtraParam('pBatchSize', 0);
            this.getView().lookupReference('carrierLobNameCombo').setStore(carrierLobExt);
            carrierLobExt.load({
                callback: function (record, operation, success) {
                    me.getView().lookupReference('carrierLobNameCombo').setValue(gridSelectedRow.get('carrierLOBId'));
                }
            });
            //this.editGrid();
        }
        //console.log('loading lob');

    },
    onUpdateCarrierName: function (combo, record) {
        var carrierAccountInfoExt = this.getViewModel().getStore('carrierAccountInfoExt');
        var caid = combo.getValue();
        carrierAccountInfoExt.getProxy().setExtraParam('pWhere', ' carrierId = ' + caid);
        //carrierAccountInfoExt.getProxy().setExtraParam('pWhere',whereStatement);
        carrierAccountInfoExt.getProxy().setExtraParam('pBatchSize', 0);
        this.getView().lookupReference('carrierAcctNumberCombo').setStore(carrierAccountInfoExt);
        carrierAccountInfoExt.load();
        var carrierLobExt = this.getViewModel().getStore('carrierLobExt');
        //carrierLobExt.getProxy().setExtraParam('pWhere',' carrierId = '+ '50 OR  carrierId = '+ ' 60 OR carrierId = '+ ' 65');
        carrierLobExt.getProxy().setExtraParam('pWhere', ' carrierId = ' + caid);
        carrierLobExt.getProxy().setExtraParam('pBatchSize', 0);
        this.getView().lookupReference('carrierLobNameCombo').setStore(carrierLobExt);
        carrierLobExt.load();
    },
    beforeEdit: function (editor, context) {
        var grid = this.getView();
        if (grid.plugins[0].editing) {
            this.DonotLoad = true;
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return false;
        }
        else {
            this.DonotLoad = false;
        }
    },
    getCarrierName: function (value, meta, record) {
        /*var allCarrierInfo = this.getViewModel().getStore('allCarrierInfo');
         var cp = allCarrierInfo.findRecord('carrierId', record.get('carrierId'));
         if (cp) {
         var cn = cp.get('carrierName');
         record.set('carrierName', cn);
         return record.get('carrierName');
         }
         else
         return '';
         */
        var r = record.get('carrierName');
        if (r)
            return r;
        else {
            //debugger;
            return '';
        }

    },
    getCarrierAccountName: function (value, meta, record) {
        /*var carrierAccountInfoExt = this.getViewModel().getStore('carrierAccountInfoExt'); // SHOULD STILL be loaded from opening of editor
         var cp = carrierAccountInfoExt.findRecord('carrierId', record.get('carrierId'));
         if (cp) {
         var cn = cp.get('carrierAcctName');
         record.set('carrierAcctName', cn);
         return record.get('carrierAcctName');
         }
         else*/
        // return '';

        var r = record.get('carrierAcctName');
        if (r)
            return r;
        else return '';
    },
    getCarrierLobName: function (value, meta, record) {
        var r = record.get('carrierLOBName');
        if (r)
            return r;
        else return '';
    },
    getPartnerName: function (value, meta, record) {
        var r = record.get('partnerName');
        if (r)
            return r;
        else return '';
    },
    onAdd: function (btn) {
        var plugin = this.getView().getPlugin('rowEdit');
        if (plugin.editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return false;
        }
        else {
            //this.editGrid();
            var store = this.getViewModel().get('edifileinfo'),
                newList = Ext.create('Atlas.admin.model.EDIFileInfo');

            newList.set('isNeedUpdate', true);
            store.insert(0, newList);
            plugin.startEdit(0);
            var grid = this.getView();
            // grid.lookupReference('saveButton').setDisabled(false);
            grid.lookupReference('removeButton').setDisabled(false);
            this.getViewModel().getStore('carrierAccountInfoExt').removeAll();
            this.getViewModel().getStore('carrierLobExt').removeAll();

        }

    },
    afterEdit: function () {
        this.editGrid();
    },
    onRemove: function (btn) {
        var store = this.getViewModel().get('edifileinfo');
        var grid = this.getView();
        var gridSelectedRows = grid.getSelection();
        store.remove(gridSelectedRows);
        grid.lookupReference('saveButton').setDisabled(false);

    },
    onSave: function (btn) {
        var store = this.getViewModel().get('edifileinfo');
        //debugger;
        var grid = this.getView();
        if (grid.plugins[0].editing) {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return false;
        }
        else if(this.isDirtyStore(store)) {
            var saveAction = [{
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}
            }];
            var testReturn = Atlas.common.utility.Utilities.saveData([store], 'system/rx/edifileinfo/update', 'ttEDIFileInfo', [true], null,
                saveAction, null);

            //this.loadEDIFileInfo();
            store.load();
            var grid = this.getView();
            grid.lookupReference('saveButton').setDisabled(true);
            grid.lookupReference('removeButton').setDisabled(true);
            grid.lookupReference('addButton').setDisabled(false);
        }
    },
    /*loadNames:function(){
     var record = this.getView().getSelection()[0];
     var vm = this.getViewModel();
     var ediPartners = vm.getStore('ediPartners');
     var rp = ediPartners.findRecord('partnerId', record.get('partnerId'));
     if (rp) {
     var n = rp.get('partnerName');
     record.set('partnerName', n);

     }
     var vm = this.getViewModel();
     var allCarrierInfo = vm.getStore('allCarrierInfo');

     var cp = allCarrierInfo.findRecord('carrierId', record.get('carrierId'));
     if (cp) {
     var cn = cp.get('carrierName');
     record.set('carrierName', cn);
     record.crudStateWas='C';
     record.crudState='C';
     record.dirty=false;

     }
     var whereStatement = 'carrierId = ' + record.get('carrierId')
     var carrierAccountInfoExt = vm.getStore('carrierAccountInfoExt');
     carrierAccountInfoExt.getProxy().setExtraParam('pWhere',whereStatement);
     carrierAccountInfoExt.getProxy().setExtraParam('pBatchSize',0);
     carrierAccountInfoExt.load(
     {
     scope:this,
     callback: function (recordInfoCA, operation, success) {
     //debugger;
     for (var j=0;j<recordInfoCA.length;j++)
     {
     // console.log(recordInfoCA[j].get('carrierAcctNumber') +' == ' +record.get('carrierAcctNumber')+'?');

     if (recordInfoCA[j].get('carrierAcctNumber') == record.get('carrierAcctNumber'))
     {
     record.set('carrierAcctName',recordInfoCA[j].get('accountName'));
     record.crudStateWas='C';
     record.crudState='C';
     record.dirty=false;
     }
     }




     }
     }
     );
     var carrierLobExt = vm.getStore('carrierLobExt');
     //carrierLobExt.getProxy().setExtraParam('pWhere',' carrierId = '+ '50 OR  carrierId = '+ ' 60 OR carrierId = '+ ' 65');
     carrierLobExt.getProxy().setExtraParam('pWhere',whereStatement);
     carrierLobExt.getProxy().setExtraParam('pBatchSize',0);
     carrierLobExt.load(
     {
     scope:this,
     callback: function (recordInfoLOB, operation, success) {
     //debugger;
     for (var j=0;j<recordInfoLOB.length;j++)
     {
     //console.log(recordInfoLOB[j].get('carrierLOBId') +' == ' +record.get('carrierLOBId')+'?');

     if (recordInfoLOB[j].get('carrierLOBId') == record.get('carrierLOBId'))
     {
     record.set('carrierLOBName',recordInfoLOB[j].get('lobName'));
     record.crudStateWas='C';
     record.crudState='C';
     record.dirty=false;
     }
     }




     }
     }
     );

     },*/
    onReject: function (btn) {

        //undo any changes to the record
        var grid = this.getView();
        var rec = btn.up().getViewModel().data.record;

        var store = this.getViewModel().getStore('edifileinfo');
        if (rec.crudState == 'C') {
            this.getView().getPlugin('rowEdit').disabled = true;
            store.remove(rec);
            this.getView().getPlugin('rowEdit').disabled = false;
            // this.editGrid();
            //return;

        }
        else {
            rec.reject();
        }
        if (this.isDirtyStore(store))
            grid.lookupReference('saveButton').setDisabled(false);
        else
            grid.lookupReference('saveButton').setDisabled(true);

    },
    isDirtyStore:function(theStore) {
        var isDirty = false;
        theStore.each(function(item){
            if(item.dirty == true){
                isDirty = true;
            }
        });
        if (!isDirty){
            isDirty = (theStore.removed.length > 0);
        }
        return isDirty;

    }
});