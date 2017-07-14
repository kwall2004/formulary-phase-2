/**
 * Created by c4539 on 11/30/2016.
 */
Ext.define('Atlas.portals.view.provider.ProviderEnrollment', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsProviderEnrollment',
    controller: 'portalsProviderEnrollment',
    title: 'Enrollment',
    viewModel: {
        stores: {
            enrollments: {
                model: 'Atlas.portals.provider.model.EnrollmentWeb'
            },
            locations: {
                model: 'Atlas.portals.provider.model.GroupLocMaster'
            },
            providersExport: {
                model: 'Atlas.portals.provider.model.ProvGroupEnrollmentWeb'
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
                labelWidth: 65
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Locations',
                    reference: 'locationCombo',
                    name: 'locationCombo',
                    queryMode: 'local',
                    displayField: 'displayName',
                    valueField: 'locationID',
                    width: 450,
                    bind: {
                        store: '{locations}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Member',
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
            title: 'Enrollments',
            reference: 'enrollmentGrid',
            cls: 'card-panel',
            height: 350,
            bind: {
                store: '{enrollments}'
            },
            tbar: {
                xtype: 'toolbar',
                items: [
                    { text: 'Print', handler: 'handlePrint' },
                    { text: 'Print All Providers', handler: 'handlePrintAll' },
                    { text: 'Export All Providers', handler: 'handleExportAll' },
                    { text: 'Export HEDIS', handler: 'handleExportHedis' },
                    { text: 'Print HEDIS', handler: 'handlePrintHedis' }
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
                    renderer: function(val,meta,rec) {
                        // generate unique id for an element
                        var id = Ext.id(),
                            me = this;

                        Ext.defer(function() {
                            if (rec.get('hedisFlag') === 'HEDIS') {
                                Ext.widget('button', {
                                    renderTo: id,
                                    text: 'HEDIS',
                                    width: 50,
                                    handler: function() {
                                        me.up().up().up().getController().goToHedis(rec);
                                    }
                                });
                            }
                        }, 50);
                        return Ext.String.format('<div id="{0}" style="height:4px"></div>', id);
                    }
                },
                {
                    text: 'Documents',
                    xtype: 'actioncolumn',
                    hideable: false,
                    align: 'center',
                    items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-print',
                        handler: 'goToDocs'
                    }]
                },
                {
                    text: 'Member ID',
                    dataIndex: 'dispMemberID',
                    renderer: function(val, meta, rec) {
                        return '<span style="color: blue; cursor: pointer;">' + rec.get('dispMemberID') + '</span>';
                    },
                    listeners: {
                        click: function(grid, cell, index) {
                            this.up().up().up().getController().goToDetails(grid, index);
                        }
                    }
                },
                { text: 'First Name', dataIndex: 'firstName' },
                { text: 'Middle Name', dataIndex: 'middleName' },
                { text: 'Last Name', dataIndex: 'lastName' },
                { text: 'LOB', dataIndex: 'lobID' },
                { text: 'Sex', dataIndex: 'Gender', width: 65, align: 'center' },
                {
                    text: 'SSN',
                    dataIndex: 'SocSecNum',
                    renderer: function(val, meta, rec) {
                        var ssn = rec.get('SocSecNum'),
                            returnValue = '';

                        if (ssn != null){
                            if (ssn.length === 9) {
                                returnValue = "xxx-xx-" + ssn.substring(5, 9);
                            } else if (ssn.length === 0) {
                                returnValue = "   " + "-" + "  " + "    ";
                            } else {
                                returnValue = ssn;
                            }
                        }

                        return returnValue;
                    }
                },
                { text: 'Address 1', dataIndex: 'address1' },
                { text: 'City', dataIndex: 'city' },
                { text: 'State', dataIndex: 'state', width: 65, align: 'center' },
                {
                    text: 'Zip',
                    dataIndex: 'zip',
                    renderer: function(val, meta, rec) {
                        var zip = rec.get('zip'),
                            returnValue = '';

                        if (zip != null) {
                            if (zip.length === 9) {
                                returnValue = (zip.substring(0, 5) + "-" + zip.substring(5, 9));
                            } else {
                                returnValue = zip;
                            }
                        }

                        return returnValue;
                    }
                },
                {
                    text: 'Phone',
                    dataIndex: 'phone',
                    renderer: function(val, meta, rec) {
                        var phone = rec.get('phone'),
                            returnValue = '';

                        if (phone != null){
                            if (phone.length === 10) {
                                returnValue = "("+(phone.substring(0, 3)+") " + phone.substring(3, 6) + "-" + phone.substring(6,10));
                            } else {
                                returnValue = phone;
                            }
                        }

                        return returnValue;
                    }
                },
                { xtype: 'datecolumn', format: 'm/d/Y', text: 'Birth Date', dataIndex: 'birthDate' },
                { text: 'Status', dataIndex: 'enrollmentStatus' },
                { xtype: 'datecolumn', format: 'm/d/Y', text: 'Effective Date', dataIndex: 'effectiveDate', width: 120},
                { xtype: 'datecolumn', format: 'm/d/Y', text: 'Term Date', dataIndex: 'termDate' },
                {
                    text: 'POC Status',
                    xtype: 'actioncolumn',
                    hideable: false,
                    align: 'center',
                    renderer: function(val,meta,rec) {
                        // generate unique id for an element
                        var id = Ext.id(),
                            me = this;

                        Ext.defer(function() {
                            if (rec.get('pocStatus')) {
                                Ext.widget('button', {
                                    renderTo: id,
                                    text: rec.get('pocStatus'),
                                    width: 50,
                                    handler: function() {
                                        me.up().up().up().getController().onPocStatusClick(rec);
                                    }
                                });
                            }
                        }, 50);
                        return Ext.String.format('<div id="{0}" style="height:4px"></div>', id);
                    }
                },
                { text: 'Messages', dataIndex: 'cMessage' },
                { text: 'Review Required', dataIndex: 'reviewRequiredBy', width: 120 },
                { xtype: 'datecolumn', format: 'm/d/Y', text: 'Last Review Date', dataIndex: 'lastReviewDate', width: 150 },
                { xtype: 'datecolumn', format: 'm/d/Y', text: 'Decision Date', dataIndex: 'decisionDate', width: 110}
            ]
        },
        {
            xtype: 'gridpanel',
            reference: 'hiddenProviderExport',
            height: 0,
            visible: false,
            bind: {
                store: '{providersExport}'
            },
            plugins: [{
                ptype: 'gridexporter'
            }],
            columns: [
                { text: 'Member ID', dataIndex: 'dispMemberID'}, { text: 'Last Name', dataIndex: 'lastName'},
                { text: 'First Name', dataIndex: 'firstName'}, { text: 'DOB', dataIndex: 'birthDate'},
                { text: 'File Date', dataIndex: 'filedate'}, { text: 'Phone', dataIndex: 'Phone'},
                { text: 'Address 1', dataIndex: 'Address1'}, { text: 'Address 2', dataIndex: 'Address2'},
                { text: 'City', dataIndex: 'City'}, { text: 'State', dataIndex: 'State'}, { text: 'Zip', dataIndex: 'Zip'},
                { text: 'PCP Id', dataIndex: 'pcpId'}, { text: 'PCP Name', dataIndex: 'pcpName'},
                { text: 'CSHCS', dataIndex: 'cshcs'}, { text: 'Program Group', dataIndex: 'programGroup'},
                { text: 'Line of Business', dataIndex: 'lineOfBusiness'}
            ]
        }
    ]
});