Ext.define('Atlas.home.view.PharmacyAuditAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.pharmacyauditalert',

    viewTemplate: {
        iconCls: 'icon-pharmacy,9',
        title: '~pharmacyAudit.title',
        showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.PharmacyAuditAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});