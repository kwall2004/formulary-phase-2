Ext.define('Atlas.atlasformulary.view.formularyheader.SummaryConfig', {
  extend: 'Ext.window.Window',
  closeAction: 'method-hide',
  xtype: 'formularyheader-summaryconfig',
  title: 'Formulary Summary Configuration',
  height: 455,
  width: 955,
  region: 'center',
  scrollable: true,

  requires: [
    'Ext.ux.form.ItemSelector'
  ],

  viewModel: {
    stores: {
      summaryconfig: {
        model: 'Atlas.atlasformulary.model.SummaryConfig',
        listeners: {
          beforeload: 'onStoreBeforeLoad',
          load: 'onStoreLoad'
        }
      },
      summaryconfigcombo: {
        type: 'summaryconfig',
        autoLoad: true,
        listeners: {
          //beforeload: 'onStoreBeforeLoad',
          load: 'onConfigComboStoreLoad'
        }
      }
    },
    data: {
      hasconfig: false,
      activated: false,
      initialized: false,
      selectedSummaryConfig: null
    }
  },
  listeners: {
    afterlayout: function (view) {
      if (this.getViewModel().get('pendingCalls').length > 0) {
        Ext.getBody().mask('Loading...');
      }
    }
  },

  controller: 'formularyheader-summaryconfigcontroller',

  items: [
    {
      xtype: 'form',
      trackResetOnLoad: true,
      reference: 'summaryConfigForm',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      disabled: true,
      bind: {
        disabled: '{!hasconfig || activated}'
      },

      items: [
        {
          xtype: 'panel',
          layout: 'hbox',

          defaults: {
            labelAlign: 'right',
            queryMode: 'local'
          },

          items: [
            {
              xtype: 'combo',
              reference: 'fileFormatCombo',
              fieldLabel: 'File Format',
              displayField: 'FileFmtName',
              valueField: 'FileFmtSK',
              name: 'FileFmtSK',
              store: {
                autoLoad: true,
                proxy: {
                  type: 'formulary',
                  url: '/summaryconfigfileformat',

                  reader: {
                    type: 'json'
                  }
                }
              },
              listeners: {
                'select': 'onFileFormatSelect'
              }
            },
            {
              xtype: 'combo',
              fieldLabel: 'Language',
              displayField: 'LangName',
              reference: 'languagecombo',
              valueField: 'LangSK',
              name: 'LangSK',
              store: {
                autoLoad: true,
                proxy: {
                  type: 'formulary',
                  url: '/summaryconfiglanguage',

                  reader: {
                    type: 'json'
                  }
                }
              }
            },
            {
              xtype: 'combo',
              fieldLabel: 'Font Size',
              displayField: 'FontSizeName',
              valueField: 'FontSizeSK',
              name: 'FontSizeSK',
              store: {
                autoLoad: true,
                proxy: {
                  type: 'formulary',
                  url: '/summaryconfigfontsize',

                  reader: {
                    type: 'json'
                  }
                }
              }
            }
          ]
        },
        {
          xtype: 'panel',
          layout: 'border',
          height: 300,
          items: [
            {
              xtype: 'panel',
              layout: 'vbox',
              region: 'west',

              items: [
                {
                  xtype: 'label',
                  text: 'Document Sections'
                },
                {
                  xtype: 'panel',
                  layout: 'hbox',
                  items: [
                    {
                      xtype: 'multiselect',
                      reference: 'sectionmultiselect',
                      width: 300,
                      submitValue: false,
                      getSubmitData: function () {
                        return null;
                      },
                      getModelData: function () {
                        return null;
                      },
                      flex: 1,
                      store: {
                        proxy: {
                          type: 'formulary',
                          url: '/summaryconfigsectionselection',

                          reader: {
                            type: 'json'
                          },

                          extraParams: {
                            selected: true
                          }
                        }
                      },
                      displayField: 'SumRptSctnName',
                      valueField: 'SumRptSctnSK',
                      listeners: {
                        boundList: {
                          itemdblclick: 'onSectionItemDblClick'
                        }
                      }
                    },
                    {
                      xtype: 'toolbar',
                      margin: '0 4',
                      padding: 0,
                      layout: {
                        type: 'vbox',
                        pack: 'center'
                      },
                      items: [
                        {
                          xtype: 'button',
                          ui: 'default',
                          tooltip: 'Move Up',
                          ariaLabel: 'Move Up',
                          handler: 'onUpBtnClick',
                          cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                          iconCls: 'fa fa-caret-up x-form-item-label',//Ext.baseCSSPrefix + 'form-itemselector-up',
                          navBtn: true,
                          margin: '4 0 0 0'
                        },
                        {
                          xtype: 'button',
                          ui: 'default',
                          tooltip: 'Remove',
                          ariaLabel: 'Remove',
                          handler: 'onRemoveBtnClick',
                          cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                          iconCls: 'fa fa-trash-o m-red-color',//Ext.baseCSSPrefix + 'form-itemselector-remove',
                          navBtn: true,
                          margin: '4 0 0 0'
                        },
                        {
                          xtype: 'button',
                          ui: 'default',
                          tooltip: 'Move Down',
                          ariaLabel: 'Move Down',
                          handler: 'onDownBtnClick',
                          cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                          iconCls: 'fa fa-caret-down x-form-item-label',//Ext.baseCSSPrefix + 'form-itemselector-down',
                          navBtn: true,
                          margin: '4 0 0 0'
                        }
                      ]
                    }
                  ]
                },
                {
                  xtype: 'panel',
                  layout: 'hbox',

                  items: [
                    {
                      xtype: 'button',
                      text: 'Add Section',
                      handler: 'onAddBtnClick'
                    },
                    {
                      xtype: 'combo',
                      reference: 'sectioncombo',
                      flex: 1,
                      store: {
                        proxy: {
                          type: 'formulary',
                          url: '/summaryconfigsectionselection',

                          reader: {
                            type: 'json'
                          },

                          extraParams: {
                            selected: false
                          }
                        }
                      },
                      displayField: 'SumRptSctnName',
                      valueField: 'SumRptSctnSK'
                    }

                  ]
                },
                {
                  xtype: 'panel',
                  layout: 'hbox',
                  items: [
                    {
                      xtype: 'checkbox',
                      name: 'InclUMInd',
                      uncheckedValue: false,
                      fieldLabel: 'Include UM'
                    },
                    {
                      xtype: 'component',

                      autoEl: {
                        tag: 'a',
                        href: '#'
                      },

                      renderTpl: 'Legend',

                      afterRender: function () {
                        this.addManagedListener(
                            this.getEl(),
                            'click',
                            function (e, el, eOpts) {
                              this.fireEvent('click', this, e, eOpts);
                            },
                            this,
                            {
                              stopEvent: true
                            }
                        );
                      },

                      listeners: {
                        click: 'onClick'
                      }
                    }
                  ]
                }
              ]
            },
            {
              xtype: 'panel',
              region: 'east',
              items: [
                {
                  xtype: 'label',
                  text: 'Tier Information'
                },
                {
                  xtype: 'combo',
                  flex: 1,
                  fieldLabel: 'Display as',
                  name: 'TierDisplSK',
                  store: {
                    autoLoad: true,
                    proxy: {
                      type: 'formulary',
                      url: '/summaryconfigtierdisplay',
                      reader: {
                        type: 'json'
                      }
                    }
                  },
                  displayField: 'TierDisplName',
                  valueField: 'TierDisplSK'
                },
                {
                  xtype: 'grid',
                  viewConfig: {
                    loadMask: false
                  },
                  height: 300,
                  width: 600,
                  reference: 'summaryConfigTierGrid',
                  selType: 'checkboxmodel',
                  plugins: [{
                    ptype: 'rowediting',
                    reference: 'rowediting',
                    clicksToEdit: 2,
                    clicksToMoveEditor: 1,
                    pluginId: 'rowEditing',
                    autoCancel: false
                  }],
                  store: {
                    proxy: {
                      type: 'formulary',
                      url: '/summaryconfigtier',
                      reader: {
                        type: 'json'
                      }
                    }
                  },
                  columns: [
                    {
                      text: 'Tier No.',
                      flex: 1,
                      dataIndex: 'FrmlryTierNbr'
                    },
                    {
                      text: 'Tier Name',
                      flex: 1,
                      dataIndex: 'FrmlryTierName'
                    },
                    {
                      text: 'Description',
                      flex: 1,
                      dataIndex: 'DsplyTierDesc',
                      editor: {
                        xtype: 'textfield'
                      }
                    }
                  ]
                },
                {
                  xtype: 'checkbox',
                  uncheckedValue: false,
                  name: 'InclNotCvrdInd',
                  fieldLabel: 'Include Not Covered'
                }
              ]
            }
          ]
        },
        {
          xtype: 'window',
          closeAction: 'method-hide',
          title: 'Configuration Name',
          modal: true,
          closable: false,
          reference: 'settingNameWindow',
          items: [
            {
              xtype: 'textfield',
              name: 'SumRptCfgName',
              fieldLabel: 'Name'
            }
          ],
          bbar: [
            {
              text: 'Submit',
              handler: 'onSubmitClick'
            },
            {
              text: 'Cancel',
              handler: 'onCancelSaveClick'
            }
          ]
        }
      ]
    },
    {
      xtype: 'formularyheader-fronttextconfig',
      modal: true,
      closable: false
    },
    {
      xtype: 'formularyheader-backtextconfig',
      modal: true,
      closable: false
    },
    {
      xtype: 'formularyheader-headerfooter',
      modal: true,
      closable: false
    },
    {
      xtype: 'formularysummarydruglist',
      modal: true,
      closable: false
    },
    {
      xtype: 'formularysummarypast',
      modal: true,
      closable: false
    },
    {
      xtype: 'window',
      reference: 'legendWindow',
      modal: 'true',
      closeAction: 'method-hide',
      closeable: false,
      items: [
        {
          xtype: 'grid',
          viewConfig: {
            loadMask: false
          },
          height: 300,
          width: 600,
          reference: 'configCoveragePropertyGrid',
          plugins: [{
            ptype: 'rowediting',
            reference: 'rowediting',
            clicksToEdit: 2,
            clicksToMoveEditor: 1,
            pluginId: 'rowEditing',
            autoCancel: false
          }],
          store: {
            proxy: {
              type: 'formulary',
              url: '/SummaryConfigCoverageProperty',

              reader: {
                type: 'json'
              }

            }
          },
          columns: [
            {
              text: 'Coverage Code',
              flex: 1,
              dataIndex: 'Coverage_Code'
            },
            {
              text: 'Display Code',
              flex: 1,
              dataIndex: 'Display_Code',
              editor: {
                xtype: 'textfield'
              }
            },
            {
              text: 'Coverage Description',
              flex: 1,
              dataIndex: 'Coverage_Description'
            },
            {
              text: 'Display Description',
              flex: 1,
              dataIndex: 'Display_Description',
              editor: {
                xtype: 'textfield'
              }
            }
          ]
        }
      ],
      bbar: [
        {
          text: 'Save',
          handler: 'onSaveLegendClick'
        },
        {
          text: 'Close',
          handler: 'onCloseLegendClick'
        }
      ]
    }
  ],
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',

      defaults: {
        xtype: 'displayfield'
      },

      items: [
        {
          reference: 'formularyNameDisplay',
          fieldLabel: 'Formulary Name'
        },
        {
          reference: 'formularyIDDisplay',
          fieldLabel: 'Formulary ID'
        },
        {
          reference: 'formularyVersionDisplay',
          fieldLabel: 'Version'
        },
        {
          reference: 'formularyStatusDisplay',
          fieldLabel: 'Status'
        }
      ]
    }
  ],
  tbar: [
    {
      xtype: 'displayfield',
      reference: 'summaryConfigNameDisplay'
    },
    '->',
    {
      xtype: 'combobox',
      reference: 'summaryConfigCombo',
      fieldLabel: 'Summary Config',
      labelWidth: 200,
      labelAlign: 'right',
      name: 'SumRptCfgSK',
      displayField: 'SumRptCfgName',
      valueField: 'SumRptCfgSK',
      forceSelection: true,
      listeners: {
        select: 'onSummaryConfigSelect'
      },
      disabled: true,
      bind: {
        store: '{summaryconfigcombo}',
        disabled: '{activated || !initialized}'
      },

      queryMode: 'local',
      allowBlank: true
    },
    {
      xtype: 'button',
      text: 'Change',
      handler: 'onChangeClick',
      disabled: true,
      bind: {
        disabled: '{hasconfig || activated || !initialized}'
      }
    }
  ],
  bbar: [
    '->',
    {
      text: 'Apply',
      handler: 'onApplyClick',
      disabled: true,
      bind: {
        disabled: '{!hasconfig || activated}'
      }
    },
    {
      text: 'Save',
      handler: 'onSaveClick',
      disabled: true,
      bind: {
        disabled: '{!hasconfig || activated}'
      }
    },
    {
      text: 'Cancel',
      handler: 'onCancelClick',
      bind: {
        disabled: '{!initialized}'
      }
    },
    {
      text: 'Clear',
      handler: 'onClearClick',
      disabled: true,
      bind: {
        disabled: '{!hasconfig || activated}'
      }
    },
    {
      text: 'Preview',
      handler: 'onPreviewClick',
      disabled: true,
      bind: {
        disabled: '{!hasconfig || activated}'
      }
    },
    {
      text: 'Activate',
      handler: 'onActivateClick',
      disabled: true,
      bind: {
        disabled: '{!hasconfig || activated}'
      }
    }
  ]
});
