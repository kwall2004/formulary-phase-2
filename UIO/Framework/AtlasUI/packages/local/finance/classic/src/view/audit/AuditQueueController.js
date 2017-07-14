Ext.define('Atlas.finance.view.audit.AuditQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-auditqueue',

    init: function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            takebacksReqStore = vm.getStore('audittakebacksrequired');
/*
        takebacksReqStore.on({
            load: 'onTakebacksReqLoad',
            scope: me
        });*/

        //load the store
        takebacksReqStore.load({
            scope: this,
            callback: function (record1, operation1, success1) {
                if (Ext.decode(operation1.getResponse().responseText).message[0].code == 0) {
                    me.getView().getReferences().takebacksrequiredgrid.setTitle('Required Audit Takebacks <span class="m-red-color">(' + Ext.decode(operation1.getResponse().responseText).metadata.total  + ')</span>');
                }
            }
        });
    },

    refreshPage: function(){
        var me = this,
            vm = me.getViewModel(),
            takebacksReqStore = vm.getStore('audittakebacksrequired');

        takebacksReqStore.load();
    },

   /* onTakebacksReqLoad: function (store, records, success) {
        var me = this,
            view = me.getView(),
            takebacksReqGrid = view.getReferences().takebacksrequiredgrid;

        if (success) {
            takebacksReqGrid.setTitle('Required Audit Takebacks <span class="m-red-color">(' + Ext.decode(operation1.getResponse().responseText).metadata.total  + ')</span>');
            records.forEach(function(element){
                element.set('LetterSentDate', Ext.Date.utcToLocal(element.get('LetterSentDate')));
            });
            store.commitChanges();
        }
    },*/

    onActionItemClick: function (view, rowIndex, colIndex, item, e, record, row) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/finance/audit_Audit'),
          /*  node = me.getView().up('merlinworkspace').getViewModel().get('menuitems').findNode('route','merlin/finance/audit_Audit'),
            menuId = node.get('menuID'),*/
            tabLayout = Ext.first('[reference=workspaceTabs]'),
            isAuditTabOpen = false,
            auditTabIndex = 0;

        //check if the audit takeback tab is open
        for (var i = 0, n = tabLayout.items.length; i < n; ++i) {
            if (tabLayout.items.items[i].title === 'Audit Takebacks') {
                isAuditTabOpen = true;
                auditTabIndex = i;
            }
        }

        //if the audit takeback tab exists activate it and fire the event to set the audit id, else open new tab
        if (isAuditTabOpen) {
            tabLayout.setActiveItem(auditTabIndex);
            this.fireEvent('searchaudittakebacks', record.get('auditID'));
        } else {
            me.fireEvent('openView', 'merlin', 'finance', 'audit_Audit', {
                auditId: record.get('auditID'),
                menuId: menuId
            });
        }
    },

    onRecordSelect: function (grid, rec) {
        var me = this;

        me.onActionItemClick(null, null, null, null, null, rec, null);
    }
});