Ext.define('Atlas.provider.view.priorauthforms.PriorAuthForms', {
    extend: 'Ext.panel.Panel',
    xtype: 'prescriberportal-priorauthforms-priorauthforms',

    title: 'Prior Auth Forms',

    items: [{
        xtype: 'panel',
        title: 'Prior Auth Forms',
        frame: false,

        items: [{
            xtype: 'panel',
            frame: false,
            html: '<a href="#">Medicaid Prior Auth Request Form</a>'
        },{
            xtype: 'prescriberportal-priorauthforms-tree'
        }]
    }]
});
