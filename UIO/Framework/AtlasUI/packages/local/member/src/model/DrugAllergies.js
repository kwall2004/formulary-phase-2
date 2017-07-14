/*
 Developer: Paul
 Description: master member model
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.member.model.DrugAllergies', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'CONCEPT_ID_DESC', mapping: 'CONCEPT_ID_DESC'},
        { name: 'DAM_CONCEPT_ID', mapping: 'DAM_CONCEPT_ID'},
        { name: 'DAM_CONCEPT_ID_TYP_DESC', mapping: 'DAM_CONCEPT_ID_TYP_DESC'},
        { name: 'reportedBy', mapping: 'reportedBy'},
        { name: 'reportedDate', mapping: 'reportedDate'},
        { name: 'reactionsAndEffects', mapping: 'reactionsAndEffects'}

    ]
});
