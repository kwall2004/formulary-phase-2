/**
 *  Last Developer: Jagman Bhullar
 *  Previous Developers:Kevin Tabasan
 */
Ext.define('Atlas.member.model.MemberDrugAllergies', {
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
        //url: 'member/services/{0}/memberallergies'
        //type:'ajax',
        //url: 'resources/data/dummydata/drugAllergies.json'
    }
});