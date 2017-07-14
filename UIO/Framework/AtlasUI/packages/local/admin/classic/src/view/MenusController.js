Ext.define('Atlas.admin.view.MenusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-menus',

    listen: {
        controller: {
            '#admin-menusupdateform': {
                loadMenuTree: 'loadMenuTree'
            }
        }
    },

    init: function () {
        this.loadMenuTree();
        var me = this;
        var vm = this.getViewModel();
        var grid = this.getView().lookupReference('assignedgroupsgrid');
        var store0 = vm.getStore('adminmenuitems');
        var tree = me.getView().down('[reference=menuTree]');

        // I have discovered that if a node has no children and is a non-leaf it will load the store into it.  The key is to prevent these kinds of nodes when adding them.
        /*tree.on('beforeload',function(store,operation,eOpts)
         {
         debugger;
         if (operation._id!='root')
         {
         operation.abort();
         return false;
         }
         }
         );*/
        store0.on('load', function (store, recordInfo, successful, operation, eOpts) {
            for (var i = 0; i < recordInfo.length; i++) {
                me.setUpNodes(recordInfo[i]);
            }
            /*var cNode = vm.get('menuRecord');
             if (cNode)
             {

             var tree = me.getView().down('[reference=menuTree]');
             tree.expandPath(cNode.getPath());
             }*/

        });
        grid.on('edit', function (editor, context) {
            var refs = me.getReferences(),
                tree = refs.menuTree,
                node = tree.getSelection()[0],
                assign = refs.groupsgrid.getSelection(),
                gustore = me.getViewModel().get('groupusers'),
                gstore = me.getViewModel().get('groups');

            var record = context.record;
            var aext = "Yes";
            if (!record.get('allowExtAccess'))
                aext = "No";
            var saveData = Atlas.common.utility.Utilities.saveData(
                [], //stores array of stores
                'system/rx/idxmenugroupdata/update', //url
                null, //temptablenames
                [false], //trackingRemoved
                {
                    pMenuID: node.get('menuID'),
                    pGroupID: record.get('groupID'),
                    pFieldList: 'allowExtAccess',
                    pFields: aext

                },
                [{"Save": {"key": "mode", "value": "Update"}}],
                [] //returnfields
            );
            gustore.load();
        });
    },
    setUpNodes: function (rec) {
        /*1. the leaf value in the database is unreliable.  In sencha all nodes with no children must be leafs.  This is not the case in Merlin.  As of now we can't figure out how to change
         the icon of level 1 leafs to have a folder.
         2. the tree is built from this faulty data
         3. Assuring that the Sencha tree leafs are all leafs with no overwhelming change to the database.
         */

        rec.set('leaf', !rec.hasChildNodes());
        if (rec.hasChildNodes()) {

            for (var i = 0; i < rec.childNodes.length; i++) {
                this.setUpNodes(rec.childNodes[i]);
            }
        }
        /*
         You can set the value initially but once you make changes to the tree, level 1 leaf nodes divert their standard leaf icon.
         else {
         if(rec.get('level')==1)
         {
         rec.set('glyph','xf114@FontAwesome');
         //rec.set('expandable',true);
         }
         }*/

    },

    loadMenuTree: function () {
        //debugger;
        var me = this,
            vm = this.getViewModel(),
            store0 = vm.get('adminmenuitems');
        //ensure all the renderer stores are loaded prior to loading the list
        //store0.getProxy().setExtraParam('pLevels', 3);
        //store0.getProxy().setExtraParam('pRootMenu', 0);
        //pRootMenu: 0,
        store0.load();
    },
    onNavigationItemClick: function (tree, info) {
        //debugger;
        var me = this,
            node = info.node || info,
            vm = this.getViewModel();

        me.getViewModel().set('menuRecord', node);
        if (node.get('level') == 3) {
            this.getView().lookupReference('childCreationMenu').setDisabled(true);
        }
        else
            this.getView().lookupReference('childCreationMenu').setDisabled(false);

        var storeRoot = vm.get('groups');
        if (node.get('level') == 0) {
            storeRoot.loadData([]);
        }
        else {
            storeRoot.getProxy().setExtraParam('pagination', false);
            storeRoot.load({
                callback: function () {

                }
            });

        }

        var store0 = vm.get('groupusers');

        me.getViewModel().set('menuRecord', node);
        store0.getProxy().setExtraParam('pMenuId', node.get('menuID'));
        store0.load({
            callback: function () {

            }
        });


        /*store0.getProxy().setExtraParam('pMenuId', node.get('menuID'));
         store0.load({
         callback: function (recordInfo, operation, success){


         }
         });*/

    },

    onAddBefore: function (btn, e) {
        this.onUpdate(btn, e, {type: 'before'});
    },

    onAddAfter: function (btn, e) {
        this.onUpdate(btn, e, {type: 'after'});
    },

    onAddChild: function (btn, e) {
        this.onUpdate(btn, e, {type: 'under'});
    },

    onUpdate: function (btn, e, mode) {
        //debugger;
        var me = this,
            view = me.getView(),
            tree = view.down('[reference=menuTree]'),
            node = tree.getSelection()[0],
            nodeTitle = node.menuTitle,
            helpText = '',
            parentMenuID,
            record,
            win;

        if ((node && node.get('level') !== 0 ) || mode) {
            //get nodes needed to place
            var parentNode;
            // if (node && !node.get('root')) {
            if (node && (node.get('level') !== 1)) {

                parentMenuID = node.get('parentMenuID');

            } else {
                node.set('parentMenuID', 0);
                parentMenuID = node.get('parentMenuID');
            }


            //adding menu
            if (mode) {
                if (mode.type === 'under') {
                    if (node.get('leaf')) {
                        parentNode = node;
                    }
                    record = Ext.create('Atlas.common.model.SystemMenuAdmin', {
                        menuID: 0,
                        parentMenuID: parseInt(node.get('menuID')) > 0 ? node.get('menuID') : 0,
                        menuOrder: 1
                    });
                } else if (mode.type === 'before') {
                    record = Ext.create('Atlas.common.model.SystemMenuAdmin', {
                        menuID: 0,
                        parentMenuID: parentMenuID,
                        menuOrder: node.get('menuOrder')
                    });
                } else {
                    record = Ext.create('Atlas.common.model.SystemMenuAdmin', {
                        menuID: 0,
                        parentMenuID: parentMenuID,
                        menuOrder: parseInt(node.get('menuOrder')) + 1
                    });
                }
                helpText = 'You are adding a menu under <b>System Menu List</b>.';
                if (node.parentNode && node.parentNode.get('menuTitle')) {
                    helpText = 'You are adding a menu under <b>' + node.parentNode.get('menuTitle') + '</b> ' + mode.type + ' <b>' + (node.get('menuTitle') || '') + '</b>.';
                }
                else if (node.parentNode && !node.parentNode.get('menuTitle')) {
                    helpText = 'You are adding a menu under <b>System Menu List</b> ' + mode.type + ' <b>' + (node.get('menuTitle') || '') + '</b>.';
                }
            }
            else {
                record = node;
            }

            win = Ext.create('Ext.window.Window', {
                bind: {
                    title: '{title}'
                },
                width: 440,
                height: 450,
                modal: true,
                controller: 'admin-menusupdateform', //viewcontroller for the window
                // Creates a child session that will spawn from the current session
                // of this view.
                // session: true,
                viewModel: {
                    data: {
                        title: record.get('menuID') != 0 ? 'Edit : ' + record.get('menuTitle') : 'Add Menu',
                        masterRecord: record,
                        parentRecord: parentNode
                    },
                    stores: {
                        dashboardItems: {
                            type: 'clonestore',
                            autoLoad: true,
                            model: 'Atlas.admin.model.DashboardItem',
                            filters: [
                                function (item) {
                                    return item.get('isDefault') != true
                                }

                            ],
                            proxy: {
                                url: 'system/rx/dashboardmaster'
                            }
                        },
                        menuDashboardItems: {
                            type: 'clonestore',
                            autoLoad: true,
                            listeners: {
                                load: 'onMenuDashboardLoad'
                            },
                            proxy: {
                                extraParams: {
                                    pMenuID: record.get('menuID')
                                },
                                url: 'system/rx/dashboardmenuaccess'
                            }
                        }
                    },
                    parent: me.getViewModel() //windows need to have the VM chain added to them
                },

                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'displayfield',
                            value: helpText,
                            width: '100%'
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            text: 'Update',
                            handler: 'doUpdate',
                            iconCls: 'x-fa fa-pencil',
                            //hidden: record.get('menuID') == 0 ? true : false
                            hidden: record.get('menuID') === 0 // same as above
                        },
                        {
                            text: 'Add',
                            handler: 'doUpdate',
                            iconCls: 'fa fa-plus-circle',
                            // hidden: record.get('menuID') == 0 ? false : true
                            hidden: record.get('menuID') !== 0  // same as above
                        },
                        {
                            text: 'Cancel',
                            iconCls: 'fa fa-close',
                            handler: 'doClose'
                        }
                    ]
                }],
                layout: 'fit',
                bodyPadding: '10',
                items: [
                    {
                        xtype: 'admin-menusadminform'
                    }]
            });
            view.add(win).show();
            if (record) {
                win.down('form').loadRecord(record);
            }
        }


    },

    onDelete: function () {
        var refs = this.getReferences(),
            tree = refs.menuTree,
            node = tree.getSelection()[0],
            store = this.getViewModel().get('adminmenuitems'),
            saveData;

        if ((node && node.get('level') !== 0 )) {

            Ext.Msg.show({
                title: 'Delete',
                message: 'Are you sure you would like to delete ' + node.get('menuTitle') + '? Child menus will also be deleted.',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,

                fn: function (btn) {
                    if (btn === 'yes') {

                        saveData = Atlas.common.utility.Utilities.saveData(
                            [], //stores array of stores
                            'system/rx/delsystemmenus/update', //url
                            null, //temptablenames
                            [false], //trackingRemoved
                            {
                                pMenuID: node.get('menuID')
                            },
                            [{"Save": {"key": "mode", "value": "Update"}}],
                            [] //returnfields
                        );

                        /* if (saveData != null ) { //todo: && saveData.message == "Successful"
                         store.load();
                         }*/
                        // you can't have a node with no children not be a leaf
                        /*store.remove(store.findRecord('menuID', node.get('menuID')));
                         var parentRecord;
                         if (node && !node.get('root')) {
                         parentRecord = store.findRecord('menuID', node.get('parentMenuID'));
                         //var children = store.data.filter('parentMenuID',node.get('parentMenuID'));
                         var children = store.findRecord('parentMenuID', node.get('parentMenuID'));
                         if (!children)
                         {
                         var pFieldsText = parentRecord.get('menuTitle') + '|' + parentRecord.get('maxRunning') + '|' + parentRecord.get('iconName') + '|' + parentRecord.get('programName') + '|' + (parentRecord.get('defaultMenu') || false) + '|' + parentRecord.get('allowExtAccess') + '|' + parentRecord.get('xType') + '|' + parentRecord.get('iconCLS') + '|' + parentRecord.get('route') + '|' + true;

                         //form.updateRecord(record);
                         saveData = Atlas.common.utility.Utilities.saveData(
                         [], //stores array of stores
                         'system/rx/systemmenus/update', //url
                         null, //temptablenames
                         [false], //trackingRemoved
                         {
                         pMenuID: parentRecord.get('menuID'),
                         pParentMenuID: parentRecord.get('parentMenuID'),
                         pMenuOrder: parentRecord.get('MenuOrder'),
                         pFieldList: 'menuTitle,maxRunning, iconName,programName,defaultMenu,allowExtAccess,xType,iconCLS,route,leaf',
                         pFields: pFieldsText
                         },
                         [{"Save": {"key": "mode", "value": "Update"}}],
                         [] //returnfields
                         );
                         store.load();
                         }


                         }*/
                        if (saveData.code === 0) {
                            store.load();
                        }
                    }

                }
            });
        }


    }, /*,
     onItemExpand:function(){
     //debugger;
     var me =this;
     },*/

    onExpand: function () {
        // the store loads on expand, and this seems to be causing some kind of infinite loop
        this.getView().down('treepanel').expandAll();
    },

    onCollapse: function () {
        this.getView().down('treepanel').collapseAll();
    },

    onAssign: function () {
        var refs = this.getReferences(),
            tree = refs.menuTree,
            node = tree.getSelection()[0],
            assign = refs.groupsgrid.getSelection(),
            gustore = this.getViewModel().get('groupusers'),
            gstore = this.getViewModel().get('groups');

        // setIdxMenuGroupData
        //gustore.insert(0,assign);
        if (assign.length > 0) {
            for (var i in assign) {
                var record = assign[i],
                    saveData = Atlas.common.utility.Utilities.saveData(
                        [], //stores array of stores
                        'system/rx/idxmenugroupdata/update', //url
                        null, //temptablenames
                        [false], //trackingRemoved
                        {
                            pMenuID: node.get('menuID'),
                            pGroupID: record.get('groupId')
                            // pData: record.get('ttActive') + '|' + record.get('ttAlert') + '|' + record.get('ttRuleName') + '|' + record.get('ttRuleLevel') + '|' + record.get('ttRuleSeq') + '|' + record.get('ttSegmentID') + '|' + record.get('ttdataSource') + '|' + record.get('ttTransactionType') + '|' + record.get('ttIfTrueDoWhat') + '|' + record.get('ttNCPDPerrCd') + '|' + record.get('ttsecNCPDPerrC') + '|' + record.get('ttDURRsnCode') + '|' + record.get('ttErrintDesc') + '|' + Ext.Date.format(record.get('ttEffdate'), 'n/j/Y') + '|' + Ext.Date.format(record.get('ttTermDate'), 'n/j/Y')
                        },
                        [{"Save": {"key": "mode", "value": "Update"}}],
                        [] //returnfields
                    );
            }

            gustore.load();
        }
        else {
            Ext.Msg.alert('Message', 'Please select a group.');
        }
    },

    onUnAssign: function () {
        var refs = this.getReferences(),
            tree = refs.menuTree,
            node = tree.getSelection()[0],
            unassign = refs.assignedgroupsgrid.getSelection(),
            gustore = this.getViewModel().get('groupusers'),
            gstore = this.getViewModel().get('groups');

        if (unassign.length > 0) {
            for (var i in unassign) {
                var record = unassign[i],
                    saveData = Atlas.common.utility.Utilities.saveData(
                        [], //stores array of stores
                        'system/rx/delidxmenugroup/update', //url
                        null, //temptablenames
                        [false], //trackingRemoved
                        {
                            pMenuID: node.get('menuID'),
                            pGroupID: record.get('groupID')
                            // pData: record.get('ttActive') + '|' + record.get('ttAlert') + '|' + record.get('ttRuleName') + '|' + record.get('ttRuleLevel') + '|' + record.get('ttRuleSeq') + '|' + record.get('ttSegmentID') + '|' + record.get('ttdataSource') + '|' + record.get('ttTransactionType') + '|' + record.get('ttIfTrueDoWhat') + '|' + record.get('ttNCPDPerrCd') + '|' + record.get('ttsecNCPDPerrC') + '|' + record.get('ttDURRsnCode') + '|' + record.get('ttErrintDesc') + '|' + Ext.Date.format(record.get('ttEffdate'), 'n/j/Y') + '|' + Ext.Date.format(record.get('ttTermDate'), 'n/j/Y')
                        },
                        [{"Save": {"key": "mode", "value": "Update"}}],
                        [] //returnfields
                    );
            }

            gustore.load();
        }
        else {
            Ext.Msg.alert('Message', 'Please select a group.');
        }
    },

    onGroupUserChange: function () {
        // debugger;
        var me = this,
            gustore = this.getViewModel().get('groupusers'),
            gstore = this.getViewModel().get('groups');
        if (gstore) {
            gstore.clearFilter();
            gstore.filterBy(function (srecord) {
                return gustore.findExact('groupID', srecord.get('groupId')) == -1
            });

        }
    },

    btnAdvancedSecuritySettingClick: function () {

        var me = this,
            view = me.getView();
        var paramData = me.getViewModel().get('param');

        var win = Ext.create({
            xtype: 'admin_menuadvancedsecuritysettings',
            extraParams: {
                'pRecord': paramData
            }
        });

        view.add(win).show();
        // me.getView().down("#btnAdvancedSecuritySetting").setDisabled(true);
        //me.getView().down('#assignedgroupsgrid').getView.refresh();
    },

    assignedgroupsgrid_itemclick: function (dv, record, item, index, e) {

        var me = this;

        var setParam = {
            menuID: me.getViewModel().get('menuRecord').data.menuID,
            groupID: record.data.groupID,
            groupName: record.data.groupName
        };
        me.getViewModel().set('param', setParam);

        if (record.data) {
            this.getView().down("#btnAdvancedSecuritySetting").setDisabled(false);
        }
        else {
            this.getView().down("#btnAdvancedSecuritySetting").setDisabled(true);
        }

    },

    assignedgroupsgrid_itemdblclick: function (dv, record, item, index, e) {
        var me = this;
        if (record.data.allowExtAccess)
            me.lookupReference('cbxExternalAcccesAllowed').setValue('yes');
        else
            me.lookupReference('cbxExternalAcccesAllowed').setValue('no');
    }
});