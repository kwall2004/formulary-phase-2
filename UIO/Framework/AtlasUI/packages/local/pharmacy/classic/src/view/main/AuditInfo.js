Ext.define('Atlas.pharmacy.view.main.AuditInfo', {
    extend: 'Ext.grid.Panel',
    controller: 'pharmacy-audit',

    viewModel: {
        stores: {
            audit: {
                model: 'Atlas.pharmacy.model.PharmacyAuditMaster'
            }
        }
    },

    viewConfig: {
        emptyText: 'No audit data available',
        deferEmptyText: false
    },

    bind: '{audit}',

    columns: {
        items: [
            {
                text: 'System ID',
                width: 120,
                hidden: true,
                dataIndex: 'systemID'
            },
            {
                text: 'Audit ID',
                width: 100,
                dataIndex: 'AuditID'
            },
            {
                text: 'NCPDP',
                width: 100,
                dataIndex: 'NCPDPID'
            },
            {
                text: 'Created By',
                hidden: true,
                width: 100,
                dataIndex: 'auditCreateBy'
            },
            {
                xtype: 'datecolumn',
                text: 'Created Date',
                width: 140,
                dataIndex: 'auditCreateDate'
            },
            {
                text: 'Audit Created Reason',
                width: 350,
                hidden: true,
                dataIndex: 'auditCreatedReason'
            },
            {
                text: 'Audit Type',
                width: 100,
                hidden: true,
                dataIndex: 'auditType'
            },
            {
                text: 'Audit Type',
                width: 100,
                dataIndex: 'auditTypeDesc'
            },
            {
                text: 'Assigned To',
                width: 100,
                dataIndex: 'assignTo'
            },
            {
                xtype: 'datecolumn',
                text: 'Scheduled Date',
                width: 140,
                dataIndex: 'scheduleDate'
            },
            {
                text: 'Scheduled By',
                width: 140,
                hidden: true,
                dataIndex: 'scheduledBy'
            },
            {
                xtype: 'datecolumn',
                text: 'Completed Date',
                width: 130,
                dataIndex: 'completeDate'
            },
            {
                text: 'Audit Canceled',
                width: 140,
                hidden: true,
                dataIndex: 'auditCanceled',
                renderer: function (value) {
                    if (value) {
                        return 'Yes';
                    }
                    else {
                        return 'No';
                    }
                }
            },
            {
                xtype: 'datecolumn',
                text: 'Canceled Date',
                width: 140,
                dataIndex: 'auditCanceledDate'
            },
            {
                text: 'Canceled By',
                width: 140,
                dataIndex: 'auditCanceledBy'
            },
            {
                text: 'Include Contract',
                width: 140,
                hidden: true,
                dataIndex: 'includeContract',
                renderer: function (value) {
                    if (value) {
                        return 'Yes';
                    }
                    else {
                        return 'No';
                    }
                }
            },
            {
                text: 'Complete?',
                width: 100,
                hidden: true,
                dataIndex: 'isComplete',
                renderer: function (value) {
                    if (value) {
                        return 'Yes';
                    }
                    else {
                        return 'No';
                    }
                }
            },
            {
                text: 'Last Submitted By',
                width: 160,
                hidden: true,
                dataIndex: 'lastSubmitBy'
            },
            {
                xtype: 'datecolumn',
                text: 'Last Submitted Date',
                width: 160,
                hidden: true,
                dataIndex: 'lastSubmitDate'
            },
            {
                text: 'Pharmacist Id',
                width: 140,
                hidden: true,
                dataIndex: 'pharmacistID'
            },
            {
                text: 'NPI',
                width: 100,
                hidden: true,
                dataIndex: 'PharmacyNPI'
            },
            {
                text: 'Question Name',
                width: 140,
                hidden: true,
                dataIndex: 'QuestionName'
            },
            {
                text: 'Req. Notification Letter',
                width: 180,
                hidden: true,
                dataIndex: 'reqNotificationLetter',
                renderer: function (value) {
                    if (value) {
                        return 'Yes';
                    }
                    else {
                        return 'No';
                    }
                }
            },
            {
                text: 'Score',
                width: 100,
                dataIndex: 'score'
            },
            {
                text: 'Passed?',
                width: 100,
                dataIndex: 'passed',
                renderer: function (val) {
                    if (val == 1) {
                        return 'Yes';
                    }
                    else {
                        return 'No';
                    }
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        bind: '{audit}',
        displayInfo: true,
        hideRefresh: true
    }
});
