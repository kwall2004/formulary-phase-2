 Ext.define('Atlas.member.view.MyBenefitsAndCoverage', {
     extend: 'Ext.panel.Panel',
     requires: [
         'Ext.layout.container.HBox'
     ],
     xtype: 'member-mybenefitsandcoverage',

     layout: {
         type: 'hbox',
         align: 'stretch'
     },

     bodyPadding: 10,

     defaults: {
         frame: true,
         bodyPadding: 10
     },
     title: 'My Benefits And Coverage',
     items: [
         {
             title: 'My Coverage',
             flex: 1,
             margin: '0 10 0 0',
             html: 'Coverage'
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
