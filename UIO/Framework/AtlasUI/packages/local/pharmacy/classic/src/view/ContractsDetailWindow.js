/**
 * Created by rsalekin on 11/9/2016.
 */
Ext.define('Atlas.pharmacy.view.ContractsDetailWindow', {
    extend: 'Ext.window.Window',
    xtype: 'pharmacy-contractsdetailwindow',
    name: 'contractsdetailwindow',
    title: 'Contracts',
    viewModel: 'contractsdetailview',
    controller: 'contractsdetailwindow',
    width: 1200,
    height: 600,
    modal: true,
    layout: 'border',
    items: [
        {
            region: 'center',
            xtype: 'grid',
            itemId: 'gpContractsDetail',
            columns: [
                {
                    text: 'NCPDP',
                    dataIndex: 'NcpdpId',
                    hidden: true
                },
                {
                    text: 'RID',
                    dataIndex: 'RelationShipId',
                    hidden: true
                },
                {
                    text: 'Pharmacy',
                    dataIndex: 'PharmacyName',
                    hidden: true
                },
                {
                    text: 'Relationship Name',
                    dataIndex: 'RelationShipName',
                    hidden: true
                },
                {
                    text: 'Contract ID',
                    dataIndex: 'ContractId',
                    flex: 1
                },
                {
                    text: 'Pharmacy/Relationship',
                    dataIndex: 'Entity',
                    flex: 2
                },
                {
                    text: 'Has Contract',
                    dataIndex: 'HasContract',
                    hidden: true,
                    renderer: function (value) {
                        if (value) {
                            return 'Yes';
                        }
                        else {
                            return 'No';
                        }
                    }
                },
                {
                    text: 'Eff Date',
                    dataIndex: 'EffectiveDate',
                    flex: 1,
                    formatter: 'date("n/j/Y")'
                },
                {
                    text: 'Term date',
                    dataIndex: 'Termdate',
                    flex: 1,
                    formatter: 'date("n/j/Y")'
                },
                {
                    text: 'Contract Status',
                    dataIndex: 'contractStatus',
                    flex: 1
                },
                {
                    text: '',
                    dataIndex: 'SystemId',
                    flex: 1,
                    hidden: true
                },
                {
                    text: 'Line Of Business',
                    dataIndex: 'LineOfBusiness',
                    flex: 1
                },
                {
                    text: 'Pharmacy Networks',
                    dataIndex: 'PharmacyNetworks',
                    flex: 1
                },
                {
                    text: 'Excluded',
                    dataIndex: 'Excluded',
                    flex: 1,
                    renderer: function (value) {
                        var returnValue = '';
                        if (value) {
                            returnValue = '<span style="color: red;">' + value + '</span>';
                        }
                        return returnValue;
                    }
                },
                {
                    text: 'Pharmacy Chain Relationship',
                    dataIndex: 'ActiveWithRel',
                    flex: 1,
                    renderer: 'rendererActiveWithRel'
                },
                {
                    text: 'EffDate with Relationship',
                    dataIndex: 'RLEffectiveDate',
                    hidden: true,
                    formatter: 'date("n/j/Y")'
                },
                {
                    text: 'TermDate with Relationship',
                    dataIndex: 'RLTermDate',
                    hidden: true,
                    flex: 1,
                    formatter: 'date("n/j/Y")'
                }

            ],
            bind: '{storeSearchGrid}',
            bbar: {
                xtype: 'pagingtoolbar',
                bind: '{storeSearchGrid}',
                displayInfo: true,
                hideRefresh: true
            },
            listeners: {
                itemdblclick: 'gpContractsDetail_ItemDblClick'
            }
        }
    ]
});