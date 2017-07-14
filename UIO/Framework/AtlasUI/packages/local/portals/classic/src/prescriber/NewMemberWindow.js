Ext.define('Atlas.portals.prescriber.NewMemberWindow', {
    extend: 'Ext.Container',
    xtype: 'newmemberwindow',
    reference: 'membersform',


    items: {
        xtype: 'panel',
        title: 'Request Member Access',
        bbar: {
            xtype: 'toolbar',
            items: [
                '->',
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-plus-circle',
                    text: 'Submit',
                    listeners: {
                            click:function() {
                                var me = this,
                                    form = me.up().up().down('form'),
                                    values = form.getValues(),
                                    Member = Ext.create('Atlas.portals.prescriber.model.CreateMember'),
                                    count = 0;

                                if(form.isValid()) {
                                    count = values.gender ? count + 1 : count;
                                    count = values.DOB ? count + 1 : count;
                                    count = values.ssn ? count + 1 : count;

                                    if (count < 2) {
                                        Ext.MessageBox.alert('Failed', 'Please provide at least two out of Gender/DOB/SSN', function(){});
                                        return;
                                    }
                                    Member.phantom = false;
                                    Member.getProxy().url = 'portal/rx/portalmemberaccessp';
                                    Member.getProxy().setExtraParam('pSessionID', user.retSessionID);
                                    Member.getProxy().setExtraParam('pKeyType', 'Prescriber');
                                    Member.getProxy().setExtraParam('pKeyValue', user.un);
                                    Member.getProxy().setExtraParam('ttMemberDetail',  {SSN: values.ssn, memberId: values.member, firstName: values.firstName, lastName: values.lastName, Gender: values.gender, DOB: values.dob});
                                    Member.save({
                                        success: function(record, operation) {
                                            var message = Ext.JSON.decode(operation._response.responseText).message[0];

                                            var form = me.up().up().down('form');
                                            form.reset();

                                            if(message.code === 0) {
                                                Ext.Msg.alert('Success', 'Access to requested member has been granted.');
                                                return;
                                            }
                                            Ext.Msg.alert('Failed', message.message);
                                        },
                                        failure: function() {
                                            Ext.Msg.alert('Failed', 'Access to requested member has failed.');
                                            var form = me.up().up().down('form');
                                            form.reset();
                                        }

                                    });
                                } else {
                                    Ext.MessageBox.alert('Failed', 'Please Provide all Mandatory Fields, ID/First/Last Name', function(){});
                                }
                        }
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-refresh',
                    text: 'Reset',
                    listeners: {
                        click: function () {
                            var form = this.up().up().down('form');
                            form.reset();
                        }
                    }
                }
            ]
        },

    items: {
        xtype: 'form',
        reference: 'memberAccessForm',
        defaults: {
            flex: 1,
            labelWidth: 100
        },

        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Member ID',
                reference: 'member',
                name: 'member',
                msgTarget: 'side',
                emptyText: 'Please enter member id',
                blankText: 'Please enter member id',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                fieldLabel: 'First Name',
                reference: 'firstName',
                name: 'firstName',
                msgTarget: 'side',
                emptyText: 'Please enter first name',
                blankText: 'Please enter first name',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Last Name',
                reference: 'lastName',
                name: 'lastName',
                msgTarget: 'side',
                emptyText: 'Please enter last name',
                blankText: 'Please enter last name',
                allowBlank: false
            },
            {
                xtype: 'combo',
                reference: 'Gender',
                name: 'gender',
                fieldLabel: 'Gender',
                queryMode: 'local',
                emptyText: 'Select Gender',
                displayField: 'genderdisplay',
                valueField: 'gendervalue',
                store: {
                    fields: ['gendervalue', 'genderdisplay'],
                    data: [
                        {"gendervalue": "1", "genderdisplay": "Male"},
                        {"gendervalue": "2", "genderdisplay": "Female"}
                    ]
                }
            },
            {
                xtype: 'datefield',
                fieldLabel: 'DOB',
                reference: 'DOB',
                name: 'DOB',
                format: 'Y/m/d',
                msgTarget: 'side',
                emptyText: 'Please select dob'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'SSN',
                reference: 'ssn',
                name: 'ssn',
                maxLength: 4,
                msgTarget: 'side',
                emptyText: 'Please enter SSN'
            }
            ]
        }
    }
});