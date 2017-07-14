Ext.define('Atlas.benefitplan.model.HealthcareFinancialAccountType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.healthcarefinancialaccounttype',
	fields: [

        {name:"$id", type: 'string'},
        {name:"PBPHealthcareFinclAcct", type: 'string'},
        {name:"HealthcareFinclAcctTypeSK", type: 'int'},
        {name:"HealthcareFinclAcctTypeCode", type: 'string'},
        {name:"HealthcareFinclAcctTypeDesc", type: 'string'},
        {name:"EfctvStartDt", type: 'date'},
        {name:"EfctvEndDt", type: 'date'},
        {name:"CreatedBy", type: 'string'},
        {name:"CreatedTs", type: 'date'},
        {name:"LastModfdBy", type: 'string'},
        {name:"LastModfdTs", type: 'date'},
        {name:"InctvTs", type: 'date'},
        {name:"DelTs", type: 'date'}

    ],
	proxy: {
		url: '/HealthCareFinancialAccountType'
  }


});
