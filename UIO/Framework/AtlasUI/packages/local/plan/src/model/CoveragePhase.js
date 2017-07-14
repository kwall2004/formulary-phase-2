/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.model.CoveragePhase',{
    extend: 'Atlas.common.model.Base',
    //idProperty: 'systemId',
    fields: [
        {name: 'systemId',  type: 'number'},
        {name: 'planBenefitId',  type: 'string'},
        {name: 'benefitName',  type: 'string'},
        {name: 'coveragePhaseId',  type: 'number'},
        {name: 'coveragePhaseName',  type: 'string'},
        {name: 'coverageCode',  type: 'string'},
        {name: 'rankOrder',  type: 'number'},
        {name: 'maxTROOPAmount',  type: 'number'},
        {name: 'maxTDSAmount',  type: 'number'}
    ],
    proxy: {
        url: 'plan/{0}/plancoveragephases'
    }
});