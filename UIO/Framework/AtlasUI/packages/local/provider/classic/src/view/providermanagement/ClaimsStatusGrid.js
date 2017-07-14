Ext.define('Atlas.provider.view.providermanagement.ClaimsStatusGrid', {
     extend: 'Ext.grid.Panel',

    xtype: 'providerportal-providermanagement-claimsstatusgrid',

    disableSelection: true,
    loadMask: true,

    initComponent: function(){

        // create the Data Store

        Ext.apply(this, {
          columns:[{
              text: "Claim #"
          },{
            text: "Edit/Resubmit"
          },{
            text: "Member ID"
          },{
            text: "LOB"
          },{
            text: "Member Name"
          },{
            text: "Ser Date"
          },{
            text: "Bill Type"
          },{
            text: "POS"
          },{
            text: "Diag 1"
          },{
            text: "Diag 2"
          },{
            text: "Diag 3"
          },{
            text: "Billed"
          },{
            text: "Status"
          },{
            text: "Patient Acc #"
          },{
            text: "Form Type"
          }]
        });
        this.callParent();
    }

});
