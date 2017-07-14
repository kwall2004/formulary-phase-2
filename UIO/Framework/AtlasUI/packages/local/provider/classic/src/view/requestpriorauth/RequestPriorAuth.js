Ext.define('Atlas.provider.view.requestpriorauth.RequestPriorAuth', {
    extend: 'Ext.panel.Panel',
    xtype: 'prescriberportal-requestpriorauth-requestpriorauth',
    title: 'Request Prior Auth',

    items: [{
        xtype: 'hboxform',

        items: [{
            xtype: 'form',
            frame: true,
            flex: 1,
            margin: 5,
            title: 'Contact Entity Information',

            layout: {
                type: 'table',
                columns: 2,
                tdAttrs: { 
                    style: 'padding: 5px 10px;' 
                }
            },

            items: [{
                xtype: 'textfield',
                fieldLabel: 'Member*',
                name: 'memberInput',
                allowBlank: false
            },{
                xtype: 'button',
                text: 'Search',
                scale: 'small'
            },{
                xtype: 'datefield',
                fieldLabel: 'DOB*',
                name: 'dobInput',
                allowBlank: false
            },{
                xtype: 'label'
            },{
                xtype: 'combo',
                editable: false,
                fieldLabel: 'Gender:'
            },{
                xtype: 'label'
            },{
                xtype: 'textfield',
                fieldLabel: 'Phone #',
                name: 'phoneInput'
            },{
                xtype: 'label'
            },{
                xtype: 'textfield',
                fieldLabel: 'Height',
                name: 'feetInput'
            },{
                xtype: 'textfield',
                name: 'inchesInput'
            },{
                xtype: 'textfield',
                fieldLabel: 'Weight',
                name: 'weightInput'
            },{
                xtype: 'label'
            },{
                xtype: 'textfield',
                fieldLabel: 'BMI',
                name: 'bmiInput'
            },{
                xtype: 'datefield',
                name: 'bmiDateInput'
            },{
                xtype: 'textfield',
                fieldLabel: 'Blood Pressure',
                name: 'bloodInput'
            },{
                xtype: 'textfield',
                xtype: 'datefield',
                name: 'bloodDateInput'
            }]
        },{
            xtype: 'form',
            frame: true,
            margin: 5,
            flex: 1,
            title: 'Medical Information', 

            defaults: {
                xtype: 'textfield',
                margin: 10
            },
            
            items: [{
                fieldLabel: 'Medication*',
                name: 'medicationInput',
                allowBlank: false
            },{
                fieldLabel: 'Strength/Route of Administration*',
                name: 'strengthInput',
                allowBlank: false
            },{
                fieldLabel: 'Frequency*',
                name: 'frequencyInput',
                allowBlank: false
            },{
                fieldLabel: 'Quantity*',
                name: 'quantityInput',
                allowBlank: false
            },{
                fieldLabel: 'Diagnoses*',
                name: 'diagnosesInput',
                allowBlank: false
            },{
                fieldLabel: 'Rationale*',
                name: 'rationaleInput',
                allowBlank: false
            }]             
        },{
            xtype: 'form',
            frame: true,
            margin: 5,
            flex: 1,
            title: 'Prescriber Information',

            defaults: {
                xtype: 'textfield',
                margin: 10
            },

            items: [{
                fieldLabel: 'Prescriber Name*',
                name: 'prescriberNameInput',
                allowBlank: false
            }, {
                fieldLabel: 'NPI*',
                name: 'npiInput',
                allowBlank: false
            }, {
                fieldLabel: 'Specialty*',
                name: 'specialtyInput',
                allowBlank: false
            },  {
                fieldLabel: 'Office Phone*',
                name: 'officePhoneInput',
                allowBlank: false
            },{
                fieldLabel: 'Office Fax*',
                name: 'officeFaxInput',
                allowBlank: false
            },{
                fieldLabel: 'Contact Person*',
                name: 'contactPersonInput',
                allowBlank: false
            }]
        }]
    },{
        xtype: 'panel',
        title: '* = required field. Optional information will help in adjudicating this Prior Auth.',
        frame: false,
        
        style: {
            'margin': '15px 0px 15px 0px'
        }
    },{
        xtype: 'hboxform',
        frame: false,

        style: {
            'margin-bottom': '15px'
        },

        items: [{
            xtype: 'container',
            frame: false,
            
            style: {
                'margin-bottom': '15px'
            },

            items: [{
                xtype: 'panel',
                title: 'Drug Allergies',
                frame: true,
                flex: 1,
                padding: 10,

                style: {
                    'margin-bottom': '15px'
                },

                items: [{
                    xtype: 'button',
                    text: 'Add',
                    scale: 'small'
                },{
                    xtype: 'button',
                    text: 'Remove',
                    scale: 'small'
                },{
                    xtype: 'prescriberportal-requestpriorauth-drugallergies'
                }]
            },{
                xtype: 'panel',
                title: 'Previously Attempted Therapies',
                frame: true,
                flex: 1,
                padding: 10,

                items: [{
                    xtype: 'button',
                    text: 'Add',
                    scale: 'small'
                },{
                    xtype: 'button',
                    text: 'Remove',
                    scale: 'small'
                },{
                    xtype: 'prescriberportal-requestpriorauth-previouslyattemptedtherapies'
                }]
            }]
        },{
            xtype: 'panel',
            title: 'Fax Attachments',
            frame: true,
            style: {
                'margin-left':'10px',
                'padding':'10px'
            },

            items: [{
                xtype: 'button',
                text: 'Add Attachment',
                scale: 'small'
            },{
                xtype: 'prescriberportal-requestpriorauth-faxattachments'
            }]
        }]
    },{
        xtype: 'panel',
        iconCls: 'fa fa-check',

        header: {
            defaults: {
                xtype: 'button'
            },
            items: [{
                text: 'Save'
            },{
                text: 'Submit PA Request'
            },{
                text: 'Cancel'
            }]
        }
    }]
});
