/**
 * Created by c4539 on 10/5/2016.
 */
Ext.define('Atlas.common.model.AllergenPickListMstr', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'DAM_CONCEPT_ID_TYP_DESC',type: 'string'},
        {name: 'CONCEPT_ID_DESC',type: 'string'},
        {name: 'DAM_CONCEPT_ID_DESC',type: 'string'},
        {name: 'DAM_CONCEPT_ID',type: 'int'},
        {name: 'DAM_CONCEPT_ID_TYP',type: 'int'}
    ],

    proxy: {
        url: 'member/{0}/allergenpicklistmstr'
    }
});