/**
 * Created by s6627 on 10/6/2016.
 */
Ext.define('Atlas.formulary.model.FormularyIdModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {
            name: 'NDC',
            reference: {
                parent: 'FormularyNewDrugModel',
                inverse: {
                    autoLoad: false
                }
            }
        },
        {name: 'NDC ', type: 'string'},
        {name: 'FormularyId', type: 'int'},
        {name: 'FormularyName', type: 'string'},
        {name: 'FormularyDrugType', type: 'int'}
    ],
    proxy: {
        extraParams: {
            pMode:'NewDrugs'
        },
        url: 'formulary/{0}/formularynewdrugs',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});