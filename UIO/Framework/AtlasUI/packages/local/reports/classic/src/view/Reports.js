/**
 *      Author: Dean C. Reed
 *     Created: 10/12/2016
 *      Origin: MERLIN - Reports
 * Description: Reports m
 **/
Ext.define('Atlas.reports.view.Reports', {
    extend: 'Ext.grid.Panel',
    xtype: 'reports-reports',
    title: 'Reports',
    controller: 'reportscontroller',
    viewModel: 'reportsviewmodel',
    bufferedRenderer: false,
    bind: '{reportlistdata}',
    plugins: 'gridfilters',
    keyMap: {

        'ALT+CTRL+SHIFT+I': 'displayScreenInfo'

        // Cmd on Mac OS X, Ctrl on Windows/Linux.
        //"CmdOrCtrl+C": 'doCopy',

        // This one is handled by a class method.
        /*ESC: {
         handler: 'destroy',
         scope: 'this',
         event: 'keypress'  // default would be keydown
         }*/
    },
    columns: [
        {text: 'Report ID', flex: 1, dataIndex: 'reportID', sortable: true, hidden: true},
        {
            text: "Report Name (Click Down Arrow to Search)", flex: 1, dataIndex: 'reportName', sortable: true,
            filter: {
                // required configs
                // type: 'string',
                // optional configs
                //value: 'report',  // setting a value makes the filter active.
                itemDefaults: {
                    // any Ext.form.field.Text configs accepted
                }
            }
        },
        {text: 'Program Name', flex: 1, dataIndex: 'programName', sortable: true, hidden: true},
        {text: 'Run Mode', flex: 1, dataIndex: 'runMode', sortable: true, hidden: true},
        {text: 'User Group', flex: 1, dataIndex: 'userGroup', sortable: true, hidden: true},
        {text: 'IsFav', flex: 1, dataIndex: 'isFav', sortable: true, hidden: true},
        {
            text: '',
            xtype: 'widgetcolumn',
            align: 'center',
            flex: 1,
            hideable: false,
            widget: {
                iconCls: 'x-fa fa-file-video-o',  // Use a URL in the icon config
                text: 'Get Report',
                xtype: 'button',
                tooltip: 'Run Report',
                tooltipType: 'title',
                width: 115,
                handler: 'onShowReportsClick'
            }
        },
        {
            text: 'Add / Remove Favorites',
            xtype: 'actioncolumn',
            align: 'center',
            itemId: 'addRemFavoritesAction',
            hideable: false,
            flex: 1,
            items: [{
                iconCls: 'x-fa fa-star-o',
                tooltip: 'Add to Favorites',
                flex: 1,
                handler: 'setFavorite',
                getClass: function (value, meta, record) {
                    return (record.data.isFav == 'yes') ? 'x-hidden' : 'x-fa fa-star-o';
                }
            }, {
                iconCls: 'x-fa fa-star',  // Use a URL in the icon config
                tooltip: 'Remove from Favorites',
                flex: 1,
                handler: 'setFavorite',
                getClass: function (value, meta, record) {
                    return (record.data.isFav == 'no') ? 'x-hidden' : 'x-fa fa-star';
                }
            }]
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        bind: '{reportlistdata}',
        pageSize: 25,
        displayInfo: true,
        hideRefresh: true
    },
    forceFit: true,
    height: 210,
    split: true,
    region: 'north',
    tbar: [
        '->',
        {
            text: 'View My Favorite Reports',
            xtype: 'button',
            id: 'btnFavReports',
            iconCls: 'x-fa fa-star',
            listeners: {
                click: 'toggleReportList'
            }
        },
        {
            text: 'View All Reports',
            xtype: 'button',
            id: 'btnAllReports',
            iconCls: 'x-fa fa-credit-card',
            listeners: {
                click: 'toggleReportList'
            }
        }
    ]
});