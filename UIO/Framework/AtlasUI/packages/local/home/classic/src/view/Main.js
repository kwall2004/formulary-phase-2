Ext.define('Atlas.home.view.Main', {
    extend: 'Ext.dashboard.Dashboard',
    xtype: 'home-main',
    controller: 'dashboardhomemaincontroller',
    viewModel: 'dashboardhomemain',
    title: '~moduleName',

    // BUG FIX: if columnWidths equal 1, expanding multiple panels on the right column that exceeds the page height
    // and auto-shows the scroll bar causes the right column to wrap to the left column for a split second.
    // leave at least 0.02 remainder to leave room for the scroll bar rendering
    columnWidths: [
        0.49,
        0.49
    ],

    stateId: 'MerlinDashboard',
    stateful: false,

    //dynamic part definitions that can be instantiated with Dashboard
    parts: {
        //this refers to the alias defined on the Class
        contactlogalert: 'contactlogalert',
        priorauthalert: 'priorauthalert',
        denialappealletteralert: 'denialappealletteralert',
        mtmalert: 'mtmalert',
        dmralert: 'dmralert',
        cobcalert: 'cobcalert',
        cocalert: 'cocalert',
        outreachalert: 'outreachalert',
        merlintask: 'merlintask',
        jobqueue: 'jobqueue',
        claimalert: 'claimalert',
        locksalert: 'locksalert',
        //jcodealert: 'jcodealert',
        grievancealert: 'grievancealert',
        patientsafetyalert: 'patientsafetyalert',
        //financecollectionalert: 'financecollectionalert',
        pharmacyauditalert: 'pharmacyauditalert'
    }

    // defaultContent: [
    //     {
    //         type: 'contactlogalert',
    //         columnIndex: 0,
    //         height: 435
    //     },
    //     {
    //         type: 'priorauthalert',
    //         columnIndex: 0,
    //         height: 435
    //     },
    //     {
    //         type: 'daletteralert',
    //         columnIndex: 0,
    //         height: 525
    //     },
    //     {
    //         type: 'mtmalert',
    //         columnIndex: 0,
    //         height: 310
    //     },
    //     {
    //         type: 'dmralert',
    //         columnIndex: 0,
    //         height: 225
    //     },
    //     {
    //         type: 'cobcalert',
    //         columnIndex: 0,
    //         height: 130
    //     }/*,
    //      {
    //      type: 'cocalert',
    //      columnIndex: 0,
    //      height: 130
    //      }*/,
    //     {
    //         type: 'patientsafetyalert',
    //         columnIndex: 0,
    //         height: 70
    //     },
    //     {
    //         type: 'taskscheduleralert',
    //         columnIndex: 1,
    //         height: 435
    //     },
    //     {
    //         type: 'jobqueuealert',
    //         columnIndex: 1,
    //         height: 435
    //     },
    //     {
    //         type: 'claimalert',
    //         columnIndex: 1,
    //         height: 525
    //     },
    //     {
    //         type: 'locksalert',
    //         columnIndex: 1,
    //         height: 640
    //     },
    //     {
    //         type: 'grievancealert',
    //         columnIndex: 1,
    //         height: 100
    //     }, /*
    //      {
    //      type: 'pharmacyauditalert',
    //      columnIndex: 1,
    //      height: 90
    //      },*/
    //     {
    //         type: 'outreachalert',
    //         columnIndex: 1,
    //         height: 100
    //     }/*,
    //      {
    //      type: 'financecollectionalert',
    //      columnIndex: 1,
    //      height: 300
    //      }*/
    // ]
});