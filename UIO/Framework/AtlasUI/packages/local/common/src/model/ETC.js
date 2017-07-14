/*
 Developer: Manasa Korivi
 Description: model for etc
 Origin: Merlin
 11/01/16

 */
Ext.define('Atlas.common.model.ETC', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'ETC_ID',type: 'string'},
        {name: 'ETC_NAME',type: 'string'},
        {name: 'ETC_ULTIMATE_CHILD_IND',type: 'string'},
        {name: 'ETC_PARENT_ETC_ID',type: 'string'},
        {name: 'ETC_FORMULARY_LEVEL_IND',type: 'string'},
        {name: 'ETC_PRESENTATION_SEQNO',type: 'string'},
        {name: 'ETC_ULTIMATE_PARENT_ETC_ID',type: 'string'},
        {name: 'ETC_HIERARCHY_LEVEL',type: 'string'},
        {name: 'ETC_SORT_NUMBER',type: 'string'}, // added fields which required for GYI Typeahead under Compound GPI windwow
        {name: 'ETC_RETIRED_IND',type: 'string'},
        {name: 'ETC_RETIRED_DATE',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pUChild: 0
        },
        // url: 'pharmacy/services/rx/pharmacymasterdata/',
        url: 'formulary/{0}/etcsearch'
    }
});
