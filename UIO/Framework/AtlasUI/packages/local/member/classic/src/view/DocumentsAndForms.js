Ext.define('Atlas.member.view.DocumentsAndForms', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-documentsandforms',

    requires: [
        'Ext.panel.Panel'
    ],

    region: 'center',
    title: 'Documents & Forms',
    items: [

              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                {
                    html: '<b>Documents & Forms</b></br></br>'
                },
                {
                    xtype: 'grid',
                    frame: true,
                    columns: [
                      {
                        text: 'Document',
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
