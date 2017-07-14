/**
 * This plugin is an extension of the ProSvc.ux.TabReorderer plugin.
 * It not only allows reordering of tabs within a TabPanel, but also between TabPanels.
 */
Ext.define('Atlas.common.view.ux.TabReordererOnSteroids', {

    extend: 'Atlas.common.view.ux.BoxReordererOnSteroids',
    alias: 'plugin.tabreordereronsteroids',

    itemSelector: '.' + Ext.baseCSSPrefix + 'tab',

    init: function(tabPanel) {
        var me = this;

        me.callParent([tabPanel.getTabBar()]);

        // Ensure reorderable property is copied into dynamically added tabs
        tabPanel.onAdd = Ext.Function.createSequence(tabPanel.onAdd, me.onAdd);

        tabPanel.tabReorderer = me;
    },

    onBoxReady: function() {
        var tabs,
            len,
            i = 0,
            tab;

        this.callParent(arguments);

        // Copy reorderable property from card into tab
        for (tabs = this.container.items.items, len = tabs.length; i < len; i++) {
            tab = tabs[i];
            if (tab.card) {
                tab.reorderable = tab.card.reorderable;
            }
        }
    },

    onAdd: function(card, index) {
        card.tab.reorderable = card.reorderable;
    },

    afterBoxReflow: function() {
        var me = this,
            dragCmpCard,
            wasActiveCard,
            origContainerNewActiveCard;

        // Cannot use callParent, this is not called in the scope of this plugin, but that of its Ext.dd.DD object
        Atlas.common.view.ux.BoxReordererOnSteroids.prototype.afterBoxReflow.apply(me, arguments);

        if (me.dragCmp) {
            if (me.origContainer) {
                dragCmpCard = me.dragCmp.card;
                wasActiveCard = me.origContainer.tabPanel.layout.activeItem == dragCmpCard;

                // deleting the tab reference here, as the tabPanel.insert's remove method is doing some setActivePanel
                // logic in tabPanel's doRemove "if (item.tab && (toActivate ...)" that clears the active item
                // Test: 1. select tab-b3 2. move tab-b2 to panel 1
                delete dragCmpCard.tab;

                me.container.tabPanel.insert(me.curIndex, dragCmpCard);
                me.container.tabPanel.setActiveTab(dragCmpCard);

                if (wasActiveCard) {
                    me.origContainer.tabPanel.layout.activeItem = null;
                    origContainerNewActiveCard = me.origContainer.tabPanel.items.getAt(me.origIndex) || me.origContainer.tabPanel.items.getAt(me.origIndex - 1);

                    if (origContainerNewActiveCard) {
                        origContainerNewActiveCard.hidden = true;
                        me.origContainer.tabPanel.setActiveTab(origContainerNewActiveCard);
                    }
                }

                // when inserting a new card, it automatically gets a new tab, therefore we destroy the old one here
                me.dragCmp.destroy();

                // reset container to original one
                me.container = me.origContainer;

                delete me.origIndex;
                delete me.origContainer;
            } else {
                // Move the associated card to match the tab order
                me.container.tabPanel.setActiveTab(me.dragCmp.card);
                me.container.tabPanel.move(me.dragCmp.card, me.curIndex);
            }
        }
    }
});