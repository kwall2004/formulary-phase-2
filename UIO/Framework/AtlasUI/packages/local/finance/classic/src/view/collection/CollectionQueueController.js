Ext.define('Atlas.finance.view.collection.CollectionQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-collectionqueue',
    id: 'controller-finance-collectionqueue',

    init: function () {
        var me = this,
            storeRequiredCollection = me.retrieveStore('requiredCollection'),
            storePendingCollection = me.retrieveStore('pendingCollection'),
            storeApprovedCollection = me.retrieveStore('approvedCollection'),
            storeQueueList = me.retrieveStore('queueList');

        storeRequiredCollection.load({
            scope: this,
            callback: function (record1, operation1, success1) {
                if (Ext.decode(operation1.getResponse().responseText).message[0].code == 0) {
                    me.getView().getReferences().requiredletters.setTitle('Required Collection' + '/Credit Letters (' + Ext.decode(operation1.getResponse().responseText).metadata.total + ')');
                }
            }
        });
        storePendingCollection.load({
            scope: this,
            callback: function (record1, operation1, success1) {
                if (Ext.decode(operation1.getResponse().responseText).message[0].code == 0) {
                    me.getView().getReferences().pendingletters.setTitle('Pending Collection' + '/Credit Letters (' + Ext.decode(operation1.getResponse().responseText).metadata.total + ')');
                }
            }
        });
        storeApprovedCollection.load({
            scope: this,
            callback: function (record1, operation1, success1) {
                if (Ext.decode(operation1.getResponse().responseText).message[0].code == 0) {
                    me.getView().getReferences().approvedletters.setTitle('Approved Collection' + '/Credit Letters (' + Ext.decode(operation1.getResponse().responseText).metadata.total + ')');
                }
            }
        });

        storeQueueList.getProxy().setExtraParam('pQueueListID', 12);
        storeQueueList.load();
    },

    renderHrsRemain: function(value){
        var filteredval = (Math.round(value * 100) / 100).toFixed(2);
        if(filteredval.indexOf("-")==-1)
            filteredval = '<font color="green">'+ filteredval+'</font>';
        else
            filteredval = '<font color="red">'+ filteredval+'</font>';
        return filteredval;
    },

    onLetterClick: function (btn) {
        var me = this,
            view = me.getView(),
            // grid = btn.up('grid'),
            record = btn._rowContext.record,
            //node = view.up('merlinworkspace').getViewModel().get('menuitems').findNode('route','merlin/finance/collection_Collection'),
            atlasId = record.get('CollectionCreditID'),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/finance/collection_Collection');

        me.fireEvent('openView', 'merlin', 'finance', 'collection_Collection', {
            // atlasId: atlasId,
            atlasId: atlasId,
            menuId: menuId
        });
    },

    retrieveStore: function(store){
        return this.getViewModel().getStore(store);
    }
});