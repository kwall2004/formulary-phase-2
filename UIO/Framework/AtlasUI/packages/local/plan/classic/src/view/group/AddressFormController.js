/**
 * Created by S4505 on 11/14/2016.
 */

Ext.define('Atlas.plan.view.group.AddressFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-addressform',
    //controller: 'plan-group-address',

    // listen: {
    //     controller: {
    //         '*': {
    //             //selectAddress: 'onPlanAdressSelected',
    //             reloadAddress:'onReloadAddress',
    //
    //         }
    //     }
    // },

    init: function () {
        this.enableDisableDataEntry(true);

    },
    onGroupChange:function () {
        this.setNewAddressFields();
        this.enableDisableDataEntry(true);

    },

    onPlanAdressSelected:function(record)
    {
        var data =[];

        if(record!=null && record.data!=null)
        {
            data.push(record.data);

        }
        var theStore = this.getViewModel().getStore('planadressinprocess');
        theStore.loadData(data);

        var me = this,
            form = this.getView();
        form.loadRecord(record);
        this.enableDisableDataEntry(true);

        this.getViewModel().set('canEdit', true);
        this.getViewModel().set('isEditing', false);
        this.getViewModel().set('isNewPlanAddressRecord', false);
    },


    onCancelClick:function()
    {

        var me = this;
        Ext.Msg.show({
            title: 'Cancel?',
            message: 'Are you sure you want to cancel your changes?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {

                   me.onReloadAddress();
                } else {
                    console.log('No pressed');
                }
            }
        });
    },

    onCreateAddressClick:function()
    {

        var me = this;

        this.enableDisableDataEntry(false);

        this.getViewModel().set('planadressinprocess', null);
        this.setNewAddressFields();

        this.getViewModel().set('isNewPlanAddressRecord', true);


        this.getViewModel().set('canEdit', false);
        this.getViewModel().set('isEditing', true);

        this.lookupReference('addressType').setReadOnly(false);

    },

    onSaveClick: function () {
        var me = this;

        var isNew =  this.getViewModel().get('isNewPlanAddressRecord');
        if(!isNew) {
            this.saveList('U');
        }
        else {
            this.saveList('A');
        }
    },

    saveList: function(action){
        var me = this,
            form = this.getView(),
            values = form.getValues(),
            record = this.getViewModel().getStore('planadressinprocess'),
            theStore ;
        if(!form.isValid() ) {
            return ;
        }

        if(action== 'D') {
            theStore = record;

       }

        else
            theStore = me.assignRecordvalue(record,values);

        var planGroupRecord = this.getView().up().up().getViewModel().getView().down('plan-group-detail').getViewModel().get('masterRecord') ;
        var planGroupId = 0;

        if( planGroupRecord!=null )
            planGroupId = planGroupRecord.data.planGroupId;


        var saveAction = [{
            "Create": {"key": 'ipcAction', "value": 'A'},
            "Update": {"key": 'ipcAction', "value": 'U'},
            "Delete": {"key": 'ipcAction', "value": 'D'}
        }];

        var records = theStore.getRange();
        for(var i =0; i < records.length; i++){
            var rec = records[i];

            if(!rec.dirty){
                rec.dirty = true;
            }
        }

        theStore.each(function(record,id){

            if(record.data.ShowOnPortal== 'on')
            {
                record.data.ShowOnPortal = true;
            }

        });

         var testReturn = Atlas.common.utility.Utilities.saveData([theStore], 'plan/rx/planaddresses/update', 'ttPlanAddress', [true],
            {
                'ipiPlanGroupID': planGroupId,
                'ipcAction': action
            },
            saveAction, null);

        if(testReturn && testReturn.code != 0)
        {
            Ext.MessageBox.alert('Failure', testReturn.message, this.showResult, this);
        }
        else {

            if (action == 'A' && testReturn.message == 'Success') {
                Ext.MessageBox.alert('PBM', "Record is added successfully.", this.showResult, this);
            }
            else if (action == 'U' && testReturn.message == 'Success') {
                Ext.MessageBox.alert('PBM', "Record updated successfully.", this.showResult, this);
            }
            else if (action == 'D' && testReturn.message == 'Success') {
                Ext.MessageBox.alert('PBM', "Record deleted successfully.", this.showResult, this);
            }
        }

        me.onReloadAddress();
    },

    assignRecordvalue:function(record,values)
    {
        //debugger;
        var recordFieldList = record.getProxy().getModel().getFields(),
            recordFieldListArray = [];

        if(record.data.items.length == 0) {
            var newitem = new Atlas.plan.model.PlanAddressList;
            record.data.items.push(newitem)
        }
        if (recordFieldList) {
            for (var i = 0; i < recordFieldList.length; i++) {
                    record.data.items[0].data[recordFieldList[i].name] = values[recordFieldList[i].name];
            }
        }
        return record;

    },

    onDeleteClick:function(){
        var me = this;
        var record =  this.getViewModel().getStore('planadressinprocess');

        if(record !=null) {

            Ext.Msg.show({
                title: 'Delete',
                message: 'Are you sure you would like to delete this record?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,

                fn: function (btn) {
                    // debugger;
                    if (btn === 'yes') {
                        me.saveList('D');
                    }
                }
            });
        }
    },

    onEditClick: function (button) {
        var me = this;
        // this.lookupReference('addressType').setDisabled(true);

        this.enableDisableDataEntry(false);
        this.getViewModel().set('canEdit', false);
        this.getViewModel().set('isEditing', true);
        this.lookupReference('addressType').setReadOnly(true);

    },

    enableDisableitems:function(cmponent,value)
    {
        var adminBtn = this.lookupReference(cmponent);
        adminBtn.setDisabled(value);

    },


    enableDisableDataEntry:function (value) {
        // debugger;
        var containerOne = this.lookupReference('planAddressContainer1');
        //debugger;
        if(containerOne!=null && containerOne.items) {

            containerOne.items.each(function(item1, index,length)
                {
                    if(item1.xtype != 'container')
                        item1.setReadOnly(value);
                }
            )
        }
        var containerTwo = this.lookupReference('planAddressContainer2');

        if(containerTwo!=null && containerTwo.items) {

            containerTwo.items.each(function(item2, index,length)
                {
                    if(item2.xtype != 'container')
                        item2.setReadOnly(value);
                }
            )
        }

    },

    setNewAddressFields :function() {

        var containerOne = this.lookupReference('planAddressContainer1');
        //debugger;
        if(containerOne!=null && containerOne.items) {

            containerOne.items.each(function(item1, index,length)
                {
                    if(item1.xtype != 'container')
                        item1.reset();
                }
            )
        }
        var containerTwo = this.lookupReference('planAddressContainer2');

        if(containerTwo!=null && containerTwo.items) {

            containerTwo.items.each(function(item2, index,length)
                {
                    if(item2.xtype != 'container')
                        item2.reset();
                }
            )
        }
    },
    onReloadAddress:function(){
        var addressGrid = this.getView().up('plan-group-address');
        if(addressGrid)
        {
            addressGrid.getController().onReloadAddress();
        }


    }

});
