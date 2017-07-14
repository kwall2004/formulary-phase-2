Ext.define('Atlas.benefitplan.model.ThresholdQualifierType', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [
        {name: "ThresholdQulfrTypeCode", type: 'int'},
        {name: "ThresholdQulfrTypeDesc", type: 'string'}

	],
	proxy: {
		url: '/ThresholdQualifierType'
  	}
});
