/**
 * Created by s6635 on 11/9/2016.
 */
Ext.define('Atlas.benefitplan.model.CopyGroupContents', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'PopGrpSK', type:'number'},
        {name: 'GrpSK', type: 'number'},
        {name: 'PopGrpName', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name:'CurrentUser', type: 'string'},
        {name: 'ToGrpSK'},
        {name: 'PBPSK', type: 'number'},
        {name: 'PBPName', type: 'string'},
        {name: 'PBPID', type: 'string'},
        {name:'PlanPgmCode',type:'string'},
        {name:'NewPlanPgmCode',type:'string'}

       /* {name:'NewPlanPgmCode'}*/
      /*  {name: 'PlanBenefitPackagePgmCode',
            mapping: 'PlanBenefitPackages',
            persist:false,
            convert: function (val,record) {
            debugger;
            return record.get('PlanBenefitPackages').PlanPgmCode;
        }       }*/
    ],
    proxy: {
        url: '/CopyGroupContents'
    }
});
