Ext.define('Atlas.portals.view.hpmember.EnrollDiseaseManagement', {
    extend: 'Ext.Container',
    xtype: 'portalshpmemberenrolldiseasemanagement',
    controller: 'portalshpmemberenrolldiseasemanagement',
    title: 'Enroll in Disease Management',
    viewModel: {
        data: {
            conditionSelected: false,
            invalidState: false,
            diseaseDescription: ''
        }
    },
    items: {
        xtype: 'panel',
        title: 'Enroll into a Disease Management Program',
        cls: 'card-panel',
        bodyPadding: '15 50 15 15',
        width: 680,
        items: [{
            xtype: 'container',
            items: [
                {
                    xtype: 'container',
                    border: 'false',
                    bind: {
                        html: '<p>{diseaseDescription}</p>'
                    }
                },
                {
                    xtype: 'form',
                    cls: 'formPanel',
                    border: false,
                    reference: 'enrollForm',

                    items: [{
                        xtype: 'fieldset',
                        title: 'Please select all conditions that apply',
                        width: 600,
                        defaults: {
                            style: {
                                paddding: '15px'
                            },
                            listeners: {
                                change: 'onCheckBoxChange'
                            }
                        },
                        items: [
                            {
                                xtype: 'checkbox',
                                name: 'asthma',
                                reference: 'asthma',
                                boxLabel: 'Asthma',
                                uncheckedValue: '0',
                                inputValue: 'M-01'
                            },
                            {
                                xtype: 'checkbox',
                                name: 'cardio',
                                reference: 'cardio',
                                boxLabel: 'Cardiovascular Disease (CVD)',
                                uncheckedValue: '0',
                                inputValue: 'M-03'
                            },
                            {
                                xtype: 'checkbox',
                                name: 'chronic',
                                reference: 'chronic',
                                boxLabel: 'Chronic Obstructive Pulmonary Disease (COPD)',
                                uncheckedValue: '0',
                                inputValue: 'M-17'
                            },
                            {
                                xtype: 'checkbox',
                                name: 'congestive',
                                reference: 'congestive',
                                boxLabel: 'Congestive Heart Failure (CHF)',
                                uncheckedValue: '0',
                                inputValue: 'M-10',
                                bind: {
                                    hidden: '{invalidState}'
                                }
                            },
                            {
                                xtype: 'checkbox',
                                name: 'diabetes',
                                reference: 'diabetes',
                                boxLabel: 'Diabetes',
                                uncheckedValue: '0',
                                inputValue: 'M-02'
                            },
                            {
                                xtype: 'container',
                                width: '100%',
                                layout: {
                                    pack: 'center',
                                    align: 'center',
                                    type: 'hbox'
                                },
                                items: {
                                    xtype: 'button',
                                    text: 'Enroll Now',
                                    align: 'center',
                                    iconCls: 'x-fa fa-share-square-o',
                                    width: 200,
                                    handler: 'enroll',
                                    bind: {
                                        disabled: '{!conditionSelected}'
                                    }
                                }
                            }
                        ]
                    }]
                }
            ]
        }]
    }
});