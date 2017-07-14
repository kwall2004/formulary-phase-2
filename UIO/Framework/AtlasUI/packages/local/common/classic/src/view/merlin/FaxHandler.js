/**
 * Created by g2304 on 11/16/2016.
 */
Ext.define('Atlas.common.view.merlin.FaxHandler', {
    extend: 'Ext.window.Window',
    xtype: 'merlin.faxhandler',
    viewModel: {
        data: {
            container: null,
            jobNumber: null,
            result:'false'
        }
    },
    modal: true,
    autoShow: false,
    width: 300,
    height: 140,
    title: 'Send Fax',
    iconCls: 'x-fa fa-fax',
    layout: 'form',
    resizable: false,
    bodyPadding: 10,
    bbar: [
        {
            xtype: 'button',
            text: 'Send Fax',
            iconCls: 'x-fa fa-send-o',
            handler: function (bt) {
                var theView = bt.up('window'),
                    jobNumber = theView.getViewModel().get('jobNumber');

                var faxNumberField = theView.down('textfield[itemId=faxNumber]');
                if (!faxNumberField.isValid()) return false;

                var result = Atlas.common.utility.Utilities.post(
                    'shared/rx/resendfax/update',
                    {
                        "pJobNumber": jobNumber,
                        "pFaxNumber": faxNumberField.getValue()
                    },
                    null
                );
                if (result.code == 0) {
                    theView.getViewModel().set('result', 'true');
                    theView.close();
                    Ext.Msg.alert('Send Fax', result.message);

                }
                else {
                    theView.getViewModel().set('result', 'false');
                    theView.close();
                    Ext.Msg.alert('Send Fax Error', result.message);

                }
            }
        },
        '->',
        {
            xtype: 'button',
            text: 'Cancel',
            iconCls: 'x-fa fa-remove',
            handler: function (bt) {
                bt.up('window').close();
            }
        }
    ],
    items: [
        {
            xtype: 'displayfield',
            bind: {'value': '{jobNumber}'},
            fieldLabel: 'Job Number'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Fax Number',
            itemId: 'faxNumber',
            allowBlank: false,
            vtype: 'phone',
            plugins: new Ext.ux.plugin.FormatPhoneNumber()
        }
    ],

    initComponent: function (a) {
        var me = this;

        me.callParent(arguments);
        me.container.add(me); // TODO: What is this ?
        me.getViewModel().set('jobNumber', me.jobNumber);
    }
});