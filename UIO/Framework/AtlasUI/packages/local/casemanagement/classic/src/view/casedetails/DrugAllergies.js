/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.casedetails.DrugAllergies', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCasedetailsDrugAllergies',
    title: 'Drug Allergies',
    tbar: {
       // xtype: 'casedetailshome'
    },
    items: [ {
        xtype:'hboxform',
        defaults: {
            xtype: 'button'
        },
        items: [{
            iconCls: 'fa fa-plus',
            text: 'Add'
        }, {
            iconCls: 'fa fa-minus',
            text: 'Remove'
        }]
    }, {
        xtype: 'grid',
        height: 400,
        columns: {
            defaults: {
                flex: 1
            },
            items: [
                {
                    text: 'Allergen',
                    dataIndex: 'allergen',
                    filter: 'string',
                    width: 250
                }, {
                    text: 'Allergan Concept Type',
                    dataIndex: 'allergenConceptType',
                    width: 250
                }, {
                    text: 'Reported Source',
                    dataIndex: 'reportedSource',
                    width: 250
                }, {
                    text: 'Reported Date',
                    dataIndex: 'reportedDate',
                    filter: 'date',
                    formatter: 'date("D, M d, Y")',
                    width: 250
                }, {
                    text: 'Reactions And Effects',
                    dataIndex: 'reactionsAndEffects',
                    filter: {
                        type: 'list',
                        values: [
                            'new', 'pending', 'completed'
                        ]
                    },
                    width: 300
                }]
        },
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Displaying: ',
            emptyMsg: "No data to display"
        }
    }, {

        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'end'
        },
        items: [{
            xtype: 'button',
            iconCls: 'fa fa-save',
            text: 'Save'
        }]
    }]
});