 Ext.define('Atlas.member.view.MyBenifitsAndCoverage', {
     extend: 'Ext.panel.Panel',
     requires: [
         'Ext.layout.container.HBox'
     ],
     xtype: 'member-mybenifitsandcoverage',

     layout: {
         type: 'hbox',
         align: 'stretch'
     },

     bodyPadding: 10,

     defaults: {
         frame: true,
         bodyPadding: 10
     },
     title: 'My Benifits And Coverage',
     items: [
         {
             title: 'Panel 1',
             flex: 1,
             margin: '0 10 0 0',
             html: 'flex : 1'
         },

         {
             xtype: 'container',
             flex: 1,
             items: [
               {
               xtype: 'grid',
               title: 'Plan Details',
               flex: 1,
               columns: [
                           {
                             text: 'Plan Detail',
                             flex: 1
                           }
                         ]
                },
                {
                xtype: 'grid',
                title: 'PCP Details',
                flex: 1,
                columns: [
                            {
                              text: 'Primary Care Physician',
                              flex: 1
                            }
                          ]
                 },
                 {
                 xtype: 'grid',
                 title: 'Out of Pocket Details',
                 flex: 1,
                 columns: [
                             {
                               text: 'Out of Pocket Maximum',
                               flex: 1
                             }
                           ]
                  },
                  {
                  xtype: 'grid',
                  title: 'Deductible Details',
                  flex: 1,
                  columns: [
                              {
                                text: 'Current Deductable Status',
                                flex: 1
                              }
                            ]
                   },
                   {
                   xtype: 'grid',
                   title: 'Copay Details',
                   flex: 1,
                   columns: [
                               {
                                 text: 'Copay',
                                 flex: 1
                               }
                             ]
                    }
              ]
         }
     ]
 });
