Ext.define('Atlas.portals.view.provider.Training', {
    extend: 'Ext.Container',
    controller: 'TrainingViewController',

    viewModel: {
        stores: {
            TrainingStore: {
                model: 'Atlas.portals.model.Training',
                remoteSort: true,
                remoteFilter: true

            },
            TrainingRequestStore: {
                model: 'Atlas.portals.model.TrainingRequest',
                remoteSort: true,
                remoteFilter: true
            }
        }
    },
    scrollable: true,
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            minWidth: 1200,
            items: [
                {
                    xtype: 'form',
                    reference: 'trainingForm',
                    cls: 'card-panel',
                    title: 'Training',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        xtype: 'fieldset',
                        width: 600
                    },
                    items: [
                        {
                            title: 'Schedule Training',
                            items: [
                                {
                                    xtype: 'container',
                                    html: '<p>Please join us for an introduction to Meridian Health Plan\'s Provider Portal. We ' +
                                    'meet on alternate Wednesday\'s at 2:00pm (EST) to answer your questions about the ' +
                                    'Provider Portal and share updates and information with you and your team.</p>'
                                },
                                {
                                    xtype: 'container',
                                    html: '<p>Please select from the available dates below to register for an upcoming session.</p>'
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        xtype: 'textfield',
                                        labelWidth: 130,
                                        width: 430
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            name: 'trainingDate',
                                            id: 'trainingdatefield',
                                            displayField: 'key',
                                            valueField: 'value',
                                            queryMode: 'local',
                                            reference: 'trainingDateRef',
                                            fieldLabel: 'Available Dates',
                                            listeners: {
                                                change: 'onSubmitChange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'namefield',
                                            fieldLabel: 'Name',
                                            id: 'trainingnamefield',
                                            reference: 'nameRef'

                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'emailfield',
                                            id: 'trainingemailfield',
                                            fieldLabel: 'Email',
                                            reference: 'emailRef'
                                        }

                                    ]

                                }
                            ]
                        },


                        {
                            xtype: 'fieldset',
                            title: 'Available Training Modules',
                            html: '<p>The following eModules must be completed if you have not done so already. They include:</p>' +
                            '<ul><li>Cultural Competency</li>' +
                            '<li>Model of Care Training</li>' +
                            '<li>FWA Training</li>' +
                            '<li>CAHPS Survey Training</li>' +
                            '<li>Critical Incidents Training</li></ul>' +
                            '<p>You can access these trainings through our <a href="https://corp.mhplan.com/en/provider/michigan/meridianhealthplan/training-education/training-education-resources/annual-training/" target="_blank">Annual Training page.</a></p>' +
                            '<p><a href="https://corp.mhplan.com/en/provider/michigan/meridianhealthplan/training-education/training-education-resources/provider-orientation/" target="_blank">Click here to view the Provider Orientation document</a></p>' +
                            '<p>For Medicare training, please <a href="https://mymeridiancare.com/en/provider/michigan/extra/training-education/training-education-resources/annual-training/">click here</a> to access mymeridiancare.com. The hyperlink is below.</p>'
                        }

                    ],

                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',

                        layout: {
                            pack: 'left'
                        },

                        defaults: [{
                            xtype: 'button'
                        }],

                        items: [{
                            text: 'Submit',
                            handler: 'onSubmitClick',
                            reference: 'trainingSubmit1',
                            disabled: true
                        }, {
                            text: 'Clear',
                            handler: 'onClearClick',
                            reference: 'trainingClear1',
                            disabled: true
                        }]
                    }]
                }
            ]
        }]

});