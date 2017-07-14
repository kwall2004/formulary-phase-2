Ext.define('Atlas.portals.rxmember.EstimatedCopayWindow', {
    extend: 'Ext.Container',
    xtype: 'portalsrxmemberestimatedcopaywindow',
    controller: 'portalsrxmemberestimatedcopaywindow',
    items: [
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'textfield',
                    reference: 'zipCode',
                    fieldLabel: 'Zip Code',
                    emptyText: 'Enter your Zip code',
                    allowBlank: false,
                    labelWidth: 60,
                    width: 200
                },
                {
                    xtype: 'displayfield',
                    reference: 'drugCode',
                    hidden: true,
                    bind: {
                        value: '{drugRecord.DrugCode}'
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Drug',
                    bind: {
                        value: '{drugRecord.LN}'
                    },
                    labelWidth: 35,
                    width: 275
                },
                {
                    xtype: 'numberfield',
                    reference: 'quantity',
                    fieldLabel: 'Quantity',
                    allowBlank: false,
                    labelWidth: 50,
                    width: 150,
                    value: 30
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    iconCls: 'x-fa fa-search',
                    flex: 1,
                    handler: 'refreshPharmacies'
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [
                {
                    xtype: 'gridpanel',
                    cls: 'overflowGrid',
                    flex: 1,
                    height: 420,
                    maxHeight: '420',
                    bind: {
                        store: '{drugPrices}'
                    },
                    columns: [
                        {
                            text: 'Pharmacies',
                            flex: 2,
                            cellWrap: true,
                            variableRowHeight: true,
                            renderer: function (value, metaData, record) {
                                var title = '<b>' + record.get('PharmacyName') + '</b>',
                                    address = '<span>' + record.get('Address1') + ' ' + record.get('Address2') + '</span>',
                                    details = '<span>' + record.get('City') + ', ' + record.get('State') + ' ' + record.get('ZipCode') + '</span>';

                                return '<div style="white-space:normal">' + title + '<br>' + address + '<br>' + details + '</div>';
                            }
                        },
                        { text: 'Price', flex: 1, xtype: 'templatecolumn', tpl: '${DrugPrice}' }
                    ],
                    listeners: {
                        select: 'onPharmacySelect'
                    }
                },
                {
                    xtype: 'container',
                    bind: {
                        html: '<iframe src="https://maps.google.com/maps?q=' + '{lat}' + '+' + '{long}' + '&z=15&output=embed" width="100%" height="420" frameborder="0" style="border:0" allowfullscreen></iframe>'
                    }
                }
            ]
        }
    ]
});