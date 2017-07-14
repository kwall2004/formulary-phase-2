/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Member Demographics
 * Description: Gives users a place to view Member Info
 */
Ext.define('Atlas.portals.view.provider.MemberDemographics', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsMemberDemographics',
  title: 'Demographics',
  controller: 'memberdemographicscontroller',
  layout: 'hbox',

  items: [{
    xtype: 'panel',
    cls: 'card-panel',
    title: 'Member Information',
    flex: 1,
    height: 300,

    defaults: {
      xtype: 'displayfield'
    },

    items: [{
      reference: 'MemberAddress'
    }, {
      reference: 'Membercitystatezip'
    }, {
      reference: 'MemberHomePhoneNumber',
      hidden: true
    }, {
      reference: 'MemberWorkPhoneNumber',
      hidden: true
    }, {
      reference: 'MemberEmail',
      hidden: true
    }, {
      reference: 'MemberCellPhoneNumber',
      hidden: true
    }]
  }, {
    xtype: 'panel',
    cls: 'card-panel',
    flex: 1,
    height: 300,
    title: 'Guardian / Responsible Party Information',

    defaults: {
      xtype: 'displayfield'
    },

    items: [{
      reference: 'GuardianName'
    }, {
      reference: 'GuardianAddress'
    }, {
      reference: 'Guardiancitystatezip'
    }, {
      reference: 'GuardianHomePhoneNumber',
      hidden: true
    }, {
      reference: 'GuardianWorkPhoneNumber',
      hidden: true
    }]
  }],

  bbar: [{
    text: 'Print Member Report',
    handler: 'onPrintClick'
  }, {
    text: 'Notify Health Plan',
    handler: 'onNotifyClick'
  }]
});