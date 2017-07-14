/**
 * Created by n6684 on 12/5/2016.
 */
Ext.define('Atlas.admin.view.EDIPartnerContactInfo', {
    extend: 'Ext.window.Window',
    xtype:'admin-edipartnercontactinfo',
    title:'Add EDI Partner Info',
    controller: 'edipartnercontactinfocontroller',
    viewModel: 'admin_edipartnercontactinfoviewmodel',
    defaults: {
        labelWidth: 100,
        flex: 1,
        xtype: 'textfield',
        minWidth: 240
    },
    width: 400,
    height: 550,
    modal: true,
    items: [
        {
            fieldLabel: 'Pharmacy',
            name: 'addresstype',
            allowBlank: false
        }, {
            fieldLabel: 'Relationship',
            name: 'address1',
            emptyText: '',
            allowBlank: true
        },{
            fieldLabel: 'Pmt Center ID',
            name: 'address1',
            emptyText: '',
            allowBlank: true
        },{
            fieldLabel: 'Effective Date',
            xtype: 'datefield',
            name: 'city',
            emptyText: '',
            allowBlank: false
        },{
            fieldLabel: 'Termination Date',
            xtype: 'datefield',
            name: 'city',
            emptyText: '',
            allowBlank: false
        }
    ]
});