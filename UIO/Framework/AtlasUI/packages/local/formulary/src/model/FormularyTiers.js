/**
 * Created by s6627 on 10/11/2016.
 */
Ext.define('Atlas.formulary.model.FormularyTiers', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'FormularyID', type: 'int'},
        {name: 'FormularyTierID', type: 'int'},
        {name: 'TierCode', type: 'string'},
        {name: 'TierDesc', type: 'string'},
        {name: 'exceptionTiercode',  type: 'string'
        //    convert:function(data)
        //    {
        //        if(data==""||data==null)
        //            return "NA";
        //        return data;
        //    }
        },
        {name: 'nonPartDTierCode', type: 'string'}
    ],
    proxy: {
        extraParams: {
            piFormularyID:'10'
        },
        url: 'formulary/{0}/formularytiers',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});