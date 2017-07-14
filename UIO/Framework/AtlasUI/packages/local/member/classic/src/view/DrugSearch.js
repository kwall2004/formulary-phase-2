Ext.define('Atlas.member.view.DrugSearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-drugsearch',

    style: {
        padding: '20px'
    },
    title: 'Drug Search',
    items: [
        {
            xtype: "container",
            layout: 'hbox',
            items: [

                {
                    xtype: 'container',
                    layout: 'vbox',
                    flex: 1,
                    defaults: {
                        margin: 6
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Drug Name:',
                            name: 'drugName'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Plan:',
                            name: 'plan'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Plan Networks:',
                            name: 'planNetworks'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    flex: 1,
                    defaults: {
                        margin: 6
                    },
                    items: [

                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Covered Only:',
                            labelWidth: 200,
                            name: 'coveredOnly'
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'No Prior Authorization Required:',
                            labelWidth: 200,
                            name: 'noPriorAuthorizationRequired'
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Over-the-Counter Available:',
                            labelWidth: 200,
                            name: 'overTheCounterAvailable'
                        },
                        {
                            xtype: 'hboxform',
                            margin: '0, 6, 6, 6',
                            items: [
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Generic Alternatives:',
                                    name: 'genericAlternative',
                                    labelWidth: 200,
                                    margin: '0, 50, 0, 0'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Reset',
                                    scale: 'medium',
                                    margin: '0, 6, 6, 6'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Search',
                                    scale: 'medium',
                                    margin: '0, 6, 6, 6'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'pharmacySearchGrid'
        },
        {
            xtype: 'hboxform',
            items: [
                {
                    flex: 1,
                    xtype: 'grid',
                    title: 'Drug Details',
                    padding: '10px',
                    columns: [{
                        text: "Pharmacy Name",
                        flex: 1
                    }, {
                        text: "Address",
                        flex: 1
                    }, {
                        text: "City",
                        flex: 1
                    }, {
                        text: "State",
                        flex: 1
                    }, {
                        text: "Zip",
                        flex: 1
                    }],
                    // paging bar on the bottom
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        displayMsg: 'Displaying: ',
                        emptyMsg: "No data to display"
                    }
                },
                {
                    flex: 1,
                    xtype: 'grid',
                    title: 'Details',
                    padding: '10px',
                    columns: [{
                        text: "Drug Information",
                        flex: 1
                    }],

                    bbar: [
                        {
                            html: 'View Recent 30-day Prescription History'
                        }
                    ]
                }
            ]
        }
    ]
});
