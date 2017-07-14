/**
 * Created by T4317 on 10/5/2016.
 */
Ext.define('Atlas.common.view.sharedviews.combos.UsersCombo', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'common-usercombo',
    store:{
        model: 'Atlas.common.model.UserList',
        remoteSort:true,
        remoteFilter: true
    },
    displayField:'userName',
    valueField:'userName'

});
