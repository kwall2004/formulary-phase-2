Ext.define('Atlas.member.view.requestmemberhandbook.RequestMemberHandbook', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-requestmemberhandbook-requestmemberhandbook',

    requires: [
        'Ext.panel.Panel'
    ],
    region: 'center',
    title: 'Request Member Handbook',
    items: [
          {
            title: 'Request Member Handbook',
            iconCls: 'fa fa-book',
            items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                {
                    html: '<h2>Request Member Handbook</h2>'
                },
                {
                    html: '<h3>Member Information</h3>'
                },
                {
                    xtype: 'requestMemberHandbookForm'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                      {
                          html: '<a href="google.com" >Cancel</a>',
                          anchor: '100% 50%',
                          padding: '10px 20px 0px 0px'
                      },
                      {
                        xtype: 'button',
                        text: 'Request Member Handbook',
                        scale: 'medium'
                      }
                    ]
                }
              ]
        }
      ]
      }

    ]
});
