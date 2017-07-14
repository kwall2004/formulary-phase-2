/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Member Demographics
 * Description: Controller for Member demographics
 */
Ext.define('Atlas.portals.provider.MemberDemographicsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberdemographicscontroller',

    listen: {
        controller: {
            '*': {
                memberDetailsSet: 'loadMemberDemographicsData'
            }
        }
    },


    loadMemberDemographicsData: function (memberdetails) {
        this.lookupReference('MemberAddress').setValue(memberdetails.homeAddress1 + ", " + memberdetails.homeAddress2);
        this.lookupReference('Membercitystatezip').setValue(memberdetails.homeCity + ", " + memberdetails.homeState + ", " + this.modifiedZip(memberdetails.homeZip));
        if (memberdetails.homePhonecontactInfo != '') {
            this.lookupReference('MemberHomePhoneNumber').setHidden(false);
            this.lookupReference('MemberHomePhoneNumber').setValue('(H) ' + this.modifiedPhone(memberdetails.homePhonecontactInfo));
        } else {
            this.lookupReference('MemberHomePhoneNumber').setHidden(true);
        }
        if (memberdetails.workPhonecontactInfo != '') {
            this.lookupReference('MemberWorkPhoneNumber').setHidden(false);
            this.lookupReference('MemberWorkPhoneNumber').setValue('(W) ' + this.modifiedPhone(memberdetails.workPhonecontactInfo));
        } else {
            this.lookupReference('MemberWorkPhoneNumber').setHidden(true);
        }
        if (memberdetails.CellcontactInfo != '') {
            this.lookupReference('MemberCellPhoneNumber').setHidden(false);
            this.lookupReference('MemberCellPhoneNumber').setValue('(C) ' + this.modifiedPhone(memberdetails.CellcontactInfo));
        } else {
            this.lookupReference('MemberCellPhoneNumber').setHidden(true);
        }
        this.lookupReference('MemberEmail').setValue(memberdetails.eMailcontactinfo);

        this.lookupReference('GuardianName').setValue(memberdetails.respFirstName + " " + memberdetails.respMiddleName + " " + memberdetails.respLastName);

        this.lookupReference('GuardianAddress').setValue(memberdetails.respAddress1 + ", " + memberdetails.respAddress2);
        this.lookupReference('Guardiancitystatezip').setValue(memberdetails.respCity + ", " + memberdetails.respState + ", " + this.modifiedZip(memberdetails.respZip));
        if (memberdetails.respHomePhonecontactInfo != '') {
            this.lookupReference('GuardianHomePhoneNumber').setHidden(false);
            this.lookupReference('GuardianHomePhoneNumber').setValue('(H) ' + this.modifiedPhone(memberdetails.respHomePhonecontactInfo));
        } else {
            this.lookupReference('GuardianHomePhoneNumber').setHidden(true);
        }
        if (memberdetails.respWorkPhonecontactInfo != '') {
            this.lookupReference('GuardianWorkPhoneNumber').setHidden(false);
            this.lookupReference('GuardianWorkPhoneNumber').setValue('(W) ' + this.modifiedPhone(memberdetails.respWorkPhonecontactInfo));
        } else {
            this.lookupReference('GuardianWorkPhoneNumber').setHidden(true);
        }
    },

    modifiedZip: function (zip) {
        var modifiedZip = '';
        if (zip.length > 5) {
            modifiedZip = zip.replace(/^(\d{5})(\d{4})$/, '$1-$2');
        } else {
            modifiedZip = zip;
        }
        return modifiedZip;
    },

    modifiedPhone: function (phoneNumber) {
        return phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
    },

    onPrintClick: function (component, eOpts) {
        var recipientId = this.getViewModel().data.recipientId,
            LOB = this.getViewModel().data.memberDetails.primaryLOB;

        if (recipientId != '') {
            var window = Ext.ComponentQuery.query('window[itemId=viewOptionsWindow]')[0];
            if (!window) {
                Ext.create('Ext.window.Window', {
                    itemId: 'viewOptionsWindow',
                    title: 'Print Member Report',
                    autoheight: true,
                    width: 450,
                    layout: 'fit',
                    viewModel: {
                        data: {
                            recipientId: recipientId,
                            lobId: LOB
                        }
                    },
                    session: {
                        schema: 'atlas'
                    },
                    items: [{
                        xtype: 'portalsMemberPrintOptionsDialog'
                    }]
                }).show();
            } else {
                window.show();
            }
        } else {
            Ext.Msg.alert('Error', 'Please enter Member ID');
        }
    },

    onNotifyClick: function (component, eOpts) {
        var recipientId = this.getViewModel().data.recipientId;
        var memberDetails = this.getViewModel().data.memberDetails;
        if (recipientId != '') {
            var window = Ext.ComponentQuery.query('window[itemId=notifyHealthplanWindow]')[0];
            if (!window) {
                Ext.create('Ext.window.Window', {
                    itemId: 'notifyHealthplanWindow',
                    title: 'Notify Health Plan',
                    autoheight: true,
                    scrollable: true,
                    layout: 'fit',
                    viewModel: {
                        data: {
                            memberdetails: memberDetails
                        }
                    },
                    session: {
                        schema: 'atlas'
                    },
                    items: [{
                        xtype: 'portalsMemberNotifyHealthPlan'
                    }]
                }).show();
            } else {
                window.show();
            }
        } else {
            Ext.Msg.alert('Error', 'Please enter Member ID');
        }
    }

});