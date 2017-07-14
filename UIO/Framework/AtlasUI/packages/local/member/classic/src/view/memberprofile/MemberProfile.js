Ext.define('Atlas.member.view.memberprofile.MemberProfile', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-memberprofile-memberprofile',

    requires: [
        'Ext.panel.Panel'
    ],
    region: 'center',
    title: 'Member Profile',
    items: [
          {
            title: 'Member Profile',
            style: {
              padding: '30px'
            },
            items: [
              {
                xtype: 'container',
                layout: 'hbox',
                items:[
                {
                  xtype: 'panel',
                  title: 'Member Information',
                  padding: '10px',
                  flex: 1,
                  items: [
                    {
                      xtype: 'memberInformationForm',
                      padding: '20px'
                    }
                  ]
                },
                {
                  xtype: 'panel',
                  title: 'Contact Information',
                  padding: '10px',
                  flex: 1,
                  items: [
                    {
                      xtype: 'contactInformationForm',
                      padding: '20px'
                    }
                  ]
                }
                ]
              },
              {
                  xtype: 'container',
                  layout: {
                      type: 'hbox',
                      pack: 'end'
                  },
                  items: [
                    {
                      xtype: 'button',
                      text: 'Save Profile',
                      scale: 'medium'
                    }
                  ]
              }
      ]
      }

    ]
});
