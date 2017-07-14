
Ext.define('Atlas.portals.view.rxmember.DrugToDrugInteractionPopUp', {
    extend: 'Ext.window.Window',
    xtype: 'drugsearchdtdpopup',
    viewModel: 'drugsearchdtdpopup',
    controller: 'drugsearchdtdpopup',
    width: '60%',
    region: 'center',
    modal: true,
    scrollable: true,
    bind: {
        title: '{dtdPopUpTitle}'
    },
    beforeclose: function () {
        Ext.getBody().unmask();
    },
    layout: {
        type: 'fit',
        padding: '5 10 10 5'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'center',
                type: 'hbox'
            },
            items: [{
                xtype: 'button',
                text: 'OK',
                width: '40px',
                itemId: 'btnCancel',
                listeners: {
                    click: function (btn) {
                        btn.up('window').destroy();
                    }
                }
            }]
        }],

        items:[{
                xtype: 'panel',
                reference: 'dtdPanel',
                layout: {
                     type: 'hbox',
                     padding: '50 20 50 20'
                },
                   defaults: {
                   flex: 1
                },
                items: [{
                   xtype: 'container',
                   layout: {
                      type: 'hbox',
                      align: 'middle',
                      pack: 'middle'
                   },
                   items: [{
                      xtype: 'textarea',
                      align: 'middle',
                      pack: 'middle',
                      width: '100%',
                      height: '75px',
                      reference: 'dtdPanelMsg',
                      padding: '5 5 5 5',
                      bind: {
                          value: '{dtdNotFoundMsg}'
                      }
                   }]
               }]
        },{

            xtype: 'grid',
            reference: 'dtdGrid',

            layout: {
               type: 'hbox',
               align: 'stretch'
            },
            bind: '{dtdinteractions}',

            viewConfig: {
                deferEmptyText: false,
                emptyText: 'No Drug To Drug Interaction(s) found.'
            },

            columns: {
                defaults: {
                    menuDisabled: true,
                    sortable: false
                },
                /*{
                 text: '#',
                 dataIndex: 'dtdId',
                 flex: 1
                 },*/
                items: [{
                    text: 'Medication',
                    dataIndex: 'mbrMedication',
                    sortable: true,
                    flex: 4
                }/*,{
                    text: 'NDC',
                    dataIndex: 'mbrNDC',
                    flex: 2
                }*/,{
                    text: 'Level',
                    dataIndex: 'sLevelInd',
                    sortable: true,
                    align: 'center',
                    flex: 1,
                    renderer: function (value, meta, record, row, col, store, gridView) {
                           if (record.data.sLevelInd <= 2) {
                              //meta.style = "background-color:" + "#f44336" + "; color: #FFFFFF; font-weight: bold";  // RED
                               meta.innerCls = "x-grid-dtd-sLevelInd-severe";
                           }
                           else {
                                  if (record.data.sLevelInd <= 4) {
                                      //meta.style = "background-color:" + "#ff9800" + "; color: #FFFFFF; font-weight: bold";  // ORANGE
                                      meta.innerCls = "x-grid-dtd-sLevelInd-moderate";
                                  }
                                  else {
                                        if (record.data.sLevelInd <= 6) {
                                            //meta.style = "background-color:" + "#ffeb3b" + "; color: #FFFFFF; font-weight: bold"; // LIME
                                            meta.innerCls = "x-grid-dtd-sLevelInd-minimal";
                                        }
                                  }
                            }

                            return value;
                     }
                 },{
                     text: 'Status',
                     dataIndex: 'sLevelStatus',
                     sortable: true,
                     flex: 3,
                     renderer: function (value, meta, record) {

                            if (record.data.sLevelInd <= 2) {
                               //meta.style = "color:" + "#f44336" + ";";  // RED
                               meta.innerCls = "x-grid-dtd-severe";
                            }
                            else {
                                 if (record.data.sLevelInd <= 4) {
                                     //meta.style = "color:" + "#ff9800" + ";";  // ORANGE
                                     meta.innerCls = "x-grid-dtd-moderate";
                                 }
                                 else {
                                       if (record.data.sLevelInd <= 6) {
                                           //meta.style = "color:" + "#ffeb3b" + ";"; // LIME
                                           meta.innerCls = "x-grid-dtd-minimal";
                                       }
                                 }
                            }
                            return value;

                     }
                },{
                    xtype: 'actioncolumn',
                    text: 'Patient Action',
                    align: 'center',
                    flex: 1,
                    items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-info-circle',
                        text: 'View',
                        tooltip: 'Patient Info Detail',
                        handler: function(grid, rowIndex) {
                            var gridPanel = grid.up('panel'),
                                curWindow = gridPanel.up('window'),
                                vc = curWindow.controller,
                                vm = curWindow.viewModel;
                            vc.onViewMoreDetail(grid, rowIndex, 'sLevelStatusDesc');
                        }
                    }]
                },{
                    xtype: 'actioncolumn',
                    text: 'Patient Management',
                    align: 'center',
                    flex: 1,
                    items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-info-circle',
                        text: 'View',
                        tooltip: 'Patient Management Detail',
                        handler: function(grid, rowIndex) {
                            var gridPanel = grid.up('panel'),
                                curWindow = gridPanel.up('window'),
                                vc = curWindow.controller,
                                vm = curWindow.viewModel;
                            vc.onViewMoreDetail(grid, rowIndex, 'pManagement');
                        }
                    }]
                },{
                    xtype: 'actioncolumn',
                    text: 'MOA',
                    align: 'center',
                    flex: 1,
                    items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-info-circle',
                        text: 'View',
                        tooltip: 'Mechanism Of Action',
                        handler: function(grid, rowIndex) {
                            var gridPanel = grid.up('panel'),
                                curWindow = gridPanel.up('window'),
                                vc = curWindow.controller,
                                vm = curWindow.viewModel;
                            vc.onViewMoreDetail(grid, rowIndex, 'moAction');
                        }
                    }]
                },{
                    xtype: 'actioncolumn',
                    text: 'Clinical Effects',
                    align: 'center',
                    flex: 1,
                    items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-info-circle',
                        text: 'View',
                        tooltip: 'Clinical Effects Detail',
                        handler: function(grid, rowIndex) {
                            var gridPanel = grid.up('panel'),
                                curWindow = gridPanel.up('window'),
                                vc = curWindow.controller,
                                vm = curWindow.viewModel;
                            vc.onViewMoreDetail(grid, rowIndex, 'cEffects');
                        }
                    }]
                }]
            }
    }],

    initComponent: function () {
        var me = this;

        if (me.itemConfig.srchNDC) {
            me.getViewModel().data.srchNDC = me.itemConfig.srchNDC;
        }
        if (me.itemConfig.srchMedName) {
            me.getViewModel().data.srchMedName = me.itemConfig.srchMedName;
        }

        me.callParent();
    }
});