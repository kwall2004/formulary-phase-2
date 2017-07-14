/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.IntegratedCareDataTabs', {
  extend: 'Ext.tab.Panel',
  xtype: 'integratedcaredatatabs',
  controller: 'integratedcaredatatabscontroller',
  viewModel: 'integratedcaredatatabsmodel',

  activeTab: 0,
  items: [
            /* include child components here */
    {
      xtype: 'patientinformation'
    },
    {
      xtype: 'freedomofchoice'
    },
    {
      xtype: 'nursingfacility'
    },
    {
      xtype: 'medications'
    },
    {
      xtype: 'socialhistory'
    },
    {
      xtype: 'levelii'
    },
    {
      xtype: 'leveliassessment'
    },
    {
      xtype: 'initialscreening'
    },
    {
      xtype: 'individualicplan'
    },
    {
      xtype: 'careteam'
    },
    {
      xtype: 'integratedconditions'
    },
    {
      xtype: 'continuityofcare'
    }
  ]
});