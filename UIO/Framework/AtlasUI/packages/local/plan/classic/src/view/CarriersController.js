Ext.define('Atlas.plan.view.CarriersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-carriers',

    listen:{
      controller:{
          '*' :{
              carrierUpdated: 'onCarrierUpdated'
          }
      }
    },

    init: function () {
        var me = this;
        me.getViewModel().getStore('carriers').load();
    },

    createEditor: function (record) {
        var me = this,
            win;

        win = Ext.create('Ext.window.Window', {
            bind: {
                title: '{title}'
            },
            width: 400,
            height: 400,
            modal: true,
            controller: 'plan-carrierseditform', //viewcontroller for the window
            // Creates a child session that will spawn from the current session
            // of this view.
            // session: true,
            viewModel: {
                data: {
                    title: record ? 'Update Carrier Information: ' + record.get('carrierName') : 'Add Carrier Information',
                    masterRecord: record,
                    create: record ? false : true
                },
                // If we are passed a record, a copy of it will be created in the newly spawned session.
                // Otherwise, create a new phantom customer in the child.
                /* links: {
                 masterRecord: record || {
                 type: 'Atlas.plan.model.Carrier',
                 create: true
                 }
                 },*/
                parent: me.getViewModel() //windows need to have the VM chain added to them
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        text: 'Update',
                        handler: 'onUpdate',
                        hidden: record ? false : true
                    },
                    {
                        text: 'Create',
                        handler: 'onCreate',
                        hidden: record ? true : false
                    }
                ]
            }],
            // layout: 'vbox',
            // bodyPadding: '10',
            items: [
                {
                    xtype: 'plan-carriers-editform'
                }]
        });

        if (record) {
            win.down('form').loadRecord(record);
        }
        //win.show();
        me.getView().add(win).show();

    },

    onAdd: function () {
        this.createEditor(null);
    },

    onEdit: function () {
        var combo = this.lookup('carriercombo'),
            record = combo.getSelection();
        this.createEditor(record);
    },

    onDestroy: function () {
        //debugger;
        var me= this,
            combo = this.lookup('carriercombo'),
            url = Atlas.apiURL + 'plan/rx/plancarrier/update',
            record = combo.getSelection();

            if(record !=null) {

                var params = {
                    pSessionID: Atlas.user.sessionId,
                    // pAction: record.crudState = 'R' ? 'U' : 'A', //if reading a record then we're updating otherwise adding
                    pCarrierId:  record.get('carrierId'),
                    pAction: 'D'
                };

                Ext.Msg.show({
                    title: 'Delete',
                    message: 'Are you sure you would like to delete this record?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,

                    fn: function (btn) {
                        //debugger;
                        if (btn === 'yes') {

                            var returnValue = Atlas.common.utility.Utilities.post(
                                'plan/rx/plancarrier/update',
                                params,
                                null
                            );

                            if(returnValue.code != 0)
                            {
                                Ext.MessageBox.alert('Failure', returnValue.message, this.showResult, this);
                            }
                            else
                            {
                                Ext.Msg.alert("PBM", "Carrier Details Successfully Deleted");
                                me.fireEvent('carrierUpdated');
                            }

                        }
                    }
                })
            }
    },

    onCarrierUpdated: function(id){
        //debugger;
        var me = this,
            combo = this.lookup('carriercombo');

        combo.getStore().load( function(store,records){
            //debugger;
            var record = combo.getStore().findRecord('carrierId',id) || combo.getStore().getAt(0);

            combo.select( record  );
            me.onCarrierSelect(combo,record); //not sure wht this event isn't firing on select above.
        });

    },

    onMenuClick: function (button) {

    },

    onCarrierSelect: function (combo, record) {
        //todo: fire event to decouple
       // debugger;
        var me = this,
            accountStore = me.getView().down('plan-carriers-accounts').getViewModel().getStore('accounts'),
            lobStore = me.getView().down('plan-carriers-lobs').getViewModel().getStore('carrierLOBs');

        me.getView().down('form').loadRecord(record);

        accountStore.getProxy().setExtraParam('pWhere', 'carrierId = ' + record.get('carrierId'));
        accountStore.load();
        lobStore.getProxy().setExtraParam('pWhere', 'carrierId = ' + record.get('carrierId'));
        lobStore.load();

        me.getView().down('plan-carriers-accounts').lookupReference('btnAddAccount').setDisabled(false);
        me.getView().down('plan-carriers-lobs').lookupReference('btnAddLOB').setDisabled(false);
    }

});
