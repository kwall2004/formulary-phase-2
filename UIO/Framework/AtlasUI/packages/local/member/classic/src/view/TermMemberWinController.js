/**
 * Created by agupta on 12/13/2016.
 */

Ext.define('Atlas.member.view.TermMemberWinController', {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.termmemberwincontroller',

        btnTermMember_Click: function () {
            var view = this.getView();
            var modelTermMember = Ext.create('Atlas.member.model.TermMembersModel');
            modelTermMember.getProxy().setExtraParam('pOutFileName', '');
            modelTermMember.getProxy().setExtraParam('pParameters', '');
            modelTermMember.phantom = false;
            modelTermMember.save({
                scope: this,
                failure: function (record, operation) {
                    Ext.Msg.alert('Error', 'Error happened in during the execution.');
                },
                success: function (record, operation) {
                    Ext.Msg.alert('Message', 'Term Members Procedure has been executed.');
                    view.down('#btnOutputResult').setDisabled(false);
                },
                callback: function (record, operation, success) {

                }
            });
        },

        btnOutputResult_Click: function () {
            var view = this.getView();
            Ext.Msg.confirm('confirm', 'Output files has been generated and email to TermMembersRecipients e-mail list.', function (id, value) {
                if (id === 'yes') {
                    view.down('#btnOutputResult').setDisabled(true);
                }
            }, this);
        }


    }
);
