Ext.define('Atlas.member.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-main-main',

    viewModel : 'memberMainModel', //some changes to the base model - just static data for now

    bind: {
        title: 'Member {atlasId}'
    },
    items: [
        {
            xtype: 'panel',
            flex:1,
            bind: {
                html: '<p>This is a member module</p><p>Some Info : <br> client: {client} <br> AtlasId: {atlasId} </p>'
            }
        },
        {
            xtype: 'panel',
            reference: 'sectionPanel',
            flex: 1,
            minHeight: 600,
            split: true,
            collapseMode: 'mini',
            items:[]

        }

    ]

});
