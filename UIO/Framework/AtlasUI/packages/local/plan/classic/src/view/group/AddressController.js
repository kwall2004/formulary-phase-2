/**
 * Created by S4505 on 11/13/2016.
 */
Ext.define('Atlas.plan.view.group.AddressController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-group-address',

    // listen: {
    //     controller: {
    //         '*': {
    //             reloadAddress:'onReloadAddress'
    //         }
    //     }
    // },

    init: function () {

        // debugger;
        //
        // var me = this,
        //     //storePlanaddress = this.getViewModel().get('planaddress'),
        //     storeState = this.getViewModel().get('states');
        //
        //
        // storeState.load();
    },

    boxReady: function () {
       // debugger;
        var me = this,
            storeState = this.getViewModel().get('states');

        storeState.load();

        var planGroupRecord = me.retrievePlanGroup(),
            pPlanGroupId = 0;
        if( planGroupRecord!=null )
            pPlanGroupId = planGroupRecord.get('planGroupId');

        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');
        /*if(atlasRecord){
            this.getView().down('plan-group-addressform').setDisabled(true);
        }else{
            this.getView().down('plan-group-addressform').setDisabled(false);
        }*/
       /* if (atlasRecord){
            this.getView().setDisabled(true);
        }else{
            this.getView().setDisabled(false);
        }*/

        var addressForm = this.getView().down('plan-group-addressform');
        if(addressForm)
        {
            addressForm.getController().onGroupChange();
        }

        var storePlanaddress = this.getViewModel().get('planaddress');

        storePlanaddress.getProxy().setExtraParam('ipiPlanGroupID', pPlanGroupId);
        storePlanaddress.getProxy().setExtraParam('ipcPortalAddresses', '');
        storePlanaddress.load({
            callback: function () {

                if(me.getViewModel().get('planaddress').getCount() > 0) {
                    me.lookupReference('AddressListgrid').getSelectionModel().select(0, true);
                }
                else{
                    Ext.MessageBox.alert('PBM', "No records found.", this.showResult, this);
                }
            }
        });

    },

    onAdressSelect:function(grid , record , index , eOpts){

        //this.fireEvent('selectAddress',record);
        //me.onPlanAdressSelected(record);

        var addressForm = this.getView().down('plan-group-addressform');
        if(addressForm)
        {
            addressForm.getController().onPlanAdressSelected(record);
        }
    },

    onReloadAddress:function()
    {
        this.boxReady();
    },

    onPlanAdressSelected:function(record){

    },
    retrievePlanGroup: function(){
        return this.getView().findParentByType('tabpanel').lookupReference('plangroup').getSelection();
        //modelPlanGroup.get('planGroupId')
    },
    resetAddressFields :function() {

        var containerOne = this.getView().down('plan-group-addressform').lookupReference('planAddressContainer1');
        //debugger;
        if(containerOne!=null && containerOne.items) {

            containerOne.items.each(function(item1, index,length)
                {
                    if(item1.xtype != 'container')
                        item1.reset();
                }
            )
        }
        var containerTwo = this.getView().down('plan-group-addressform').lookupReference('planAddressContainer2');

        if(containerTwo!=null && containerTwo.items) {

            containerTwo.items.each(function(item2, index,length)
                {
                    if(item2.xtype != 'container')
                        item2.reset();
                }
            )
        }
    }

});