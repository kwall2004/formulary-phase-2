Ext.define('Atlas.admin.view.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-dashboard',

    init: function() {
        var store = this.getViewModel().get('dashboardItems');
        this.addedRow = false;
        store.getProxy().setExtraParam('pDashboardID', 0);
        store.load();
    },

    addRecord: function(){
        if (!this.addedRow) {
            var store = this.getViewModel().get('dashboardItems'),
                newRecord = new Atlas.admin.model.DashboardModel({});
            newRecord.data.dashboardHeight = 300;
            store.insert(0, newRecord);
            this.getView().down('[reference=admindashboard]').plugins[0].startEdit(0, 0);
            this.getView().down('[reference=admindashboard]').getView().refresh();
            this.addedRow = true;
        }
        else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
    },

    removeRecord: function(editor,context){

        var me = this,
            grid = me.getView().down('grid');
        grid.findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();
        if(sm.getSelection().length >0) {
            sm.getSelection()[0].data.IsDeleted = true;
            grid.store.remove(sm.getSelection());
            this.getViewModel().set('changed', true);
            if (grid.store.getCount() > 0) {
                sm.select(0);
            }
        }

        this.addedRow = false;
    },


    beforeEdit:function(editor,context)
    {
        var grid = this.lookupReference('admindashboard').getView();
        if (!grid.grid.plugins[0].editing) {
            if (context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
            {
                if (context.record && context.record.phantom) {
                    grid.store.removeAt(context.rowIdx);
                    return false;
                }

            }
        }
        else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
    },

    cancelEditButton: function (editor, context) {
        //debugger;
        if(context.record.phantom)
            context.grid
                .store.removeAt(context.rowIdx);
        this.addedRow = false;
    },


    completeEdit: function (editor, context) {
        if (context.record.dirty) {
            context.record.set('isNeedUpdate', true);
           // this.getDashboardRecord();
        }

        this.addedRow = false;
    },

    getDashboardRecord: function () {
        // debugger;
        var grid = this.lookupReference('admindashboard');
        if (grid) {
            return grid.getSelection()[0];
        }
    },

    onUndoChangeClick: function (button) {
        //debugger;
        var grid = this.lookupReference('admindashboard').getView();
        var record =  button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {
            grid.store.remove(record);
            grid.up().findPlugin('rowediting').cancelEdit();
        }
    },


    saveGrid: function(){
        var store = this.getViewModel().get('dashboardItems');
        var recs = store.getModifiedRecords();
        var grid = this.lookupReference('admindashboard').getView();
        if (!grid.grid.plugins[0].editing) {
            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];

            for (var i = 0; i < recs.length; i++) {
                var r = recs[i];
                var extraParameters = {
                    pDashboardID: r.get('dashboardId') || 0,
                    pMode: r.crudState == "C" ? "A" : "U",
                    pFieldList: 'dashboardName,dashboardDesc,dashboardProgramName,dashboardSortOrder,dashboardIcon,dashboardHeight,isDefault',
                    pFields: r.get('dashboardName') + '|' + r.get('dashboardDesc') + '|' + r.get('dashboardProgramName') + '|' + r.get('dashboardSortOrder') + '|' + r.get('dashboardIcon') + '|' + r.get('dashboardHeight') + '|' + r.get('isDefault')
                };
                var savedashboard = Atlas.common.utility.Utilities.saveData([{}], 'system/rx/dashboardmaster/update', null, [false], extraParameters,
                    saveAction, ['']);
                if (savedashboard) {
                    this.init();
                }
            }
            recs = store.getRemovedRecords();
            for (var i = 0; i < recs.length; i++) {
                var r = recs[i];
                var extraParameters = {
                    pDashboardID: r.get('dashboardId') || 0,
                    pMode: "D",
                    pFieldList: 'dashboardName,dashboardDesc,dashboardProgramName,dashboardSortOrder,dashboardIcon,dashboardHeight,isDefault',
                    pFields: r.get('dashboardName') + '|' + r.get('dashboardDesc') + '|' + r.get('dashboardProgramName') + '|' + r.get('dashboardSortOrder') + '|' + r.get('dashboardIcon') + '|' + r.get('dashboardHeight') + '|' + r.get('isDefault')
                };
                var savedashboard = Atlas.common.utility.Utilities.saveData([{}], 'system/rx/dashboardmaster/update', null, [false], extraParameters,
                    saveAction, ['']);

                if (savedashboard) {
                    this.init();
                }
            }
        }
        else
        {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            return false;
        }
    },
    onReject: function (btn) {
        //
        var grid = this.lookupReference('admindashboard').getView();
        var editor = grid.up().findPlugin('rowediting');
        var dashboardItems = this.getViewModel().getStore('dashboardItems');
        var rec = btn.up().getViewModel().data.record;
        if (rec.crudState=='C'){
            editor.disabled=true;
            dashboardItems.remove(rec);
            editor.disabled=false;
            return;

        }
         editor.disabled=true;
        rec.reject();
        editor.disabled=false;
        //reset the state
        rec.set('isNeedUpdate', false);

        //this.lookupReference('admindashboard').getView().refresh();

    }

});