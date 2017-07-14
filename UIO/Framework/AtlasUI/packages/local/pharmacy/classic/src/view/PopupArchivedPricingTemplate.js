/**
 * Created by n6684 on 11/24/2016.
 */
Ext.define('Atlas.pharmacy.view.PopupArchivedPricingTemplate', {
    extend: 'Ext.window.Window',
    controller: 'pricingtemplateinfo_popuparchivedpricingtemplatecontroller',
    viewModel: 'pricingtemplateinfo_popuparchivedpricingtemplateviewmodel',
    xtype: 'pricingtemplateinfo_popuparchivedpricingtemplate',
    width: 800,
    height: 600,
    modal: true,
    title:'Archive Pricing Template',
    layout: {
        type: 'vbox',
        align : 'stretch'
    },
    items: [
        {
            xtype: 'grid',
            itemId: 'gppopuparchivedpricingtemplate',
            height:900,
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Archive Date:',
                    emptytext: '[Select Archive Date]',
                    itemId: 'cbxArchiveDate',
                    lastQuery: '',
                    listConfig: {
                        getInnerTpl: function () {
                            return '<div class="search-item">{ArchiveDate:date("m/d/Y")}</div>';
                        }
                    },
                    valueField: 'ArchiveDate',
                    listeners: {
                        select: 'onSearch'
                    },
                    bind: {
                        //  value: '{cdmodel.SupportStmtType}',
                        store: '{storepricingdetailtemplatearchivedate}'
                    }
                }
            ],
            flex: 10,
            columns: {
                defaults: {
                    flex: 1
                },
                items:[
                    {
                        text: 'Network Type', dataIndex: 'NetworkType', width: 100
                    },
                    {
                        text: 'Maint Days', dataIndex: 'Maintenance', width: 100
                    },
                    {
                        text: 'OTC', dataIndex: 'OTCInd', width: 100
                    },
                    {
                        text: 'Drug Type', dataIndex: 'DrugType', width: 100
                    },
                    {
                        text: 'Cost Basis', dataIndex: 'costBasis', width: 100
                    },
                    {
                        text: '(%)', dataIndex: 'DiscPercent', width: 100
                    },
                    {
                        text: '($)', dataIndex: 'DiscAmount', width: 100
                    },
                    {
                        text: 'DispFee$', dataIndex: 'DispFee', width: 100
                    },
                    {
                        text: ' ', dataIndex: 'systemId', width: 100, hidden: true
                    }

                ]
            },

            bind: '{storepricingdetailtemplatearchive}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{storepricingdetailtemplatearchive}',
                    displayInfo: true,
                    dock: 'bottom',
                    pageSize: 10
                }

            ]
        }
    ]
});