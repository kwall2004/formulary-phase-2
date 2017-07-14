Ext.define('Atlas.common.view.sharedviews.DeterminationHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeterminationHistoryController',

    listen: {
        controller: {
            '*': {
                SearchMemberPAHistory: 'SearchMemberPAHistory'
            }
        }
    },

    SearchMemberPAHistory: function (keyType, keyValue, EventUUID) {
        // debugger;
        var me = this;
        var view = this.getView();
        var actTab = view.up('[reference = workspaceTabs]').getActiveTab();
        var x = actTab.down(view);
        if (x && x==view) {

            var vm = this.getViewModel(),
                MemberDeteminationHistory = vm.getStore('MemberDeteminationHistory'),
                parentViewID = vm.get('CDAGInstanceUUID') ;
            if(!parentViewID)
            {
                parentViewID = actTab.parentViewID;
            }

            if (EventUUID != '' && EventUUID != parentViewID) {
                return;
            }

            view.down('pagingtoolbar').moveFirst();

            MemberDeteminationHistory.getProxy().setExtraParam('pKeyType', keyType);
            MemberDeteminationHistory.getProxy().setExtraParam('pKeyValue', keyValue);
            MemberDeteminationHistory.load();

        }
    },

    onItemdblclick: function(grid, rowIndex, colIndex) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain'),
            authID = rowIndex.data.AuthID;

        me.fireEvent('openView', 'merlin', 'authorization', 'cdag_CDAGMain', {
            atlasId: authID,
            menuId: menuId,
            activeTab: 0
        }, null);
    }

});