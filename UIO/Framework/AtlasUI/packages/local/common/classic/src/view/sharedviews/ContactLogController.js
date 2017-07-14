/**
 * Created by T4317 on 10/26/2016.
 */
Ext.define('Atlas.common.view.sharedviews.ContactLogController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridController',
    alias: 'controller.common-contactlogcontroller',
    IsAuthFromOldModule: false,
    listen: {
        controller: {
            '*': {
                contactloggridrefresh: 'contactloggridrefresh'
            }
        }
    },


    contactloggridrefresh:function(){
        var view = this.getView();
        if(view)
        {
            var actTab = view.up('[reference = workspaceTabs]').getActiveTab();
            var x = actTab.down(view);
            var vm = view.getViewModel();


            if (x && x==view) {
                view.lookup("addcontactlog").setDisabled(true);
                view.lookup("updatecontactlog").setDisabled(true);
                view.lookup("deletecontactlog").setDisabled(true);

                vm.set('createDisabled', false);

                view.down('pagingtoolbar').moveFirst();

                    var masterrecord = vm.get('contactlogmasterrecord');
                    if(!masterrecord)
                        masterrecord = vm.get('masterrecord');

                    var contactlogstore = vm.getStore('contactlog');
                    if(!masterrecord) {
                        contactlogstore.getProxy().setExtraParam('pKeyType', '');
                        contactlogstore.getProxy().setExtraParam('pKeyValue','');
                        contactlogstore.load();
                        return;
                    }


                    if(!masterrecord.key)
                    {
                        contactlogstore.getProxy().setExtraParam('pKeyType', '');
                        contactlogstore.getProxy().setExtraParam('pKeyValue','');
                        contactlogstore.load();
                        return;
                    }

                    if(masterrecord){
                        view.lookup("addcontactlog").setDisabled(false);
                        contactlogstore.removeAll();
                        contactlogstore.getProxy().setExtraParam('pKeyType', masterrecord.key);
                        contactlogstore.getProxy().setExtraParam('pKeyValue',masterrecord.keyvalue);
                        contactlogstore.load();
                    }

                 this.markAuthReadOnly();

            }
        }
    },

    onAdd: function () {
        this.createEditor(null);
    },

    onEdit: function () {
        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];
        this.createEditor(record);
    },

    createEditor: function (record) {
        var me = this,
            view = this.getView(),
            store = this.getView().store,
            user = Ext.first('viewport').getViewModel().get('user'),
            modelName = store.getModel().$className,
            height = view['dialogheight'] ? 'height:' + view['dialogheight'] : null;

        var pagedata = me.getViewModel().get('contactlogmasterrecord');
        if(!pagedata)
            pagedata = me.getViewModel().get('masterrecord');

        if(record)
            pagedata.action = "edit";
        else
            pagedata.action = "add";

        me.getViewModel().set('forminfo',pagedata);

        var win = Ext.create({
            xtype: 'common-editgrid-window',
            callingView: view, //used to for closing methods cleanup as we open to viewport
            IsAuthFromOldModule: this.IsAuthFromOldModule,
            iconCls: 'icon-contactlog,8',
            title: record ? 'Update' : 'Add',
            viewModel: {
                type: this.getView().dialogviewmodel || 'common-editgrid-window',
                parent: this.getViewModel(),
                data: {
                    isEditing: record ? true : false,
                    record: record || Ext.create(modelName)
                }
            },
            controller: "addcontactlogcontroller" || 'common-editgrid-window',
            width: 1050,
            height: '78%',
            floating: true,
            modal: true,
            autoShow: false,
            items: [{
                reference: 'editorForm',
                xtype: 'contactlogwindow',
                autoScroll: true
            }]
        });



        /*if (record) {
            me.editor.down('form').loadRecord(record);
        }*/
        this.getView().add(win);
        //this.getView().setDisabled(true);
         win.show();
        win.center();

    },


    contractlog_itemdblclick : function (dv, record, item, index, e){
        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];

        this.showcontrolvisibilty(record);
        this.createEditor(record);
    },

    contractlog_rowclick: function (dv, record, item, index, e){
       // debugger;
        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];
        this.showcontrolvisibilty(record);
    },

    showcontrolvisibilty :function (record) {
        //debugger;

        var grid = this.getView();
        grid.lookup("updatecontactlog").setDisabled(false);
        if(record)
        {
            var currentdate = Atlas.common.utility.Utilities.getLocalDateTime();
            var comparedate = new Date(record.data.callDateTime);
            var cpcurrentdate =currentdate.getFullYear().toString()+ currentdate.getMonth().toString()+currentdate.getDate().toString();
            var cpcomparedate = comparedate.getFullYear().toString()+ comparedate.getMonth().toString()+ comparedate.getDate().toString();
            if ((cpcurrentdate ==  cpcomparedate) && (record.data.CreateUser==Atlas.user.un)) {
                grid.lookup("deletecontactlog").setDisabled(false);
            }else{
                grid.lookup("deletecontactlog").setDisabled(true);
            }

            this.markAuthReadOnly();
        }
    },

    onRemoveButtonClick: function () {
        var me =this;
        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm('Delete ','Are you sure you would like to delete Case Number '+ record.data.CaseNum +'?', function(btn){
            if(btn === 'yes'){

                var saveAction = [{
                    "Save": {"key": '', "value": ''}
                }];
                var extraParameters = {
                    pKeyValue: record.data.CaseNum,
                    pKeyType: "CaseNum"
                };

                var deleteContactLog = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/delcontactlogdata/update', null, [false], extraParameters,
                    saveAction,  ['pDocumentID']);

                if (deleteContactLog.code == 0) {
                    record.drop();
                    me.contactloggridrefresh();
                }
            }
        },this)
    },

    markAuthReadOnly: function () {
        var view = this.getView();

        if (view.up('cdagmain') == undefined || view.up('cdagmain') == null) {
            this.IsAuthFromOldModule = false;
            return;
        }

        var IsAuthFromOldModule = view.up('cdagmain').down('#IsAuthFromOldModule').getValue();

        if (IsAuthFromOldModule == 'true' || IsAuthFromOldModule == true) {
            this.IsAuthFromOldModule = true;

            view.lookup('addcontactlog').setDisabled(true);
            view.lookup('deletecontactlog').setDisabled(true);
        }
        else {
            this.IsAuthFromOldModule = false;
        }
    },
    localizeDateTime: function(value, record)
    {
        //debugger;
        return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value,record.column.format);
    }

});