Ext.define('Atlas.letter.view.LetterFaxWindow', {
    extend: 'Ext.window.Window',
    title: 'Fax Letter',
    width: 600,
    autoHeight : true,
    modal      : true,
    border     : false,
    layout: {
        type: 'hbox',
        align: 'fit',
        flex: 1
    },

    items:[
        {
            xtype: 'form',
            layout: {
                type: 'vbox',
                align: 'fit',
                flex: 1
            },
            defaults: {
                xtype: 'checkbox',
                labelWidth: 150,
                'padding-left':'20px'
            },
            items: [
                {name: 'txtFax1', itemid: 'txtFax1',
                    bind: {
                        value: '{vmIsPCPFax}'
                    }
                },
                {name: 'txtFax2', itemid: 'txtFax2',
                    bind: {
                        value: '{vmIsPrescriberFax}'
                    }
                },
                {name: 'txtFax4', itemid: 'txtFax4',
                    bind: {
                        value: '{vmIsMemberFax}'
                    }
                },
                {name: 'txtFax3', itemid: 'txtFax3',
                    bind: {
                        value: '{vmIsPharmacyFax}'
                    }
                }
            ]
        },
        {
            xtype: 'form',
            itemId:'txtform',
            layout: {
                type: 'vbox',
                align: 'fit',
                flex: 2
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align : 'stretch'
                    },
                    defaults: {
                        xtype: 'textfield'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            name: 'txtFaxNumPCP1', itemId: 'txtFaxNumPCP1',
                            labelWidth: 150, fieldLabel: 'PCP', maskRe: /[0-9]/,
                            minLength: 3,
                            width: 270,
                            maxLength: 3,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 3,
                            bind: {
                                disabled: '{!vmIsPCPFax}'
                            },
                            listeners: {
                                'keyup': function (obj) {
                                    if(obj.getValue().toString().length == 3){this.up().down('#txtFaxNumPCP2').focus()};
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'txtFaxNumPCP2',labelWidth: 150, itemId: 'txtFaxNumPCP2',  maskRe: /[0-9]/,
                            width: 120,
                            minLength: 3,
                            maxLength: 3,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 3,
                            bind: {
                                disabled: '{!vmIsPCPFax}'
                            },
                            listeners: {
                                'keyup': function (obj) {
                                    if (obj.getValue().toString().length == 3) {
                                        this.up().down('#txtFaxNumPCP3').focus();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'txtFaxNumPCP3', itemId: 'txtFaxNumPCP3',  maskRe: /[0-9]/,
                            width: 140,
                            minLength: 4,
                            maxLength: 4,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 4,
                            bind: {
                                disabled: '{!vmIsPCPFax}'
                            }
                        }
                    ]
                },
                { xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    defaults: {
                        xtype: 'textfield'
                    },
                    items:[
                        {
                            name: 'txtFaxNumPrescriber1', itemId: 'txtFaxNumPrescriber1',
                            labelWidth: 150, fieldLabel: 'Prescriber', maskRe: /[0-9]/,
                            width: 270,
                            minLength: 3,
                            maxLength: 3,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 3,
                            bind: {
                                disabled: '{!vmIsPrescriberFax}'
                            },
                            listeners: {
                                'keyup': function (obj) {
                                    if(obj.getValue().toString().length == 3){this.up().down('#txtFaxNumPrescriber2').focus()};
                                }
                            }
                        },
                        {
                            name: 'txtFaxNumPrescriber2', itemId: 'txtFaxNumPrescriber2', maskRe: /[0-9]/,
                            width: 120,
                            minLength: 3,
                            maxLength: 3,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 3,
                            bind: {
                                disabled: '{!vmIsPrescriberFax}'
                            },
                            listeners: {
                                'keyup': function (obj) {
                                    if (obj.getValue().toString().length == 3) {
                                        this.up().down('#txtFaxNumPrescriber3').focus();
                                    }
                                }
                            }
                        },
                        {
                            name: 'txtFaxNumPrescriber3', itemId: 'txtFaxNumPrescriber3', maskRe: /[0-9]/,
                            width: 140,
                            minLength: 4,
                            maxLength: 4,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 4,
                            bind: {
                                disabled: '{!vmIsPrescriberFax}'
                            }
                        }
                    ]
                },
                { xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    defaults: {
                        xtype: 'textfield'
                    },
                    items:[
                        {
                            name: 'txtFaxNumMember1', itemId: 'txtFaxNumMember1',
                            labelWidth: 150,fieldLabel: 'Member', maskRe: /[0-9]/,
                            width: 270,
                            minLength: 3,
                            maxLength: 3,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 3,
                            bind: {
                                disabled: '{!vmIsMemberFax}'
                            },
                            listeners: {
                                'keyup': function (obj) {
                                    if(obj.getValue().toString().length == 3){this.up().down('#txtFaxNumMember2').focus()};
                                }
                            }
                        },
                        {
                            name: 'txtFaxNumMember2', itemId: 'txtFaxNumMember2',  maskRe: /[0-9]/,
                            width: 120,
                            minLength: 3,
                            maxLength: 3,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 3,
                            bind: {
                                disabled: '{!vmIsMemberFax}'
                            },
                            listeners: {
                                'keyup': function (obj) {
                                    if (obj.getValue().toString().length == 3) {
                                        this.up().down('#txtFaxNumMember3').focus();
                                    }
                                }
                            }
                        },
                        {
                            name: 'txtFaxNumMember3', itemId: 'txtFaxNumMember3', maskRe: /[0-9]/,
                            width: 140,
                            minLength: 4,
                            maxLength: 4,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 4,
                            bind: {
                                disabled: '{!vmIsMemberFax}'
                            }
                        }
                    ]
                },
                { xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    defaults: {
                        xtype: 'textfield'
                    },
                    items:[
                        {
                            name: 'txtFaxNumPharmacy1', itemId: 'txtFaxNumPharmacy1',
                            labelWidth: 150, fieldLabel: 'Pharmacy', maskRe: /[0-9]/,
                            width: 270,
                            minLength: 3,
                            maxLength: 3,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 3,
                            bind: {
                                disabled: '{!vmIsPharmacyFax}'
                            },
                            listeners: {
                                'keyup': function (obj) {
                                    if(obj.getValue().toString().length == 3){this.up().down('#txtFaxNumPharmacy2').focus()};
                                }
                            }
                        },
                        {
                            name: 'txtFaxNumPharmacy2', itemId: 'txtFaxNumPharmacy2',  maskRe: /[0-9]/,
                            width: 120,
                            minLength: 3,
                            maxLength: 3,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 3,
                            bind: {
                                disabled: '{!vmIsPharmacyFax}'
                            },
                            listeners: {
                                'keyup': function (obj) {
                                    if (obj.getValue().toString().length == 3) {
                                        this.up().down('#txtFaxNumPharmacy3').focus();
                                    }
                                }
                            }
                        },
                        {
                            name: 'txtFaxNumPharmacy3', itemId: 'txtFaxNumPharmacy3', maskRe: /[0-9]/,
                            width: 140,
                            minLength: 4,
                            maxLength: 4,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 4,
                            bind: {
                                disabled: '{!vmIsPharmacyFax}'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    bbar: ['->',{
        text: 'Send Fax',
        xtype: 'button',
        //handler: 'onClickRunReport',
        listeners: {
            click: 'onClickSendFax'
        }
    },{
        text: 'Cancel',
        xtype: 'button',
        listeners: {
            click: function() {
                var win = this.up('window');
                win.close();
            }
        }
    }]
});