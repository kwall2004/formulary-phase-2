/**
 * Created by agupta on 11/30/2016.
 */

Ext.define('Atlas.admin.view.MonitorWindow', {
    xtype: 'admin-monitorwindow',

    extend: 'Ext.window.Window',
    title: 'Get Monitor',
    iconCls: 'icon-contactlog,8',
    viewModel: 'monitorwindowviewmodel',
    controller: 'monitorwindowcontroller',
    width: 800,
    height: 500,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'grid',
            itemId : 'grdMonitor',
            title : 'Monitors',
            flex: 1,
            columns: [
                {text: 'Monitor ID', dataIndex: 'MonitorID'},
                {text: 'ProgramName', dataIndex: 'ProgramName', width : 200},
                {text: 'Check Interval Seconds', dataIndex: 'CheckIntervalSeconds', width : 120},
                {text: 'Parameters', dataIndex: 'Parameters', width : 150},
                {
                    text: 'Last Check',
                    dataIndex: 'LastCheck',
                    xtype:'datecolumn',
                    renderer : function(val){
                        var strDate = '',
                            arrDt = val.split('T'),
                            arrDate = arrDt[0].split('-');
                        if(arrDt.length == 2 && arrDate.length == 3){
                            strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0];
                        }
                        return strDate + ' ' + (arrDt.length == 2 ? arrDt[1].split('.')[0] : '');
                    }
                },
                {text: 'File Pattern', dataIndex: 'FilePattern'},
                {text: 'Description', dataIndex: 'Description'},
                {text: 'Temp Directory', dataIndex: 'TempDirectory'},
                {text: 'Archive Directory', dataIndex: 'ArchiveDirectory'},
                {text: 'Directory Name', dataIndex: 'DirectoryName'},
                {text: 'Active', dataIndex: 'Active',
                    renderer: function(val){
                        if(val){
                            return 'Yes';
                        }
                        else{
                            return 'No';
                        }
                    }
                },
                {text: 'Min File Age', dataIndex: 'MinFileAge'},
                {text: 'Submit By User Name', dataIndex: 'SubmitByUserName'}

            ],
            listeners: {
                itemclick: 'grdMonitor_ItemClick'
            },
            bind: '{storeMonitorList}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{storeMonitorList}',
                    displayInfo: true,
                    dock: 'bottom'
                }
            ]
        }
    ]
});