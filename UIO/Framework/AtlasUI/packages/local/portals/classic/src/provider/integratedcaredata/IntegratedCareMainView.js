/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.view.provider.integratedcaredata.IntegratedCareMainView', {
  extend: 'Ext.panel.Panel',
  title: 'ICD',
  xtype: 'integratedcaremain',

  items: [{
    xtype: 'container',
    layout: 'hbox',
    items: [
            /* include child components here */
      {
        xtype: 'icbrtransactions',
        flex: 1
      },
      {
        xtype: 'integratedcaredatatabs',
        flex: 3
      }
    ]
  }]
});