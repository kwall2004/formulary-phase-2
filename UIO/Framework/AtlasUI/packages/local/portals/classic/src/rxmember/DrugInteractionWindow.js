Ext.define('Atlas.portals.rxmember.DrugInteractionWindow', {
    extend: 'Ext.Container',
    xtype: 'portlasrxmemberdruginteractionwindow',
    items: [
        {
            xtype: 'container',
            border: false,
            anchor: '5% 100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    style: {
                        marginTop: '20px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            border: false,
                            html: '<center><b>Drug to Drug Interaction</b></center>',
                            style: {
                                fontSize: '15px',
                                padding: '0 0 15px 30px'
                            }
                        }
                    ]
                },
                {
                    xtype: 'label',
                    itemId: 'lblDrug1'
                },
                {
                    xtype: 'label',
                    itemId: 'lblDrug2'
                },
                {
                    xtype: 'label',
                    itemId: 'lblText'
                }
            ]
        }
    ]
});