Ext.define('Atlas.provider.view.memberinformation.MemberInformation', {
    extend: 'Ext.panel.Panel',
    xtype: 'prescriberportal-memberinformation-memberinformation',

    title: 'Member Information',

    viewModel:{
        data: {
            membergeneralinfo:{
                firstname: '',
                middlename: '',
                lastname: '',
                suffix: '',
                gender: '',
                birthdate: '',
                age: '',
                ssn: '',
                language: '',
                race: '',
                deceaseddate: '',
                primarycarephysician: ''
            },
            membercontactinfo: {
                pharmacyname: '',
                servicetype: '',
                address: '',
                phone: '',
                fax: '',
                email: ''
            },
            guardianinfo: {
                name: '',
                address: '',
                homephone: '',
                workphone: ''
            },
            plangroupinfo: {
                carrier: '',
                account: '',
                plangroup: ''
            }
        }
    },
        
    items: [{
        xtype: 'container',
        frame: false,

        items: [{
            xtype: 'container',
            frame: false,
            layout: 'hbox',
            
            defaults: {
                xtype: 'label',
                flex: 1,
                padding: 10
            },
            
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Search Member',
                name: 'searchMemberInput',
                itemId: 'searchMemberInput',
                allowBlank: false,
                flex: 3
            },{
                text: 'Member Name: '
            },{
                text: '| DOB: '
            },{
                html: '| <i class="fa fa-flag" aria-hidden="true"></i>'
            }]
        },{
            xtype: 'container',
            frame: false,
            
            style: {
                'margin-bottom': '40px'
            },

            layout: 'hbox',

            items: [{
                xtype: 'container',
                frame: false,
                flex: 1,
                
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    
                    items: [{
                        xtype:'container',
                        frame: false,
                        flex: 1,
                        
                        items: [{
                            xtype: 'fieldset',
                            title: 'Member General Information',
                            
                            defaults: {
                                xtype: 'displayfield'
                            },
                            
                            style: {
                                'margin':'10px'
                            },
                            
                            items: [{
                                fieldLabel: 'First Name',

                                bind: {
                                    value: '{membergeneralinfo.firstname}'
                                }
                            },{
                                fieldLabel: 'Middle Name',
                                
                                bind: {
                                    value: '{membergeneralinfo.middlename}'
                                }
                            },{
                                fieldLabel: 'Last Name',

                                bind: {
                                    value: '{membergeneralinfo.lastname}'
                                }
                            },{
                                fieldLabel: 'Suffix',

                                bind: {
                                    value: '{membergeneralinfo.suffix}'
                                }
                            },{
                                fieldLabel: 'Gender',

                                bind: {
                                    value: '{membergeneralinfo.gender}'
                                }
                            },{
                                fieldLabel: 'Birth Date',

                                bind: {
                                    value: '{membergeneralinfo.birthdate}'
                                }
                            },{
                                fieldLabel: 'Age',

                                bind: {
                                    value: '{membergeneralinfo.age}'
                                }
                            },{
                                fieldLabel: 'SSN',

                                bind: {
                                    value: '{membergeneralinfo.ssn}'
                                }
                            },{
                                fieldLabel: 'Language',

                                bind: {
                                    value: '{membergeneralinfo.language}'
                                }
                            },{
                                fieldLabel: 'Ethnicity/Race',

                                bind: {
                                    value: '{membergeneralinfo.race}'
                                }
                            },{
                                fieldLabel: 'Deceased Date',

                                bind: {
                                    value: '{membergeneralinfo.deceaseddate}'
                                }
                            },{
                                fieldLabel: 'Primary Care Physician',

                                bind: {
                                    value: '{membergeneralinfo.primarycarephysician}'
                                }
                            }]
                        }]
                    },{
                        xtype:'container',
                        frame: false,
                        flex: 1,

                        style: {
                            'margin':'10px'
                        },

                        items: [{
                            xtype: 'fieldset',
                            title: 'Member Contact Information',
                            
                            defaults: {
                                xtype: 'displayfield'
                            },
                            
                            items: [{
                                fieldLabel: 'Pharmacy Name',
                                
                                bind: {
                                    value: '{membercontactinfo.pharmacyname}'
                                }
                            },{
                                fieldLabel: 'Service Type',
                                
                                bind: {
                                        value: '{membercontactinfo.servicetype}'
                                }
                            },{
                                fieldLabel: 'Address',
                                
                                bind: {
                                    value: '{membercontactinfo.address}'
                                }
                            },{
                                fieldLabel: 'Phone',
                                
                                bind: {
                                    value: '{membercontactinfo.phone}'
                                }
                            },{
                                fieldLabel: 'Email',
                                
                                bind: {
                                    value: '{membercontactinfo.email}'
                                }
                            }]
                        },{
                            xtype: 'fieldset',
                            title: 'Guardian/Responsible Part Information',
                            
                            defaults: {
                                xtype: 'displayfield'
                            },
                            
                            items: [{
                                fieldLabel: 'Name',
                                
                                bind: {
                                    value: '{guardianinfo.name}'
                                }
                            },{
                                fieldLabel: 'Address',
                                
                                bind: {
                                    value: '{guardianinfo.address}'
                                }
                            },{
                                fieldLabel: 'Home Phone',
                                
                                bind: {
                                    value: '{guardianinfo.homephone}'
                                }
                            },{
                                fieldLabel: 'Work Phone',
                                
                                bind: {
                                    value: '{guardianinfo.workphone}'
                                }
                            }]
                        }]
                    }]
                },{
                    xtype: 'fieldset',
                    title: 'Plan Group Information',
                    margin: 10,
                    
                    defaults: {
                        xtype: 'displayfield'
                    },
                    
                    items: [{
                        fieldLabel: 'Carrier',

                        bind: {
                            value: '{plangroupinfo.carrier}'
                        }
                    },{
                        fieldLabel: 'Account',

                        bind: {
                            value: '{plangroupinfo.account}'
                        }
                    },{
                        fieldLabel: 'Plan Group',

                        bind: {
                            value: '{plangroupinfo.plangroup}'
                        }
                    }]
                }]
            },{
                xtype: 'container',
                frame: false,
                flex: 1,
                items: [{
                    xtype: 'panel',
                    frame: true,
                    title: 'Prior Authorizations',

                    style: {
                        'margin-bottom':'15px'
                    },

                    items: [{
                        xtype: 'prescriberportal-memberinformation-priorauthorizations'
                    }]
                },{
                    xtype: 'panel',
                    frame: true,
                    title: 'Claims', 

                    style: {
                        'margin-bottom':'15px'
                    },
                    
                    items: [{
                        xtype: 'prescriberportal-memberinformation-claims'
                    }]
                },{
                    xtype: 'panel',
                    frame: true,
                    title: 'HEDIS',                

                    style: {
                        'margin-bottom':'15px'
                    },
                    
                    items: [{
                        xtype: 'prescriberportal-memberinformation-hedis'
                    }]
                }]
            }]
        }]
    }]
});
