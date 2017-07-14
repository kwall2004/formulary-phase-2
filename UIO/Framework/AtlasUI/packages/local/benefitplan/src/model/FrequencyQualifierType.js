Ext.define('Atlas.benefitplan.model.FrequencyQualifierType', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [
        {name: "FreqQulfrCode", type: 'int'},
        {name: "FreqQulfrDesc", type: 'string'}

	],
	proxy: {
		url: '/FrequencyQualifierType'
  	}
});
