/**
 * Created by akumar on 11/30/2016.
 */
Ext.define('Atlas.common.view.sharedviews.AuditTrailController',
    {
        extend: 'Ext.app.ViewController',
        alias: 'controller.AuditTrailController',
        tableName: '',
        parentSystemId: 0,

        init: function () {
            var me = this,
                view = this.getView(),
                vm = this.getViewModel(),
                auditMasterGrid = view.down('#auditMasterGrid'),
                AuditMaster = vm.getStore('AuditMaster'),
                winTitle = view.auditConfig["title"];

            this.tableName = view.auditConfig["tableName"];
            this.parentSystemId = view.auditConfig["parentSystemId"];

            view.title = winTitle;

            if (this.parentSystemId != '') {
                AuditMaster.getProxy().setExtraParam('pRowNum', '0');
                AuditMaster.getProxy().setExtraParam('pBatchSize', '0');
                AuditMaster.getProxy().setExtraParam('pWhere', " AM1.TableName = '" + this.tableName + "' AND AM1.parentSystemID = " + this.parentSystemId);
                AuditMaster.getProxy().setExtraParam('pSort', '');
                AuditMaster.getProxy().setExtraParam('pAuditGUID', '');

                AuditMaster.load(
                    {
                        callback: function (records, opts, success) {
                            if (success) {
                                if (records.length != 0)
                                {
                                    auditMasterGrid.getSelectionModel().select(0);
                                    me.loadAuditChangeGrid(records[0].data.systemId, records[0].data.AuditGUID);
                                }
                            }
                        }
                    });
            }
        },

        loadAuditChangeGrid: function (masterSystemId, auditGUID) {
            var vm = this.getViewModel(),
                AuditChange = vm.getStore('AuditChange');

            AuditChange.getProxy().setExtraParam('pRowNum', '0');
            AuditChange.getProxy().setExtraParam('pBatchSize', '0');
            AuditChange.getProxy().setExtraParam('pWhere', " AC1.TableName = '" + this.tableName + "' AND AC1.parentSystemID = " + masterSystemId);
            AuditChange.getProxy().setExtraParam('pSort', '');
            AuditChange.getProxy().setExtraParam('pAuditGUID', auditGUID);

            AuditChange.load();
        },
       
        refreshAuditChange: function(dv, record, item, index, e){
            this.loadAuditChangeGrid(record.data.systemId, record.data.AuditGUID);
        }

    });