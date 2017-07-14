Ext.define('Atlas.portals.rxmember.view.MyBenefitsAndCoverageViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mybenefitsandcoverage',

    init: function(){
        var recipientId = Ext.first('viewport').getViewModel().getData().user.retRecipientID,
            viewModel = this.getViewModel(),
            comboCoverageGrid = this.lookupReference('coverageGridRef'),
            // gets our memberGroup store
            portalmembercoveragep = viewModel.getStore('portalmembercoveragep');

        portalmembercoveragep.getProxy().setExtraParam('pRecipientId', recipientId);
        portalmembercoveragep.load({
            callback: function (records, operation) {
                var coverageArr = [];
                for(var i = 0; i < records.length; i++) {
                    if(records[i].getData().TermDate === "") {
                        coverageArr.push(records[i]);
                    }
                }

                var coverageStore = new Ext.data.ArrayStore({
                    fields: ['BIN', 'CMSContractId', 'CMSPBPId', 'CarrierId', 'CarrierLOBId', 'CarrierName', 'DisplayName', 'EffDate', 'LOBName', 'MemberId', 'PCN', 'PlanBenefitId', 'PlanBenefitName', 'PlanGroupId', 'PlanGroupName', 'PrimaryCarePhys', 'RecipientId',  'SystemId', 'TermDate', 'id'],
                    data: coverageArr,
                    pageSize: 15,
                    proxy: {
                        type: 'memory',
                        enablePaging: true
                    }
                });


                comboCoverageGrid.setStore(coverageStore);

                // selects the first item in the grid
                Ext.first('grid[itemId=myBenefitsAndCoverageGrid]').getSelectionModel().select(0);
            }
        });
    },
    coverageRowClick: function(grid, record) {

        // sets the metadata for the store
        var viewModel = this.getViewModel(),
            portalMemberCoverage = viewModel.getStore('portalmembercoveragep'),
            memberMetadata = portalMemberCoverage.getProxy().getReader().metaData,
            pcpDetails = viewModel.setData(memberMetadata.ttPCPDetails.ttPCPDetails[0]),
            recipientId = Ext.first('viewport').getViewModel().getData().user.retRecipientID,
            //recipientId = '',
            termDate = record.data.TermDate,
            planbenefitId = record.data.PlanBenefitId,
            memberId = record.data.MemberId,
            benefitYear = parseInt(termDate.substring(0,4));

        // sets the pcp field set
        var pcpDetailsId = Ext.first('displayfield[itemId=pcpDetails]');
        if (memberMetadata.ttPCPDetails.ttPCPDetails.length > 0) {
            var firstName = pcpDetails.get('FirstName'),
                lastName = pcpDetails.get('LastName'),
                address1 = pcpDetails.get('Address1'),
                address2 = pcpDetails.get('Address2'),
                city = pcpDetails.get('City'),
                state = pcpDetails.get('state'),
                zipcode = pcpDetails.get('zipcode'),
                phone = pcpDetails.get('Phone'),
                fax = pcpDetails.get('Fax');
            pcpDetailsId.setValue(firstName + ' ' + lastName + '<br>' + address1 + ' ' + address2 + '<br>' + city +
                ', ' + state + ' ' + zipcode + '<br>' + phone + '<br>' + fax);

        } else {
            pcpDetailsId.setValue('No primary care physician assigned to this coverage.')
        }

        if (benefitYear == null || benefitYear == '' || isNaN(benefitYear) === true) {
            benefitYear = new Date().getFullYear();
        }
        // sets the deductibles field set
        var memberDeductibles = viewModel.getStore('memberDeductibles');
        memberDeductibles.getProxy().setExtraParam('pRecipientID', recipientId);
        memberDeductibles.getProxy().setExtraParam('pMemberid', memberId);
        memberDeductibles.getProxy().setExtraParam('pBenefitYear', benefitYear);
        memberDeductibles.getProxy().setExtraParam('pPlanBenefitId', planbenefitId);
        memberDeductibles.load({
            failure: function (records, operation) {
                //do something if the load failed
            },
            success: function (records, operation) {

            },
            callback: function (records, operation, success) {

                var pocketAssigned = Ext.first('displayfield[itemId=pocketAssigned]'),
                    pocketCurrent = Ext.first('displayfield[itemId=pocketCurrent]'),
                    deductibleAssigned = Ext.first('displayfield[itemId=deductibleAssigned]'),
                    deductibleCurrent = Ext.first('displayfield[itemId=deductibleCurrent]'),
                    deductibles = records[0].data;

                // adds a dollar symbol if the field returns null or N/A
                if (deductibles.MaxTroopAmt == null || deductibles.MaxTroopAmt == 'N/A') {
                    pocketAssigned.setValue(deductibles.MaxTroopAmt);
                } else if (deductibles.MaxTroopAmt == '') {
                    pocketAssigned.setValue('N/A');
                } else {
                    pocketAssigned.setValue('$' + deductibles.MaxTroopAmt);
                }

                if (deductibles.CurrentTroopAmt == null || deductibles.CurrentTroopAmt == 'N/A') {
                    pocketCurrent.setValue(deductibles.CurrentTroopAmt);
                } else if (deductibles.CurrentTroopAmt == '') {
                    pocketCurrent.setValue('N/A');
                } else {
                    pocketCurrent.setValue('$' + deductibles.CurrentTroopAmt);
                }

                if (deductibles.DeductibleAmt == null || deductibles.DeductibleAmt == 'N/A') {
                    deductibleAssigned.setValue(deductibles.DeductibleAmt);
                } else if (deductibles.DeductibleAmt == '') {
                    deductibleAssigned.setValue('N/A');
                } else {
                    deductibleAssigned.setValue('$' + deductibles.DeductibleAmt);
                }

                if (deductibles.RemDeductAmt == null || deductibles.RemDeductAmt == 'N/A'){
                    deductibleCurrent.setValue(deductibles.RemDeductAmt);
                } else if (deductibles.RemDeductAmt == '') {
                    deductibleCurrent.setValue('N/A');
                } else {
                    deductibleCurrent.setValue('$' + deductibles.RemDeductAmt);
                }


            }
        });
        this.lookup('planDetails').loadRecord(record);
    }

});