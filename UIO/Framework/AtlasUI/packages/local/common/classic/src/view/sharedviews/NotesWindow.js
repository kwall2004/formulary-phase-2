/**
 * Created by T4317 on 10/13/2016.
 */
Ext.define('Atlas.common.view.NotesWindow', {
    extend: 'Ext.panel.Panel',
    xtype:'noteswindow',
    items:[{
        xtype:'textarea',
        fieldLabel:'Notes',
        width:400,
        height:200
    }],
    dockedItems:[{
        xtype: 'toolbar',
        dock:'bottom',
        items:[{
            text:'Save',
            bind: {
                hidden: '{canSave}'
            },
            listeners:{
                click:function() {
                    var fields = 'CreateUser,CreateDate,CreateTime,Subject,Note,SystemID,rowNUm',
                        fieldvals = 'jsmith|10/12/2016|'
                    var notesModel = Ext.create('Atlas.common.model.Notes',{});
                    notesModel.getProxy().setExtraParam('psystemId');
                    notesModel.getProxy().setExtraParam('pMode');
                    notesModel.getProxy().setExtraParam('pFieldList',fields);
                    notesModel.getProxy().setExtraParam('pFields');
                }
            }
        },{
            text:'Cancel'
        }]
    }]
});