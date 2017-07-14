/*
    Last Developer: Paul Glinski
    Previous Developers: [Paul Glinski]
    Description: A view that gives the user a table of radio button options to select when they would prefer to enroll in a wellness program.
*/
Ext.define('Atlas.member.view.EnrollInWellnessProgram', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-enrollinwellnessprogram',

    requires: [
        'Ext.panel.Panel'
    ],

    region: 'center',
    title: 'Enroll In Wellness Program',
    items: [
          {
            title: 'Enroll in Wellness Program',
            items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                {
                    html: '<b>Enroll into a wellness Program!</b></br></br>'
                },
                {
                  xtype: 'container',
                  layout: 'hbox',
                  margin: '0px, 0px, 0px, 40px',
                  items: [
                    {
                      xtype: 'image',
                      src: 'resources/images/smoking.png',
                      minWidth: '100',
                      minHeight: '90',
                      style: {
                        padding: '0px 10px 0px 0px'
                      }
                    },
                    {
                      html: 'We have a program that will help you quit smoking! The program is called New Beginnings. The program includes a coach </br> who will work with you to help you quit. Your coach has tips on how to quit smoking, educational materials, ways to </br> identify barriers and ideas for how to change your rutine. Call our quit lone at 844-854-5579. If you want to sign up </br> now, click the button below! To learn more, click <a href="google.com"> here </a>'
                    }
                  ]
                },
                {
                    margin: '0px, 0px, 0px, 80px',
                    html: '</br><b>Please provide us with days and times that work best for you:</b></br></br>'
                },
                {
                  width: 700,
                  margin: '0px, 0px, 0px, 80px',
                  layout: {
                      type: 'table',
                      // The total column count must be specified here
                      columns: 4,
                      tdAttrs: {
                        align: 'center',
                        valign: 'middle'
                      }
                  },

                  id: 'wellnessProgramGrid',

                  defaults: {
                      // applied to each contained panel
                      bodyStyle: 'padding:10px',
                      width: 150
                  },

                  items: [{
                      html: ''
                  },{
                      html: 'Morning'
                  },{
                      html: 'Afternoon'
                  },{
                      html: 'Anytime'
                  }
                  //row 2
                  ,{
                      html: 'Monday',
                      bodyStyle: 'background: none'
                  },{
                      xtype: 'radiofield',
                      name: 'monday',
                      cls: 'wellnesProgramRadioButton'
                  },{
                      xtype: 'radiofield',
                      name: 'monday',
                      cls: 'wellnesProgramRadioButton'
                  },{
                      xtype: 'radiofield',
                      name: 'monday',
                      cls: 'wellnesProgramRadioButton'
                  }
                  //row 3
                  ,{
                      html: 'Tuesday'
                  },{
                    xtype: 'radiofield',
                    name: 'tuesday',
                    cls: 'wellnesProgramRadioButton'
                  },{
                    xtype: 'radiofield',
                    name: 'tuesday',
                    cls: 'wellnesProgramRadioButton'
                  },{
                    xtype: 'radiofield',
                    name: 'tuesday',
                    cls: 'wellnesProgramRadioButton'
                  }
                  //row 4
                  ,{
                      html: 'Wednesday',
                      bodyStyle: 'background: none'
                    },{
                      xtype: 'radiofield',
                      name: 'wednesday',
                      cls: 'wellnesProgramRadioButton'
                    },{
                      xtype: 'radiofield',
                      name: 'wednesday',
                      cls: 'wellnesProgramRadioButton'
                    },{
                      xtype: 'radiofield',
                      name: 'wednesday',
                      cls: 'wellnesProgramRadioButton'
                    }
                  //row 5
                  ,{
                      html: 'Thursday'
                    },{
                      xtype: 'radiofield',
                      name: 'thursday',
                      cls: 'wellnesProgramRadioButton'
                    },{
                      xtype: 'radiofield',
                      name: 'thursday',
                      cls: 'wellnesProgramRadioButton'
                    },{
                      xtype: 'radiofield',
                      name: 'thursday',
                      cls: 'wellnesProgramRadioButton'
                    }
                  //row 6
                  ,{
                      html: 'Friday',
                      bodyStyle: 'background: none'
                    },{
                      xtype: 'radiofield',
                      name: 'friday',
                      cls: 'wellnesProgramRadioButton'
                    },{
                      xtype: 'radiofield',
                      name: 'friday',
                      cls: 'wellnesProgramRadioButton'
                    },{
                      xtype: 'radiofield',
                      name: 'friday',
                      cls: 'wellnesProgramRadioButton'
                    }
                  ]
                },
                {
                  html: '</br>'
                },
                {
                  margin: '0px, 0px, 0px, 80px',
                  xtype: 'button',
                  text: 'Enroll Now',
                  scale: 'medium'
                }
              ]
        }
      ]
    }]
});
