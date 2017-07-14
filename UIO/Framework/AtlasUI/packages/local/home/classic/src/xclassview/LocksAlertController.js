Ext.define('Atlas.home.xclassview.LocksAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclasslocksalert',

    onActionItemClick: function (view, rowIndex, colIndex, item, e, record, row) {
        if (record.data.ttype === 'Fax') {
            this.openFaxQueue(record);
        } else {
            this.openLocksTab(record);
        }
    },

    onItemDblClick: function (dataview, record, item, index, e, eOpts) {
        if (record.data.ttype === 'Fax') {
            this.openFaxQueue(record);
        } else {
            this.openLocksTab(record);
        }
    },

    openFaxQueue: function (record) {
        var me=this;
        me.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
            menuId : Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar'),
            openView:true,
            LOCKFAX:true,
            subTabs:['member-memlocks'],
            subTabsOpen:true
        }, null);
    },

    openLocksTab: function (record) {
        var me = this,
            client = 'merlin',
            pkg = 'member',
            cls = 'memberlocks_MemberLocks',
            viewCls = 'Atlas.member.view.memberlocks.MemberLocks',
            locksTab = me.getLocksTab(client, viewCls),
            lockType = record.get('ttype'),
            lockStatus = record.get('ttstatus');

        if (locksTab) {
            locksTab.getController().fireEvent('refreshmemberlocks', lockType, lockStatus);
            locksTab.up().setActiveTab(locksTab);
        } else {
            me.fireEvent('openView', client, pkg, cls, {
                menuId : Atlas.common.Util.menuIdFromRoute('merlin/member/memberlocks_MemberLocks'),
                inLockType: lockType,
                inLockStatus: lockStatus
            }, null);
        }
    },

    getLocksTab: function (client, viewCls) {
        var mainCard = Ext.first('[reference=mainPanel]'),
            workspace = mainCard.child('[atlasClient=' + client + ']'),
            tabPanel = workspace.lookup('workspaceTabs'),
            tabCount = tabPanel.items.items.length,
            workTab,
            locksTab,
            i;

        for (i = 0; i < tabCount; i++) {
            workTab = tabPanel.items.items[i];
            if (workTab['$className'] === viewCls && workTab['atlasClient'] === client) {
                locksTab = workTab;
                break;
            }
        }

        return locksTab;
    }
});