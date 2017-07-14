/*
 Last Developer: Sheeloo Sachan
 Previous Developers: [Srujith Cheruku]
 Origin: Merlin - Authorization
 Description: This is used for Outreach Queue view controller.
 */
Ext.define('Atlas.authorization.view.OutreachQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.outreachQueueController',
    init: function () {
        var view = this.getView();
        var atlasId = view.atlasId;
        var me = this;
        view.setTitle('Outreach Queue');

        if(atlasId !== null) {
            if(atlasId === 'Decision') {
                var accordion = view.down('#grdDecisionOutReachPending');
            } else {
                var accordion = view.down('#grdAOROutReachPending');
            }
            me.loadOutReachQueue('DECISION');
            Ext.defer(function () {accordion.expand()}, 500);
        } else {
            Ext.defer(function () {
                me.loadOutReachQueue('DECISION');
            }, 1000);
        }


        //view.mask('Loading....');



    },
    loadOutReachQueue: function(alertType) {
        //myMask.show();
        var me=this;
        var vm = this.getViewModel();
        var view = this.getView();
        var PenDecStore = vm.getStore('outreachPendingDecisionStore');


        var sortProperty =[ {
            "property": "DecisionDateTime",
            "direction":"ASC"
        }];

        PenDecStore.getSorters().add(sortProperty);

        PenDecStore.getProxy().setExtraParam('pQueueType', alertType);
        PenDecStore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if(success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    view.down('#grdDecisionOutReachPending').setTitle('Decision - Outreach Pending <font style=color:green;>(' + me.getStore('outreachPendingDecisionStore').totalCount + ')</font>');
                    view.down('#grdAOROutReachPending').setTitle('AOR - Outreach Pending <font style=color:gray;>(' + me.getStore('outreachAORStore').totalCount + ')</font>');
                    if (objResp.message[0].code == 0) {
                    }
                    else {
                        Ext.Msg.alert('PBM', objResp.message[0].message);
                    }
                }
                else {
                    Ext.Msg.alert('Request Failure', 'Error occurred while processing your request. Please contact your admin.');
                }


            }
        } );
    },
    onRowClick: function(component, eOpts) {
        var authid = component.getWidgetRecord().data.AuthID;
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain');
            me.fireEvent('openView', 'merlin', 'authorization', 'cdag_CDAGMain', {
            atlasId: authid,
            menuId: menuId,
            activeTab: 5
        }, null);

    }



});