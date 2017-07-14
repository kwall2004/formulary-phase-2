Ext.define('Atlas.benefitplan.model.RuleSets', {
	extend: 'Atlas.benefitplan.model.Base',
	hasMany: {model: 'CriteriaDetails', name: 'CriteriaDetails', associationKey: 'CriteriaDetails'},
	fields: [
		{name: 'CrtriaSetTypeSK', type: 'int'},
		{name: 'BnftCrtriaSetSK', type: 'auto'},
		{name: 'CvrgSetCrtriaSetSK', type: 'auto'},
		{name: 'BnftSK', type: 'auto'},
		{name: 'CvrgSetSK', type: 'auto'},
		{name: 'CrtriaSetSK', type: 'int'},
		{name: 'CriteriaSetName', type: 'string'},
		{name: 'CrtriaSetPrity', type: 'int'},
		{name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'CurrentUser', type: 'string'},
		{name: 'CriteriaDetails'}
	],
	proxy: {
		type: 'memory'
	}
});
