/**
 * Created by j2560 on 9/27/2016.
 */
Ext.define('Atlas.benefitplan.view.contactdetails.ContactDetailsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contactdetails',
    listen : {
        controller: {
            'benefitplan-tenanthierarchycontroller': {
                afterHierarchyTreeRender: 'onTreeLoad',
                onHierarchyTreeItemClick: 'onTreeItemClick'
            }
        }
    },
    checkForUnsavedRecords: function(panel) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var phantomRowsExist= false;
        panel.query('grid').forEach(function logArrayElements(element){
            element.store.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if (phantomRowsExist||this.getViewModel().data.changed){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function (id){
                if (id === 'yes') {
                    panel.events.beforeclose.clearListeners();
                    panel.close();}
            });

        }else{
            panel.events.beforeclose.clearListeners();
            panel.close();
        }
        return false;
    },
    beforeInit: function() {
        var vm = this.getViewModel(),
            view = this.getView();
        this.EntityId = view.atlasId;
        this.EntityType = view.entityType;
        this.EfctvEndDt = view.efctvEndDt;
        this.rootSK = view.rootSK;
        vm.set('tenantHierarchyEntityType', this.EntityType);
        vm.set('tenantHierarchyEndDate', this.EfctvEndDt);
        vm.set('tenantHierarchyEntityId', this.EntityId);
        vm.set('rootsk', this.rootSK);
    },
    onTreeLoad: function(args){
        Ext.getBody().mask('Loading');
        var store = this.getViewModel().getStore('entitycontacts'),
            proxy = store.getProxy();
        proxy.setExtraParams({});
        proxy.setExtraParam('entityType', args.EntityType);
        proxy.setExtraParam('entityTypeSK', args.EntityId);
        store.load(function(){
            Ext.getBody().unmask();
        });
    },
    onTreeItemClick: function (args) {
        var vm = this.getViewModel(),
            store = vm.getStore('entitycontacts'),
            proxy = store.getProxy();
        if(args != null) {
            vm.set('tenantHierarchyEntityType', args.EntityType);
            vm.set('tenantHierarchyEntityId', args.EntityId);
        }
        proxy.setExtraParam('entityType', vm.get('tenantHierarchyEntityType'));
        proxy.setExtraParam('entityTypeSK', vm.get('tenantHierarchyEntityId'));
        Ext.getBody().mask('Loading');
        store.reload(function(){
            Ext.getBody().unmask();
        });
    },
    onActiveCheck: function() {
        var vm = this.getViewModel(),
            store = vm.getStore('entitycontacts'),
            proxy = store.getProxy();
        proxy.setExtraParam('entityType', vm.get('tenantHierarchyEntityType'));
        proxy.setExtraParam('entityTypeSK', vm.get('tenantHierarchyEntityId'));
        if(this.lookup('activeContacts').checked) {
            proxy.setExtraParam('isActive', true);
        }
        else {
            proxy.setExtraParam('isActive', false);
        }
        Ext.getBody().mask('Loading');
        store.load(function(){
            Ext.getBody().unmask();
        });
    },

    contactDetailSelect: function(view, record) {
        var me = this;
        var view = this.getView();
        this.getViewModel().set('record', record);
        if(record.data.Priority != null) {
            me.lookup('priorityCombo').setValue(record.data.Priority);
        }
        if(record._ContactAddress !== undefined) {
            if (record._ContactAddress.data.ISOCntryCodeSK !== null) {
                var countryCode = me.lookup('countryCode');
                countryCode.setValue(record._ContactAddress.data.ISOCntryCodeSK);
                if (record._ContactAddress.data.StPrvncCodeSK !== null) {
                    var stateProvinceCode = me.lookup('stateProvinceCode');
                    stateProvinceCode.getStore().getProxy().setExtraParam('isoCountryCodeSK', countryCode.getValue());
                    Ext.getBody().mask('Loading');
                    stateProvinceCode.getStore().load({
                        callback: function () {
                            Ext.getBody().unmask();
                            stateProvinceCode.setValue(record._ContactAddress.data.StPrvncCodeSK);
                            var formFields = view.down("form").getForm().getFields().items;
                            for (var i = 0; i < formFields.length; i++) {
                                formFields[i].originalValue = formFields[i].value;
                            }
                            me.getViewModel().set('changed', false);
                        }
                    });
                }
            }
        }
    },
    onExportContacts: function (){
        var vm = this.getViewModel();
        this.fireEvent('openView', 'merlin', 'benefitplan', 'contactdetails.ContactExport',
            {
                menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/tenantsearch_Main'),
                PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/tenantsearch_Main'),
                EntityType: vm.get('tenantHierarchyEntityType'),
                EntityTypeSK: vm.get('tenantHierarchyEntityId'),
                atlasId: vm.get('PBPSK')
            });
    },
    stateProvinceClear: function() {
        this.lookup('stateProvinceCode').setValue(null);
    },
    stateProvinceLoad: function() {
        var me = this,
            countryCode = me.lookup('countryCode').getValue();
        if(countryCode != null) {
            var stateProvinceCode = me.lookup('stateProvinceCode');
            stateProvinceCode.getStore().getProxy().setExtraParam('isoCountryCodeSK', countryCode);
            stateProvinceCode.getStore().load( function(){
                me.lookup('contactForm').isValid();
            });
        }
    },
    addContactDetailsOnClick: function(){
        this.lookup('contactForm').reset();
        var grid = this.lookup('contactsGrid'),
            store = grid.getStore(),
            vm = this.getViewModel();
        store.add({
            ContactAddress: new Atlas.benefitplan.model.ContactAddress({
                EntityTypeAddressSK: 0,
                AddrSK: 0,
                ISOCntryCodeSK: 1
            }),
            EfctvStartDt: new Date(),
            EfctvEndDt: new Date(vm.get('tenantHierarchyEndDate')),
            EntityType: vm.get('tenantHierarchyEntityType'),
            EntityTypeSK: vm.get('tenantHierarchyEntityId')
        });
        grid.getSelectionModel().select(store.data.items[store.getCount()-1]);
        this.lookup('countryCode').setValue(1);
        this.stateProvinceLoad();
    },
    addPhoneFaxEmailRow: function (button) {
        var grid = button.up('grid');
        grid.findPlugin('rowediting').cancelEdit();
        grid.store.add({CommunicationTypeRaw: 'Phone', Value: ''});
        grid.findPlugin('rowediting').startEdit(grid.getStore().data.items[grid.getStore().getCount()-1]);
        this.addedRow = true;
    },
    removePhoneFaxEmailRow: function (button) {
        var grid = button.up('grid'),
            sm = grid.getSelectionModel();
        grid.findPlugin('rowediting').cancelEdit();
        sm.getSelection()[0].data.IsDeleted = true;
        grid.store.remove(sm.getSelection());
        if (grid.store.getCount() > 0) {
            sm.select(0);
        }
        this.getViewModel().set('editingGrid', false);
    },
    onCancel: function () {
        var me = this;
        Ext.Msg.show({
            title: 'Confirm Cancel',
            msg: 'Are you sure you want to cancel and lose your changes?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function (btn) {
                if (btn == "yes") {
                    me.onTreeItemClick();
                    me.lookup('contactForm').reset();
                }
            }
        });
        this.getViewModel().set('editingGrid', false);
    },
    onSave: function () {
        var me = this,
            vm = me.getViewModel(),
            record = vm.get('contactsGrid');
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function (btn) {
                if (btn == "yes") {
                    me.lookup('PhoneFaxEmailContainer').findPlugin('rowediting').completeEdit();
                    record.selection.set('currentUser', vm.get('user').un);
                    record.selection.data.Priority = this.lookup('priorityCombo').getValue();
                    var whichAddress = record.selection._ContactAddress;
                    if (whichAddress != undefined) {
                        whichAddress.data.ISOCntryCodeSK = this.lookup('countryCode').getValue();
                        whichAddress.data.StPrvncCodeSK = this.lookup('stateProvinceCode').getValue();
                    }
                    else {
                        whichAddress = record.selection.ContactAddress;
                        whichAddress.ISOCntryCodeSK = this.lookup('countryCode').getValue();
                        whichAddress.StPrvncCodeSK = this.lookup('stateProvinceCode').getValue();
                        record.selection.set('ContactAddress', whichAddress);
                    }

                    for (var i = 0; i < record.selection.ContactCommunications().removed.length; i++) {
                        record.selection.ContactCommunications().data.items.push(record.selection.ContactCommunications().removed[i]);
                    }
                    record.selection.save({
                        scope: me,
                        failure: function () {
                            Ext.Msg.show({
                                title: 'Failed to Save',
                                msg: 'Data failed to save',
                                buttons: Ext.Msg.OK,
                                closable: false,
                                draggable: false,
                                resizable: false
                            });
                        },
                        success: function () {
                            vm.getStore('entitycontacts').reload();
                        },
                        callback: function (record, operation, success) {
                            for (var i = 0; i < record.ContactCommunications().removed.length; i++) {
                                record.ContactCommunications().data.items.pop();
                            }
                            if (success) {
                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: 'Data saved successfully',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    draggable: false,
                                    resizable: false
                                });
                            }
                        }
                    });
                }
            }
            , scope: this
        })
    },
    onItemChanged: function () {
        var vm = this.getViewModel(),
            whichForm = this.getView().down("form");
        vm.set('changed', whichForm.isDirty());
        vm.set('validforms', whichForm.isValid());
    },
    onGridItemStartEdit: function(){
        this.getViewModel().set('editingGrid', true);
    },
    onGridItemCancelEdit: function(editor, context) {
        if (this.addedRow) {
            var store = context.grid.getStore();
            store.remove(store.getAt(context.grid.store.getCount()-1));
            this.addedRow = false;
        }
        this.getViewModel().set('editingGrid', false);
    },
    onGridItemComplete: function() {
        this.addedRow = false;
        this.getViewModel().set('editingGrid', false);
    },
    validateGrid: function(editor, context) {
        var result = true,
            message = '';
        if(context.newValues.CommunicationTypeRaw === "Phone" || context.newValues.CommunicationTypeRaw === "Fax") {
            var numberMask = /^\d{10}$|^\d{3}(-|\s)\d{3}(-|\s)\d{4}$/;
            if (numberMask.test(context.newValues.Value)) {
                for(var i = 0; i < context.store.getData().items.length; i++){
                    //don't compare this record to itself
                    var dataItem = context.store.getData().items[i];
                    if(dataItem != context.record) {
                        if (context.newValues.CommunicationTypeRaw === "Phone" || context.newValues.CommunicationTypeRaw === "Fax") {
                            var phone = context.newValues.Value,
                                phoneNum = dataItem.data.Value,
                                phone1 = phone.replace(new RegExp('-', 'g'), ''),
                                phone2 = phone.replace(new RegExp(' ', 'g'), ''),
                                phoneNumber = phoneNum.replace(new RegExp('-', 'g'), ''),
                                phoneNumber1 = phoneNum.replace(new RegExp(' ', 'g'), '');
                            if (((phoneNumber || phoneNumber1 == context.newValues.Value) || (dataItem.data.Value == phone1 || phone2)) && (dataItem.data.CommunicationTypeRaw == context.newValues.CommunicationTypeRaw)) {
                                message = context.newValues.CommunicationTypeRaw + ' Number already exists';
                                result = false;
                                break;
                            }
                        }
                    }
                }
            }
            else {
                message = 'Please Enter a Valid Phone/Fax Number.';
                result = false;
            }
        }
        else if(context.newValues.CommunicationTypeRaw === "EMail") {
            var emailMask = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
            if (emailMask.test(context.newValues.Value)) {
                for(var i = 0; i < context.store.getData().items.length; i++){
                    var dataItem = context.store.getData().items[i];
                    if(dataItem != context.record) {
                        if ((dataItem.data.Value == context.newValues.Value) && (dataItem.data.CommunicationTypeRaw == context.newValues.CommunicationTypeRaw)) {
                            message = 'Email already exists';
                            result = false;
                            break;
                        }
                    }
                }
            }
            else {
                message = 'Please Enter a Valid Email Address.';
                result = false;
            }
        }
        if(!result) {
            Ext.Msg.show({
                title: 'Error',
                msg: message,
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
        }
        return result;
    }
});
