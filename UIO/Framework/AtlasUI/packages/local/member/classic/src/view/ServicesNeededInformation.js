Ext.define('Atlas.member.view.ServicesNeededInformation', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-servicesneededinformation',

    requires: [
        'Ext.panel.Panel'
    ],
    region: 'center',
    title: 'Services Needed Info',
    items: [
          {
            title: 'Services Needed Information',
            iconCls: 'fa fa-rocket',
            items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                  {
                      html: '<h2>Services Needed Infromation</h2></br>'
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'combobox',
                        fieldLabel: 'Family:',
                        name: 'family',
                        flex: 0
                      }
                    ]
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Name:',
                        name: 'name'
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'DOB:',
                        name: 'dob'
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Status:',
                        name: 'status'
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Age:',
                        name: 'age'
                      },
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Reporting Year:',
                        labelWidth: 90,
                        name: 'reportingYear'
                      }

                    ]
                  },
                  {
                    html: '</br><h3 style="color:red;" >Note: Below services needed are for the selected member in the family drop down.</h3>'
                  },
                  {
                      xtype: 'grid',
                      title: 'Services',
                      columns: [
                        {
                          text: 'Measure',
                          flex: 2
                        },
                        {
                          text: 'Sub Desc',
                          flex: 2
                        },
                        {
                          text: 'Due By',
                          flex: 1
                        },
                        {
                          text: 'Hedis Hit Date',
                          flex: 1
                        },
                        {
                          text: 'Complete',
                          flex: 1
                        }
                      ]
                  }
                ]
            }
          ]
      }

    ]
});
