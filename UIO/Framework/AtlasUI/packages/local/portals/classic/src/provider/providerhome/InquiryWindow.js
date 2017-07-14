// k3279 - Kevin Tabasan - 11/22/2016

Ext.define('Atlas.portals.view.provider.providerhome.InquiryWindow', {
  extend: 'Ext.window.Window',
  xtype: 'provider-homeinquirywindow',
  viewModel: 'homeinquirywindow',
  controller: 'homeinquirywindow',
  bind: {
    title: 'Eligibility Inquiry - MDCH - Run As Of: {currentDateTime}'
  },
  modal: true,
  width: 800,

  items: [{
    xtype: 'panel',
    cls: 'card-panel',
    title: 'Member Information',
    layout: 'hbox',
    collapsible: true,

    defaults: {
      flex: 1
    },

    items: [{
      xtype: 'container',

      defaults: {
        xtype: 'displayfield'
      },

      items: [{
        fieldLabel: 'Member Id',
        bind: '{memberData.memberID}'
      }, {
        fieldLabel: 'Name',
        bind: '{memberData.memberName}'
      }, {
        fieldLabel: 'Birthdate',
        bind: '{memberData.birthDate}'
      }, {
        fieldLabel: 'Gender',
        bind: '{memberData.gender}'
      }, {
        fieldLabel: 'Coordination Program',
        bind: '{memberData.CoCProgram}'
      }]
    }, {
      xtype: 'container',

      defaults: {
        xtype: 'displayfield'
      },

      items: [{
        fieldLabel: 'County',
        bind: '{memberData.county}'
      }, {
        fieldLabel: 'Case Number',
        bind: '{memberData.caseNumber}'
      }, {
        fieldLabel: 'Worker Load',
        bind: '{memberData.WorkerLoad}'
      }, {
        fieldLabel: 'Redetermination',
        bind: '{memberData.redetDate}'
      }, {
        fieldLabel: 'Program Code',
        bind: '{memberData.programcode}'
      }]
    }]
  }, {
    xtype: 'grid',
    height: 200,
    cls: 'card-panel',
    title: 'Medicaid',
    forceFit: true,
    collapsible: true,
    emptyText: 'No Data Available',
    bind: '{medicaidStore}',

    columns: [{
      text: 'Start Date',
      dataIndex: 'startDate'
    }, {
      text: 'End Date',
      dataIndex: 'endDate'
    }, {
      text: 'Coverage',
      dataIndex: 'covText',
      renderer: function (value) {
        var medicaidArray = value.split('|'),
          medicaidData = '',
          i = 0;

        for (i = 0; i < medicaidArray.length; i++) {
          if ('' === medicaidArray[i]) {
            medicaidData += medicaidArray[i];
          } else {
            medicaidData = medicaidData + medicaidArray[i] + '<br>';
          }
        }

        return medicaidData;
      }
    }, {
      text: 'Status',
      dataIndex: 'covStatus'
    }, {
      text: 'Provider/HMO',
      dataIndex: 'provInfo',
      renderer: function (value) {
        var providerArray = value.split('|'),
          providerData = '',
          i = 0;

        for (i = 0; i < providerArray.length; i++) {
          if ('' === providerArray[i]) {
            providerData += providerArray[i];
          } else {
            providerData = providerData + providerArray[i] + '<br>';
          }
        }

        return providerData;
      }
    }]
  }, {
    xtype: 'grid',
    height: 200,
    cls: 'card-panel',
    title: 'HEDIS',
    forceFit: true,
    collapsible: true,
    emptyText: 'No Data Available',
    bind: '{hedisStore}',

    columns: [{
      text: ' Measure',
      dataIndex: 'hedisMeasure'
    }, {
      text: 'Sub Description',
      dataIndex: 'hedisDesc'
    }, {
      text: 'Last Seen'
    }]
  }, {
    xtype: 'grid',
    height: 200,
    cls: 'card-panel',
    title: 'Service Counts',
    forceFit: true,
    collapsible: true,
    emptyText: 'No Data Available',
    bind: '{serviceCountsStore}',

    columns: [{
      text: 'Visit Type',
      dataIndex: 'tt_AreaName'
    }, {
      text: 'Benefit',
      dataIndex: 'tt_Benefit'
    }, {
      text: 'Count',
      dataIndex: 'tt_Count'
    }, {
      text: 'Available',
      dataIndex: 'tt_Available'
    }, {
      text: 'Next Benefit Date',
      dataIndex: 'tt_u21Benefit'
    }]
  }],

  bbar: ['->', {
    text: 'OK',
    handler: 'onOKClick'
  }, {
    text: 'Print',
    handler: 'onPrintClick'
  }],

  initComponent: function () {
    var me = this;

    me.getViewModel().data.memberData = me.itemConfig.memberData;
    me.getViewModel().data.metaData = me.itemConfig.metaData;
    me.getViewModel().data.controlNum = me.itemConfig.controlNum;
    me.callParent();
  }
});