/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.SocialHistory', {
  extend: 'Ext.panel.Panel',
  xtype: 'socialhistory',
  title: 'Social History',
  scrollable: true,

  items: [{
    xtype: 'container',
    layout: 'hbox',
    items: [
      {
        xtype: 'form',
        scrollable: true,
        reference: 'socialhistoryform',
        flex: 1,
        width: '100%',
        layout: {
          type: 'hbox',
          align: 'stretch'
        },
        items: [
          {
            xtype: 'fieldset',
            cls: 'card-panel',
            scrollable: true,
            flex: 1,
            minWidth: 400,
            maxWidth: 800,
            defaults: {
              xtype: 'textfield',
              labelWidth: 230,
              labelPad: 15,
              labelSeparator: ' ',
              readOnly: true
            },
            items: [
              {
                reference: 'memberEducation',
                name: 'memberEducation',
                margin: '20px 0 10px 0',
                fieldLabel: 'Education'
              },
              {
                reference: 'memberEmployment',
                name: 'memberEmployment',
                margin: '20px 0 10px 0',
                fieldLabel: 'Employment'
              },
              {
                reference: 'livingArrangement',
                name: 'livingArrangement',
                margin: '20px 0 10px 0',
                fieldLabel: 'Living Arrangement'
              },
              {
                reference: 'healthSafetyProblem',
                name: 'healthSafetyProblem',
                margin: '20px 0 10px 0',
                fieldLabel: 'Health and Safety Problems'
              }
            ]
          },
          {
            xtype: 'fieldset',
            cls: 'card-panel',
            scrollable: true,
            flex: 1,
            minWidth: 400,
            maxWidth: 800,
            defaults: {
              xtype: 'textfield',
              labelWidth: 140,
              labelPad: 15,
              labelSeparator: ' ',
              margin: '20px 0 10px 0',
              readOnly: true
            },
            items: [
              {
                reference: 'correctionsStatus',
                name: 'correctionsStatus',
                fieldLabel: 'Correction Status'
              },
              {
                reference: 'veteranStatus',
                name: 'veteranStatus',
                fieldLabel: 'Veteran Status'
              },
              {
                reference: 'smokingStatus',
                name: 'smokingStatus',
                fieldLabel: 'Smoking Status'
              },
              {
                reference: 'familyHistory',
                name: 'familyHistory',
                fieldLabel: 'Family History'
              }
            ]
          }
        ]
      }
    ]
  }]
});