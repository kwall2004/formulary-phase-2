Ext.define('Atlas.admin.view.EDIPartnerRelationshipForm', {
    extend: 'Ext.window.Window',
    xtype:'admin-edipartnerrelationshipform',
    title:'Add EDI Partner Relationship',
    controller: 'edipartnerrelationshipformcontroller',
    viewModel: 'admin_edipartnerrelationshipformviewmodel',
    defaults: {
        labelWidth: 150,
        flex: 1,
        xtype: 'textfield',
        minWidth: 240
    },
    width: 400,
    height: 230,
    modal: true,
    items: [
        {
            fieldLabel: 'Pharmacy',
            xtype: 'providertypeahead',
            itemId: 'cbxprovidertype',
            displayField: 'Name',
            valueField: 'ncpdpId',
            flex:1,
            emptyText: '[e.g. Target Pharmacy MI 48188]',
            allowBlank: false
        }, {
            fieldLabel: 'Relationship',
            xtype: 'relationshiptypeahead',
            itemId: 'cbxrelationshiptype',
            displayField: 'name',
            valueField: 'relationshipID',
            flex:1,
            emptyText: '[e.g. CVS MI]',
            allowBlank: false

        },{
            fieldLabel: 'Pharmacy',
            bind: {value: '{paramRecord.NCPDPID}'},
            emptyText: '',
            itemId: 'txtprovidertype',
            allowBlank: true,
            enableKeyEvents: true,
            listeners: {
                keyup:'cbxprovidertype_keyup'
            }
        },{
            fieldLabel: 'Relationship',
            bind: {value: '{paramRecord.RelationshipID}'},
            emptyText: '',
            allowBlank: true,
            itemId: 'txtrelationshiptype',
            enableKeyEvents: true,
            listeners: {
                keyup:'cbxrelationshiptype_keyup'
            }
        },{
            fieldLabel: 'Pmt Center ID',
            itemId:'textpmtCenterId',
            bind: {value: '{paramRecord.PaymentCenterId}'},
            emptyText: '',
            allowBlank: true
        },{
            fieldLabel: 'Effective Date',
            xtype: 'datefield',
            itemId:'dateeffectivedate',
            bind: {value: '{paramRecord.EffectiveDate}'}, renderer : Ext.util.Format.dateRenderer('m/d/Y'),
            emptyText: '',
            allowBlank: false,
            reference: 'refdateeffectivedate'
        },{
            fieldLabel: 'Termination Date',
            xtype: 'datefield',
            itemId:'dateterminationdate',
            bind: {value: '{paramRecord.TermDate}'}, renderer : Ext.util.Format.dateRenderer('m/d/Y'),
            emptyText: '',
            allowBlank: true
        }
    ],
    dockedItems: {
        dock: 'bottom',
            xtype: 'toolbar',
            items: ['->',
            {
                xtype: 'button',
                text : 'Update',
                itemId:"btnSave",
                iconCls: 'fa fa-save',
                handler:'btnSave'
            }, {
                xtype: 'button',
                text : 'Cancel',
                iconCls: 'fa fa-times',
                handler:'btnCancel'
            }
        ]
    }

});