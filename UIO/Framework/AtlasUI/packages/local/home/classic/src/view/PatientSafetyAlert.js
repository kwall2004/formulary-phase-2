Ext.define('Atlas.home.view.PatientSafetyAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.patientsafetyalert',

    viewTemplate: {
        iconCls: 'icon-safetyalert,10',
        title: '~patientSafety.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.PatientSafetyAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});