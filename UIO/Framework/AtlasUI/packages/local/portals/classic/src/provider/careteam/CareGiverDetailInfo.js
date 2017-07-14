/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.careteam.CareGiverDetailInfo', {
  extend: 'Ext.Container',
  xtype: 'caredetailinfo',
  controller: 'caregiverdetailcontroller',
  viewModel: 'caregiverdetailmodel',

  items: [
    {
      xtype: 'form',
      title: 'Care Giver Detail Info',
      cls: 'card-panel',
      flex: 1,
      reference: 'caregiverdetailform',
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      items: [
        {
          xtype: 'container',
          flex: 1,
          defaults: {
            labelWidth: 150,
            xtype: 'textfield',
            fieldStyle: 'width:200px;'
          },
          items: [
            {
              reference: 'ttProvID',
              name: 'ttProvID',
              disabled: true,
              fieldLabel: 'Provider ID'
            },
            {
              reference: 'ttfirstName',
              name: 'ttfirstName',
              fieldLabel: 'First Name',
              readOnly: true
            },
            {
              reference: 'ttlastName',
              name: 'ttlastName',
              fieldLabel: 'Last Name',
              readOnly: true
            },
            {
              reference: 'ttAddress1',
              name: 'ttAddress1',
              fieldLabel: 'Address '
            },
            {
              reference: 'ttAddress2',
              name: 'ttAddress2',
              hideEmptyLabel: false
            },
            {
              reference: 'ttCity',
              name: 'ttCity',
              fieldLabel: 'City'
            },
            {
              reference: 'ttState',
              name: 'ttState',
              fieldLabel: 'State'
            },
            {
              reference: 'ttzipCode',
              name: 'ttzipCode',
              fieldLabel: 'Zip Code'
            },
            {
              reference: 'ttnpiNum',
              name: 'ttnpiNum',
              fieldLabel: 'NPI Number',
              readOnly: true
            },
            {
              reference: 'ttdbRowID',
              name: 'ttdbRowID',
              fieldLabel: 'Row ID',
              hideLabel: true,
              hidden: true
            }
          ]
        },
        {

          xtype: 'container',
          flex: 1,
          defaults: {
            labelWidth: 150,
            xtype: 'textfield',
            fieldStyle: 'width:200px;'
          },
          items: [
            {
              reference: 'ttcareGiverType',
              name: 'ttcareGiverType',
              fieldLabel: 'Participant Type',
              disabled: true,
              readOnly: true
            },
            {
              reference: 'ttwaiverProvider',
              name: 'ttwaiverProvider',
              fieldLabel: 'Waiver Provider',
              disabled: true,
              readOnly: true
            },
            {
              fieldLabel: 'Clinic',
              name: 'ttclinicName',
              reference: 'ttclinicName'
            },
            {
              fieldLabel: 'Phone',
              name: 'ttPhoneMain',
              reference: 'ttPhoneMain',
              maxLength: 10,
              minLength: 10
            },
            {
              fieldLabel: 'Phone 2',
              name: 'ttPhone2',
              reference: 'ttPhone2',
              maxLength: 10,
              minLength: 10
            },
            {
              fieldLabel: 'Phone 3',
              name: 'ttPhone3',
              reference: 'ttPhone3',
              maxLength: 10
            },
            {
              fieldLabel: 'Cell',
              name: 'ttPhoneCell',
              reference: 'ttPhoneCell',
              maxLength: 10,
              minLength: 10
            },
            {
              fieldLabel: 'Fax',
              name: 'ttPhoneFax',
              reference: 'ttPhoneFax',
              selectOnFocus: true,
              maxLength: 10,
              minLength: 10
            },
            {
              fieldLabel: 'Email',
              name: 'formattedEmailAddress',
              reference: 'formattedEmailAddress',
              vtype: 'email'
            }
          ]
        }
      ]
    }
  ]
});