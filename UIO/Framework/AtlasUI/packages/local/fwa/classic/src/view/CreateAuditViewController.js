/**
 * Created by d3973 on 10/21/2016.
 */
Ext.define('Atlas.fwa.view.CreateAuditViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fwacreateauditviewcontroller',

    onSearchSelect: function(combo, record) {
        var me = this,
            layout = me.getView().down('#createAuditCardPanel').getLayout();
            //idOfCard = layout.activeItem.id.split('card-')[1],

        if (record.get('val') == 'Concurrent'){
            layout.setActiveItem(1);
        }
        else if (record.get('val') == 'Manual'){
            layout.setActiveItem(0);
        }
    }
});