/**
 * Created by agupta on 10/22/2016.
 */

Ext.define('Atlas.authorization.view.cdag.CDAGWinFaxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdagwinfaxcontroller',

    winBtnSendFax_Click : function(){
        var view = this.getView();
        if (view.down('#chkPCP').checked == false && view.down('#chkPrescriber').checked == false && view.down('#chkMember').checked == false){
            Ext.Msg.alert('Message', 'Please Select Fax To.');
        }
        else {
            var pcpFax='';
            var prescriberFax='';
            var memberFax='';
            var page1='';
            var page2='';
            var page3='';
            var msg;

            if (view.down('#chkPCP').checked == true){
                pcpFax = view.down('#txtFax1').getValue() + '-' + view.down('#txtFax2').getValue() + '-' + view.down('#txtFax3').getValue();
                page1 = view.down('#txtPage1').getValue();
                if (pcpFax.length != 12){ msg = 'yes' }
            }
            if (view.down('#chkPrescriber').checked == true){
                prescriberFax = view.down('#txtFax4').getValue() + '-' + view.down('#txtFax5').getValue() + '-' + view.down('#txtFax6').getValue();
                page2 = view.down('#txtPage2').getValue();
                if (prescriberFax.length != 12){ msg = 'yes' }
            }
            if (view.down('#chkMember').checked==true){
                memberFax = view.down('#txtFax7').getValue() + '-' + view.down('#txtFax8').getValue() + '-' + view.down('#txtFax9').getValue();
                page3 = view.down('#txtPage3').getValue();
                if (memberFax.length != 12){ msg = 'yes' }
            }

            if (msg == 'yes' || msg != undefined) {
                Ext.Msg.alert('Message','Please enter valid fax number for all checked fax to parties before proceed')
            }
            else {
                this.fireEvent('parentSendFax',pcpFax,prescriberFax,memberFax,page1,page2,page3);
            }
        }
    },

    chkMember_Change : function(combo, val){
        var view = this.getView();
        if(val){
            view.down('#txtFax7').setDisabled(false);
            view.down('#txtFax8').setDisabled(false);
            view.down('#txtFax9').setDisabled(false);
            view.down('#txtPage3').setDisabled(false);

            view.down('#txtFax7').allowBlank = false;
            view.down('#txtFax8').allowBlank = false;
            view.down('#txtFax9').allowBlank = false;
        }
        else{
            view.down('#txtFax7').setDisabled(true);
            view.down('#txtFax8').setDisabled(true);
            view.down('#txtFax9').setDisabled(true);
            view.down('#txtPage3').setDisabled(true);

            view.down('#txtFax7').allowBlank = true;
            view.down('#txtFax8').allowBlank = true;
            view.down('#txtFax9').allowBlank = true;
        }
    },

    chkPrescriber_Change : function(combo, val){
        var view = this.getView();
        if(val){
            view.down('#txtFax4').setDisabled(false);
            view.down('#txtFax5').setDisabled(false);
            view.down('#txtFax6').setDisabled(false);
            view.down('#txtPage2').setDisabled(false);

            view.down('#txtFax4').allowBlank = false;
            view.down('#txtFax5').allowBlank = false;
            view.down('#txtFax6').allowBlank = false;
        }
        else{
            view.down('#txtFax4').setDisabled(true);
            view.down('#txtFax5').setDisabled(true);
            view.down('#txtFax6').setDisabled(true);
            view.down('#txtPage2').setDisabled(true);

            view.down('#txtFax4').allowBlank = true;
            view.down('#txtFax5').allowBlank = true;
            view.down('#txtFax6').allowBlank = true;
        }
    },

    chkPCP_Change : function(combo, val){
        var view = this.getView();
        if(val){
            view.down('#txtFax1').setDisabled(false);
            view.down('#txtFax2').setDisabled(false);
            view.down('#txtFax3').setDisabled(false);
            view.down('#txtPage1').setDisabled(false);

            view.down('#txtFax1').allowBlank = false;
            view.down('#txtFax2').allowBlank = false;
            view.down('#txtFax3').allowBlank = false;
        }
        else{
            view.down('#txtFax1').setDisabled(true);
            view.down('#txtFax2').setDisabled(true);
            view.down('#txtFax3').setDisabled(true);
            view.down('#txtPage1').setDisabled(true);

            view.down('#txtFax1').allowBlank = true;
            view.down('#txtFax2').allowBlank = true;
            view.down('#txtFax3').allowBlank = true;
        }
    },

    onCancelClick: function () {
        this.getView().destroy();
    },

    init: function () {
        var view = this.getView(),
            Pcpfax1 = view.down('#txtFax1'),
            Pcpfax2 = view.down('#txtFax2'),
            Pcpfax3 = view.down('#txtFax3'),
            Prescriberfax1 = view.down('#txtFax4'),
            Prescriberfax2 = view.down('#txtFax5'),
            Prescriberfax3 = view.down('#txtFax6'),
            LetterFaxDetail = view.LetterFaxDetail;

        if (LetterFaxDetail != null && LetterFaxDetail != undefined) {
            if (LetterFaxDetail.PrescriberFax != undefined && LetterFaxDetail.PrescriberFax != null && LetterFaxDetail.PrescriberFax.length == 12) {
                var prescriberFax = LetterFaxDetail.PrescriberFax.split('-');
                Prescriberfax1.setValue(prescriberFax[0]);
                Prescriberfax2.setValue(prescriberFax[1]);
                Prescriberfax3.setValue(prescriberFax[2]);
            }

            if (LetterFaxDetail.PCPFax != undefined && LetterFaxDetail.PCPFax != null && LetterFaxDetail.PCPFax.length == 12) {
                var pcpFax = LetterFaxDetail.PCPFax.split('-');
                Pcpfax1.setValue(pcpFax[0]);
                Pcpfax2.setValue(pcpFax[1]);
                Pcpfax3.setValue(pcpFax[2]);
            }
        }
    }
});