Ext.define('Atlas.admin.view.UserGroupsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-usergroups',

    listen: {
        controller: {
            '*': {
                adminCopyAccess: 'doCopy'
            }
        }
    },

    init: function(){
        this.getViewModel().set('title',"Users in Selected Group");
    },
    onGroupSelect: function (grid, record) {
        this.getViewModel().set('title',"Users in "+ record.get('groupName'));
        var store = this.getViewModel().get('adminusers');
        store.getProxy().setExtraParam('pGroupId', record.get('groupId'));
        store.load();
    },

    onUserSelect: function (grid, record) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/admin/Users'),
            atlasId = record.get('userName');
        me.fireEvent('openView', 'merlin', 'admin','Users',{
            atlasId:atlasId,
            menuId: menuId
        });

    },
    beforeSelectionChange:function(combo , record , index , eOpts )
    {
        if(this.getView().down('[reference=usergroups]').plugins[0].editing)
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
    },
    onAdd: function () {
        if (!this.addedRow) {
            if(!this.getView().down('[reference=usergroups]').plugins[0].editing) {
                this.getViewModel().set('title',"Users in Selected Group");
                var store = this.getViewModel().get('adminusergroups'),
                    newRecord = new Atlas.common.model.UserGroup({});
                store.insert(0, newRecord);
                this.getView().down('[reference=usergroups]').plugins[0].startEdit(0, 0);
                this.getView().down('[reference=usergroups]').getView().refresh();
                this.addedRow = true;
            }
            else {
                Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            }
        }
    },

    onCancelRuleEdit: function (editor, context) {
        if (context.record.get('groupId') === 0) {
            this.getViewModel().get('adminusergroups').remove(context.record);
            this.addedRow = false;
        }
    },

    onRuleEdit: function (editor, context) {
        if (context.record.dirty) {
            context.record.set('isNeedUpdate', true);
        }
        this.addedRow = false;
    },

    onRuleReject: function (button) {
        var record = button.getViewModel().data.record;
        if(record.data.groupId!=0 ) {
            record.reject();
        }
        else
        {
            var grid = this.getView().down('[reference=usergroups]');
            grid.store.remove(record);
            grid.findPlugin('rowediting').cancelEdit();
        }
    },
    onrule_beforeedit:function(dv, grid)
    {
        if (grid.grid.plugins[0].editing) {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
        this.getViewModel().set('editingRecord',grid.record);
    },

    onSave: function () {
        var me = this,
            vm = this.getViewModel(),
            rules = [],
            rulesDefs = vm.get('adminusergroups');


        for (var i in rulesDefs.data.items) {
            var item = rulesDefs.data.items[i];
            if (!!item.dirty) {
                var mode;
                if (item.get('groupId') == 0) {
                    mode = 'A'
                }
                else {
                    mode = 'U'
                }
                rules.push({
                    "mode": mode,
                    "groupId": item.get('groupId'),
                    "groupName": item.get('groupName'),
                    "DESCRIPTION": item.get('DESCRIPTION'),
                    "defaultMenu": item.get('defaultMenu'),
                    "CopyAccessGroupId": item.get('CopyAccessGroupId'),
                    "CopyReportAccess": item.get('CopyReportAccess')
                });
            }
        }

        for (var ii in rulesDefs.removed) {
            var dItem = rulesDefs.removed[ii];
            rules.push({
                "mode": 'D',
                "groupId": dItem.get('groupId'),
                "groupName": dItem.get('groupName'),
                "DESCRIPTION": dItem.get('DESCRIPTION'),
                "defaultMenu": dItem.get('defaultMenu'),
                "CopyAccessGroupId": dItem.get('CopyAccessGroupId'),
                "CopyReportAccess": dItem.get('CopyReportAccess')
            });
        }

        if (rules.length > 0) {
            this.doSave(rules)
        }

    },

    doSave: function (ttTable) {
        var me = this,
            refs = this.getReferences(),
            saveAction = [
                {"Save": {"key": "mode", "value": "Update"}}
            ],
            params = {
                ttUserGroups: {
                    ttUserGroups: ttTable
                }
            },
            returnFields = [];

        var saveData = Atlas.common.utility.Utilities.saveData(
            [], //stores array of stores
            'system/rx/usergroups/update', //url
            null, //temptablenames
            [false], //trackingRemoved
            params, //extraParams
            saveAction, //saveactions
            returnFields //returnfields
        );

        if (saveData != null && (saveData.message == "Succesful" || saveData.message == "Success" || saveData.message == "Successful")) {
            var vm = this.getViewModel(),
                store = vm.get('adminusergroups');
            Ext.Msg.alert('Status', 'Changes saved successfully.');
            this.addedRow = false;
            store.load();
        }
    },

    onRemove: function () {
        var me = this,
            grid = me.getView().down('[reference=usergroups]');
        grid.getStore().remove(grid.selection);
    },

    onCopy: function () {
        var me = this,
            view = me.getView(),
            refs = this.getReferences(),
            selection = refs.usergroups.selection;

        if (selection.get('groupId') == 0) {
            return false;
        } else {
            var win = Ext.create('Ext.window.Window', {
                title: 'Copy Access',
                //autoShow: true,
                width: 400,
                modal: true,
                controller: {
                    onCopy: function () {
                        var vm = this.getViewModel(),
                            record = vm.get('masterRecord'),
                            values= this.getView().down('form').getValues();
                        record.set('CopyAccessGroupId', values.CopyAccessGroupId );
                        record.set('CopyReportAccess', values.CopyReportAccess || false);
                        this.fireEvent('adminCopyAccess', this.getView(), record);
                    },
                    onCancel: function () {
                        this.getView().close();
                    }
                }, //viewcontroller for the window
                viewModel: {
                    data: {
                        masterRecord: selection
                    },
                    parent: me.getViewModel() //windows need to have the VM chain added to them
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            text: 'Copy',
                            bind:{
                                disabled: '{!copygroup.selection}'
                            },
                            handler: 'onCopy'
                        },
                        {
                            text: 'Cancel',
                            handler: 'onCancel'
                        }
                    ]
                }],
                layout: 'vbox',
                bodyPadding: '10',
                items: [
                    {
                        xtype: 'form',
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Select Group',
                                forceSelection: true,
                                reference: 'copygroup',
                                emptyText: 'Enter group name',
                                bind: {
                                    store: '{adminusergroups}'
                                },
                                queryMode: 'local',
                                name: 'CopyAccessGroupId',
                                displayField: 'groupName',
                                valueField: 'groupId'
                            },
                            {
                                xtype: 'checkbox',
                                inputValue: true,
                                uncheckedValue: false,
                                fieldLabel: 'Copy Report Access',
                                name: 'CopyReportAccess'
                            }
                        ]
                    }

                ]
            });
            view.add(win).show();

        }
    },

    doCopy: function (window, record) {
        var me = this,
            copy = [];

        copy.push({
            "mode": 'C',
            "groupId": record.get('groupId'),
            "groupName": record.get('groupName'),
            "DESCRIPTION": record.get('DESCRIPTION'),
            "defaultMenu": record.get('defaultMenu'),
            "CopyAccessGroupId": record.get('CopyAccessGroupId'),
            "CopyReportAccess": record.get('CopyReportAccess')
        });

        this.doSave(copy);
        window.close();

    }


});