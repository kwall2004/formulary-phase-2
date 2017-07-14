/**
 * Created by a6686 on 11/19/2016.
 */
Ext.define('Atlas.plan.model.PlanCoveragePhase',{
    extend: 'Atlas.common.model.Base',


    fields: [
        {name: 'planBenefitId',  type: 'int'},
        {name: 'benefitName',  type: 'string'},
        {name: 'systemId',  type: 'string'},
        {name: 'coveragePhaseId',  type: 'int'},
        {name: 'coveragePhaseName',  type: 'string'},
        {name: 'coverageCode',  type: 'string'},

        {name: 'RankOrder',  type: 'string'},
        {name: 'MaxTROOPAmount',  type: 'string'},
        {name: 'MaxTDSAmount',  type: 'string'},
        {name: 'Mode',  type: 'string'}
    ],

    proxy: {
        /*extraParams: {
            pPlanGroupId:'10',
            pPlanBenefitId:'10'
        },*/
        url: 'plan/{0}/plancoveragephases',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});