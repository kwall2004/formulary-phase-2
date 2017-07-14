 /*
  * Last Developer: Srujith Cheruku
  * Date: 11-8-2016
  * Previous Developers: []
  * Origin: Provider - Member Immunization
  * Description: Gives users a place to view Member Immunization Info
 */
Ext.define('Atlas.portals.view.provider.MemberImmunization', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsMemberImmunization',
  title: 'Immunizations',
  viewModel: 'memberimmunizationsmodel',
  controller: 'memberimmunizationcontroller',
  scrollable: true,

  items: [{
    xtype: 'grid',
    title: 'Immunizations',
    layout: 'fit',
    scrollable: true,
    height: 300,
    cls: 'card-panel',

    columns: [{
      text: 'Service Date',
      dataIndex: 'serviceDate',
      renderer: function (value) {
        return Ext.util.Format.date(value, 'm/d/Y');
      }
    }, {
      text: 'Procedure',
      dataIndex: 'cpt4Cd'
    }, {
      text: 'Description',
      dataIndex: 'procDescription',
      flex: 1
    }],

    bind: {
      store: '{memberImmunizationStore}'
    }
  }, {
    xtype: 'grid',
    title: 'Blood Lead Tests',
    layout: 'fit',
    scrollable: true,
    height: 300,
    cls: 'card-panel',

    columns: [{
      text: 'Service Date',
      dataIndex: 'serviceDate',
      renderer: function (value) {
        return Ext.util.Format.date(value, 'm/d/Y');
      }
    }, {
      text: 'Create Date',
      dataIndex: 'createDate',
      renderer: function (value) {
        return Ext.util.Format.date(value, 'm/d/Y');
      }
    }, {
      text: 'Create Time',
      dataIndex: 'createTime',
      renderer: function (value) {
        var hours = Math.floor(value / 3600),
          minutes = Math.floor((value - (hours * 3600)) / 60),
          seconds = value - (hours * 3600) - (minutes * 60),
          ampm = hours >= 12 ? 'pm' : 'am',
          strTime = null;

        hours %= 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

        return strTime;
      }
    }, {
      text: 'Result',
      dataIndex: 'pbResult',
      flex: 1
    }],
    
    bind: {
      store: '{memberBloodLeadStore}'
    }
  }, {
    xtype: 'displayfield',
    hidden: true,
    reference: 'errorMessageRef'
  }]
});