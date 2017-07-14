/**
 * Created by s6685 on 12/7/2016.
 */

Ext.define('Atlas.admin.view.AuditHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AuditHistoryController',
    extraParams: {
        'PACriteria': ''
    },

    grdHistoryRowClick:function(grid, selctedRow, e){
        var view = this.getView();
        var vm = this.getViewModel();
        var pTableName=view.down('#cbxTables').getValue();
        var SystemID=selctedRow.data.SystemID;
        var win = Ext.create({
            xtype: 'sharedviews-AuditTrail',
            auditConfig: {
                'tableName': pTableName,
                'parentSystemId':SystemID,
                'title':'Audit History'
            },
            autoShow: false
        });
        view.add(win).show();

    },
    SearchOnClick:function(component) {

        var view = this.getView();
        var vm = this.getViewModel();
        if(!view.down('#frmSet').isValid()){
            return;
        }

        var grid = view.down('#grdAuditHistory');
        // grid.getStore().removeAll();
        // grid.getStore().sync();
        grid.reconfigure([]);


        var pTableName=view.down('#cbxTables').getValue();
        var txtWhere=view.down('#txtWhere').getValue();
        var cbxTableColumns=view.down('#msColumns').getValue();
        var columnsList='';
        for(var i=0; i<cbxTableColumns.length; i++ ) {
            if(columnsList !='') {
                columnsList += ',' + cbxTableColumns[i];
            }
            else {
                columnsList = cbxTableColumns[i];
            }
       }


        var modelColumnStore = vm.getStore('AuditHistoryStore');
        modelColumnStore.getProxy().setExtraParam('pTableName',pTableName);
        modelColumnStore.getProxy().setExtraParam('pFieldList',columnsList);
        modelColumnStore.getProxy().setExtraParam('pWhere',txtWhere);
        modelColumnStore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success){
                var objResponse = Ext.decode(operation.getResponse().responseText);
                if (objResponse.message[0].code != 0)
                {
                    Ext.Msg.alert('Error', objResponse.message[0].message);
                    return;
                }
                if(objResponse.message[0].message == ''){
                    view.down('#lblMessage').setValue('');
                }
                else{
                    view.down('#lblMessage').setValue(objResponse.message[0].message);
                }
                var dataListArray=[];
                var dataList=objResponse.data;
                var values = [],
                    ColumnNames = objResponse.metadata.pReturnFieldList.split(',');
                var TotalRows=dataList.length/ColumnNames.length;

                for (var ln = 0; ln < TotalRows; ln++) {
                    var items='{';
                    for(var i in dataList) {
                        if(dataList[i].RecordId==ln+1){items += '"' + dataList[i].FieldName + '":"' + dataList[i].FieldValue + '",';
                        }
                    }
                    if(items.lastIndexOf(",")==items.length-1){
                        items=items.substring(0, items.lastIndexOf(","));
                    }
                    items +='}';
                    dataListArray.push(JSON.parse(items));
                }

                var storeStatus = vm.getStore('AuditHistoryStore');
                storeStatus.loadRawData(dataListArray);

                for (var i = ColumnNames.length - 1; i >= 0; i--) {
//                for(var i in ColumnNames) {
                   var column = Ext.create('Ext.grid.column.Column', {
                       text: ColumnNames[i],
                       header: ColumnNames[i],
                       flex : 1,
                       dataIndex: ColumnNames[i]
                   });
                   grid.headerCt.insert(grid.columns.length, column);
               }

            }
       });

    },
    OnChangeTable:function(component) {
        var view = this.getView();
        var vm = this.getViewModel();
        var pTableName=view.down('#cbxTables').getValue();
        var modelColumnStore = vm.getStore('ColumnStore');
        modelColumnStore.getProxy().setExtraParam('pTableName',pTableName);
        modelColumnStore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success){
                var objResponse = Ext.decode(operation.getResponse().responseText);
                var storeStatus = vm.getStore('ColumnStore');
                storeStatus.loadRawData(objResponse.metadata.ttFieldsDetail.ttFieldsDetail);


            }
        });

    }



});

