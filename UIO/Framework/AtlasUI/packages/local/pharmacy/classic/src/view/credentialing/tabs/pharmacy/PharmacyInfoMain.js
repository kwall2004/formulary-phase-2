/**
 * This Class represents the Main Tab within the Pharmacy Information tab of Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.pharmacy.PharmacyInfoMain', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacy-pharmacyinfo',
    layout: 'fit',
    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    xtype: 'pharmacy-piclicense',
                    title: 'PIC License',
                    tabConfig: {
                        listeners: {
                            activate: 'onPharInfoTabChange'
                        }
                    }
                },
                {
                    xtype: 'pharmacy-dealicense',
                    title: 'DEA License',
                    tabConfig: {
                        listeners: {
                            activate: 'onPharInfoTabChange'
                        }
                    }
                },
                {
                    xtype: 'pharmacy-inslicense',
                    title: 'Insurance License',
                    tabConfig: {
                        listeners: {
                            activate: 'onPharInfoTabChange'
                        }
                    }
                },
                {
                    xtype: 'pharmacy-statelicense',
                    title: 'State License',
                    tabConfig: {
                        listeners: {
                            activate: 'onPharInfoTabChange'
                        }
                    }
                },
                {
                    xtype: 'pharmacy-pharmacyandpatient',
                    title: 'Pharmacy and Patient',
                    tabConfig: {
                        listeners: {
                            activate: 'onPharInfoTabChange'
                        }
                    }
                },
                {
                    xtype: 'pharmacy-ntisinfo',
                    title: 'NTIS Info',
                    tabConfig: {
                        listeners: {
                            activate: 'onPharInfoTabChange'
                        }
                    }
                }
            ]
        },
        {
            xtype: 'form',
            reference: 'hdnPnlPharmacyInfoMainRef',
            itemId: 'hdnContainer_PharmacyInfoMain',
            hidden: true,
            items: [
                {xtype: 'hidden', name: 'hiddenAction'},
                {xtype: 'hidden', name: 'hiddenIsApplyAll'},
                {xtype: 'hidden', name: 'hdnActiveTab'},
                {xtype: 'hidden', name: 'hiddenLicenseHistoryApply'},
                {xtype: 'hidden', name: 'hiddenPharmacyInfoTable'}
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'grid',
            dock: 'left',
            collapsible: true,
            collapseDirection: 'left',
            title: 'Included Pharmacies',
            reference: 'includedPharmaciesGridRef',
            collapseToolText: 'Included Pharmacies',
            bind: {
                store: '{pharmaciesbyrid}'
            },
            plugins:[

                {
                    ptype: 'gridfilters'
                }

            ],
            columns: [
                {text: 'NCPDP', dataIndex: 'ncpdpId', filter: {
                    type: 'string',
                    dataIndex:'ncpdpId'
                }},
                {text: 'Pharmacy Name', dataIndex: 'PharmacyName', flex: 1, filter: {
                    type: 'string',
                    dataIndex:'PharmacyName'
                }},
                {text: 'Address', dataIndex: 'Address', hidden: true},
                {text: 'City', dataIndex: 'city', hidden: true},
                {text: 'State', dataIndex: 'state', hidden: true},
                {text: 'Zip', dataIndex: 'zip', hidden: true}


            ],
            width: 300,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'SINGLE',
                listeners: {
                    select: 'getLicenseInfoByNCPDPId'
                }
            }
        },

        {
            xtype: 'toolbar',
            //reference : 'bbarPharInfoMainRef',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Apply All',
                    //name : 'btnApplyAllPharInfo',
                    handler: 'doPharmachyLicInfoSave',
                    bind: {disabled: '{hasApplyAll}'}
                    //handler: 'doDeaLicApplyAll'
                },

                {
                    text: 'Save',
                    //name : 'btnSavePharInfo',
                    itemId:'btnSavePharInfo',
                    handler: 'doPharmachyLicInfoSave',
                    disabled:true
                   // bind: {disabled: '{!(ByRIDLoadlength)}'}
                    //handler: 'doDeaLicSave'
                }
            ]
        }
    ]
});