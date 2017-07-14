/*
    Last Developer: Paul Glinski
    Previous Developers: [Paul Glinski]
    Description: A view that gives the user a few checkbox options and allows them to enroll in a disease management program.
*/
Ext.define('Atlas.member.view.EnrollInDiseaseManagement', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-enrollindiseasemanagement',

    requires: [
        'Ext.panel.Panel'
    ],

    region: 'center',
    title: 'Enroll In Disease Management',
    items: [
          {
            title: 'Enroll In Disease Management',
            items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                {
                    html: '<b>Enroll into a Disease Management Program!</b></br></br>'
                },
                {
                  xtype: 'container',
                  layout: 'hbox',
                  margin: '0px, 0px, 0px, 40px',
                  items: [
                    {
                      xtype: 'image',
                      src: 'resources/images/heart.png',
                      minWidth: '90',
                      minHeight: '90',
                      margin: '0px, 10px, 0px, 0px'
                    },
                    {
                      html: 'It is important to find the time to take care of yourself. Meridian Health Plan has a program called a disease management pro-</br>gram. If you have a disease and you enroll in the program, you can get more information to stay healthy. To be a part of the pro-</br>gram, sign up below. You may also call Member Services at 888-437-0606. Call us if you have any questions.'
                    }
                  ]
                },
                {
                  xtype: 'container',
                  margin: '0px, 0px, 0px, 80px',
                  items: [
                    {
                        html: '</br><b>Please select all conditions that apply:</b></br></br>'
                    },
                    {
                      xtype: 'container',
                      layout: 'vbox',
                      items: [
                        {
                          xtype: 'checkbox',
                          fieldLabel: 'Asthma',
                          labelWidth: 200,
                          name: 'asthma'
                        },
                        {
                          xtype: 'checkbox',
                          fieldLabel: 'Cardiovascular Disease (CVD)',
                          labelWidth: 200,
                          name: 'cardiovacularDisease'
                        },
                        {
                          xtype: 'checkbox',
                          fieldLabel: 'Chronic Obstructive Pulmonary Disease (COPD)',
                          labelWidth: 200,
                          name: 'chronicObstructivePulmonaryDisease'
                        },
                        {
                          xtype: 'checkbox',
                          fieldLabel: 'Congestive Heart Failure (CHF)',
                          labelWidth: 200,
                          name: 'congestiveHeartFailure'
                        },
                        {
                          xtype: 'checkbox',
                          fieldLabel: 'Diabetes',
                          labelWidth: 200,
                          name: 'diabetes'
                        }
                      ]
                    },
                    {
                      html: '</br>'
                    },
                    {
                      xtype: 'button',
                      text: 'Enroll Now',
                      scale: 'medium'
                    }
                  ]
                }

              ]
        }
      ]
    }]
});
