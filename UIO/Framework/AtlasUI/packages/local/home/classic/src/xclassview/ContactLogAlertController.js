Ext.define('Atlas.home.xclassview.ContactLogAlertController', {
    extend: 'Atlas.common.view.sharedviews.AddContactLogController',
    alias: 'controller.xclasscontactlogalert',
    listen: {
        controller: {
            '*': {
                contactloggridrefresh: 'contactloggridrefresh'
            }
        }
    },
    init: function () {
        var vm = this.getViewModel(),
            param = {
                page: 'home',
                key: 'casenumber',
                keyvalue: "",
                keytext: ""
            };
        vm.set('masterrecord', param);
        this.contactloggridrefresh();
    },

    contactloggridrefresh: function () {
        var me = this,
            view = me.getView();
        if (view) {
            var vm = me.getViewModel(),
                contactLogStore = vm.getStore('contactlogalert'),
                proxy = contactLogStore.getProxy();

            proxy.setExtraParam('pWhere', "callStatus='O' and contactUser='" + Atlas.user.un + "'");

            contactLogStore.on({
                load: 'onContactLogLoad',
                scope: me
            });

            contactLogStore.load();
        }
    },


    onContactLogLoad: function (store, records, success) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            contactLogStore = vm.getStore('contactlogalert'),
            proxy = contactLogStore.getProxy();

        //TODO: metaData now gets injected into the store object, probably can remove at some point
        //load metadata info for reason code description into the store (Reason1)
        if (success) {

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
            height = view['dialogheight'] ? 'height:' + view['dialogheight'] : null,
            pxtype = view.xtype.toLowerCase() + 'window';


        var changemasterrecord = me.getViewModel().get('masterrecord');
        if (record)
            changemasterrecord.action = "edit";
        else
            changemasterrecord.action = "add";

        me.getViewModel().set('forminfo', changemasterrecord);

        if (!Ext.ClassManager.getByAlias('widget.' + pxtype)) {
            pxtype = 'editorwindowerror';
        }

        if (record) {
            record.data.callStatus = record.data.CallStatusInfo.substring(0, 1);
        }

        var win = Ext.create({
            xtype: 'common-editgrid-window',
            iconCls: 'icon-contactlog,8',
            callingView: view, //used to for closing methods cleanup as we open to viewport
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
            floating: true,
            //layout: {type: 'fit', align: 'stretch'},
            modal: true,
            closable: true,
            draggable: true,
            resizable: true,
            width: 1050,
            height: '78%',
            autoShow: false,
            items: [{
                reference: 'editorForm',
                xtype: 'contactlogwindow',
                autoScroll: true
            }]
        });


        this.getView().up().up().up().add(win); //TODO What is this chain of methods?
        win.show();
    },


    contractlog_itemdblclick: function (dv, record, item, index, e) {
        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];
        this.createEditor(record);
    },

    contractlog_rowclick: function (dv, record, item, index, e) {
        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];

        var currentdate = Atlas.common.utility.Utilities.getLocalDateTime();
        if (record) {
            if ((currentdate < Date(record.data.callDateTime)) && (record.data.CreateUser == Atlas.user.un)) {
                grid.lookup("deletecontactlog").setDisabled(false);
            } else {
                grid.lookup("deletecontactlog").setDisabled(true);
            }
        }
    },

    onRemoveButtonClick: function () {
        var me = this;
        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm('Delete ', 'Are you sure you would like to delete Case Number ' + record.data.CaseNum + '?', function (btn) {
            if (btn === 'yes') {

                var saveAction = [{
                    "Save": {"key": '', "value": ''}
                }];
                var extraParameters = {
                    pKeyValue: record.data.CaseNum,
                    pKeyType: "CaseNum"
                };

                var deleteContactLog = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/delcontactlogdata/update', null, [false], extraParameters,
                    saveAction, ['pDocumentID']);

                if (deleteContactLog.code == 0) {
                    record.drop();
                    me.contactloggridrefresh();
                }
            }
        }, this)
    }
});