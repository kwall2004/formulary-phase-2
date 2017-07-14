/**
 * Created by T4317 on 11/9/2016.
 */
Ext.define('Atlas.claims.view.ClaimInterventionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.claims-claimintervention',
    boxReady:function(){

        var claiminterventions = this.getViewModel().getStore('claiminterventions');
        claiminterventions.load();

    },
    /*init: function() {
        var grid = this.getView().items.items[0];
        grid.setLoading(true);
        var store = this.getViewModel().storeInfo.claiminterventions;

        store.load();
    },*/
    acknowledge: function() {
        //debugger;
        //var confirmBox = Ext.MessageBox.confirm();
        var view = this.getView();
        var fieldlist = "Acknowledge,AcknowledgedDate,AcknowledgedUserName";
        var fields = "y" + "|" + this.formatDate(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y')) + "|" + Ext.first('viewport').getViewModel().get('user').un;
        var gridSelection = view.items.items[0].selection;
        var Acknowledge = Ext.create('Atlas.common.model.Acknowledge',{});




        Ext.Msg.show({
            title: 'Acknowledge',
            message: 'Are you sure you would like to acknowledge this task?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {

                    Acknowledge.phantom = false;
                    Acknowledge.getProxy().setExtraParam('pSystemID',gridSelection.get('SystemID'));
                    Acknowledge.getProxy().setExtraParam('pFieldList', fieldlist);
                    Acknowledge.getProxy().setExtraParam('pFields', fields);
                    Acknowledge.save({
                        success:function(record){
                            //debugger;
                            view.items.items[0].store.reload();
                        },
                        callback:function(record){
                            //debugger;
                        }
                    });
                } else {
                    console.log('No pressed');
                }
            }
        });

    },
    routeToMember:function () {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar'),
            view = me.getView(),
            selected = view.getSelectionModel().getSelection()[0];

        if (selected != null && selected != undefined) {
            var atlasId = selected.get('RecipID');
            me.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
                menuId: menuId,
                atlasId: atlasId,
                RID: atlasId,
                keyValue: '0',
                openView: true,
                recordCase: null,
                subTabs: ['member-demographics']
            });
        }
    },

    routeToPrescriber: function() {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/prescriber/PrescriberToolbar'),
            view = me.getView(),
            selected = view.getSelectionModel().getSelection()[0];

        if (selected != null && selected != undefined) {
            var atlasId = selected.get('NPI');
            me.fireEvent('openView', 'merlin', 'prescriber', 'PrescriberToolbar', {
                menuId: menuId,
                atlasId: atlasId
            });
        }
    },
    routeToPharmacy: function() {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/Pharmacy'),
            view = me.getView(),
            selected = view.getSelectionModel().getSelection()[0];

        if (selected != null && selected != undefined) {
            var atlasId = selected.get('NCPDPID');
            me.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
                menuId: menuId,
                atlasId: atlasId
            });
        }
    },
    routeToClaims: function () {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar'),
            view = me.getView(),
            selected = view.getSelectionModel().getSelection()[0];

        if (selected != null && selected != undefined) {
            var atlasId = selected.get('ClaimID');
            me.fireEvent('openView', 'merlin', 'claims', 'ClaimsToolbar', {
                menuId: menuId,
                atlasId: atlasId
            });
        }
    },

    routeToInterventionLetter:function () {

        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/letter/CreateEditLetter'),
            view = me.getView(),
            selected = view.getSelectionModel().getSelection()[0];
        if (selected != null && selected != undefined) {
            var letterId = 'NEW';

            if(selected.get('StatCode') != 'Claim Intervention Letter Required')
            {
                letterId = selected.get('StatCode');
            }

            me.fireEvent('openView', 'merlin', 'letter', 'CreateEditLetter', {
                ID: menuId,
                menuId: menuId,
                LetterID: letterId,
                keyValue: selected.data.ClaimID,
                LetterType: 'Claim Intervention',
                UCFCLAIMID: selected.data.SystemID,
                openView: true
            });
        }

    },

    formatDate: function(newDate) {
        var date = new Date(newDate);

        if (!newDate) { return; }
        return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
    }
});