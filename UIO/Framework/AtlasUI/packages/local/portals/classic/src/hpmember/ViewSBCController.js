/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - View SBC
 * Description: Controller for the View SBC Page
 */

Ext.define('Atlas.portals.view.hpmember.ViewSBCController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.portalsMemberViewSBCController',

    dispMemberData: function(){
        var user = Ext.first('viewport').getViewModel().get('user');
        viewSBCStore = this.getViewModel().getStore('viewSBCStore');
        viewSBCStore.getProxy().setExtraParam('viRecipientID', user.recipientId);
        viewSBCStore.load({
            scope: this,
            failure: function (record, operation) {
                Ext.Msg.alert('Failure', 'Display Member message error, Please contact admin.');

            },
            success: function (record, operation) {

            },
            callback: function (records, operation, success) {
                var displayMemberName = user.firstName + ' '+ user.lastName,
                    displayMemberPlanType ='',
                    displayMemberPlanVariant ='',
                    displayMemberPolicyNumber = '',
                    displayMemberSubscriberID = '',
                    displayMemberPlanPdf = '';
                if (records.length > 0 ) {
                    displayMemberPlanType = records[0].data.planCode;
                    displayMemberPlanVariant = records[0].data.variant;
                    displayMemberPolicyNumber = records[0].data.planPolicyNum;
                    displayMemberSubscriberID = records[0].data.sbrId;
                    if (displayMemberPlanType != ''){
                        displayMemberPlanPdf='For your Summary of Covered Benefits, please click on the link below: <br/><br/>';
                        displayMemberPlanPdf += '<a href="http://corp.mhplan.com/en/member/michigan/choice/benefits-resources/whats-covered/plan-benefits/" target="blank">Plan Benefits</a>';
                        // if (displayMemberPlanType == 'Bronze 1' || displayMemberPlanType == 'Bronze'){
                        //     displayMemberPlanPdf = displayMemberPlanPdf + '<a href=\'resources/mhpmember/benefit//SBC B1 MCH.pdf\' target=\'blank\'>Bronze 1 Plan Benifits PDF</a>';
                        // } else if (displayMemberPlanType == 'Bronze 2'){
                        //     displayMemberPlanPdf = displayMemberPlanPdf + '<a href=\'resources/mhpmember/benefit//SBC B2 MCH.pdf\' target=\'blank\'>Bronze 2 Plan Benifits PDF</a>';
                        // }else if (((displayMemberPlanType == 'Silver') && (displayMemberPlanVariant == '')) || ((displayMemberPlanType == 'Silver Zero Cost') && (displayMemberPlanVariant == '')) || ((displayMemberPlanType == 'Silver Limited') && (displayMemberPlanVariant == ''))){
                        //     displayMemberPlanPdf = displayMemberPlanPdf + '<a href=\'resources/mhpmember/benefit//SBC S.pdf\' target=\'blank\'>Silver Plan Benifits PDF</a>';
                        // }else if ((displayMemberPlanType == 'Silver') && (displayMemberPlanVariant == '73')){
                        //     displayMemberPlanPdf = displayMemberPlanPdf + '<a href=\'resources/mhpmember/benefit//SBC S73.pdf\' target=\'blank\'>Silver 73 Plan Benifits PDF</a>';
                        // }else if ((displayMemberPlanType == 'Silver') && (displayMemberPlanVariant == '87')){
                        //     displayMemberPlanPdf = displayMemberPlanPdf + '<a href=\'resources/mhpmember/benefit//SBC S87.pdf\' target=\'blank\'>Silver 87 Plan Benifits PDF</a>';
                        // }else if ((displayMemberPlanType == 'Silver') && (displayMemberPlanVariant == '94')){
                        //     displayMemberPlanPdf = displayMemberPlanPdf + '<a href=\'resources/mhpmember/benefit//SBC S94.pdf\' target=\'blank\'>Silver 94 Plan Benifits PDF</a>';
                        // }else if (displayMemberPlanType == 'Gold'){
                        //     displayMemberPlanPdf = displayMemberPlanPdf + '<a href=\'resources/mhpmember/benefit//SBC G.pdf\' target=\'blank\'>Gold Plan Benifits PDF</a>';
                        // }else if (displayMemberPlanType == 'Catastrophic'){
                        //     displayMemberPlanPdf = displayMemberPlanPdf + '<a href=\'resources/mhpmember/benefit//SBC CAT MCH.pdf\' target=\'blank\'>Catastrophic Plan Benifits PDF</a>';
                        // } else {
                        //     displayMemberPlanPdf = '';
                        // }
                    }

                }
                this.lookupReference('memberNameRef').setValue(displayMemberName);
                this.lookupReference('memberPlanTypeRef').setValue(displayMemberPlanType);
                this.lookupReference('memberPlanVariantRef').setValue(displayMemberPlanVariant);
                this.lookupReference('memberPolicyNumberRef').setValue(displayMemberPolicyNumber);
                this.lookupReference('memberSubscriberIdRef').setValue(displayMemberSubscriberID);
                this.lookupReference('memberPlanPdfRef').setValue(displayMemberPlanPdf);
            }
        });
    }

});