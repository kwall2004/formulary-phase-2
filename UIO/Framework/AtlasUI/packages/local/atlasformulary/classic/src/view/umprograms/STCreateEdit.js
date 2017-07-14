Ext.define('Atlas.atlasformulary.view.umprograms.STCreateEdit', {
  extend: 'Ext.form.Panel',
  xtype: 'umprograms-stcreateedit',
  controller: 'steptherapyheadercontroller',
  viewModel: 'steptherapyheader',
  bind: {
    title: '{titleMode} Step Therapy Program {stHeader.CvrgPrptyPgmName}'
  },

  scrollable: true,
  layout: 'column',

  items: [
    {
      xtype: 'form',
      itemId: 'steptherapyheader-form',
      flex: 1,
      columnWidth: 1,
      layout: 'column',

      items: [
        {
          xtype: 'container',
          columnWidth: 1,
          bodyPadding: 10,
          margin: 10,

          defaults: {
            labelAlign: 'right'
          },

          items: [
            {
              xtype: 'displayfield',
              fieldLabel: 'Step Therapy ID',
              name: 'FrmlryID',
              bind: '{formularyHeader.FrmlryID}'
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Status',
              name: 'FrmlryVer',
              bind: '{formularyHeader.FrmlryVer}',
              emptyText: 1
            }
          ]
        },
        {
          xtype: 'panel',
          title: 'Step Therapy Header',
          columnWidth: .35,
          bodyPadding: 10,
          margin: '10 0 0 10',
          reference: 'steptherapyheaderpanel',
          layout: {
            type: 'vbox',
            align: 'stretch'
          },

          defaults: {
            labelAlign: 'right',
            labelWidth: 200,
            allowBlank: false
          },

          items: [
            {
              xtype: 'combobox',
              name: 'UserGrpName',
              fieldLabel: 'Tenant',
              displayField: 'UserGrpName',
              valueField: 'UserGrpName',
              queryMode: 'local',
              forceSelection: true,

              bind: {
                store: '{usergroups}',
                value: '{stHeader.UserGrpName}',
                disabled: '{formDisabled}'
              }
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Program Name',
              name: 'CvrgPrptyPgmName',
              bind: {
                disabled: '{formDisabled}',
                value: '{stHeader.CvrgPrptyPgmName}'
              }
            },       
            {
              xtype: 'combobox',
              name: 'dataSource',
              reference: 'datasource',
              itemId: 'dataSource',
              fieldLabel: 'Data Source',
              queryMode: 'local',
              displayField: 'DrugRefDbName',
              valueField: 'DrugRefDbSK',
              forceSelection: true,

              bind: {
                value: '{stHeader.DrugRefDbSK}',
                store: '{drugrefdb}',
                disabled: '{formDisabled}'
              },

              listeners: {
                //select: 'onDataSourceSelect'
              }
            },
            {
              xtype: 'numberfield',
              name: 'StepCnt',
              fieldLabel: 'Number of Steps',
              emptyText: '1',

              bind: {
                value: '{stHeader.StepCnt}',
                disabled: '{formDisabled}'
              },

              minValue: 0,
              maxValue: 2500,
              keyNavEnabled: false,
              mouseWheelEnabled: false,
              hideTrigger: true
            },
            {
              xtype: 'textarea',
              fieldLabel: 'Output Message',
              bind: {
                value: '{stHeader.ClaimsMsgText}',
                disabled: '{formDisabled}'
              },
              width: 50
            }
      
          ]
        },
        
        {
          xtype: 'panel',
          columnWidth: 1,
          cls: 'border-none',
          layout: 'hbox',

          items: [
            {
              xtype: 'formularyheader-ownertree',
              flex: 0.5,
              margin: '10 0 0 10'
            },
            {
              xtype: 'formularyheader-visibilitytree',
              flex: 0.5,
              margin: 10
            }
          ]
        }
      ]
    }
  ],

  buttons: [
    {
      text: 'Clear',
      handler: 'onClearClick',
      bind: {
        disabled: '{formDisabled}'
      }
    },
    {
      text: 'Cancel',
      handler: 'onCancelClick'
    },
    {
      text: 'Save',
      handler: 'onSaveClick',
      bind: {
        disabled: '{formDisabled}'
      }
    },
    {
      text: 'Next',
      handler: 'onNextClick'
    }
  ],
  initComponent: function () {
    var vm = this.getViewModel();
    vm.set('mode', this.mode);
    vm.set('titleMode', this.titleMode);
    vm.set('programSK', this.programSK);
    var sk = parseInt(this.programSK);
    
    if (this.programSK) {
      var store = this.getViewModel().getStore('steptherapyheaders');
      store.getProxy().setExtraParam('coveragePropertyProgramSK', sk);
      store.load({
        callback: function (records, operation, success) {
          if (success) {
            vm.set('stHeader', records[0]);
          }
        }
      }); 
      if (vm.get('mode') === 'view') {
        vm.set('formDisabled', true);
      }
    } else {
      vm.set('stHeader', Ext.create('Atlas.atlasformulary.model.StepTherapyHeader'));
    }
 
    this.callParent();
  }
});
