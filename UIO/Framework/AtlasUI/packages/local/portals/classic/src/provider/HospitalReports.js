/**
 * Created by c4539 on 11/29/2016.
 */
Ext.define('Atlas.portals.view.provider.HospitalReports', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsProviderHospitalReports',
    title: 'Hospital Reports',
    controller: 'portalsProviderHospitalReports',
    requires: [
        'Ext.panel.Panel',
        'Ext.grid.plugin.Exporter'
    ],
    viewModel: {
        stores: {
            hospitalReportTypes: {
                fields: [
                    'key', 'value'
                ],
                data: [
                    {key: 'hospitalRptsMemberUtilization', value: 'Member Hospital Utilization'},
                    {key: 'hospitalRptsERVisit', value: 'ER Visit'}
                ]
            },
            utilReportStore: {
                model: 'Atlas.portals.provider.model.HospitalUtilizationWeb'
            },
            erReportStore: {
                model: 'Atlas.portals.provider.model.ERVisitReportWeb'
            }
        },
        data: {
            isPreviewDisabled: true,
            isExportDisabled: true,
            isUtilGridHidden: false,
            isERGridHidden: true,
            providerDetails: {}
        }
    },
    items: [
        {
            xtype: 'form',
            reference: 'reportForm',
            cls: 'card-panel',
            title: 'Selections',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            defaults: {
                labelWidth: 50
            },
            items: [
                {
                    xtype: 'combo',
                    reference: 'reportCombo',
                    name: 'reportCombo',
                    queryMode: 'local',
                    fieldLabel: 'Report',
                    displayField: 'value',
                    valueField: 'key',
                    value: 'hospitalRptsMemberUtilization',
                    bind: {
                        store: '{hospitalReportTypes}'
                    },
                    listeners: {
                        select: 'onHospitalReportTypeSelect'
                    }
                },
                {
                    xtype: 'datefield',
                    reference: 'fromDate',
                    name: 'fromDate',
                    format: 'm/d/Y',
                    fieldLabel: 'From',
                    allowBlank: false,
                    listeners: {
                        blur: 'checkHospitalReportButtonStatus'
                    }
                },
                {
                    xtype: 'datefield',
                    reference: 'toDate',
                    name: 'toDate',
                    format: 'm/d/Y',
                    fieldLabel: 'To',
                    allowBlank: false,
                    listeners: {
                        blur: 'checkHospitalReportButtonStatus'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Preview Report',
                    handler: 'previewReport',
                    bind: {
                        disabled: '{isPreviewDisabled}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Export Report',
                    handler: 'exportReport',
                    bind: {
                        disabled: '{isExportDisabled}'
                    }
                }
            ]
        },
        {
            xtype: 'gridpanel',
            title: 'Member Hospital Utilizations',
            cls: 'card-panel',
            reference: 'utilReportGrid',
            minHeight: 300,
            plugins: [{
                ptype: 'gridexporter'
            }],
            bind: {
                hidden: '{isUtilGridHidden}',
                store: '{utilReportStore}'
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                emptyMsg: 'No data to display.'
            },
            columns: [
                {
                    xtype: 'datecolumn',
                    text: 'Admit Dt',
                    dataIndex: 'admitDateas',
                    format: 'm/d/Y'
                },
                {
                    xtype: 'datecolumn',
                    text: 'Discharge Dt',
                    dataIndex: 'dischargeDateas',
                    format: 'm/d/Y'
                },
                { text: 'Discharge Status', dataIndex: 'dischargeStatus', width: 130 },
                { text: 'Last Name', dataIndex: 'lastName' },
                { text: 'First Name', dataIndex: 'firstName' },
                { text: 'Member Id', dataIndex: 'memberId' },
                { text: 'Att Provider', dataIndex: 'serviceProvider' },
                { text: 'Att ProvId', dataIndex: 'serviceProviderId' },
                { text: 'Facility', dataIndex: 'serviceFacility' },
                { text: 'Facility Id', dataIndex: 'serviceFacilityId' },
                { text: 'Primary Dx', dataIndex: 'primaryDiag', width: 100},
                { text: 'Primary Dx Desc', dataIndex: 'primaryDiagDesc', width: 130 },
                { text: 'Secondary Dx', dataIndex: 'secondDiag', width: 120 },
                { text: 'Secondary Dx Desc', dataIndex: 'secondDiagDesc', width: 140 },
                { text: 'Proc Code1', dataIndex: 'procCode1' },
                { text: 'Proc Code1 Desc', dataIndex: 'procCode1Desc', width: 130 },
                { text: 'Proc Code2', dataIndex: 'procCode2' },
                { text: 'Proc Code2 Desc', dataIndex: 'procCode2Desc', width: 130 },
                { text: 'Proc Code3', dataIndex: 'procCode3' },
                { text: 'Proc Code3 Desc', dataIndex: 'procCode3Desc', width: 130 },
                { text: 'Reference #', dataIndex: 'referencs' }
            ]
        },
        {
            xtype: 'gridpanel',
            title: 'ER Visits',
            cls: 'card-panel',
            reference: 'erReportGrid',
            minHeight: 300,
            plugins: [{
                ptype: 'gridexporter'
            }],
            bind: {
                hidden: '{isERGridHidden}',
                store: '{erReportStore}'
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                emptyMsg: 'No data to display.'
            },
            columns: [
                {
                    xtype: 'datecolumn',
                    text: 'Service Dt',
                    dataIndex: 'serviceDate',
                    format: 'm/d/Y'
                },
                { text: 'Member Id', dataIndex: 'memberID' },
                { text: 'First Name', dataIndex: 'memberFirstName' },
                { text: 'Last Name', dataIndex: 'memberLastName' },
                { text: 'LOB', dataIndex: 'lobID' },
                { text: 'Facility Id', dataIndex: 'facilityId' },
                { text: 'Facility Name', dataIndex: 'facilityName' },
                { text: 'Att Provider', dataIndex: 'attendingProvider' },
                { text: 'Att Prov Id', dataIndex: 'attendingID' },
                { text: 'PCP Id', dataIndex: 'pcpID' },
                { text: 'PCP Name', dataIndex: 'pcpName' },
                { text: 'Admit Diag', dataIndex: 'admitDiagCd' },
                { text: 'Admit Desc', dataIndex: 'admitDesc' },
                { text: 'Diag 1', dataIndex: 'diagCd1' },
                { text: 'Diag Desc1', dataIndex: 'diagDesc1' },
                { text: 'Diag 2', dataIndex: 'diagCd2' },
                { text: 'Diag Desc2', dataIndex: 'diagDesc2' },
                { text: 'Diag 3', dataIndex: 'diagCd3' },
                { text: 'Diag Desc3', dataIndex: 'diagDesc3' },
                { text: 'Proc Code', dataIndex: 'cpt4cd' },
                { text: 'Proc Desc', dataIndex: 'procDesc' }
            ]
        }
    ]
});