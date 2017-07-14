/**
 * Created by c4539 on 1/11/2017.
 */
Ext.define('Atlas.portals.prescriber.model.FormularyTier', {
    extend: 'Atlas.common.model.Base',


    fields: [
        {name: 'TierCode',  type: 'string'},
        {name: 'FormularyID',  type: 'string'},
        {name: 'FormularyTierID',  type: 'string'},
        {name: 'TierDesc',  type: 'string'},
        {name: 'exceptionTiercode',  type: 'string' ,
            convert:function(data)
            {
                if(data==""||data==null)
                    return "NA";
                return data;
            }},
        {name: 'nonPartDTierCode',  type: 'string'}

    ],

    proxy: {
        /* extraParams: {
         pPlanGroupId:'10'
         },*/
        //url: 'formulary/{0}/formularytiers',
        url: 'plan/rx/planformularytiers',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});