/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/22/2016
 * Origin: MERLIN - Member
 * Description: Editor page for Drug Allergies
 **/

Ext.define('Atlas.member.view.DrugAllergiesEditorWindow', {
    extend: 'Ext.panel.Panel',

    xtype:'member-drugallergieseditorwindow',

    items: [{
        xtype: 'form',
        reference: 'editorForm',
        // use the Model's validations for displaying form errors

        modelValidation: true,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        defaults: {
            xtype: 'textfield',
            msgTarget: 'side' // Wwe will show error indicator on the right side of the field
        },

        items: [{
            fieldLabel: 'Allergen',
            reference: 'CONCEPT_ID_DESC',
            bind:'{gridRecord.CONCEPT_ID_DESC}'
        },{
            xtype: 'displayfield',
            fieldLabel: 'Allergen Concept Type',
            reference: 'DAM_CONCEPT_ID',
            bind: '{gridRecord.DAM_CONCEPT_ID}'
        },{
            fieldLabel: 'Reported Source',
            reference: 'reportedBy',
            bind: '{gridRecord.reportedBy}'
        },{
            fieldLabel: 'Reported Date',
            reference: 'reportedDate',
            bind: '{gridRecord.reportedDate}'
        },{
            fieldLabel: 'Reaction And Effects',
            reference: 'reactionsAndEffects',
            bind: '{gridRecord.reactionsAndEffects}'
        }]
    }]
});