Ext.define('Atlas.provider.view.providermanagement.HospitalReportsGrid', {
     extend: 'Ext.grid.Panel',

    xtype: 'providerportal-providermanagement-hospitalreportsgrid',

    disableSelection: true,
    loadMask: true,

    initComponent: function(){

        // create the Data Store

        Ext.apply(this, {
          columns:[{
              text: "Admit Dt"
          },{
            text: "Discharge Dt"
          },{
            text: "Discharge Status"
          },{
            text: "Last Name"
          },{
            text: "First Name"
          },{
            text: "Member ID"
          },{
            text: "Att Provider"
          },{
            text: "att ProvID"
          },{
            text: "att facility"
          },{
            text: "Facility ID"
          },{
            text: "Primary Dx"
          },{
            text: "Primary Dx D"
          },{
            text: "Secondary Dx"
          }]
        });
        this.callParent();
    }

});
