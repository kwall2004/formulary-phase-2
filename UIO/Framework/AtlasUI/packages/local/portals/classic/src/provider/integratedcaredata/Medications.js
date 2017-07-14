/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.Medications', {
  extend: 'Ext.panel.Panel',
  xtype: 'medications',
  title: 'Medications',

  items: [
    {
      xtype: 'gridpanel',
      cls: 'card-panel',
      height: 300,
      scrollable: true,
      maxHeight: 600,
      minHeight: 300,
      title: 'Medications',

      bind: {
        store: '{MedicationStore}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'medicationName',
          text: 'Medication Name'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'medicationInfoSource',
          text: 'Medication Source'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'medicationInfoSourceText',
          text: 'Medication Info'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'assessmentOrigination',
          text: 'Assessment Origin'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'assessmentOriginationText',
          text: 'Assessment Info'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'medForm',
          text: 'Form'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'instructions',
          text: 'Instructions'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'startDate',
          text: 'Medication Start Date'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'dosage',
          text: 'Dosage'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'frequency',
          text: 'Frequency'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'reason',
          text: 'Reason'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'diagType',
          text: 'Diag Type'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'route',
          text: 'Route'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'prescribed',
          text: 'Prescribed?'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'overTheCounterMed',
          text: 'Over the Counter Medications?'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'herbalSupplements',
          text: 'Herbal Supplements?'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'prescribingProviderNPI',
          text: 'Prescriber NPI'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'diagCode',
          text: 'Diagnosis Code'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'NDC',
          text: 'NDC'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'quantity',
          text: 'Quantity?'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'fillDate',
          text: 'Fill Date?'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'daysSupplied',
          text: 'Days Supplied?'
        }
      ],

      bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        emptyMsg: 'No Medication to display.'
      }
    }
  ]
});