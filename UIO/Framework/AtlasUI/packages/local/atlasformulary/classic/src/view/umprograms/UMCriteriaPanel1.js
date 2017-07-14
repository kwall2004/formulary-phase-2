Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPanel1', {
  extend: 'Ext.form.Panel',
  xtype: 'umprograms-umcriteriapanel1',
  margin: '20 0 0 20',

  layout: 'column',

  items: [
    {
      xtype: 'container',
      columnWidth: 0.33,
      margin: '0 0 0 0',
      layout: 'anchor',
      flex: 1,
      defaults: {
        xtype: 'checkbox',
        padding: '10 0 10 0',
        labelWidth: 150
      },
      items: [
        {
          fieldLabel: 'Override generic check',
          name: 'IsOverrideGenericCheck',
          itemId: 'cbxOverrideGenChk',
          bind: '{umcriteriarec.IsOverrideGenericCheck}'
        },
        {
          fieldLabel: 'Specialty Drug',
          name: 'IsSpeciality',
          itemId: 'IsSpeciality',
          bind: '{umcriteriarec.IsSpeciality}'
        },
        {
          fieldLabel: 'Restrict to package size',
          name: 'IsRestrictToPkgSize',
          itemId: 'IsRestrictToPkgSize',
          bind: '{umcriteriarec.IsRestrictToPkgSize}'
        }
      ]
    },
    {
      xtype: 'container',
      columnWidth: 0.33,
      margin: '0 0 0 0',
      layout: 'anchor',
      flex: 1,
      defaults: {
        xtype: 'checkbox',
        padding: '10 0 10 0',
        labelWidth: 150
      },
      items: [
        {
          fieldLabel: 'Medicaid Carve Out',
          name: 'IsMedicaidCarveOut',
          itemId: 'IsMedicaidCarveOut',
          bind: '{umcriteriarec.IsMedicaidCarveOut}'
        },
        {
          fieldLabel: 'Medicaid Fee Screen',
          name: 'IsMedicaidFeeScreen',
          itemId: 'IsMedicaidFeeScreen',
          bind: '{umcriteriarec.IsMedicaidFeeScreen}'
        }
      ]
    },
    {
      xtype: 'container',
      columnWidth: 0.33,
      margin: '0 0 0 0',
      layout: 'anchor',
      flex: 1,
      defaults: {
        xtype: 'checkbox',
        padding: '10 0 10 0',
        labelWidth: 150
      },
      items: [
        {
          fieldLabel: 'Maintenance',
          name: 'IsMaintenanceDrug',
          itemId: 'IsMaintenanceDrug',
          bind: '{umcriteriarec.IsMaintenanceDrug}'
        },
        {
          xtype: 'numberfield',
          fieldLabel: 'Extended Days Supply',
          name: 'ExtendedDaysSupply',
          itemId: 'ExtendedDaysSupply',
          bind: '{umcriteriarec.ExtendedDaysSupply}',
          keyNavEnabled: false,
          mouseWheelEnabled: false,
          hideTrigger: true,
          allowBlank: true,
          maxLength: 3,
          minValue: 0,
          maxValue: 999,
          enforceMaxLength: true
        }
      ]
    }
  ]
});