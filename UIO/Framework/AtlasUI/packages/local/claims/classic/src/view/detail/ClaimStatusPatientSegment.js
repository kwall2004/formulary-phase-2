/**
 * Created by T4317 on 2/22/2017.
 */
Ext.define('Atlas.claims.view.detail.ClaimStatusPatientSegment', {
    extend: 'Ext.form.FieldSet',
    xtype: 'claimdstatuspatientsegment',
    title: 'Patient Segment',
    collapsible: true,

    items: [{
        xtype: 'container',
        items: [{
            fieldLabel: 'Residence Code',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.PatResidenceCode}'
            }
        }, {
            fieldLabel: 'Transition Date',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.TransitionDate}'
            }
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Emergency Fill',
            fieldStyle: 'text-transform:Capitalize',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.EmergencyFill}'
            }
        }, {
            fieldLabel: 'Gender Code',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.genderCode}'
            }
        }, {
            fieldLabel: 'Professional Service Code',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.ProfessionalServiceCode}'
            }
        }, {
            fieldLabel: 'Retro Termed',
            fieldStyle: 'text-transform:Capitalize',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.RetroTermedInd}'
            }
        }, {
            fieldLabel: 'Short Cycle Fill',
            fieldStyle: 'text-transform:Capitalize',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.ShortCycleFill}'
            }
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Claim Adjudication Code',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.formattedClaimAdjudicationCode}'
            }
        }]
    }, {
        xtype: 'container',
        items: [{
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                itemId: 'dfTransitionFill',
                fieldLabel: 'Transition Fill',
                fieldStyle: 'text-transform:Capitalize',
                labelWidth: 170,
                bind: {
                    value: '{masterrecord.TransitionFill}',
                    hidden: '{transFill}'
                }
            }, {
                xtype: 'combobox',
                fieldLabel: 'Transition Fill',
                forceSelection: true,
                reference: 'transFillDropDown',
                width: 200,
                store: ['yes', 'no'],
                bind: {
                    hidden: '{transFillEdit}'
                },
                listeners: {
                    beforeshow: function (control) {
                        this.setValue(this.up().down('#dfTransitionFill').getValue());
                    }
                }
            }]
        }, {
            fieldLabel: 'Transition Fill Type',
            fieldStyle: 'text-transform:Capitalize',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.TransitionFillType}'
            }
        }, {
            fieldLabel: 'Other Coverage Code',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.coveragecode}'
            }
        }, {
            fieldLabel: 'Reason for Service Code',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.ReasonForServiceCode}'
            }
        }, {
            fieldLabel: 'Program Group Code',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.mcsProgGroupCode}'
            }
        }, {
            fieldLabel: 'Program Group Code',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.mcsProgGroupCode}'
            }
        }, {
            fieldLabel: 'Sub. Clarification Code',
            fieldStyle: 'text-transform:Capitalize',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.SubClarificationCode}'
            }
        }, {
            fieldLabel: 'Non-Exchange Claim',
            fieldStyle: 'text-transform:Capitalize',
            labelWidth: 170,
            bind: {
                value: '{masterrecord.nonExchangeClaim}'
            }
        }]
    }, {
        xtype: 'grid'
    }]
});