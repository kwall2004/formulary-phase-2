/**
 * Created by mkorivi on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.FormularyReviews', {
    extend: 'Ext.panel.Panel',
    title: 'Formulary Review',
    xtype: 'formularyreviews',
    controller: 'formularyreviews',
    viewModel: 'formulary',
    layout: 'fit',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            overflowHandler: 'scroller',
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'From',
                    name: 'from_date',
                    format: 'm/d/Y',
                    itemId: 'from_date',
                    labelWidth: 40,
                    width: 200
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'To',
                    name: 'to_date',
                    format: 'm/d/Y',
                    itemId: 'to_date',
                    labelWidth: 30,
                    width: 200
                }, {
                    text: 'View Changes',
                    itemId: 'btnViewChanges',
                    handler: 'btnGetChangeHistory_Click',
                    width: 100
                },
                '->',
                {
                    text: 'Validate Formulary',
                    itemId: 'btnValidateFormulary',
                    handler: 'btnValidate_Click'
                },
                '-',
                {
                    text: 'Submit for PD Approval',
                    itemId: 'btnSubmitPDApproval',
                    handler: 'btnPDApproval_Click'
                },
                '-',
                {
                    text: 'Create Formulary',
                    handler: 'btnCreateFormulary_Click',
                    itemId: 'btnCreateFormulary'
                },
                '-',
                {text: 'View Formulary PDF', handler: 'btnViewFormularyPDF_Click',itemId:'btnViewFormularyPDF'},
                '-',
                {text: 'View Excel', handler: 'btnGenerateFormularyExcel_Click',itemId:'btnGenerateFormularyExcel'},
                '-',
                {text: 'Preferred Drugs PDF', handler: 'btnViewPrefDrugsPdf_Click', disabled: true}


            ]
        },
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [
                '->',
                {text: 'Export to Excel', itemId: 'btnToExcel', handler: 'btnExportClick'}

            ]

        }

    ],
    items: [{
        xtype: 'grid',
        bind: {
            store: '{StoreFormularyRuleDetails}'
        },
        columns: [{
            dataIndex: 'ruleLevelId',
            text: 'Rule Level Id'
        }, {
            dataIndex: 'levelType',
            text: 'Level Type'
        }, {
            dataIndex: 'levelDescr',
            text: 'Name'
        }, {
            dataIndex: 'OTCInd',
            text: 'OTC'
        }, {
            dataIndex: 'Covered',
            text: 'Covered',
            renderer: function (value) {
                if (value == "true") {
                    return "Yes";
                }
                else {
                    return "No"
                }
            }
        }, {
            dataIndex: 'onPrefListFlag',
            renderer: function (value) {
                if (value == "true") {
                    return "Yes";
                }
                else {
                    return "No"
                }
            },
            text: 'On Preferred List'
        }, {
            dataIndex: 'PartDDrug',
            text: 'Part D Drug',
            renderer: function (value) {
                if (value == "true") {
                    return "Yes";
                }
                else {
                    return "No"
                }
            }
        }, {
            dataIndex: 'PartDExcludedDrug',
            text: 'Part D Exc.',
            renderer: function (value) {
                if (value == "true") {
                    return "Yes";
                }
                else {
                    return "No"
                }
            }
        }, {
            dataIndex: 'MedicaidCarveOutDrug',
            text: 'Medicaid Carve Out',
            renderer: function (value) {
                if (value == "true") {
                    return "Yes";
                }
                else {
                    return "No"
                }
            }
        }, {
            dataIndex: 'MedicaidFeeScreen',
            text: 'Medicaid Fee Screen',
            renderer: function (value) {
                if (value == "true") {
                    return "Yes";
                }
                else {
                    return "No"
                }
            }
        }, {
            dataIndex: 'SpecialtyDrugInd',
            text: 'Speciaity Drug',
            renderer: function (value) {
                if (value == "true") {
                    return "Yes";
                }
                else {
                    return "No"
                }
            }
        }, {
            dataIndex: 'PAInd',
            text: 'PA Req.',
            renderer: function (value) {
                if (value == "true") {
                    return "Yes";
                }
                else {
                    return "No"
                }
            }
        }, {
            dataIndex: 'PA_NAME',
            text: 'PA Name'
        }, {
            dataIndex: 'PAMinAge',
            text: 'PA Min Age',
            renderer: function (value) {
                if (value == "0") {
                    return "";
                }
                return value;
            }
        }, {
            dataIndex: 'PAMaxAge',
            text: 'PA Max Age',
            renderer: function (value) {
                if (value == "0") {
                    return "";
                }
                return value;
            }
        }, {
            dataIndex: 'stepTherapyInd',
            text: 'ST Req.',
            renderer: function (value) {
                if (value == "true") {
                    return "Yes";
                }
                else if (value == "false") {
                    return "No"
                }
            }
        }, {
            dataIndex: 'stepTherapyName',
            text: 'ST Name'
        }, {
            dataIndex: 'MIN_AGE',
            text: 'Min. Age',
            renderer: function (value) {
                if (value == "0") {
                    return "";
                }
                return value;
            }
        }, {
            dataIndex: 'MAX_AGE',
            text: 'Max. Age',
            renderer: function (value) {
                if (value == "0") {
                    return "";
                }
                return value;
            }
        }, {
            dataIndex: 'ageType',
            text: 'Age Type'
        }, {
            dataIndex: 'genderRestriction',
            text: 'Gender Rest.'
        }, {
            dataIndex: 'TierCode',
            text: 'Tier Code'
        }, {
            dataIndex: 'NOTES',
            text: 'Notes'
        }, {
            dataIndex: 'ResourceLink',
            text: 'Resource Link'
        }, {
            dataIndex: 'daysSupply',
            text: 'Days Supply',
            renderer: function (value) {
                if (value == "0") {
                    return "";
                }
                return value;
            }
        }, {
            dataIndex: 'daysSupplyTimePeriod',
            text: 'Days Supply Limit Time Period'
        }, {
            dataIndex: 'fills',
            text: 'Fills',
            renderer: function (value) {
                if (value == "0") {
                    return "";
                }
                return value;
            }
        }, {
            dataIndex: 'fillsTimePeriod',
            text: 'Fills Time Period'
        }, {
            dataIndex: 'qtyLimit',
            text: 'Qty. Limit',
            renderer: function (value) {
                if (value == "0") {
                    return "";
                }
                return value;
            }
        }, {
            dataIndex: 'qtyLimitTimePeriod',
            text: 'Qty. Limit Time Period'
        }, {
            dataIndex: 'extendedDaysSupply',
            text: 'Extended Days Supply',
            renderer: function (value) {
                if (value == "0") {
                    return "";
                }
                return value;
            }
        }, {
            dataIndex: 'createdDate',
            text: 'Created Date'
        }, {
            dataIndex: 'createdBy',
            text: 'Created By'
        }, {
            dataIndex: 'lastUpdatedDate',
            text: 'Last Updated'
        }, {
            dataIndex: 'lastUpdatedBy',
            text: 'Last Updated By'
        }
        ],
        plugins: [
            {
                ptype: 'gridexporter'
            }
        ],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            pageSize: 25,
            displayInfo: 'true',
            displayMsg: 'Displaying Rules {0} - {1} of {2}',
            bind: '{StoreFormularyRuleDetails}'
        }]
    }]

});

