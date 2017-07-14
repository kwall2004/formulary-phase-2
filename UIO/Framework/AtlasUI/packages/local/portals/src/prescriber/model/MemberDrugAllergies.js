/**
 * Created by c4539 on 1/11/2017.
 */
Ext.define('Atlas.portals.prescriber.model.MemberDrugAllergies', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'CONCEPT_ID_DESC', type: 'string', mapping: 'CONCEPT_ID_DESC' },
        { name: 'DAM_CONCEPT_ID', type: 'int', mapping: 'DAM_CONCEPT_ID' },
        { name: 'DAM_CONCEPT_ID_TYP', type: 'int', mapping: 'DAM_CONCEPT_ID_TYP' },
        { name: 'DAM_CONCEPT_ID_DESC', type: 'int', mapping: 'DAM_CONCEPT_ID_DESC' },
        { name: 'DAM_CONCEPT_ID_TYP_DESC', type: 'string', mapping: 'DAM_CONCEPT_ID_TYP_DESC' },
        { name: 'reportedBy', type: 'string' , mapping: 'reportedBy' },
        { name: 'reportedDate', type: 'string' , mapping: 'reportedDate' },
        { name: 'reactionsAndEffects', type: 'string' , mapping: 'reactionsAndEffects' },
        { name: 'systemid', type: 'string' , mapping: 'systemID' },
        { name: 'Editable', type: 'bool', defaultValue: false }
    ],

    proxy: {
        extraParams: {
            pKeyType: 'systemID'
        },
        url: 'member/{0}/memberallergies'
    }
});