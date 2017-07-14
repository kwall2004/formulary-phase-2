Ext.define('Atlas.portals.view.prescriber.FormsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.forms',

    stores: {
        formstree: {
            type: 'tree',
            root: {
                expanded: true,
                scrollable: true,
                children: [
                    {
                        text: 'Medicare',
                        iconCls: 'x-fa fa-folder',
                        itemId: 'treeRoot',
                        leaf: false
                    }

                ]
            }
        },
        paFormTree: {
            type: 'tree',
            root: {
                scrollable: true,
                children: [
                    {
                        text: 'Medicaid Prior Auth Request Form',
                        iconCls: 'x-fa fa-file-text',
                        itemId: 'paFormNode',
                        leaf: true
                    }

                ]
            }
        },
        formDocs: {
            model: 'Atlas.portals.view.Model.FormsModel'
        },
        mrxDocs: {
            model: 'Atlas.portals.view.prescriber.model.MRxDocsModel'
        }
    }
});