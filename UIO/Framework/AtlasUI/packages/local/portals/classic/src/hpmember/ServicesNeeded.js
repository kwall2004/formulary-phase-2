/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - Services Needed and Completed
 * Description: View for the Services Needed Information Page
 */
Ext.define('Atlas.portals.view.hpmember.ServicesNeeded', {
    extend: 'Ext.container.Container',
    title: 'Services Needed Information',
    reference: 'servicesNeededRef',
    xtype: 'portals-hpmember-servicesNeeded',
    controller: 'portalsMemberMHPServicesNeededController',
    viewModel: 'portalsMemberMHPServicesNeededViewModel',
    scrollable: true,

    items: [{
        xtype: 'panel',
        title: 'Services Needed Information',
        cls: 'card-panel',

        items: [
        {
            xtype: 'container',
            defaults:{
                width: 500,
                labelWidth: 110,
                style: {
                    padding:'5px'
                }
            },
            items: [
            {
                xtype: 'combo',
                reference: 'familyCombo',
                fieldLabel: 'Member',
                name: 'Family',
                itemId: "familyCombo",
                hiddenName: 'familyCombo',
                displayField: 'name',
                valueField: 'value',
                listeners: {
                    select: 'onFamilySelected'
                },
                emptyText: 'Select a type'
            },
            {
                xtype: 'textfield',
                reference: 'statusRef',
                readOnly: true,
                fieldLabel: 'Status'
            },
            {
                xtype: 'combo',
                reference: 'yearCombo',
                fieldLabel: 'Reporting Year',
                queryMode: 'local',
                displayField: 'value',
                valueField: 'value',
                listeners: {
                    select: 'onYearSelected',
                    beforerender: 'initializeYears'
                }
            }
        ]
        },
            {
                xtype: 'container',
                margin: '0 0 0 7px',
                html: '<p style="color: red; font-weight: 600">Note: Below services needed are for the selected member in the family drop down.</p>'
            },
            {
                xtype: 'grid',
                margin: '0 5px 0 5px',
                height: 600,
                forceFit: true,
                scrollable: true,
                columns: [{
                    text: 'Measure',
                    dataIndex: 'measureDesc'
                },
                    {
                        text: 'Sub Desc',
                        dataIndex: 'subMeasure'
                    },
                    {
                        text: 'Due By',
                        dataIndex: 'dueBy',
                        renderer: function (value) {
                            return Ext.util.Format.date(value, 'm/d/Y');
                        }
                    },
                    {
                        text: 'Hedis Hit Date',
                        dataIndex: 'lastSeen',
                        renderer: Ext.util.Format.dateRenderer('m/d/Y')
                    },
                    {
                        text: 'Complete',
                        dataIndex: 'complete',
                        renderer: function (value, metaData, record) {
                            var retvalue = record.get('complete');
                            return retvalue ? 'Completed' : 'Pending';
                        }
                    },
                    {
                        text: 'Help',
                        dataIndex: 'helpText',
                        hidden: true
                    }
                ],
                bind: {
                    store: '{servicesNeededStore}'
                },
                listeners: {
                    itemclick: 'onGridClick'
                },
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    pageSize: 10,
                    bind: {
                        store: '{servicesNeededStore}'
                    },
                    displayInfo: true
                }]
            }, {
                xtype: 'displayfield',
                reference: 'infoDisplayRef'
            }]
    }]
});