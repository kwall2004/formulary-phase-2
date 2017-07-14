/**
 * Created by j3703 on 10/11/2016.
 */
Ext.define('Atlas.benefitplan.model.healthcarefinancialaccount', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [

        {name:"$id", type: 'string'},
        {name:"PopGrpPBPHealthcareFinclAcctSK", type: 'int'},
        {name:"PopGrpPBPSK", type: 'int'},
        {name:"BnftPlanTypeSK", type: 'int'},
        {name:"HealthcareFinclAcctTypeSK", type: 'int'},
        {name:"BankName", type: 'string'},
        {name:"AcctNbr", type: 'string'},
        {name: 'MaxContributionAmt', convert: function (value) {
            return Ext.Number.from(value,0).toFixed(2).toString();
            }},
        {name:"CurrentUser", type: 'string'}

    ],

    validators: {
        BnftPlanTypeSK: 'presence',
        BankName: 'presence',
        /*AcctNbr: [
            { type: 'length', min: 8, max:14, message: 'The account number must be at least 8 digits'}
            ,{type: 'format', matcher : /^[0-9]{8,17}$/i, message: 'An account number may only contain 8 to 17 digits.'}
            ],*/
        MaxContributionAmt: {type: 'format', matcher: /^\$*[0-9]+\.*[0-9]{0,2}$/i, message: 'A Max Contribution Amount must be a valid currency amount ($100.00)'},
        HealthcareFinclAcctTypeSK: 'presence'

    },
	proxy: {
		url: '/PlanBenefitPackageSavingsAccount'
  }

});




