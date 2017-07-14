/**
 * Created by s6627 on 12/12/2016.
 */
Ext.define('Atlas.formulary.model.MSValidationTPACodes', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        url: 'formulary/{0}/msvalidation'

    }


});