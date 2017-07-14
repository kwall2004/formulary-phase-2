/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 9/1/2016
 * Origin: MERLIN - Member
 * Description: Editor page for Create Prescriber
 **/


Ext.define('Atlas.prescriber.view.CreatePrescriberEditorWindow', {
    extend: 'Ext.panel.Panel',
    xtype:'prescriber-createprescribereditorwindow',

    items: [{
        xtype: 'form',
        itemId: 'createPrescriberEditor',
        reference: 'editorForm',

        modelValidation: true,

        layout: 'hbox',

        items: [{
            xtype: 'fieldset',
            title: 'General Prescriber Information',

            defaults: {
                xtype: 'textfield'
            },

            items: [{
                fieldLabel: 'NPI',
                itemId: 'npiField',
                xtype: 'numberfield',
                bind: '{fieldrecord.npi}',
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                enforceMaxLength: 10,
                minLength: 10
            },{
                fieldLabel: 'Last Name',
                allowBlank: false,
                reference: 'reftextlastname',
                itemId: 'lastNameField',
                bind: '{fieldrecord.lastname}'

            },{
                fieldLabel: 'First Name',
                allowBlank: false,
                reference: 'reftextfirstname',
                itemId: 'firstNameField',
                bind: '{fieldrecord.firstname}'
            },{
                fieldLabel: 'DEA',
                allowBlank: false,
                reference: 'reftextDEA',
                itemId: 'deaField',
                bind: '{fieldrecord.deaNum}'
            },{
                fieldLabel: 'Degree',
                itemId: 'degreeField',
                bind: '{fieldrecord.degree}'
            },{
                fieldLabel: 'Specialty',
                itemId: 'specialtyField',
                bind: '{fieldrecord.Specialty}'
            },{
                xtype: 'combo',
                fieldLabel: 'State Liceanse',
                itemId: 'licStateField',
                queryMode: 'local',
                emptyText:   '[Select a State]',

                bind: {
                    store: '{statestore}',
                    value: '{fieldrecord.licstate}'
                },
                // listConfig: {
                //     getInnerTpl: function() {
                //         return '{value}'
                //     }
                // },
                displayField: 'value',
                valueField: 'value'
            },{
                xtype: 'container',
                layout: 'hbox',

                items: [{
                    xtype: 'checkboxfield',
                    itemId: 'FWAPrescriberCheckbox',
                    reference:'editFwaLock',
                    fieldLabel: '<span style="color: red">FWA Prescriber Lock</span>',
                    listeners: {
                        change: 'checkbox_change'
                    }
                },{
                    xtype: 'combobox',
                    width:120,
                    itemId: 'FWAPrescriberLockLOBField',
                    queryMode: 'local',
                    emptyText:   '[Select LOB]',
                    disabled:true,
                    bind: {
                        store: '{carrierlobsstore}'
                       // value: '{fieldrecord.FWAPrescriberLockLOB}'
                    },
                    multiSelect: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    listConfig: {
                        tpl: Ext.create('Ext.XTemplate',
                            '<div style="margin-top:5px"><tpl for=".">',
                            '<div class="boundList x-boundlist-item" style="display:table">',
                            '<span style="display:table-cell; vertical-align: middle;"><div class="chkbox" value={carrierLOBId}></div>{lobName}</span>',
                            '</div>',
                            '</tpl></div>'
                        )
                    },
                    displayField: 'lobName',
                    valueField: 'carrierLOBId'
                }]
            },{
                xtype: 'textareafield',
                itemId: 'prescriberLockNoteField',
                bind: '{fieldrecord.prescriberLockNote}',
                fieldLabel: '<span style="color: red">Notes</span>'
            }]
        },{
            xtype: 'fieldset',
            title: 'Location Information',

            defaults: {
                xtype: 'textfield',
                msgTarget: 'side'
            },

            items: [{
                fieldLabel: 'Address1',
                itemId: 'locaddr1Field',
                bind: '{fieldrecord.locaddr1}'
            },{
                fieldLabel: 'Address2',
                itemId: 'locaddr2Field',
                bind: '{fieldrecord.locaddr2}'
            },{
                fieldLabel: 'Location City',
                itemId: 'loccityField',
                bind: '{fieldrecord.loccity}'
            },{
                xtype: 'combo',
                fieldLabel: 'State',
                emptyText:'[Select a State]',
                queryMode: 'local',
                itemId: 'locstateField',

                bind: {
                    store: '{statestore}',
                    value: '{fieldrecord.locstate}'
                },
                // listConfig: {
                //     getInnerTpl: function() {
                //         return '{value}'
                //     }
                // },
                displayField: 'value',
                valueField: 'value'
            },{

                fieldLabel: 'Zip',
                itemId: 'loczipField',
                bind: '{fieldrecord.zip}',
                // xtype: 'textfield',
                enableKeyEvents: true,
                listeners: {
                    keyup:function(e) {
                        var val = e.rawValue,
                            length = val.length,
                            idxLastChar = length - 1;
                        if(isNaN(parseInt(val[idxLastChar]))){
                            this.setValue(val.substr(0,idxLastChar));
                        }
                        if(length >= 6){
                            if(val.indexOf('-') !== 5){
                                this.setValue(val.insertAt(5, '-'));
                                var newVal = this.getValue();
                                if (newVal.length >= 11){
                                    this.setValue(newVal.substr(0, 10));
                                }
                            }
                            else if ((length === 6) && (val.indexOf('-') === 5)){
                                this.setValue(val.substr(0,5));
                            }
                        }
                    }
                },
                maxLength: 10,
                enforceMaxLength: 10,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false

            },{
                xtype: 'textfield',
                fieldLabel: 'Phone',
                itemId: 'locphoneField',
                bind: '{fieldrecord.locphone}',
                emptyText:'(xxx) xxx-xxxx',
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                enableKeyEvents: true,
                 listeners:{
                    keyup:function(e) {
                        var val = e.rawValue;
                        this.setValue(Atlas.common.Util.formatPhone(val));
                    }
                }
            },{
                fieldLabel: 'Fax',
                itemId: 'locfaxField',
                bind: '{fieldrecord.locfax}',
                emptyText:'xxx-xxx-xxxx',
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                enableKeyEvents: true,
                listeners:{
                    keyup:function(e) {
                        var val = e.rawValue;
                        this.setValue(Atlas.common.Util.formatfax(val));
                    }
                }
            },{
                fieldLabel: 'Auth Fax',
                itemId: 'authFaxField',
                bind: '{fieldrecord.authFax}',
                emptyText:'xxx-xxx-xxxx',
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                enableKeyEvents: true,
                listeners:{
                    keyup:function(e) {
                        var val = e.rawValue;
                        this.setValue(Atlas.common.Util.formatfax(val));
                    }
                }
            }]
        }]
    },{
        xtype:'container',
        padding:10,
        html:'<span style="color:red">Please fill in all required information</span>'
    }]
});