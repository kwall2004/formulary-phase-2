Ext.define('Atlas.letter.controller.LetterFaxWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.letterfaxwindowctrl',

    init: function () {
        var me = this,
            view = this.getView(),
            myVM = me.getViewModel();
        if (myVM.get('vmPCPFax') && myVM.get('vmPCPFax') != '') {
            view.down('#txtFaxNumPCP1').setValue(myVM.get('vmPCPFax').toString().substring(0, 3));
            view.down('#txtFaxNumPCP2').setValue(myVM.get('vmPCPFax').toString().substring(3, 6));
            view.down('#txtFaxNumPCP3').setValue(myVM.get('vmPCPFax').toString().substring(6, 10));
        }
        if (myVM.get('vmPrescriberFax') && myVM.get('vmPrescriberFax') != '') {
            view.down('#txtFaxNumPrescriber1').setValue(myVM.get('vmPrescriberFax').toString().substring(0, 3));
            view.down('#txtFaxNumPrescriber2').setValue(myVM.get('vmPrescriberFax').toString().substring(3, 6));
            view.down('#txtFaxNumPrescriber3').setValue(myVM.get('vmPrescriberFax').toString().substring(6, 10));
        }
        if (myVM.get('vmPharmacyFax') && myVM.get('vmPharmacyFax') != '') {
            view.down('#txtFaxNumPharmacy1').setValue(myVM.get('vmPharmacyFax').toString().substring(0, 3));
            view.down('#txtFaxNumPharmacy2').setValue(myVM.get('vmPharmacyFax').toString().substring(3, 6));
            view.down('#txtFaxNumPharmacy3').setValue(myVM.get('vmPharmacyFax').toString().substring(6, 10));
        }
        if (myVM.get('vmMemberFax') && myVM.get('vmMemberFax') != '') {
            view.down('#txtFaxNumMember1').setValue(myVM.get('vmMemberFax').toString().substring(0, 3));
            view.down('#txtFaxNumMember2').setValue(myVM.get('vmMemberFax').toString().substring(3, 6));
            view.down('#txtFaxNumMember3').setValue(myVM.get('vmMemberFax').toString().substring(6, 10));
        }
    },
    onClickSendFax: function () {
        var me = this,
            myVM = me.getViewModel(),
            view = this.getView(),
            msg = '',
            faxValues = [];
        faxValues.vmIsPCPFax = myVM.get('vmIsPCPFax');
        faxValues.vmIsPrescriberFax = myVM.get('vmIsPrescriberFax');
        faxValues.vmIsMemberFax = myVM.get('vmIsMemberFax');
        faxValues.vmIsPharmacyFax = myVM.get('vmIsPharmacyFax');
        if (!faxValues.vmIsPCPFax && !faxValues.vmIsPrescriberFax && !faxValues.vmIsMemberFax && !faxValues.vmIsPharmacyFax) {
            Ext.Msg.alert('Message', 'Please Select Fax To.');
        }
        else {
            if (faxValues.vmIsPCPFax) {
                var PCPValue = view.down('#txtFaxNumPCP1').getValue() + view.down('#txtFaxNumPCP2').getValue() + view.down('#txtFaxNumPCP3').getValue();
                myVM.set('vmPCPFax', '');
                myVM.set('vmPCPFax', PCPValue);
                faxValues.vmPCPFax = myVM.get('vmPCPFax');
                if (view.down('#txtFaxNumPCP1').getValue() == "" || view.down('#txtFaxNumPCP2').getValue() == "" || view.down('#txtFaxNumPCP3').getValue() == "") {
                    msg = 'yes'
                }


            }
            if (faxValues.vmIsPrescriberFax) {
                var PrescriberValue = view.down('#txtFaxNumPrescriber1').getValue() + view.down('#txtFaxNumPrescriber2').getValue() + view.down('#txtFaxNumPrescriber3').getValue();
                myVM.set('vmPrescriberFax', '');
                myVM.set('vmPrescriberFax', PrescriberValue);
                faxValues.vmPrescriberFax = myVM.get('vmPrescriberFax');
                if (view.down('#txtFaxNumPrescriber1').getValue() == "" || view.down('#txtFaxNumPrescriber2').getValue() == "" || view.down('#txtFaxNumPrescriber2').getValue() == "") {
                    msg = 'yes'
                }
            }
            if (faxValues.vmIsMemberFax) {
                var MemberValue = view.down('#txtFaxNumMember1').getValue() + view.down('#txtFaxNumMember2').getValue() + view.down('#txtFaxNumMember3').getValue();
                myVM.set('vmMemberFax', '');
                myVM.set('vmMemberFax', MemberValue);
                faxValues.vmMemberFax = myVM.get('vmMemberFax');
                if (view.down('#txtFaxNumMember1').getValue() == "" || view.down('#txtFaxNumMember2').getValue() == "" || view.down('#txtFaxNumMember3').getValue() == "") {
                    msg = 'yes'
                }
            }

            if (faxValues.vmIsPharmacyFax) {
                var PharmacyValue = view.down('#txtFaxNumPharmacy1').getValue() + view.down('#txtFaxNumPharmacy2').getValue() + view.down('#txtFaxNumPharmacy3').getValue();
                myVM.set('vmPharmacyFax', '');
                myVM.set('vmPharmacyFax', PharmacyValue);
                faxValues.vmPharmacyFax = myVM.get('vmPharmacyFax');
                if (view.down('#txtFaxNumPharmacy1').getValue() == "" || view.down('#txtFaxNumPharmacy2').getValue() == "" || view.down('#txtFaxNumPharmacy3').getValue() == "") {
                    msg = 'yes'
                }
            }
            if (msg == 'yes') {
                Ext.Msg.alert('Message', 'Please enter valid fax number for all checked fax to parties before proceed');
            }
            else if (this.getView().down('#txtform').isValid()) {
                me.fireEvent('SendLetterFax', faxValues);
            }

        }

    }

});