Ext.define('Atlas.home.view.ClaimAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.claimalert',

    viewTemplate: {
        iconCls: 'icon-claimalert,3',
        title: '~claim.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        listeners:{
            expand: function (p, eOpts) {
                this.down('dashboard-claimalert').controller.onFirstLoad('');
            }
        },
        items:{
            xclass: 'Atlas.home.xclassview.ClaimAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});