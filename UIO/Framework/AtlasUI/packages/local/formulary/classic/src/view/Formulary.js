Ext.define('Atlas.formulary.view.Formulary', {
    extend: 'Ext.panel.Panel',
    xtype: 'formulary-formulary',

    requires: [
        'Ext.panel.Panel'
    ],

    region: 'center',
    title: 'Formulary',
    items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                {
                    html: '<b>Coverage Plans</b></br></br>'
                },
                {
                    xtype: 'grid',
                    frame: true,
                    columns: [
                      {
                        text: 'Plan',
                        flex: 2
                      },
                      {
                        text: 'Document',
                        flex: 1
                      }
                    ]
                }
              ]
        }]
});
