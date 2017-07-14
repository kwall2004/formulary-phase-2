Ext.define('Atlas.prescriber.view.ContactUs',{
    extend: 'Ext.panel.Panel',
    xtype: 'prescribercontactus',
    title: 'Contact Us',


    layout: {
        type: 'table',
        columns: 1,
        tdAttrs: { style: 'padding: 10px; vertical-align: top;' }
    },

    defaults: {
        xtype: 'panel',
        width: 600,
        frame: true

    },

  items: [
            {
                margin: '0 0 0 0',
                html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.468776245722!2d-83.04889668393469!3d42.332527979188825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b2d301960fddb%3A0xff4c44df8b870993!2sMeridian+Health+Plan!5e0!3m2!1sen!2sus!4v1474904504118" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
            },
      {
          title : "Medicaid",

          items:[
              {
                xtype: 'displayfield',
                value: "Phone:<span style='padding-left: 33px;'>866-984-6462</span>",
                margin: '0 0 -20 10'
              },

              {
                xtype: 'displayfield',
              value: "Fax:<span style='padding-left: 52px;'>877-355-8070</span>",
                margin: '0 0 -20 10'
              },
              {
                xtype: 'displayfield',
                value: "Address:<span style='padding-left: 21px;'>1 Campus Martius #700, Detroit, MI 48226</span>",
                margin: '0 0 0 10'
          }]
      },
      {
          title : "Medicare",
          items:[
              {
                  xtype: 'displayfield',
                  value: "Phone:<span style='padding-left: 33px;'>855-323-4585</span>",
                  margin: '0 0 -20 10'
              },

              {
                  xtype: 'displayfield',
                  value: "Fax:<span style='padding-left: 52px;'>313-324-1881</span>",
                  margin: '0 0 -20 10'
              },
              {
                  xtype: 'displayfield',
                  value: "Address:<span style='padding-left: 21px;'>1 Campus Martius #700, Detroit, MI 48226</span>",
                  margin: '0 0 0 10'
              }]
      },
      {
          title : "Commercial",
          items:[
              {
                  xtype: 'displayfield',
                  value: "Phone:<span style='padding-left: 33px;'>1-855-291-5226</span>",
                  margin: '0 0 -20 10'
              },

              {
                  xtype: 'displayfield',
                  value: "Fax:<span style='padding-left: 52px;'>1-855-291-5227</span>",
                  margin: '0 0 -20 10'
              },
              {
                  xtype: 'displayfield',
                  value: "Address:<span style='padding-left: 21px;'>1 Campus Martius #700, Detroit, MI 48226</span>",
                  margin: '0 0 0 10'
              }]
      }

    ]

});