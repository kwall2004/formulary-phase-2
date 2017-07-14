Ext.define('Atlas.member.view.mydocuments.DocumentFilterWindow', {
        extend: 'Ext.window.Window',
        height: 350,
        width: 600,
        layout: 'fit',
        modal: true,
        buttonAlign: 'center',
        title: 'Select Document Types to View for {data}',


        items: [
          {
            xtype: 'container',
            layout: {
              type: 'vbox',
              pack: 'center',
              align: 'middle'
            },
            items: [
              {
                xtype: 'container',
                layout: {
                  type: 'hbox'
                },
                items: [
                  {
                    xtype: 'datefield',
                    fieldLabel: 'From:',
                    name: 'fromDate',
                    flex: 1
                  },
                  {
                    xtype: 'datefield',
                    fieldLabel: 'To:',
                    name: 'toDate',
                    flex: 1
                  }
                ]
              },
              {
                xtype: 'container',
                layout: {
                  type: 'vbox'
                },
                items: [
                  {
                    xtype: 'checkbox',
                    fieldLabel: 'All',
                    name: 'allDocumentTypes',
                    flex: 1
                  },
                  {
                    xtype: 'checkbox',
                    fieldLabel: 'Health Risk Assessment',
                    name: 'healthRiskAssessment',
                    flex: 1
                  },
                  {
                    xtype: 'checkbox',
                    fieldLabel: 'Meridian Choice Premium Invoice',
                    name: 'meridianChoicePremium',
                    flex: 1
                  }
                ]
              }
            ]
          }



        ],



        buttons: [
            {
                text: 'OK',
                handler: function () {
                    Ext.Msg.alert('You clicked OK!');
                }
            },
            {
                text: 'Cancel',
                handler: function () {
                    this.up('window').close();
                }
            }
        ]
    });
