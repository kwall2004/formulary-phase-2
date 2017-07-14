/**
 * Created by s6627 on 11/26/2016.
 */
Ext.define('Atlas.common.model.shared.DrugAllergiesModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'systemID',type: 'string'},
        {name: 'CONCEPT_ID_DESC',type: 'string'},
        {name: 'DAM_CONCEPT_ID',type: 'int'},
        {name: 'DAM_CONCEPT_ID_TYP',type: 'int'},
        {name: 'DAM_CONCEPT_ID_TYP_DESC',type: 'string'},
        {name: 'reportedBy',type: 'string'},
        {name: 'reportedDate',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'reactionsAndEffects',type: 'string'}
    ]
    // ,
    // proxy: {
    //     url: 'member/{0}/memberallergies',
    //     pagination:true
    // }
});