Ext.define('Atlas.portals.provider.MemberCOBViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.membercob',



    afterRender: function () {
        this.loadGrid();
    },

    loadGrid: function () {
        var cobGrid = this.getViewModel().getStore('cobgrid'),
            recipientId = this.getView().up().up().getViewModel().data.recipientId;

        cobGrid.getProxy().setExtraParam('pWhere', 'recipientID = ' + recipientId);

        cobGrid.load();

    }

});