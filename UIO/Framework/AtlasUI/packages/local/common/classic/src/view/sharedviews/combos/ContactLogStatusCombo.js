/**
 * Created by T4317 on 10/5/2016.
 */
Ext.define('Atlas.common.view.sharedviews.combos.ContactLogStatusCombo', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'common-contactstatuscombo',
    store:{
        model: 'Atlas.common.model.ContactLogStatus',
        remoteSort:true,
        remoteFilter: true
    },
    displayField:'name',
    valueField:'value'
});
