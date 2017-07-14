Ext.define('Atlas.benefitplan.view.configuration.Main', {
    extend: 'Ext.panel.Panel',
    title: 'Tenant Family Configuration',
	itemId: 'configurationviewtop',
    controller: 'benefitplan-mainconfigurationcontroller',
	atlasId: 0,
    viewtype: 10,
    rootsk: 0,
    layout: 'border',
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
	items: [{
        xtype: 'panel',
        itemId: 'benefitplan-tenanthierarchy-tree-panel',
        title: 'Tenant Hierarchy',
        region: 'west',
        split: true,
        width: 250,
        collapsible: true,
        collapseDirection: 'left',
        layout: 'fit',
        items: [{
            xtype: 'benefitplan-tenanthierarchy-tree',
            itemId: 'benefitplan-tenanthierarchy-tree'
        }]
    }, {
        itemId: 'configuration-detail-section',
        split: true,
        region: 'center',
        layout: 'fit'

    }]
});

