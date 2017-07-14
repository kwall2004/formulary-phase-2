Ext.define('Atlas.provider.view.providermanagement.HEDISSelfReportingGrid', {
     extend: 'Ext.grid.Panel',

    xtype: 'providerportal-providermanagement-hedisselfreportinggrid',

    disableSelection: true,
    loadMask: true,

    initComponent: function(){

        // create the Data Store

        Ext.apply(this, {
          columns:[{
              text: "Memo"
          },{
            text: "Details"
          },{
            text: "Docs"
          },{
            text: "Member ID"
          },{
            text: "LOB"
          },{
            text: "Sex"
          },{
            text: "SSN"
          },{
            text: "Address"
          },{
            text: "City"
          },{
            text: "State"
          },{
            text: "Zip"
          },{
            text: "Phone"
          },{
            text: "Last Name"
          },{
            text: "First Name"
          },{
            text: "Mid"
          },{
            text: "Birth Date"
          }]
        });
        this.callParent();
    }

});
