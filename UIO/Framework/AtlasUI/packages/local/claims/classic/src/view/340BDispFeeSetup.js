/**
 * Created by j2487 on 6/14/2017.
 */
Ext.define('Atlas.claims.view.340BDispFeeSetup',{
    extend: 'Ext.panel.Panel',
    xtype:'claims-340BDispFeeSetup',
    title:'340B Dispensing Fee',
    layout:'vbox',
    width:'100%',
    height:'100%',
    items:[
        {
            flex:1,
            xtype:'gridpanel',
            width:'100%',
            height:'100%',
            title:'340B Participating States',
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        '->',
                        {xtype:'button',text:'Add'},
                        {xtype:'button',text:'Remove'}
                    ]
                }
            ],
            columns:[
                {text:'State',flex:1},
                {text:'Line of Business',flex:1},
                {text:'Active',flex:1}
            ]
        },
        {
            flex:1,
            xtype:'gridpanel',
            width:'100%',
            height:'100%',
            title:'State Dispensing Fee',
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        '->',
                        {xtype:'button',text:'Add'},
                        {xtype:'button',text:'Remove'}
                    ]
                }
            ],
            columns:[
                {text:'Dispensing Fee',flex:1},
                {text:'Effective Date',flex:1},
                {text:'History',flex:1}
            ]
        }
    ],
    dockedItems:[{
        xtype:'toolbar',
        dock:'bottom',
        items:[
            '->',
            {xtype:'button',text:'Save'},
            {xtype:'button',text:'Cancel'}
        ]
    }]



});