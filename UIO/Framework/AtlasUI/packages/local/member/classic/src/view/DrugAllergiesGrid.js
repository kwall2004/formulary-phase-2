/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/22/2016
 * Origin: MERLIN - Member
 * Description: Grid for Drug Allergies
 **/

Ext.define('Atlas.member.view.DrugAllergiesGrid', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'member-drugallergiesgrid',
    requires: ['Atlas.member.view.DrugAllergiesEditorWindow'],

    viewModel: {
        type: 'common-shared-editgridmodel',
        data:{
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: true,
                update: true,
                destroy: true
            }
        },
        stores: {
            drugallergies: {
                model: 'Atlas.member.model.MemberDrugAllergies'
            }
        }
    },

    bind: '{drugallergies}',

    columns: [{
        dataIndex: 'CONCEPT_ID_DESC',
        text: 'Allergen'
    },{
        dataIndex: 'DAM_CONCEPT_ID',
        text: 'Allergen Concept ID',
        hidden: true
    },{
        dataIndex: 'DAM_CONCEPT_ID_TYP_DESC',
        text: 'Allergen Concept Type ID',
        hidden: true
    },{
        dataIndex: 'reportedBy',
        text: 'Reported Source'
    },{
        dataIndex: 'reportedDate',
        xtype: 'datecolumn',
        dateFormat: 'm/d/Y',
        text: 'Reported Date'
    },{
        dataIndex: 'reactionsAndEffects',
        text: 'Reactions And Effects'
    }],

    bbar: [{
        xtype: 'pagingtoolbar',
        pageSize: 25,
        bind: '{drugallergies}'
    }]
});