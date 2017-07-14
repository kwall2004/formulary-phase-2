Ext.define('Atlas.member.view.pharmacysearch.PharmacySearchAdditionalInformation', {
     extend: 'Ext.panel.Panel',

    requires: [
        'Ext.layout.container.Accordion'
    ],
    xtype: 'member-pharmacysearch-pharmacysearchadditionalinformation',
    layout: 'accordion',

    defaults: {
        bodyPadding: 10
    },

    initComponent: function() {
        Ext.apply(this, {
            items: [{
                bodyPadding: 0,
                xtype: 'grid',
                title: 'Location, Services, Store Hours',
                hideCollapseTool: true,
                columnLines: true,
                columns: [{
                    text     : 'ROW',
                    flex     : 1
                }]
            }]
        });
        this.callParent();
    }
});
