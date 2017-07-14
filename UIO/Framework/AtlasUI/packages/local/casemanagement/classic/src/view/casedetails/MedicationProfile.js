/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.casedetails.MedicationProfile', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCasedetailsMedicationProfile',
    title: 'Medication Profile',
    tbar: {
        //  xtype: 'casedetailshome'
    },
    items: [{
        xtype: 'container',
        items: [{
            xtype: 'button',
            text: 'Reload from Claims'
        }, {
            xtype: 'toolbar',
            layout: {
                pack: 'end'
            },
            items: [{
                xtype: 'button',
                text: 'Add Medication'
            }, {
                xtype: 'button',
                text: 'Add from Claim History'
            }, {
                xtype: 'button',
                text: 'Remove Medication'
            }]
        }]
    }, {
        xtype: 'grid',
        store: {
            fields: [
                {name: 'from', type: 'date'}
            ],
            data: [
                {letterYN: 'yes', ndc: 'Venkman', claimDate: '1/1/2015', dataSource: 'new'},
                {letterYN: 'no', ndc: 'Spengler', claimDate: '12/3/2011', dataSource: 'new'},
                {letterYN: 'yes', ndc: 'Stantz', claimDate: '1/1/2014', dataSource: 'pending'},
                {letterYN: 'yes', ndc: 'Zeddemore', claimDate: '4/27/2000', dataSource: 'completed'}
            ]
        },
        plugins: 'gridfilters',
        columns: [{
            text: 'Letter(Y/N)',
            dataIndex: 'letterYN',
            filter: 'string'
        }, {
            text: 'NDC',
            dataIndex: 'ndc'
        }, {
            text: 'Medication',
            dataIndex: 'medication'
        }, {
            text: 'Claim Date',
            dataIndex: 'claimDate',
            filter: 'date',
            formatter: 'date("D, M d, Y")'
        }, {
            text: 'End Date',
            dataIndex: 'endDate'
        }, {
            text: 'Date Source',
            dataIndex: 'dataSource',
            filter: {
                type: 'list',
                values: [
                    'new', 'pending', 'completed'
                ]
            }
        }, {
            text: 'Type',
            dataIndex: 'type'
        }, {
            text: 'NPI',
            dataIndex: 'npi'
        }, {
            text: 'Prescriber',
            dataIndex: 'prescriber'
        }, {
            text: 'Dosage',
            dataIndex: 'dosage'
        }, {
            text: 'Treatment Of',
            dataIndex: 'treatmentOf'
        }, {
            text: 'Additional Info',
            dataIndex: 'additionalInfo'
        }, {
            text: 'Oral HX',
            dataIndex: 'oralHX'
        }, {
            text: 'Filled',
            dataIndex: 'filled'
        }, {
            text: 'Samples',
            dataIndex: 'samples'
        }, {
            text: 'Know Name',
            dataIndex: 'knowName'
        }, {
            text: 'Know Frequency',
            dataIndex: 'knowFrequency'
        }, {
            text: 'Know Reason',
            dataIndex: 'knowReason'
        }, {
            text: 'Continue At Home',
            dataIndex: 'continueAtHome'
        }],
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Displaying: ',
            emptyMsg: "No data to display"
        }
    }, {
        xtype: 'hboxform',
        collapsible: 'true',

        items: [{
            xtype: 'container',
            title: 'CMR Details',
            items: [{
                xtype: 'toolbar',
                layout: {
                    pack: 'end'
                },
                items: [{
                    xtype: 'button',
                    text: 'Add CMR'
                }, {
                    xtype: 'button',
                    text: 'Delete CMR'
                }]
            }, {
                xtype: 'grid',
                columns: [{
                    text: 'Type',
                    dataIndex: 'type'
                }, {
                    text: 'CMR Offer Date',
                    dataIndex: 'cmrOfferDate'
                }, {
                    text: 'CMR Date',
                    dataIndex: 'cmrDate'
                }]
            }]
        }, {
            xtype: 'container',
            title: 'TMR Details',
            items: [{
                xtype: 'toolbar',
                layout: {
                    pack: 'end'
                },
                items: [{
                    xtype: 'button',
                    text: 'Add TMR'
                }, {
                    xtype: 'button',
                    text: 'Delete TMR'
                }]
            }, {
                xtype: 'grid',
                columns: [{
                    text: 'Type',
                    dataIndex: 'type'
                }, {
                    text: 'TMR Date',
                    dataIndex: 'tmrDate'
                }, {
                    text: 'CMR Date',
                    dataIndex: 'cmrDate'
                }]
            }]
        }]
    }]
});