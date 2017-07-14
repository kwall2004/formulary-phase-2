/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.PatientInformation', {
  extend: 'Ext.panel.Panel',
  xtype: 'patientinformation',
  title: 'Patient Information',
  cls: 'formPanel',

  items: [{
    xtype: 'container',
    layout: 'hbox',
    items: [
      {
        xtype: 'form',
        reference: 'patientinformation',
        flex: 1,
        width: '100%',
        layout: 'hbox',
        items: [
          {
            xtype: 'fieldset',
            cls: 'card-panel',
            scrollable: true,
            flex: 1,
            width: '100%',
            items: [
              {
                xtype: 'textfield',
                reference: 'memberID',
                name: 'memberID',
                anchor: '100%',
                margin: '20px 0 10px 0',
                fieldLabel: 'Member ID',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                readOnly: true
              },
              {
                xtype: 'textfield',
                reference: 'memberFirstName',
                name: 'memberFirstName',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Member Name',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberLastName',
                name: 'memberLastName',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Last Name',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberGender',
                name: 'memberGender',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Gender',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberDOB',
                name: 'memberDOB',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Date of Birth',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberLegalGuardian',
                name: 'memberLegalGuardian',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Legal Guardian',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberPhone',
                name: 'memberPhone',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Member Phone',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberAddress',
                name: 'memberAddress',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Member Address 1',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberCity',
                name: 'memberCity',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Member City',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberSt',
                name: 'memberSt',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Member State',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberZipCode',
                name: 'memberZipCode',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Member Zip',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberEmail',
                name: 'memberEmail',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Email',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              }
            ]
          },
          {
            xtype: 'fieldset',
            scrollable: true,
            cls: 'card-panel',
            flex: 1,
            width: '100%',
            height: 556,
            items: [
              {
                xtype: 'textfield',
                reference: 'memberRace',
                name: 'memberRace',
                anchor: '100%',
                margin: '20px 0 10px 0',
                fieldLabel: 'Race',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberEthnicity',
                name: 'memberEthnicity',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Ethnicity',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberLanguage',
                name: 'memberLanguage',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Language',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberEnrollDate',
                name: 'memberEnrollDate',
                anchor: '100%',
                margin: '20px 0 10px 0',
                fieldLabel: 'Enrollment Date',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'commonKey',
                name: 'commonKey',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Common Key',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberSecAddress',
                name: 'memberSecAddress',
                anchor: '100%',
                margin: '60px 0 10px 0',
                fieldLabel: 'Member Address 2',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberSecCity',
                name: 'memberSecCity',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Member City 2',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberSecSt',
                name: 'memberSecSt',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Member State 2',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'memberSecZipCode',
                name: 'memberSecZipCode',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Member Zip 2',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              },
              {
                xtype: 'textfield',
                reference: 'source',
                name: 'source',
                anchor: '100%',
                margin: '0 0 10px 0',
                fieldLabel: 'Source',
                labelPad: 15,
                labelSeparator: ' ',
                labelWidth: 110,
                editable: false
              }
            ]
          }
        ]
      }
    ]
  }]
});