Ext.define('Atlas.benefitplan.model.ThresholdType', {
    extend: 'Atlas.benefitplan.model.Base',
	fields: [
        {name: "ThresholdSK", type: 'int'},
		{name: "BnftPlanSK", type: 'int'},
		{name: "ThresholdQulfrTypeSK", type: 'int'},
        {name: "BnftPlan", type: 'string'},
		{name: "CvrgSetThreshold", type: 'string'},
		{name: "CvrgSetThreshold", type: 'string'},
		{name: "ThresholdQulfrType", type: 'string'},
		{name: "ThresholdLimAmt", type: 'string'},
		{name: "RestartThresholdAtCalendarYr", type: 'string'},
		{name: "RestartThresholdAtPlanYr", type: 'string'},
		{name: "RestartThresholdAfterMbrEnrlmtDays", type: 'string'},
		{name: "RestartThresholdAfterMbrEnrlmtMths", type: 'string'},
		{name: "RestartThresholdAfterSvcDays", type: 'string'},
		{name: "RestartThresholdAfterSvcMths", type: 'string'},
		{name: "RestartThresholdAtBgnofCalendarMthNbr", type: 'string'}

	],
	proxy: {
		url: '/Threshold'
  	}
});
