Ext.define('Atlas.formulary.view.formularydrugsearch.FormularyDrugSearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'formulary-formularydrugsearch-formularydrugsearch',
    store: 'store.memberInfoStore',

    title: 'Formulary Drug Search',
    padding: 10,

    viewModel:{
        data: {
            druginformation:{
                medicationname: 'AMOX TR-POTASSIUM CLAVULANATE',
                strength: '200mg-28.5 mg/5 ml',
                drugtype: 'Generic',
                covered: 'Yes',
                priorauthrequired: 'No',
                overthecounter: 'No',
                sideeffect: 'Closttridum Difficle Colitis',
                title: 'Amoxicillin/Clavularic Acid Suspension-Oral (a-MOX-something)',
                other: 'augmentin',
                uses: 'lorem ipsum',
                coveragegap: 'Yes'
            }
        }
    },

    items: [{
        xtype: 'form',
        title: 'Selection',
        padding: 10,
        frame: true,
        
        style: {
            'margin-bottom': '15px'
        },

        defaults: {
            xtype: 'checkbox'
        },

        items: [{
            xtype: 'textfield',
            fieldLabel: 'Medication Name',
            name: 'medicationName',
            itemId: 'medicationName',
            allowBlank: false
        },{
            xtype: 'textfield',
            fieldLabel: 'Medication Name',
            name: 'medicationName',
            itemId: 'medicationName',
            allowBlank: false
        },{
            fieldLabel: 'Covered Only',
            name: 'coveredOnly',
            inputValue: 'coveredOnlyValue'
        },{
            fieldLabel: 'No Prior Authorization Required',
            name: 'noPriorAuthRequired',
            inputValue: 'NoPriorAuthRequiredValue'
        },{
            fieldLabel: 'Over-the-Counter Available',
            name: 'overTheCounter',
            inputValue: 'overTheCounterValue'
        },{
            fieldLabel: 'Generic Alternatives',
            name: 'genericAlternatives',
            inputValue: 'genericAlternativesValue'
        },{
            fieldLabel: 'Preferred',
            name: 'preferred',
            inputValue: 'preferredValue'
        },{
            xtype: 'combo',
            value: 'Choose Plan',
            triggerAction: 'all',
            editable: false,
            disabled: true,
            fieldLabel: 'Select Plan',
            name: 'plan',
            displayField: 'name',
            valueField: 'value',
            
            store: {
                fields: ['name', 'value'],
                data: [
                    {name : 'Plan 1', value: 'Plan1'},
                    {name : 'Plan 2', value: 'Plan2'}
                ]
            }
        },{
            xtype: 'combo',
            value: 'Select Tier',
            triggerAction: 'all',
            editable: false,
            disabled: true,
            fieldLabel: 'Select Tier',
            name: 'tier',
            displayField: 'name',
            valueField: 'value',
            
            store: {
                fields: ['name', 'value'],
                data: [
                    {name : 'Tier 1', value: 'Tier1'},
                    {name : 'Tier 2', value: 'Tier2'}
                ]
            }
        },{
            xtype: 'button',
            text: 'Search'
        }]
    }, {
        xtype: 'panel',
        frame: false,
        layout: 'hbox',
        
        items: [{
            xtype: 'panel',
            title: 'Search Results',
            frame: true,
            flex: 1,
            padding: 10,

            style: {
                'margin':'0px 10px 0px 0px'
            },
            
            items: [{
                xtype: 'button',
                text: 'Export to PDF'
            },{
                xtype: 'button',
                text: 'Export to Excel'
            },{
                xtype: 'prescriberportal-formularydrugsearch-searchresultsgrid'
            }]
        },{
            xtype: 'panel',
            title: 'Drug Details',
            frame: true,
            flex: 1,
            padding: 10,

            style: {
                'margin':'0px 0px 10px 0px'
            },

            items: [{
                xtype: 'fieldset',
                title: 'Drug Information',
                
                items: [{
                    xtype: 'container',

                    defaults: {
                        xtype: 'displayfield'
                    },
                    
                    items: [{
                        fieldLabel: 'Medication Name',
                        
                        bind: {
                            value: '{druginformation.medicationname}'
                        }
                    },{
                        fieldLabel: 'Strength',
                        
                        bind: {
                            value: '{druginformation.strength}'
                        }
                    },{
                        fieldLabel: 'Drug Type',
                        
                        bind: {
                            value: '{druginformation.drugtype}'
                        }
                    },{
                        fieldLabel: 'Covered',
                        
                        bind: {
                            value: '{druginformation.covered}'
                        }
                    },{
                        fieldLabel: 'Prior Auth Requred',
                        
                        bind: {
                            value: '{druginformation.priorauthrequired}'
                        }
                    },{
                        fieldLabel: 'Over-the-Counter Available',
                        
                        bind: {
                            value: '{druginformation.overthecounter}'
                        }
                    },{
                        fieldLabel: 'Side Effect',
                        
                        bind: {
                            value: '{druginformation.sideeffect}'
                        }
                    },{
                        fieldLabel: 'Title',
                        
                        bind: {
                            value: '{druginformation.title}'
                        }
                    },{
                        fieldLabel: 'Other Brand',
                       
                        bind: {
                            value: '{druginformation.other}'
                        }
                    },{
                        fieldLabel: 'Uses',
                        
                        bind: {
                            value: '{druginformation.uses}'
                        }
                    },{
                        fieldLabel: 'Coverage Gap',
                        
                        bind: {
                            value: '{druginformation.coveragegap}'
                        }
                    }]
                }]
            }]
        }]
    }]
});
