/**
 * Created by s6627 on 10/17/2016.
 */
Ext.define('Atlas.formulary.model.FormularyGPIStructureModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'wCode', type: 'string'},
        {name: 'wdesc', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pGPI:'07000020',
            potc:'P',
            ptype:'SSB',
            pformularyID:'10',
            pVersion:'45'
        },
        url: 'formulary/{0}/formularygpistructure',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});