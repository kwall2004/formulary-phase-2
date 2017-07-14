/**
 * Created by T4317 on 8/11/2016.
 */
Ext.define('Atlas.rebate.view.AddContact', {
    extend: 'Ext.panel.Panel',
    xtype: 'manufactureraddcontact',
    title:'Add Contact Info',

    defaults:{
        xtype:'textfield'
    },
    items: [
        {
            fieldLabel:'First Name'
        },
        {
            fieldLabel:'Last Name'
        },
        {
            fieldLabel:'Phone'
        },
        {
            fieldLabel:'Fax'
        },
        {
            fieldLabel:'Email'
        }
    ],
    dockedItems: [{
        dock:'bottom',
        xtype:'toolbar',
        ui:'footer',
        items:[{
            text:'Add',
            handler:function(){
                alert('load new contact')
            }
        },{
            text:'Cancel',
            handler:function(){
                this.up().up().up().hide();
            }
        }]
    }]
});