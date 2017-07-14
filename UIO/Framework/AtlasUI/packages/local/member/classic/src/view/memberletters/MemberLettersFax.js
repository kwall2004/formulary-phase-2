/**
 * Created by T4317 on 7/28/2016.
 */
Ext.define('Atlas.member.view.memberletters.MemberLettersFax', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-memberletters-memberlettersfax',

    items: [
        {
            xtype:'combobox',
            fieldLabel:'Plan Group'
        },
        {
            xtype:'textfield',
            fieldLabel:'Prescriber',
            emptyText: '[e.g. Dr. Smith]'
        },
        {
            xtype:'textfield',
            fieldLabel:'Medication',
            emptyText: '[e.g. Nexium]'
        },
        {
            xtype:'numberfield',
            fieldLabel:'Prescriber Fax #'
        },
        {
            xtype:'textarea',
            fieldLabel:'Notes For Coverage Page'
        }
    ],
    dockedItems:[
        {
            dock:'bottom',
            items:[{
                xtype:'button',
                text:'Preview'
            },{
                xtype:'button',
                text:'Send Fax'
            },{
                xtype:'button',
                text:'Cancel',
                handler: function() {
                    this.up().up().up().hide();
                }
            }]
        }
    ]
});