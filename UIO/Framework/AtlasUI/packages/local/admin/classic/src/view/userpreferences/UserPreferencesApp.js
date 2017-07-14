/**
 * Created by mrabahnasr on 6/10/2016.
 */

Ext.define('Atlas.admin.view.userpreferences.UserPreferencesApp', {
    extend: 'Ext.panel.Panel',
    xtype: 'UserPreferencesApp',
    items: [
        {xtype: 'UserPreferences'}
    ],
    title:'User Preferences'
});

