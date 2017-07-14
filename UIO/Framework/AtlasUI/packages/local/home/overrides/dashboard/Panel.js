Ext.define('Atlas.home.overrides.dashboard.Panel', {
    override: 'Ext.dashboard.Panel',

    closable: false,
    collapsed: true, //we start collapsed

    config: {
        showHelp: false
    },

    //First time expand logic
    expandedPanels: new Array(),

    initComponent: function () {
        var me = this;

        me.tools = [{
            type: 'refresh',
            callback: me.onRefresh
        }];

        if (me.getShowHelp()) {
            me.tools.push({
                type: 'help',
                callback: me.onHelp
            });
        }

        me.callParent();
    },

    onRefresh: function (panel) {
        var grid = panel.down('grid');
        if (!grid) return false;
        var store = grid.getStore();
        if (!!store) store.load();
    },

    onHelp: function (panel) {
        console.log('Method onHelp missing from class');
    },

    listeners:{
        expand: function(panel, eOpts) {
            if (!panel) return false;
            var me = panel;
            if (me.expandedPanels.indexOf(me.title) == -1) {
                me.expandedPanels.push(me.title);

                var grid = me.down('grid');
                if (!grid) return false;
                var store = grid.getStore();
                if (!!store) store.load();
            }
        }
    }
});
