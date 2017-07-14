/**
 * Last Developer: Jeff Huffman
 * Previous Developers: []
 * Origin: prescriberportal-searchpriorauth-createaudit
 * Description: Plan Search
 **/
Ext.define('Atlas.pharmacy.view.outreach.PharmacyOutreachSearch', {
    extend: 'Ext.form.Panel',
    xtype: 'pharmacyoutreachsearch',
    //scrollable: true,
    itemId: 'posrchForm',
    layout: 'anchor',
    defaults: {
        //padding: '10 0 10 0',
    },
    items: [{
        xtype: 'fieldset',
        title: 'Pharmacy Out of Network Search',
        // CAN NOT SET IT TO BE collapsible, or as tagfield control grows, buttons will go down.
        //collapsible: true,
        itemId: 'posrchFldset',
        layout: 'anchor',
        defaults: {
            xtype: 'combobox',
            padding: '10 0 10 0',
            labelWidth: 100,
            width: 250
        },
        items: [/*{
            xtype: 'label',
            html: '<p align="center" style="margin: 0 0 20px 0">Pick Market Entry Date Range</p>'
        },*/ {
            xtype: 'datefield',
            fieldLabel: 'Date From',
            format: 'm/d/Y',
            allowBlank: false,
            itemId: 'cboDateFrom',
            submitformat: 'm/d/Y',
            maxValue: new Date(), // limited to the current date or prior
            bind: '{dateFrom}'
        }, {
            xtype: 'datefield',
            fieldLabel: 'Date To',
            format: 'm/d/Y',
            submitformat: 'm/d/Y',
            allowBlank: false,
            itemId: 'cboDateTo',
            value: new Date(),  // defaults to today
            displayField: '{dateTo}',
            bind: {
                value: '{dateTo}'
            }
        },{
            xtype: 'tagfield',
            fieldLabel: 'Select State(s)',
            emptyText: 'State(s)',
            displayField: 'name',
            valueField: 'value',
            queryMode: 'local',
            allowBlank: false,
            itemId: 'cboStates',
            width: 500,
            listConfig: {
                getInnerTpl: function(displayField) {
                    return '<input type="checkbox"/> {' + displayField + '} ';
                }
            },
            bind: {
                store: '{states}',
                value: '{statesList}'
            },
            listeners: {
                change: 'updateTagFieldCheckBoxes',
                expand: 'updateTagFieldCheckBoxes'
            }

        },{
            xtype: 'tagfield',
            fieldLabel: 'Select Service(s)',
            emptyText: 'Service(s)',
            displayField: 'name',
            valueField: 'value',
            allowBlank: true,
            itemId: 'cboDispenserTypes',
            width: 500,
            queryMode: 'local',
            listConfig: {
                getInnerTpl: function(displayField) {
                    return '<input type="checkbox"/> {' + displayField + '} ';
                }
            },
            bind: {
                store: '{dispenserTypes}',
                value: '{dispenserTypesList}'
            },
            listeners: {
                change: 'updateTagFieldCheckBoxes',
                expand: 'updateTagFieldCheckBoxes'
            }
        }, {
            xtype:'container',
            layout: 'hbox',
            pack: 'center',
            width: 500,
            defaults:{
                xtype: 'button',
                flex: 1
            },
            items: [{
                text: 'Submit Job',
                itemId: 'btnSubmitJob',
                handler: 'onSubmitOONJobClicked'
            }, {
                text: 'Reset',
                itemId: 'btnReset',
                handler: 'onResetClicked'
            }]
        }]
    }]
});