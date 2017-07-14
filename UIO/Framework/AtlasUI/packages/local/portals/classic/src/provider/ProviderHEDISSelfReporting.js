/**
 * Created by b6636 on 12/2/2016.
 */
Ext.define('Atlas.portals.view.provider.ProviderHEDISSelfReporting', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsProviderHEDISSelfReporting',
    controller: 'portalsProviderHEDISSelfReporting',
    title: 'Enrollment',
    viewModel: {
        stores: {
            hedisEnrollments: {
                model: 'Atlas.portals.provider.model.HedisEnrollmentWeb'
            }
        },
        data: {
            providerDetails: {}
        }
    },

    items: [
        {
            xtype: 'form',
            reference: 'enrollmentForm',
            cls: 'card-panel',
            title: 'Selections',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            defaults: {
                labelWidth: 50
            },
            defaultButton: 'searchButton',
            items: [
                {
                    xtype: 'textfield',
                    name: 'searchText',
                    reference: 'searchText'
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    name: 'searchButton',
                    reference: 'searchButton',
                    handler: 'loadEnrollments'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            reference: 'enrollmentGrid',
            cls: 'card-panel',
            height: 350,
            bind: {
                store: '{hedisEnrollments}'
            },
            tbar: {
                xtype: 'toolbar',
                items: [
                    {text: 'Print', handler: 'handlePrintHedis'},
                    {text: 'ICP-FHP/ACA Report', handler: 'handlePrintP4P', bind: { hidden: '{!hasP4PReport}'}}
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                emptyMsg: 'No data to display.'
            },
            listeners: {
                rowdblclick: 'onRowDblClick'
            },
            columns: [
                {
                    text: 'Memo',
                    xtype: 'actioncolumn',
                    hideable: false,
                    align: 'center',
                    width: 65,
                    renderer: function (val, meta, rec) {
                        // generate unique id for an element
                        var id = Ext.id(),
                            me = this;

                        Ext.defer(function () {
                            if (rec.get('hedisFlag') === 'HEDIS') {
                                Ext.widget('button', {
                                    renderTo: id,
                                    text: 'HEDIS',
                                    width: 50,
                                    handler: function () {
                                        me.up().up().up().getController().goToHedis(rec);
                                    }
                                });
                            }
                        }, 50);
                        return Ext.String.format('<div id="{0}" style="height:4px"></div>', id);
                    }
                },
                {
                    text: 'Details',
                    xtype: 'actioncolumn',
                    hideable: false,
                    align: 'center',
                    width: 65,
                    items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        handler: 'goToDetails'
                    }]
                },
                {
                    text: 'Docs',
                    xtype: 'actioncolumn',
                    hideable: false,
                    align: 'center',
                    width: 65,
                    items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-print',
                        handler: 'goToDocs'
                    }]
                },
                {
                    text: 'Member ID',
                    xtype: 'widgetcolumn',
                    hideable: false,
                    align: 'center',
                    widget: {
                        textAlign: 'center',
                        xtype: 'button',
                        handler: 'onMemberIdClick'
                    },
                    onWidgetAttach: function (column, widget, record) {
                        widget.setText(record.get('dispMemberID'));
                    }
                },
                {text: 'LOB', dataIndex: 'lobID'},
                {text: 'Sex', dataIndex: 'Gender', width: 65, align: 'center'},
                {text: 'SSN', dataIndex: 'SocSecNum'},
                {text: 'Address 1', dataIndex: 'address1', width: 190},
                {text: 'City', dataIndex: 'city', width: 130},
                {text: 'State', dataIndex: 'state', width: 65, align: 'center'},
                {text: 'Zip', dataIndex: 'zip'},
                {text: 'Phone', dataIndex: 'phone', width: 130, renderer: function(record) {
                    if (record !== null || record !== '') {
                        return '(' + record.substring(0,3) + ') ' + record.substring(3,6) + ' - ' + record.substring(6);
                    }
                    return record;
                }},
                {text: 'Last Name', dataIndex: 'lastName'},
                {text: 'Mid', dataIndex: 'middleName'},
                {text: 'First Name', dataIndex: 'firstName'},
                {xtype: 'datecolumn', format: 'm/d/Y', text: 'Birth Date', dataIndex: 'birthDate', minWidth: 100, flex: 1}
            ]
        }
    ]
});