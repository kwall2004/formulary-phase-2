/**
 * Created by T4317 on 10/5/2016.
 */
Ext.define('Atlas.common.view.sharedviews.combos.ContactLogTypeCombo', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'common-contacttypecombo',
    store:{
        model: 'Atlas.common.model.ContactLogType',
        remoteSort:true,
        remoteFilter: true
    },
    displayField:'name',
    valueField:'value'
});
