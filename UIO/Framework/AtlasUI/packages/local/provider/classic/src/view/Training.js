Ext.define('Atlas.provider.view.Training', {
    extend: 'Ext.panel.Panel',
    xtype: 'providerportal-training',

    title: 'Training',
    frame: true,

    items: [{
        xtype: 'panel',
        title: 'Training',
        frame: true,

        header: {
            items: [{
                xtype: 'button',
                iconCls: 'fa fa-cog'
            }]
        },
    
        items: [{
            xtype: 'hboxform',
            
            items: [{
                title: 'Schedule Training',
                xtype: 'fieldset',
                margin: 10,                
                flex: 1,
                
                items: [{
                    xtype: 'container',
                    html: "Please join for an introduction to Meridian Health's Provider Portal. We meet on alternate Wednesday's at 2:00pm (EST) to answer your questions about the PRovider Portal and share updates and information with you and your team.<br><br>Please select from the available dates below to register for an upcoming session.<br><br>"
                },{
                    xtype: 'combo',
                    fieldLabel: 'Provider:',
                    editable: false
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    name: 'nameInput'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    name: 'emailInput'
                }]
            },{
                title: 'Available Training Modules',
                margin: 10,
                flex: 1,
                xtype: 'fieldset',
                html: 'Please complete the following eLearning modules if you have not done so already. These include:<br><br><a href="#">Cultural Competency</a><br><a href="#">Medicare Training</a>'
            }]
        },{
            xtype: 'button',
            text: 'Clear',
            
            style: {
                'margin':'10px'
            }
        },{
            xtype: 'button',
            text: 'Submit',
            
            style: {
                'margin':'10px'
            }
        }]        
    }]
});
