/**
 * Created by T4317 on 11/7/2016.
 */
Ext.define('Atlas.common.model.UCFClaim',{
    extend: 'Atlas.common.model.Base',

    fields: [
    'transactionId',
    'PCN',
    'transactionDate',
    'groupid',
    'rxNumQual',
    'rxNum',
    'serviceDate',
    'servProvQual',
    'servProvId',
    'ncpdpId',
    'prescriberIdQual',
    'prescriberId',
    'dateWritten',
    'insuredId',
    'insuredLastName',
    'insuredFirstName',
    'dateOfBirth',
    'genderCode',
    'patRelationCode',
    'personCode',
    'productId',
    'productIdQual',
    'gcnseq',
    'dawCode',
    'daysSupply',
    'dispQuantity',
    'fillNumber',
    'dispFeeSubmitted',
    'ingCostSubmitted',
    'compoundCode',
    'usualCustCharge',
    'otherAmtSubmitted',
    'grossAmtDue',
    'claimStatus',
    'otherCoverageCode',
    'recipientId',
    'incentiveAmtSubmitted',
    'salesTaxSubmitted',
    'patPaidSubmitted',
    'claimRefNum',
    'createDateTime',
    'createdBy',
    'priorAuthNumSubmitted',
    'priorAuthTypeCode',
    'representativeName',
    'lastModified',
    'lastModifiedBy',
    'SystemID',
    'rxOrigin',
    'carrierLobId',
    'prescriberName',
    'prescriberAddress',
    'prescriberPhone',
    'FWAPrescriberLockFlag',
    'PharmacyName',
    'PharmacyNameDescr',
    'PharmacyPhone',
    'pharmacyAddress',
    'memberName',
    'memberAddress',
    'LN',
    'excludedPharmacy',
    'Carrier',
    'Account',
    'LOB',
        {name: 'memberFullName',calculate: function(obj){
            var fullname = "";
            if(obj.insuredFirstName != null)//
            {
                fullname += obj.insuredFirstName + ' ';
            }
            if(obj.insuredLastName != null)//
            {
                fullname += obj.insuredLastName;
            }
            return fullname;
        }}// && obj.genderCode != 'undefined') {
        //        gendercode = obj.gendercode;
        //    }
        //
        //    if(genderCode === 'M')
        //    {
        //        return 'MALE';
        //    } else {
        //        return 'FEMALE';
        //    }
        //}}
    ],
    proxy: {
        url: 'claims/rx/ucfclaimdetail'
    }
});
