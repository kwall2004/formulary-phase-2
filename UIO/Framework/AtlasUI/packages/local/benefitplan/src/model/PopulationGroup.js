Ext.define('Atlas.benefitplan.model.PopulationGroup', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [
        {name: 'PopGrpSK', type: 'int'},
		{name: 'PopGrpName', type: 'string'},
		{name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
		{name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'CurrentUser', type: 'string'},
        {name: 'CntrctID', type: 'string'},
        {name: 'HIOSPlanID', type: 'string'},
        {name: 'UseAddrasDefaultforEnrlmtInd', type: 'boolean'}
	],
	proxy: {
		url: '/PopulationGroup'
  }
});
