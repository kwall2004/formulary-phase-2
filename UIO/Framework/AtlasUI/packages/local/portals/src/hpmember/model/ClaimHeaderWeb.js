
/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - claims
 * Description: Store for the View Claims Page
 */

Ext.define('Atlas.portals.hpmember.model.ClaimHeaderWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
    { name:"recipientID" , type:"number" },
    { name:"serviceDate" , type:"date" , dateFormat: 'Y-m-d'},
    { name:"serviceProviderName" , type:"string" },
    { name:"claimNumber" , type:"number" },
    { name:"claimStatus" , type:"string" },
    { name:"claimStatusDesc" , type:"string" },
    { name:"paidDate" , type:"date", dateFormat: 'Y-m-d' },
    { name:"totalCharge" , type:"number" },
    { name:"allowableAmount" , type:"number" },
    { name:"totalPaid" , type:"number" },
    { name:"memberLiability" , type:"number" },
    { name:"benefitPlanCode" , type:"string" },
    { name:"benefitPlanDescription" , type:"string" },
    { name:"dsnpLiabilityMessage" , type:"string" },
    { name:"dbRowID" , type:"string" },
    { name:"rowNum" , type:"number" }
    ],

    proxy: {
        extraParams: {

        },

        url: 'portal/hp/claimheader'
    }
});
