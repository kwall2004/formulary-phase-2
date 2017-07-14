Ext.define('Atlas.member.view.mydocuments.MyDocuments', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-mydocuemnts-mydocuments',

    controller: 'myDocumentsController',
    region: 'center',
    title: 'My Documents',
    items: [
          {
            title: 'My Documents',
            iconCls: 'fa fa-file-text',
            items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                  {
                      html: '<h2>Search for Documents</h2></br>'
                  },
                  {
                    xtype: 'hboxform',
                    items: [
                      {
                        xtype: 'combobox',
                        fieldLabel: 'Family:',
                        name: 'family'
                      },
                      {
                        xtype: 'button',
                        text: 'Document Filter',
                        scale: 'medium',
                        handler: 'onDocumentFilter',
                        flex: 0,
                        margin: 3
                      },
                      {
                        xtype: 'datefield',
                        fieldLabel: 'From:',
                        name: 'fromDate'
                      },
                      {
                        xtype: 'datefield',
                        fieldLabel: 'To:',
                        name: 'toDate'
                      },
                      {
                        xtype: 'button',
                        text: 'Search',
                        scale: 'medium',
                        flex: 0,
                        margin: 3
                      }
                    ]
                  },
                  {
                    html: '</br><h3 style="color:red;" >Note: Documents listed are filtered by the From and To dates. The documents can be filtered by clicking the Document Filter Button above.</h3>'
                  },
                  {
                            xtype: 'grid',
                            title: 'Search Results',
                            flex: 1,
                            padding: '10px',
                            columns: [
                                        {
                                          text: 'Date',
                                          flex: 1
                                        },
                                        {
                                          text: 'Document Type',
                                          flex: 1
                                        },
                                        {
                                          text: 'Member ID',
                                          flex: 1
                                        },
                                        {
                                          text: 'First Name',
                                          flex: 1
                                        },
                                        {
                                          text: 'Last Name',
                                          flex: 1
                                        },
                                        {
                                          text: 'Download',
                                          flex: 1
                                        }
                                      ]
                  },
                  {
                      xtype: 'hboxform',
                      layout: {
                          type: 'hbox',
                          pack: 'center'
                      },
                      items: [
                        {
                          xtype: 'container',
                          html: 'Document Count: {data}'
                        },
                        {
                          xtype: 'hboxform',
                          margin: 0,
                          padding: 0,
                          items: [
                            {
                              xtype: 'button',
                              iconCls: 'fa fa-angle-double-left fa-2x',
                              scale: 'medium',
                              flex: 0
                            },
                            {
                              xtype: 'container',
                              html: 'Showing {data} to {data} Documents',
                              flex: 0
                            },
                            {
                              xtype: 'button',
                              iconCls: 'fa fa-angle-double-right fa-2x',
                              scale: 'medium',
                              flex: 0
                            }
                          ]
                        }

                      ]
                  }
                ]
            }
          ]
      }

    ]
});
