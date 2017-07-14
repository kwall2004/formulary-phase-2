Ext.define('Atlas.prescriber.view.Search', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    alias: 'widget.prescribers',

    title: 'Prescriber Search',

    controller: 'prescriber-search',

    viewModel: {
        type: 'common-shared-editgridmodel',
        data:{
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: true,
                update: true,
                save: true
            }
        },
        stores: {
            prescribers: {
                type: 'prescribers'
            }
        }
    },

    listeners:{
        itemdblclick: 'onItemdblclick'
    },


    bind: {
        store: '{prescribers}'
    },

    columns:{
        defaults:{
            width: 150,
            filter: { type: 'string'}
        },
        items:[
            { text: 'NPI ID', dataIndex: 'npi', hidden: true },
            { text: 'Last Name', dataIndex: 'lastname', width: 230 },
            { text: 'First Name', dataIndex: 'firstName' },
            { text: 'Middle Name', dataIndex: 'middlename' },
            { text: 'Degree', dataIndex: 'degree' },
            { text: 'Specialty', dataIndex: 'specialty' },
            { text: 'Taxonomy', dataIndex: 'taxonomy' },
            { text: 'License Number', dataIndex: 'licnum' },
            { text: 'License State', dataIndex: 'licstate' },
            { text: 'CAID ID', dataIndex: 'caidid' },
            { text: 'CAID State', dataIndex: 'caidstate' },
            { text: 'CARE ID', dataIndex: 'careid' },
            { text: 'UPIN', dataIndex: 'upin' },
            { text: 'Tax ID', dataIndex: 'taxid' },
            { text: 'Location', dataIndex: 'locname' },
            { text: 'Address', dataIndex: 'locaddr1' },
            { text: 'Address 2', dataIndex: 'locaddr2' },
            { text: 'City', dataIndex: 'loccity' },
            { text: 'State', dataIndex: 'locstate' },
            { text: 'Zip Code', dataIndex: 'loczip' },
            { text: 'NPI Source', dataIndex: 'npisource', hidden: true  },
            { text: 'WRDIDX', dataIndex: 'wrdidx', hidden: true  },
            { text: 'Full Name', dataIndex: 'fullname' },
            { text: 'Birthdate', dataIndex: 'birthdate', xtype: 'datecolumn',   format:'Y-m-d', filter: { type: 'date'}  },
            { text: 'Entity Type', dataIndex: 'entityType', hidden: true  },
            { text: 'Phone', dataIndex: 'locphone' },
            { text: 'Fax', dataIndex: 'locfax' },
            { text: 'Enum Date', dataIndex: 'enumDate', xtype: 'datecolumn',   format:'Y-m-d', filter: { type: 'date'}  },
            { text: 'RowID', dataIndex: 'dbRowID', hidden: true  },
            { text: 'RowNum', dataIndex: 'RowNum', hidden: true  }
        ]
    }
});