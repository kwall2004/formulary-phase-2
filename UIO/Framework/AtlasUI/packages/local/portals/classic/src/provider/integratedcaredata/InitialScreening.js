/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.InitialScreening', {
  extend: 'Ext.panel.Panel',
  xtype: 'initialscreening',
  title: 'Initial Screening',

  items: [{
    xtype: 'container',
    layout: 'hbox',
    items: [
      {
        xtype: 'form',
        cls: 'card-panel',
        reference: 'initialscreeningform',
        flex: 1,
        width: '100%',
        items: [
          {
            xtype: 'container',
            scrollable: true,
            flex: 1,
            layout: {
              type: 'vbox'
            },
            defaults: {
              xtype: 'textfield',
              labelWidth: 600,
              labelPad: 15,
              labelSeparator: ' ',
              margin: '20px 0 10px 0',
              readOnly: true
            },
            items: [
              {
                name: 'inHospitalLast90Days',
                reference: 'inHospitalLast90Days',
                fieldLabel: '1. Spent the night in a hospital in the last 90 days prior to enrollment'
              },
              {
                name: 'inEmergencyLast90Days',
                reference: 'inEmergencyLast90Days',
                fieldLabel: '2. Have you used the ER within the last 90 (days) prior to enrollment?'
              },
              {
                name: 'physOccupTherapy',
                reference: 'physOccupTherapy',
                fieldLabel: '3. Physical/Occupational Therapy?'
              },
              {
                name: 'useOxygenAtHome',
                reference: 'useOxygenAtHome',
                fieldLabel: '4. Do you use Oxygen at home?'
              },
              {
                name: 'dialysis',
                reference: 'dialysis',
                fieldLabel: '5. Dialysis?'
              },
              {
                name: 'homeHealthServices',
                reference: 'homeHealthServices',
                fieldLabel: '6. Home Health Services (Nurse, Therapist, Nurse Aid)?'
              },
              {
                name: 'currentLivingNursingHome',
                reference: 'currentLivingNursingHome',
                fieldLabel: '7. Currently Living in a Nursing Home?'
              },
              {
                name: 'assistanceWPerService',
                reference: 'assistanceWPerService',
                fieldLabel: '8. Assistance with personal services (Bathing, Dressing, Making meals, Other)?'
              },
              {
                name: 'hadAnyProblems',
                reference: 'hadAnyProblems',
                fieldLabel: '9. Have you had any problems?'
              },
              {
                name: 'DATETIME',
                reference: 'DATETIME',
                fieldLabel: 'Date/Time Stamp'
              }
            ]
          }
        ]
      }
    ]
  }]
});