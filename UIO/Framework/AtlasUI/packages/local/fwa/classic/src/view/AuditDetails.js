/**
 * Created by d3973 on 10/21/2016.
 */
Ext.define('Atlas.fwa.view.AuditDetails', {
    extend: 'Ext.panel.Panel',
    xtype: 'view-fwaauditdetails',
    title: 'Audit Details',

    controller: 'fwaauditinfocontroller',
    viewModel: 'fwaauditinfoviewmodel',

    layout: 'vbox',

    items: [{
        title: 'Audit',
        flex: 3
    }, {
        title: 'Fax/Attachments',
        flex: 2
    }]
});