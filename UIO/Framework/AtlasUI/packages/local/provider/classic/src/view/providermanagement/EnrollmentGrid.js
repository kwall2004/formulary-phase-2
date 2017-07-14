Ext.define('Atlas.provider.view.providermanagement.EnrollmentGrid', {
     extend: 'Ext.grid.Panel',

    xtype: 'providerportal-providermanagement-enrollmentgrid',

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
            text: "Last Name"              
          },{
            text: "Middle Name"              
          },{
            text: "First Name"              
          },{
            text: "Birth Date"             
          },{
            text: "Phone"              
          },{
            text: "Status"              
          },{
            text: "Effective Date"              
          },{
            text: "Term Date"              
          }]
        });
        this.callParent();
    }

});
