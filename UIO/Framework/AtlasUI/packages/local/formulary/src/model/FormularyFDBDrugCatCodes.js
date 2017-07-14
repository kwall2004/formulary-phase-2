/**
 * Created by mkorivi on 10/18/2016.
 */
Ext.define('Atlas.formulary.model.FormularyFDBDrugCatCodes', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        url: 'formulary/{0}/formularyfdbdrugcatcodes'
    }

});