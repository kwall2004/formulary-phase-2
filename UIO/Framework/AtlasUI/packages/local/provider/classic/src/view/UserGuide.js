Ext.define('Atlas.provider.view.UserGuide', {
    extend: 'Ext.panel.Panel',
    xtype: 'prescriberportal-userguide',
    title: 'User Guide',
    frame: false,

    items: [{
        xtype: 'container',
        frame: false,

        items: [{
            xtype: 'label',
            text: 'Show PDF Here'
        }]
    }]
});
