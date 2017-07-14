/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/22/2016
 * Origin: MERLIN - Member
 * Description: Grid for Drug Allergies
 **/

Ext.define('Atlas.member.view.DrugAllergies', {
    extend:'Ext.panel.Panel',
    xtype: 'member-memberdrugallergies',
    //requires: ['Atlas.member.view.DrugAllergiesEditorWindow'],
    items:[
        {
            xtype:'drugallergies'
        }
    ]
    /* title: 'Drug Allergies',
     dialogxtype: 'drugallergieseditorwindow',

     viewModel:
     {
     stores: {
     memberdrugallergiesstore: {
     model: 'Atlas.member.model.MemberDrugAllergies',
     remoteSort: true,
     remoteFilter: true,
     autoLoad: false
     }
     }
     },

     controller: 'memberdrugallergies',

     bind: '{memberdrugallergiesstore}',

     columns: [{
     dataIndex: 'CONCEPT_ID_DESC',
     text: 'Allergen'
     },{
     dataIndex: 'DAM_CONCEPT_ID',
     text: 'Allergen Concept ID',
     hidden: true
     },{
     dataIndex: 'DAM_CONCEPT_ID_TYP_DESC',
     text: 'Allergen Concept Type',
     hidden: true
     },{
     dataIndex: 'DAM_CONCEPT_ID_TYP',
     text:'Allergen Concept Type ID'
     },{
     dataIndex: 'reportedBy',
     text: 'Reported Source'
     },{
     dataIndex: 'reportedDate',

     xtype: 'datecolumn',
     //sdateFormat: 'm/d/Y',
     text: 'Reported Date'
     },{
     dataIndex: 'reactionsAndEffects',
     text: 'Reactions And Effects'
     }],



     dockedItems: [{
     xtype: 'pagingtoolbar',
     pageSize: 25,
     width:'100%',
     dock:'bottom',
     bind: '{memberdrugallergiesstore}'
     }]
     /!* initComponent: function() {
     var me = this;
     var vm = me.getViewModel();
     //debugger;
     var lkpStore = vm.getStore('memberdrugallergiesstore');
     lkpStore.loadRawData(this.itemConfig.tgtStore.data.items);
     me.callParent();
     }*!/*/

});