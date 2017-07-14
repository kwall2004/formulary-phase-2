/**
 * Created by mkorivi on 11/11/2016.
 */
/**
 * Created by mkorivi on 11/11/2016.
 */

Ext.define('Atlas.casemanagement.view.HEDISSummary', {
    extend: 'Ext.panel.Panel',
    xtype: 'hedissummary',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 10,
    height : '100%',
    width : '100%',
    dockedItems : {
        dock: 'top',
        xtype: 'toolbar',
        items : [
            {
                xtype : 'combobox',
                fieldLabel : 'Reporting Year',
                displayField: 'name',
                valueField: 'value',
                reference : 'cbxYears',
                bind : {
                    store : '{storeYear}'
                },
                queryMode : 'local'
            },
            {
                xtype : 'radiogroup',
                items : [
                    {
                        xtype : 'radio',
                        name: 'filterRadios',
                        boxLabel: 'Due',
                        reference : 'rdDueRef',
                        inputValue: 'Due'
                    },
                    {
                        xtype : 'radio',
                        name: 'filterRadios',
                        boxLabel: 'All',
                        reference : 'rdAllRef',
                        inputValue: 'All',
                        checked : true
                    }
                ]
            },
            {
                xtype : 'combo',
                fieldLabel: 'Hedis Population',
                reference : 'hedisPopulationRef',
                bind: {
                    store : '{StoreHedisPopulation}'
                },
                displayField: 'listDescription',
                valueField: 'listItem'
            },
            {
                xtype: 'button',
                text: 'Apply',
                iconCls : 'x-fa fa-search',
                handler:'btnApply_Click'
            }
        ]
    },
    items: [
        {
            xtype:'grid',
            title: 'HEDIS List',
            frame: true,
            scrollable: true,
            flex : 5,
            reference: 'HEDISGrid',
            columns:{
                items:[
                    { text: 'Measure', dataIndex: 'measureDesc' },
                    { text: 'Sub Desc', dataIndex: 'subMeasure'},
                    { text: 'Due By', dataIndex: 'dueBy' , xtype: 'datecolumn',    format:'m/d/Y'},
                    { text: 'HEDIS Hit Date', dataIndex: 'lastSeen'  },
                    { text: 'Complete', dataIndex: 'complete' , width : 150},
                    { text: 'Prior Appt. Date', dataIndex: 'appointmentDate' , width : 150},
                    { text: 'Future Appt. Date', dataIndex: 'futureAppointmentDate'},
                    { text: 'Prov Id', dataIndex: 'provId' , width : 150},
                    { text: 'Set By', dataIndex: 'createUser' , width : 150}

                ]
            },
            bind: '{StoreHedisSummary}',
            dockedItems: [{
                dock:'bottom',
                xtype: 'pagingtoolbar',
                bind:{
                    store: '{StoreHedisSummary}'
                },
                pageSize:24
            }]
        },/*Grid*/
        {
            xtype : 'panel',
            title : 'Member HEDIS Notes',
            flex : 5,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items : [
                {
                    xtype: 'textarea',
                    flex : 10,
                    frame: true,
                    scrollable: true,
                    //height: 500,
                    reference: 'HEDISGridNotes',
                    itemId: 'HEDISGridNotes'


                }
            ]
        }

    ]

});
