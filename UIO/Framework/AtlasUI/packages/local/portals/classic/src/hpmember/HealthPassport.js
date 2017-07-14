/**
 * Created by m4542 on 1/6/2017.
 */
Ext.define('Atlas.portals.view.hpmember.HealthPassport', {
    extend: 'Ext.Container',
    xtype: 'healthpassport',
    controller: 'healthpassportcontroller',
    viewModel: 'healthportalmodel',
    title: 'Health Passport',

    autoScroll: true,
    padding: 10,

    items: [
        // {
        //     xtype: 'container',
        //     cls: 'card-panel',
        //     style: {
        //         flex: 1
        //     },
        //     items: {
        //         xtype: 'container',
        //         padding: 10,
        //         bind: {
        //             html: '<span style="font-weight: 600">Health Passport from {FromDate} through {ToDate}</span>'
        //         }
        //     }
        // },
        {
            xtype: 'container',
            html: '<h2 style="font-weight: 600; ">Thank you for choosing Meridian as your travel partner on your journey to a healthier you!</h2>'
        },
        {
            xtype: 'button',
            text: 'Close',
            align: 'center',
            margin: '0 10 0 10',
            iconCls: 'x-fa fa-times',
            width: 100,
            listeners: {
                click: 'closeTab'
            }
        },
        {
            xtype: 'button',
            text: 'Print',
            align: 'center',
            iconCls: 'x-fa fa-print',
            width: 100,
            listeners: {
                click: 'printPage'
            }
        },
        {
            xtype: 'gridpanel',
            cls: 'card-panel',
            height: 200,
            margin: '10px 0 0 0',
            title: 'Doctor Visits',
            bind: {
                store: '{DoctorVisitsStore}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'DateOfService',
                    text: 'Date of Service'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'DoctorsName',
                    text: 'Doctor'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'Specialty',
                    text: 'Specialty'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            cls: 'card-panel',
            height: 200,
            margin: '10px 0 0 0',
            title: 'Prescriptions',
            bind: {
                store: '{PrescriptionStore}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'serviceDate',
                    text: 'Fill Date'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'DrugName',
                    text: 'Drug Name'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            cls: 'card-panel',
            height: 200,
            margin: '10px 0 0 0',
            title: 'Immunizations',
            bind: {
                store: '{ImmunizationStore}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'DateOfService',
                    text: 'Date of Service'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'ImmunizationName',
                    text: 'Immunization Name'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            cls: 'card-panel',
            height: 200,
            margin: '10px 0 0 0',
            title: 'Labs and Screenings',
            bind: {
                store: '{LabStore}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'DateOfService',
                    text: 'Date of Service'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'LabTest',
                    text: 'Lab Test'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            cls: 'card-panel',
            height: 200,
            margin: '10px 0 10px 0',
            title: 'Gaps in Care',
            bind: {
                store: '{GapStore}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'HedisDueDate',
                    text: 'Due Date'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'HedisDescription',
                    text: 'Description'
                }
            ]
        },
        {
            xtype: 'button',
            text: 'Close',
            margin: '0 10 0 10',
            align: 'center',
            iconCls: 'x-fa fa-times',
            width: 100,
            listeners: {
                click: 'closeTab'
            }
        },
        {
            xtype: 'button',
            text: 'Print',
            align: 'center',
            iconCls: 'x-fa fa-print',
            width: 100,
            listeners: {
                click: 'printPage'
            }
        }
    ]
});