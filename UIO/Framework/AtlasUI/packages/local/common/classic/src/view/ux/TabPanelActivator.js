/**
 * The ProSvc.ux.TabPanelActivator plugin adds the ability to set any child component (Only
 * {@link Ext.tab.Panel TabPanels} are assumed at the time of writing) as the
 * active component. This plugin is to include in the container that owns the
 * {@link Ext.tab.Panel TabPanels}.
 *
 * The first child component is set active by default. Other child components can be activated by a click,
 * or manually by calling {@link #setActiveTabPanel}.
 * The current active tab panel can be determined by calling {@link #getActiveTabPanel}.
 */
Ext.define('Atlas.common.view.ux.TabPanelActivator', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.tabpanelactivator',

    config: {
        /**
         * @cfg {Ext.tab.Panel} activeTabPanel
         * The current active tab panel
         */
        activeTabPanel: undefined
    },

    tabPanelCls: 'prosvc-ux-tabpanelactivator-tab-panel',

    activeTabPanelCls: 'prosvc-ux-tabpanelactivator-tab-panel-active',

    init: function (container) {
        var me = this;

        me.container = container;

        container.tabPanelActivator = me;

        container.items.each(function (item) {
            item.addCls(me.tabPanelCls);
        });

        me.setActiveTabPanel(container.items.getAt(0));

        container.on({
            click: {
                element: 'body',
                fn: function (e) {
                    var target = e.getTarget('.' + me.tabPanelCls),
                        targetCmp;

                    if (target) {
                        targetCmp = Ext.getCmp(target.id);

                        me.setActiveTabPanel(targetCmp);
                    }
                }
            },
            add: function (container, item) {
                item.addCls(me.tabPanelCls);

                me.setActiveTabPanel(item);
            },
            remove: function (container, item) {
                // if removed item was the active tab panel, set current last one as the new active tab panel
                if (item == me.getActiveTabPanel()) {
                    me.setActiveTabPanel(container.items.last());
                }
            }
        });
    },

    /**
     * @private
     */
    updateActiveTabPanel: function (newActiveTabPanel, oldActiveTabPanel) {
        var activeTabPanelCls = this.activeTabPanelCls;

        newActiveTabPanel.addCls(activeTabPanelCls);

        if (oldActiveTabPanel && !oldActiveTabPanel.destroyed) {
            oldActiveTabPanel.removeCls(activeTabPanelCls);
        }
    }
});