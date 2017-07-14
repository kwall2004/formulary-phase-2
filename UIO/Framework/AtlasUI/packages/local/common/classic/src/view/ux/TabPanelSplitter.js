/**
 * The ProSvc.ux.TabPanelSplitter plugin adds the ability to add {@link Ext.tab.Panel TabPanels} or remove and merge
 * existing {@link Ext.tab.Panel TabPanels}. This plugin is to include in the container that owns the
 * {@link Ext.tab.Panel TabPanels}.
 *
 * By calling {@link #split} a new empty {@link Ext.tab.Panel} is added.
 * If two {@link Ext.tab.Panel TabPanels} have been merged before, then the tabs that have been in the removed
 * {@link Ext.tab.Panel} are added to the new {@link Ext.tab.Panel TabPanels} again.
 *
 * Calling {@link #merge} merges the last two {@link Ext.tab.Panel TabPanels} of the owning container. The tabs of
 * the last {@link Ext.tab.Panel} are added to the second last {@link Ext.tab.Panel} and the last {@link Ext.tab.Panel}
 * is removed.
 */
Ext.define('Atlas.common.view.ux.TabPanelSplitter', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.tabpanelsplitter',

    /**
     * @cfg {Number} mergeButton
     * A component query ({@link Ext.ComponentQuery#query}) that identifies the merge button.
     * Useful for automatically disabling the merge button if only one {@link Ext.tab.Panel} is left in the owning
     * container.
     */
    mergeButton: undefined,

    init: function (container) {
        var me = this;

        me.container = container;

        container.tabPanelSplitter = me;

        if (me.mergeButton) {
            me.mergeButton = Ext.first(me.mergeButton);
        }
    },

    /**
     * Adds a new {@link Ext.tab.Panel}.
     * If two {@link Ext.tab.Panel TabPanels} have been merged before, then the tabs that have been in the removed
     * {@link Ext.tab.Panel} are added to the new {@link Ext.tab.Panel TabPanels} again.
     */
    split: function () {
        var me = this,
            lastTabPanelIndex = me.getLastTabPanelIndex(),
            lastTabPanel = me.getLastTabPanel(),
            itemsToAdd;

        itemsToAdd = Ext.Array.filter(lastTabPanel.items.items, function (item) {
            return item.origTabPanel == lastTabPanelIndex + 1;
        });

        me.container.add({
            xtype: 'tabpanel',
            defaults: {
                scrollable: true,
                closable: true,
                focusable: true,
                listeners: {
                    close: 'onWorkspaceTabClose'
                }
            },
            items: itemsToAdd
        });

        if (me.mergeButton) {
            me.mergeButton.setDisabled(!me.allowMerge());
        }
    },

    /**
     * Merges the last two {@link Ext.tab.Panel TabPanels} of the owning container. The tabs of
     * the last {@link Ext.tab.Panel} are added to the second last {@link Ext.tab.Panel} and the last
     * {@link Ext.tab.Panel} is removed.
     */
    merge: function () {
        var me = this,
            container = me.container,
            containerItems = container.items,
            containerItemsLn = containerItems.length,
            lastTabPanel, secondLastTabPanel;

        if (containerItemsLn > 1) {
            lastTabPanel = containerItems.getAt(containerItemsLn - 1);
            secondLastTabPanel = containerItems.getAt(containerItemsLn - 2);

            // set origTabPanel
            Ext.Array.map(lastTabPanel.items.items, function (item) {
                item.origTabPanel = containerItemsLn - 1;
            });

            secondLastTabPanel.add(lastTabPanel.items.items);

            lastTabPanel.destroy();

            if (me.mergeButton) {
                me.mergeButton.setDisabled(!me.allowMerge());
            }
        }
    },

    /**
     * @private
     */
    allowMerge: function () {
        return this.container.items.length > 1;
    },

    /**
     * @private
     */
    getLastTabPanelIndex: function () {
        var me = this,
            container = me.container;

        return container.items.length - 1;
    },

    /**
     * @private
     */
    getLastTabPanel: function () {
        var me = this,
            container = me.container;

        return container.items.getAt(me.getLastTabPanelIndex());
    }

});