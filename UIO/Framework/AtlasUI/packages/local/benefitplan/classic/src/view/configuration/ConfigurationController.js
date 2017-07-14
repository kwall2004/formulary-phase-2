Ext.define('Atlas.benefitplan.view.configuration.ConfigurationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-configurationcontroller',
    listen: {
        //listen to events using GlobalEvents
        controller: {
            '*': {
                gridModified: 'onGridModified',
                tenantHierarchyGridEditing: 'tenantHierarchyGridEditing'
            }
        }
    },
    tenantHierarchyGridEditing: function (args) {
        this.getViewModel().set("editinggrid", args.editinggrid)
    },
    onBreadCrumbLoad: function (store, records) {
        this.lookup('breadcrumbarea').removeAll();
        if (records != null) {
            //this was throwing an error because records was null after saving a new BIN number on the tenant, we may need to look into what is
            //setting the proxy parameters for the breadcrumb store
            this.setBreadCrumb(records[0].data);
        }
    },
    setBreadCrumb: function (data) {
        var me = this,
            bc = data,
            lim = '&nbsp;>&nbsp;',
            breadcrumbarea = me.lookup('breadcrumbarea'),
            label = Ext.create('Ext.form.Label', {
                html: '<b>' + "Tenant Family: " + '<b>' + bc.TenantFamName + '</b>',
                listeners: {
                    render: function (c) {
                        c.getEl().on('click', function () {

                            me.openView(bc.TenantFamSK, bc.TenantFamSK, 10);
                        }, c);
                    }
                }
            });
        breadcrumbarea.add(label);
        if (bc.TenantSK) {
            label = Ext.create('Ext.form.Label', {
                html: lim + '<b>' + "Tenant: " + '<b>' + bc.TenantName + '</b>',
                listeners: {
                    render: function (c) {
                        c.getEl().on('click', function () {
                            me.openView(bc.TenantFamSK, bc.TenantSK, 20);
                        }, c);
                    }
                }
            });
            breadcrumbarea.add(label);
            if (bc.AcctSK) {
                label = Ext.create('Ext.form.Label', {
                    html: lim + '<b>' + "Account: " + '<b>' + bc.AcctName + '</b>',
                    listeners: {
                        render: function (c) {
                            c.getEl().on('click', function () {
                                me.openView(bc.TenantFamSK, bc.AcctSK, 30);
                            }, c);
                        }
                    }
                });
                breadcrumbarea.add(label);
                if (bc.GrpSK) {
                    label = Ext.create('Ext.form.Label', {
                        html: lim + '<b>' + "Group: " + '<b>' + bc.GrpName + '</b>',
                        listeners: {
                            render: function (c) {
                                c.getEl().on('click', function () {

                                    me.openView(bc.TenantFamSK, bc.GrpSK, 40);
                                }, c);
                            }
                        }
                    });
                    breadcrumbarea.add(label);
                    if (bc.PopGrpSK) {
                        label = Ext.create('Ext.form.Label', {
                            html: lim + '<b>' + "Population Group: " + '<b>' + bc.PopGrpName + '</b>',
                            listeners: {
                                render: function (c) {
                                    c.getEl().on('click', function () {
                                        me.openView(bc.TenantFamSK, bc.PopGrpSK, 50);
                                    }, c);
                                }
                            }
                        });
                        breadcrumbarea.add(label);
                    }
                }
            }
        }
        //onclick calls openview of corresponding item.
    },
    openView: function (rootsk, viewsk, viewtype) {
        this.fireEvent('onHierarchyTreeItemClick', {
            EntityId: viewsk,
            EntityType: viewtype,
            RootSK: rootsk
        });
    },
    checkForUnsavedRecords: function(panel) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var treeData =  this.getViewModel().get('tenantHierarchyEntityType'), datachange = false,
            formAddressData = false,
            formDetailData = false;
            formAddressData = this.getView().down("form[itemId='addresssection']").isDirty();
            formDetailData = this.getView().down('[itemId="detailsection"]').isDirty();
            if(formAddressData || formDetailData){
                datachange = true;
            }
        var phantomRowsExist= false;
        panel.query('grid').forEach(function logArrayElements(element){
            element.store.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });

        if (phantomRowsExist||datachange){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved data that will be lost. Are you sure you want to close the window?',function (id){
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
    loadData: function (callback, EfctvStartDt, EfctvEndDt) {
        Ext.getBody().mask('Loading');
        this.messageArray = [];
        //track the controller in a new variable to be used in callbacks
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            aController = view.down("[itemId='addresssection']").getController();
        //get the store for the screen
        var mainstore = me.getViewModel().getStore('basicdetails');
        //if this is a create vs an update
        aController.initializeData(me.entityType, vm.get('tenantHierarchyEntityId'));
        if (vm.get('tenantHierarchyEntityId') == 0) {
            //set the viewmodel variable to say the address dropdown is empty for use with disabling that field via a bind
            view.down("[itemId='addresssection']").getViewModel().set('emptyAddressList', true);
            //set the viewmodel variable to say that the form is not valid because it is empty for use in disabling certain buttons via a bind
            vm.set('validforms', false);
            //create a new empty data model with defaulted dates for this new tenant hierarchy object
            var record = Ext.create(me.entityModel);
            var newEfctvStartDt = new Date(new Date().setHours(0, 0, 0, 0));
            if (EfctvStartDt) {
                newEfctvStartDt = EfctvStartDt;
            }
            record.set('EfctvStartDt', newEfctvStartDt);
            var newEfctvEndDt = new Date('12/31/9999');
            if (EfctvEndDt) {
                newEfctvEndDt = EfctvEndDt;
            }
            record.set('EfctvEndDt', newEfctvEndDt);
            //set the id for the new object to zero
            record.set(me.basicDetailsKey, 0);
            //load the newly created data model into the form
            view.down("form[itemId='detailsection']").loadRecord(record);
            //create a new blank address for this new blank model
            aController.createNewAddress(newEfctvStartDt, newEfctvEndDt);
            //blank out any previously set parameters and set the key to zero in the store for this screen
            mainstore.getProxy().setExtraParams({});
            mainstore.getProxy().setExtraParam(me.basicDetailsKey, 0);
            aController.loadDemoStore(me.entityType, me.ParentSK, me.basicDetailsParentTitle);
            aController.entityType = me.entityType;
            me.fireEvent('loadHierarchyGridData', {
                parentSK: me.ParentSK
            });
            if (callback != undefined) {
                callback();
            }
            if(me.entityType != 10 || vm.get('tenantHierarchyEntityId') != 0) {
                var bcstore = vm.getStore('navigationBreadCrumb');
                bcstore.getProxy().setExtraParams({
                    'entityType': me.entityType - 10, 'entityTypeSK': me.ParentSK
                });
                bcstore.load({
                    callback:function(){
                        me.fireEvent('checkTreeActive');
                    }
                });
            }
            vm.set('changed', true);
            Ext.getBody().unmask();
            //if this a valid id was passed to me
        } else if (vm.get('tenantHierarchyEntityId') != null && vm.get('tenantHierarchyEntityId') != undefined) {
            mainstore.getProxy().setExtraParams({});
            mainstore.getProxy().setExtraParam(me.basicDetailsKey, vm.get('tenantHierarchyEntityId'));
            mainstore.load(function (records) {
                if (records.length == 1) {
                    view.down("form[itemId='detailsection']").loadRecord(records[0]);
                    if (me.parentDetailsKey != "") {
                        me.ParentSK = records[0].data[me.parentDetailsKey];
                    }
                    me.fireEvent('loadHierarchyGridData', {
                        parentSK: me.ParentSK
                });
                    Ext.getBody().unmask();
                } else {
                    Ext.getBody().unmask();
                    Ext.Msg.show({
                        title: 'Error',
                        msg: 'Found ' + records.length + 'records, but expected 1.',
                        buttons: Ext.Msg.OK,
                        closable: false,
                        draggable: false,
                        resizable: false
                    });
                }
            });
            aController.loadData(me.entityType, vm.get('tenantHierarchyEntityId'));
            if (callback != undefined) {
                callback();
            }
            var bcstore = vm.getStore('navigationBreadCrumb');
            bcstore.getProxy().setExtraParams({
                'entityType': me.entityType, 'entityTypeSK': vm.get('tenantHierarchyEntityId')
            });
            bcstore.load({
                callback:function(){
                    me.fireEvent('checkTreeActive');
                }
                });

        } else {
            Ext.Msg.show({
                title: 'Error',
                msg: 'No Entity ID passed.',
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
        }
    },
    setEntityId: function (EntityId, EntityType, RootSK) {
        var vm = this.getViewModel();
        vm.set('tenantHierarchyEntityId', EntityId);
        vm.set('tenantHierarchyEntityType', EntityType);
        vm.set('rootsk', RootSK);
    },
    onSaveClick: function () {
        var me = this,
            vm = me.getViewModel(),
            addressSection = me.getView().down("[itemId='addresssection']")
            addressform = me.getView().down("form[itemId='addresssection']").getForm(),
            form = me.getView().down("form[itemId='detailsection']").getForm(),
            isNewEntity = (form.getRecord().get(me.basicDetailsKey) == 0),
            newEntityId = null;
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.getBody().mask('Saving');
                    if (vm.get('changed') || isNewEntity) {
                        //post the data
                        var record = form.getRecord(); // get the underlying model instance
                        form.updateRecord(record); // update the record with the form data
                        record.set("CurrentUser", vm.get('user').un);
                        if (isNewEntity) {
                            record.set(id, null);
                            record.set(me.parentDetailsKey, me.ParentSK);
                        }
                        if (me.lookup('tenantIndustryIdentifier-grid') != undefined) {
                            var gridData = me.lookup('tenantIndustryIdentifier-grid').getController().getPhantomData(),
                                newdata = [];
                            gridData.forEach(function (item) {
                                var idata = item.data;
                                item.set("CurrentUser", vm.get('user').un);
                                item.set("Deleted", false);
                                item.set("TenantTypeKey", idata.TenantTypeKey);
                                item.set("ValueID", idata.ValueID);
                                item.set("IndustryIdentifier", idata.IndustryIdentifier);
                                newdata.push(idata);
                            });
                            record.set("TenantIndustryIdentifiers", newdata);
                        }
                        if (me.lookup('accountIndustryIdentifier-grid') != undefined) {
                            var gridData = me.lookup('accountIndustryIdentifier-grid').getController().getPhantomData(),
                                newdata = [];
                            gridData.forEach(function (item) {
                                var idata = item.data;
                                item.set("CurrentUser", vm.get('user').un);
                                item.set("Deleted", false);
                                item.set("TenantTypeKey", idata.TenantTypeKey);
                                item.set("AcctTypeKey", idata.AcctTypeKey); //  This is 0 for new type
                                item.set("ValueID", idata.ValueID);
                                item.set("IndustryIdentifier", idata.IndustryIdentifier);
                                newdata.push(idata);
                            });
                            record.set("AccountIndustryIdentifiers", newdata);
                        }
                        record.getProxy().setExtraParams({});
                        record.save({ // save the record to the server
                            success: function (results, operation) {
                                Ext.getBody().unmask();
                                if (results.data.success == "false") {
                                    Ext.Msg.show({
                                        title: 'Detail data failed to Save',
                                        msg: results.data.messages.map(function (elem) {
                                            return elem.name;
                                        }).join(",") + '.',
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        draggable: false,
                                        resizable: false
                                    });
                                } else {
                                    //TODO: this is weird, but if I don't do this, the name field keeps showing as dirty but all the other fields are ok.
                                    form.loadRecord(form.getRecord());
                                    if (isNewEntity) {
                                        var responsedata = JSON.parse(operation.getResponse().responseText);
                                        newEntityId = responsedata["id"][0];
                                        form.getRecord().set(me.basicDetailsKey, newEntityId);
                                        vm.set('tenantHierarchyEntityId', newEntityId);
                                        addressSection.getController().entityTypeSK = vm.get('tenantHierarchyEntityId');
                                        if (me.entityType == 10) {
                                            me.fireEvent('setTenantHierarchyEntityId', {
                                                tenantHierarchyEntityId: newEntityId,
                                                tenantHierarchyEntityType: me.entityType,
                                                rootSK: newEntityId
                                            });
                                        }
                                    }
                                    me.messageArray.push({
                                        record: null,
                                        title: 'Success',
                                        message: 'Detail data saved successfully'
                                    });
                                    var bcstore = vm.getStore('navigationBreadCrumb'),
                                        whichEntiyiId = '';
                                    if (isNewEntity) {
                                        whichEntityId = newEntityId;
                                    } else {
                                        whichEntityId = vm.get('tenantHierarchyEntityId');
                                    }
                                    bcstore.getProxy().setExtraParams({
                                        'entityType': me.entityType,
                                        'entityTypeSK': whichEntityId
                                    });
                                    bcstore.load(function () {
                                    });
                                    me.fireEvent('loadHierarchyGridData', {
                                        parentSK: me.ParentSK
                                    });
                                    if (addressSection.getViewModel().get("changedAddress")) {
                                        var record = addressform.getRecord();
                                        addressform.updateRecord(record); // update the record with the form data
                                        addressSection.getController().addressqueue.push(record);//I know if it is added or updated based on id... 0 for added
                                    }
                                    if (addressSection.getController().addressqueue.length > 0) {
                                        addressSection.getController().saveAddresses(isNewEntity, newEntityId, me.getView().down("form[itemId='detailsection']").getComponent('detailsectionfieldset').getComponent('EfctvStartDt').getValue(), me.getView().down("form[itemId='detailsection']").getComponent('detailsectionfieldset').getComponent('EfctvEndDt').getValue());
                                    } else {
                                        me.processSaveMessage();
                                        vm.set("changed", false);
                                        addressSection.getViewModel().set("changedAddress", false);
                                        if (isNewEntity) {
                                            if (me.entityType == 10) {
                                                me.reloadTree(newEntityId, me.entityType, newEntityId);
                                            } else {
                                                me.reloadTree(newEntityId, me.entityType, vm.get('rootsk'));
                                            }
                                            vm.set('EntityId', newEntityId);
                                        } else {
                                            me.reloadTree(vm.get('tenantHierarchyEntityId'),me.entityType, vm.get('rootsk'));
                                        }
                                    }
                                    vm.set("changed", false);
                                }
                            },
                            failure: function (results, operation) {
                                Ext.getBody().unmask();
                                var responsedata = JSON.parse(operation.getResponse().responseText);
                                Ext.Msg.show({
                                    title: 'Failed to Save',
                                    msg: responsedata.messages.map(function (elem) {
                                        return elem.message;
                                    }).join(",") + '.',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    draggable: false,
                                    resizable: false
                                });
                            }
                        });
                    }
                    Ext.getBody().unmask();
                }
            }
        });
    },
    processSaveMessage: function() {
        var me = this,
            aCont = me.getView().down("[itemId='addresssection']").getController();
        if(aCont.addressqueue.length == 0) {
            var messagetitle = 'Success',
                message = '';
            for(var i=0;i<me.messageArray.length;i++) {
                if(me.messageArray[i].title != 'Success') {
                    messagetitle = me.messageArray[i].title;
                }
                if(message != '') {
                    message+='</br></br>';
                }
                if(me.messageArray[i].record) {
                    message+= me.messageArray[i].record + ': '
                }
                message+= me.messageArray[i].message
            }
            Ext.Msg.show({
                title: messagetitle,
                msg: message,
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
            me.messageArray = [];
            aCont.addressqueue.push.apply(aCont.addressqueue, aCont.failaddressqueue);
            aCont.failaddressqueue = [];
        }
    },
    reloadTree: function (EntityId, EntityType, RootSK) {
        this.getView().up().up().getComponent('benefitplan-tenanthierarchy-tree-panel').getComponent('benefitplan-tenanthierarchy-tree').getController().reloadTree(EntityId, EntityType, RootSK);
    },
    
    onCancelClick: function () {
        var me = this,
            phantomRowsExist = false,
            grid = me.getView().down("grid[itemId='BCNGrid']");
        if(grid){
            grid.store.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        }
        if (phantomRowsExist || !me.getView().down("form[itemId='detailsection']").isValid() || me.getView().down("form[itemId='detailsection']").isDirty() || me.getView().down("form[itemId='addresssection']").isDirty() || !me.getView().down("form[itemId='addresssection']").isValid() || me.getViewModel().get('tenantHierarchyEntityId') == 0) {
                Ext.Msg.show({
                    title: 'Confirm Cancel',
                    msg: 'Are you sure you want to cancel and lose your changes?',
                    buttons: Ext.Msg.YESNO,
                    closable: false,
                    draggable: false,
                    resizable: false,
                    fn: function (btn) {
                        if (btn == 'yes') {
                            //Cancel the edit of BCN grid
                            if (me.entityType == 10 && me.getView().down("form[itemId='detailsection']").getForm().getRecord().data.TenantFamSK == 0) {
                                me.fireEvent('tenantFamilyCreateCanceled');
                            } else if (me.getViewModel().get('tenantHierarchyEntityId') == 0) {
                                me.reloadTree(me.ParentSK, me.entityType - 10, me.getViewModel().get('rootsk'));
                                Ext.suspendLayouts();
                                var detailSection = me.getView().up().up().getComponent('configuration-detail-section');
                                detailSection.removeAll();
                                var detailpanel = Ext.create({xtype: me.ParentXType});
                                detailSection.add(detailpanel);
                                Ext.resumeLayouts(true);
                                detailpanel.getController().setEntityId(me.ParentSK, me.entityType - 10);
                                detailpanel.getController().loadData();
                            } else {
                                me.resetForm();
                            }
                        }
                    }
                });
        }  else {
            me.resetForm();
        }
    },
    resetForm: function () {
        var me = this,
            addressSection = me.getView().down("[itemId='addresssection']");
        me.getView().down("form[itemId='detailsection']").getForm().reset();
        me.fireEvent('loadHierarchyGridData', {
            parentSK: me.ParentSK
        });
        addressSection.getController().loadAddress(0, function (addressId) {
            //select the "current" address in the dropdown
            me.getView().getComponent('centersection').getComponent('addresssection').getComponent('addresssection').getComponent('addressselectionsection').getComponent('addressselection').setValue(addressId);
            addressSection.getViewModel().set("changedAddress", false);
        }, me.entityType, me.getViewModel().get('tenantHierarchyEntityId'));
        addressSection.getController().addressqueue.splice(0,addressSection.getController().addressqueue.length);
        me.getViewModel().set("changed", false);
        addressSection.getViewModel().set("changedAddress", false);
    },
    onViewContactsClick: function () {
        var me=this,
            details = this.getView().down("form[itemId='detailsection']").getComponent('detailsectionfieldset');
        this.fireEvent('openView', 'merlin', 'benefitplan', 'contactdetails.Main', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/tenantsearch_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/tenantsearch_Main'),
            atlasId: this.getViewModel().get('tenantHierarchyEntityId'),
            entityType: this.entityType,
            efctvStartDt: details.getComponent('EfctvStartDt').getValue(),
            efctvEndDt: details.getComponent('EfctvEndDt').getValue(),
            rootSK: this.getViewModel().get('rootsk')
        });
    },
    onCreateNewChildClick: function () {
        var details = this.getView().down("form[itemId='detailsection']").getComponent('detailsectionfieldset');
        this.fireEvent('createNewHierarchyElement', {
            ParentSK: this.getViewModel().get('tenantHierarchyEntityId'),
            XType: this.ChildXType,
            EfctvStartDt: details.getComponent('EfctvStartDt').getValue(),
            EfctvEndDt: details.getComponent('EfctvEndDt').getValue()
        });
    },
    onItemChanged: function () {
        var vm = this.getViewModel();
        vm.set('changed', this.getView().down("form[itemId='detailsection']").isDirty() || this.getView().down("form[itemId='addresssection']").isDirty() || vm.get('tenantHierarchyEntityId') == 0);
        this.getView().down("[itemId='addresssection']").getViewModel().set('validaddressform', this.getView().down("form[itemId='addresssection']").isValid());
        vm.set('validforms', this.getView().down("form[itemId='detailsection']").isValid() &&
            this.getView().down("form[itemId='addresssection']").isValid() &&
            (this.getView().down("[itemId='tenantIndustryIdentifier-grid']") == undefined || this.getView().down("[itemId='tenantIndustryIdentifier-grid']").getController().isGridValid()) &&
            (this.getView().down("[itemId='accountIndustryIdentifier-grid']") == undefined || this.getView().down("[itemId='accountIndustryIdentifier-grid']").getController().isGridValid())
        );
    },
    onGridModified: function (isValid) {
        var vm = this.getViewModel();
        vm.set('changed', true);
        this.getView().down("[itemId='addresssection']").getViewModel().set('validaddressform', this.getView().down("form[itemId='addresssection']").isValid());
        vm.set('validforms', this.getView().down("form[itemId='detailsection']").isValid() &&
            this.getView().down("form[itemId='addresssection']").isValid() &&
            isValid
        );
    }
});
