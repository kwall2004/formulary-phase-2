/**
 * Created by T4317 on 8/11/2016.
 * Modified by s6393 on 12/22/2016 to fix the defects from Test Track
 */
Ext.define('Atlas.rebate.view.ManufacturerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.manufacturer',
    Action:'',

    /**
     * Called when the view is created
     */
    init:function()
    {
        this.onLoad();
    },

    /*manufacturer Events */
    /**
     * On Page Load, Load all manufacturers
     */
    onLoad:function()
    {
        var store = this.getViewModel().getStore('manufacturerstore');
        store.getProxy().setExtraParam('pWhere',''); // Load all Manufacturers
        store.load({
            scope: this,
            failure: function (record, operation)
            {
            },
            success: function (record, operation)
            {
            },
            callback: function (record, operation, success)
            {

            }
        });
    },
    /**
     * View Selected Manufacturer info
     * @param combo
     * @param record
     */
    onSelect: function(combo, record) {
        var vm = this.getViewModel();
        var form = this.getView().down('form');
        form.loadRecord(record);
        vm.set("manufacturerRec", record);
        vm.set('manufacturerID', record.get('manufacturerID'));
        vm.set('parentSystemID',record.get('systemID'));
        this.loadContacts(vm.get('parentSystemID'));
        vm.set("isManufacturerSelected", true);
    },
    loadContacts:function (parentSystemId) {

        var  store =this.getViewModel().getStore('contactstore');
        store.getProxy().setExtraParam('pParentSystemID',parentSystemId);
        store.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
            }
        });
    },
    clearContacts:function () {
        var  store =this.getViewModel().getStore('contactstore');
        var proxy = store.getProxy();
        delete proxy.extraParams['pParentSystemID'];
        store.load(function(records, operation, success) {
            if(success) {
                if(records.length == 0) {
                    store.removeAll(true);
                }
            } else {
                store.removeAll(true);
            }
        });
    },
    /**
     * Create a new Manufacturer
     */
    onCreate:function () {
        var action = 'Create',vm = this.getViewModel();
        this.setEdit(action);
        vm.set("inEdit", true);
        vm.set("enableManufacturerId", true);
        this.getView().down('#manufacturerID').setDisabled(false);
        this.getView().down('#manufacturerID').setReadOnly(false);
        var form = this.getView().down('[name=manufacturerForm]');
        form.reset();
        this.clearContacts();
        var message = ' Please fill in all required information';
       // this.getView().down('#status').setStatus({text:message});
        vm.set("isManufacturerSelected", false);
    },
    /**
     * Update selected Manufacturer info
     */
    onEdit:function(){
        var vm = this.getViewModel(), action = 'Edit';
        vm.set("inEdit", true);
        vm.set("enableManufacturerId", true);
        this.getView().down('#manufacturerID').setDisabled(false);
      //  this.getView().down('#manufacturerID').setReadOnly(true);
        this.setEdit(action);
    },
    /**
     * Save the Manufacturer info
     */
    onSave:function()
    {

        var me = this,vm = me.getViewModel(),view = me.getView(),saveMessage,saveAction,fieldList,fieldValues, form = me.getView().down('form'), formData = form.getValues();

        if (form.isValid() && formData && formData.state != '')
        {
            fieldList = 'Name,Address1,Address2,City,State,Zip';
            fieldValues = formData.Name + '|' +
                formData.address1 + '|' +
                formData.address2 + '|' +
                formData.city + '|' +
                formData.state + '|' +
                formData.zip ;

            if(this.Action == 'Create')
            {

                saveMessage = 'Manufacturer created';
                saveAction = [{"Save": {"key": "pMode", "value": "A"}}];
                var extraParameters = {
                    pManufacturerId: formData.manufacturerID,
                    pFieldList: fieldList,
                    pFields:fieldValues
                };
                var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/manufacturerdata/update', null, [true], extraParameters, saveAction, null);
                me.setLockUnlockImage();
                if (result.code == 0)
                {
                    vm.set('manufacturerID', formData.manufacturerID);
                 //   view.down('#status').setStatus({text:saveMessage,clear:true});
                    var store = this.getViewModel().getStore('manufacturerstore');
                    store.getProxy().setExtraParam('pWhere',''); // Load all Manufacturers
                    store.load({
                        callback: function (record, operation, success)
                        {
                            var combo = me.lookupReference('manufacturerCombo');
                            if (combo != null)
                            {
                                var index = combo.getStore().findExact('manufacturerID',formData.manufacturerID);
                                var rec = combo.getStore().getAt(index);
                                vm.set('parentSystemID',rec.get('systemID'));
                                combo.setValue(formData.Name);
                            }
                        }
                    });
                   // this.loadContacts(vm.get('manufacturerID'));

                    vm.set("inEdit", false);
                    vm.set("isManufacturerSelected", true);
                    this.getView().down('#manufacturerID').setDisabled(true);
                    this.getView().down('#manufacturerID').setReadOnly(false);
                    vm.set("enableManufacturerId", false);
                    //view.down('#status').setStatus({text:saveMessage,clear:true});
                    //Ext.Msg.alert('Success',result.message);
                    view.down('[name=manufacturerForm]').updateRecord();
                }
                else
                {
                    Ext.Msg.alert('Failure',result.message);
                }
            }
            else
            {
                saveMessage = 'Manufacturer is updated';
                fieldList = fieldList + ',manufacturerID';
                fieldValues = fieldValues + '|' +  formData.manufacturerID;
                saveAction = [{"Save": {"key": "pMode", "value": "U"}}];
                var extraParameters = {
                    pManufacturerId: vm.get('manufacturerID'),
                    pFieldList: fieldList,
                    pFields:fieldValues
                };
                var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/manufacturerdata/update', null, [true], extraParameters,saveAction, null);
                me.setLockUnlockImage();
                vm.getStore('manufacturerstore').reload();
                if (result.code == 0)
                {
                    vm.set('manufacturerID', formData.manufacturerID);
                    //Ext.Msg.alert('Success',result.message);
                   // view.down('#status').setStatus({text:saveMessage,clear:true});
                            var combo = me.lookupReference('manufacturerCombo');
                            if (combo != null)
                            {

                                var index = combo.getStore().find('manufacturerID',formData.manufacturerID);
                            //    var rec = combo.getStore().getAt(index);
                                vm.set('parentSystemID',formData.systemID);
                                combo.setRawValue(formData.Name);
                            }
                   // this.loadContacts(vm.get('parentSystemID'));
                    vm.set("inEdit", false);
                    vm.set("isManufacturerSelected", true);
                    this.getView().down('#manufacturerID').setDisabled(true);
                    this.getView().down('#manufacturerID').setReadOnly(false);
                    vm.set("enableManufacturerId", false);
                    view.down('[name=manufacturerForm]').updateRecord();
                }
                else
                {
                    Ext.Msg.alert('Failure',result.message);
                }
            }
        }
        else
        {
            saveMessage = ' Please fill in all required information';
         //   view.down('#status').setStatus({text:saveMessage,clear:false,iconCls:'x-fa fa-exclamation-circle'});
            if(formData.state == ''){
                view.down('#state').reset();
                view.down('#state').validate();
            }
            return;
        }

    },

    /**
     * Clear the form on cancel button click
     * @param bt
     */
    onCancel:function (bt) {
        //
        var vm = this.getViewModel();
        vm.set("inEdit", false);
        this.getView().down('#manufacturerID').setDisabled(true);
        this.getView().down('#manufacturerID').setReadOnly(false);
        vm.set("enableManufacturerId", false);
        var comboManufacturer = this.getView().down('[name=manufacturer]');
        if  (!comboManufacturer.getSelection())
        {
            bt.up('form').reset();
            this.clearContacts();
            var message = ' Ready';
            //this.getView().down('#status').setStatus({text:message,clear:false, iconCls: 'x-fa fa-check-circle'});
        }
        else {
            this.onSelect(null,vm.get("manufacturerRec"));
        }
        this.setLockUnlockImage('lock');
    },

    setEdit:function(action){
        var me = this;
        if(action=='Create'){
            this.Action = 'Create';
        }
        else if(action == 'Edit'  ){
            this.Action = 'Edit';
        }
        me.setLockUnlockImage('unlock');
    },

    setLockUnlockImage : function(pLockUnlock){
      var me = this,
          view = me.getView(),
          source = pLockUnlock == 'unlock' ? 'resources/images/unlocked.png' : 'resources/images/locked.png';
        view.down('#imgManufacturerID').setSrc(source);
        view.down('#imgManufacturerName').setSrc(source);
        view.down('#imgManufacturerAddress1').setSrc(source);
        view.down('#imgManufacturerAddress2').setSrc(source);
        view.down('#imgManufacturerCity').setSrc(source);
        view.down('#imgManufacturerState').setSrc(source);
        view.down('#imgManufacturerZip').setSrc(source);
    },
    /**
     * Delete selected Manufacturer info
     */
    onDelete:function () {

        var comboManufacturer = this.getView().down('[name=manufacturer]');
        Ext.MessageBox.confirm('Delete ','Are you sure you would like to delete '+ comboManufacturer.getSelection().get('Name') +'?', function(btn){
            if(btn === 'yes')
            {
                this.doDelete();
            }
            else
            {
                return;
            }
        },this);
    },
    doDelete:function () {
        var me=this;
        var view = this.getView(), vm = this.getViewModel(),comboManufacturer = view.down('[name=manufacturer]'),comboManufacturerIdValue;

        if  (comboManufacturer.getSelection())
        {
            comboManufacturerIdValue = comboManufacturer.getSelection().get('manufacturerID');
            var where = '';
            where = (where != "" ? where + " and manufacturerID = '" + comboManufacturerIdValue + "'" : "manufacturerID = '" + comboManufacturerIdValue + "'");
            var store = vm.getStore('rebatecontractstore');
            store.getProxy().setExtraParam('pWhere',where);
            store.load({
                scope: this,
                failure: function (record, operation)
                {
                },
                success: function (record, operation)
                {
                },
                callback: function (record, operation, success)
                {
                    if(record.length > 0){
                        Ext.Msg.alert('Failure', 'Manufacturer could not be deleted, since rebate contracts are associated with it.');
                       // view.down('form').reset();
                        return;
                    }
                    else {
                        var saveAction = [{"Save": {"key": "pMode", "value": "D"}}];
                        var extraParameters = {
                            pManufacturerId: comboManufacturerIdValue,
                            pFieldList: '',
                            pFields: ''
                        };
                        var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/manufacturerdata/update', null, [true], extraParameters, saveAction, null);
                        if (result.code == 0) {
                            view.down('form').reset();
                            me.onLoad();
                            //Ext.Msg.alert('Success', result.message);
                            vm.set("inEdit", false);
                            vm.set("isManufacturerSelected", false);
                            vm.getStore('contactstore').removeAll();
                        }
                        else {
                            Ext.Msg.alert('Failure', result.message);
                        }
                    }
                }
            });

        }
    },
    /*manufacturer contact Events*/
    /**
     * Add a contact to the selected manufacturer
     */
    addContact: function() {
        var vm = this.getViewModel();
        vm.set('IsNewContact', true);
        var form = this.getView().down('[name=contactForm]');
        form.reset();
        var win =  this.lookupReference('contactWindow');
        win.setTitle('Add Contact Info');
        win.show();
        this.getView().down('#btnAddContactInfo').setText('Add');
    },
    /**
     * selected manufacturer contact
     * @param grid
     * @param record
     */
    contactInfoGridRowdblClick: function( grid , record)  {
        var vm = this.getViewModel();
        vm.set('IsNewContact', false);
        var form = this.getView().down('[name=contactForm]');
        form.loadRecord(record);
        var win =  this.lookupReference('contactWindow');
        win.setTitle('Update Contact Info');
        win.show();
        this.getView().down('#btnAddContactInfo').setText('Update');
    },
    /**
     * update contact of the selected manufacturer
     */
    updateContact: function()  {
        var vm = this.getViewModel();
        vm.set('IsNewContact', false);
        var selectedRecord = this.lookupReference('contactInfoGrid').getSelectionModel();
        if (selectedRecord.hasSelection())
        {
            var record = selectedRecord.lastSelected;
            var form = this.getView().down('[name=contactForm]');
            form.loadRecord(record);
        }

        var win =  this.lookupReference('contactWindow');
        win.setTitle('Update Contact Info');
        win.show();
        this.getView().down('#btnAddContactInfo').setText('Update');
    },
    /**
     * Delete the contact of the selected manufacturer
     */
    deleteContact:function () {
        var vm = this.getViewModel();
        var message = '';
        vm.set('IsNewContact', false);
        Ext.MessageBox.confirm('Delete ','Are you sure you would like to delete this record ?', function(btn){
            if(btn === 'yes'){
                var selectedRecord = this.lookupReference('contactInfoGrid').getSelectionModel();
                if (selectedRecord.hasSelection())
                {
                    var record = selectedRecord.lastSelected;
                    var saveAction = [{"Save": {"key": "pAction", "value": "D"}}];
                    var pSystemId  = record.data.SystemID;
                    var pRetSystemId;
                    var extraParameters = {
                        pSystemID: pSystemId,
                        pFieldList: 'systemID',
                        pValueList: pSystemId
                    };
                    var result = Atlas.common.utility.Utilities.saveData([{}], 'system/rx/contactinfo/update', null, [true], extraParameters, saveAction, ['pRetSystemId']);
                    if (result.code == 0)
                    {
                        //this.getView().down('#status').setStatus({clear:false, text:message});
                        //Ext.Msg.alert('Success',result.message);
                    }
                    else
                    {
                       // Ext.Msg.alert('Failure',result.message);
                    }
                }
                vm.getStore('contactstore').reload();
            }
            else
            {
                return;
            }
        },this);
    },
    /**
     * Save the contact of the selected manufacturer
     * @param btn
     * @constructor
     */
    SaveContactInfo:function(btn)
    {

        var view = this.getView(), vm = this.getViewModel(), form = view.down('[name=contactForm]'), formData = form.getValues(),pRetSystemId,pSystemId, saveAction;
        var ParentSystemID = vm.get('parentSystemID');
        var pFieldList = 'FirstName,LastName,Phone,Fax,Email,ParentSystemID';
        var selectedRecord = this.lookupReference('contactInfoGrid').getSelectionModel();

        if(vm.get('IsNewContact')) // Add
        {
            saveAction = [{"Save": {"key": "pAction", "value": "A"}}];
            pSystemId = 0;
        }
        else //Edit
        {
            saveAction = [{"Save": {"key": "pAction", "value": "U"}}];
            if (selectedRecord.hasSelection())
            {
                var record = selectedRecord.lastSelected;
                pSystemId = record.data.SystemID;
            }
        }

        if (form.isValid() && formData)
        {
            var pFieldValues = formData.FirstName + '|' + formData.LastName + '|' + formData.Phone + '|' + formData.Fax + '|' + formData.Email + '|' +ParentSystemID;
            var extraParameters = {
                pSystemID: pSystemId,
                pFieldList: pFieldList,
                pValueList:pFieldValues
            };
            var result = Atlas.common.utility.Utilities.saveData([{}], 'system/rx/contactinfo/update', null, [true], extraParameters, saveAction, ['pRetSystemId']);
            if (result.code == 0)
            {
                //Ext.Msg.alert('Success',result.message);
            }
            else
            {
                Ext.Msg.alert('Failure',result.message);
            }
            //this.getStore('contactstore').reload();
            var  store =this.getViewModel().getStore('contactstore');
            store.getProxy().setExtraParam('pParentSystemID',vm.get('parentSystemID'));
            store.load();

            btn.up('window').close()
        }

    }
});


