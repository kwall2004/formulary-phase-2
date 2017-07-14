Ext.define('Atlas.portals.view.provider.MemberMessages', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsMemberMessages',

  controller: 'membermessages',
  viewModel: 'providerhomeviewmodel',
  scrollable: true,

  items: [
    {
      xtype: 'panel',
      cls: 'card-panel',

      bind: {
        title: 'Messages ({unreadMessages} Unread)'
      },

      tbar: [{
        xtype: 'textfield',
        emptyText: 'Enter Search Text',
        reference: 'cocSearchBox',
        listeners: {
          specialkey: 'onEnterMessagePress'
        }
      }, {
        xtype: 'button',
        text: 'Search',
        handler: 'onMessageSearchClick'
      }, {
        xtype: 'combobox',
        editable: false,
        selectOnFocus: false,
        store: ['All', 'Unread', 'Read', 'Sent'],
        reference: 'cocCombo',
        listeners: {
          select: 'onCOCComboSelect'
        },
        value: 'Unread'
      }],

      bbar: ['->', {
        text: 'Mark Read/Unread',
        handler: 'onMarkMessageClick'
      }, {
        text: 'Refresh',
        handler: 'onRefreshMessagesClick'
      }, {
        text: 'Reply',
        handler: 'onMessageReplyClick'
      }],
      
      items: [{
        xtype: 'grid',
        reference: 'cocGrid',
        height: 400,
        margin: 5,
        bind: '{coc}',
        emptyText: 'No Messages',
        forceFit: true,
        listeners: {
          rowdblclick: 'onCOCRowDoubleClick'
        },
        columns: [{
          text: 'Subject',
          dataIndex: 'messageSubject',
          renderer: function (one, two, record) {
            if (record.getData().messageReadDate === null) {
              return '<b>' + record.getData().messageSubject + '</b>';
            }

            return record.getData().messageSubject;
          }
        }, {
          xtype: 'datecolumn',
          dataFormat: 'm/d/Y',
          text: 'Date',
          dataIndex: 'createDate'
        }]
      }]
    }
  ]
});