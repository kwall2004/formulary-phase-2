/**
 * Created by agupta on 11/22/2016.
 */

Ext.define('Atlas.grievances.view.grievances.GrievancesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.grievancesviewmodel',
    stores: {

        StoreGrievanceCategory: {
            model: 'Atlas.grievances.model.GrievanceCategoryModel',
            autoLoad: false
        },

        StoreLOB: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'LineOfBusiness'
                },
                url: 'shared/{0}/listitems',
                reader: {
                    metaProperty: 'metadata',
                    rootProperty: function (payload) {
                        var arr = [];
                        payload.data.forEach(function (item, index) {
                            if (item.value != '999') {
                                arr.push(item);
                            }
                        });
                        return arr;
                    }
                }
            }
        },

        StoreUsers: {
            model: 'Atlas.common.model.UserList',
            autoLoad: false
        },

        StoreStatus: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'GrievanceStatus'
                },
                url: 'shared/{0}/listitems'
            }
        },

        StoreMethodOfResponce: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'GrievanceMethodOfResponse'
                },
                url: 'shared/{0}/listitems'
            }
        },

        StoreExtensionRequest: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'YesNo'
                },
                url: 'shared/{0}/listitems'
            }
        },

        StoreNotifyMethod: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'GrievanceNotifyMethod'
                },
                url: 'shared/{0}/listitems'
            }
        },

        StoreLevel: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'GrievanceLevel'
                },
                url: 'shared/{0}/listitems'
            }
        },

        StoreResolution: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'GrievanceResolution'
                },
                url: 'shared/{0}/listitems'
            }
        },

        StoreDisposition: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'GrievanceDisposition'
                },
                url: 'shared/{0}/listitems'
            }
        },


        StoreGrievances: {
            model: 'Atlas.grievances.model.GrievanceSummaryModel',
            autoLoad: false
        },

        StoreGrievanceType: {
            model: 'Atlas.grievances.model.GrievanceTypeModel',
            autoLoad: false
        },


        StoreAttachment: {
            model: 'Atlas.common.model.AttachmentList',
            autoLoad: false
        }

    }
});