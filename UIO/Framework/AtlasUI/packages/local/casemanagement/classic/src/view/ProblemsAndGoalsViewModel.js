/**
 * Created by s6627 on 11/15/2016.
 */
Ext.define('Atlas.casemanagement.store.ProblemsAndGoalsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProblemsAndGoalsViewModel',
    stores: {
        StoreProblemAndRecords: {
            // model: 'Atlas.casemanagement.model.ProblemAndRecordsModel',
            // autoLoad: false,
            // groupField: 'ProblemDesc'
            type:'casemanagement-problemandrecords'
        },
        StoreProblems:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMProblems'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreProblemStatus:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMProblemStatus'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreProblemClosedReason:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMProblemCloseReason'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoals:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            loading: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoals'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalClosedReason:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalCloseReason'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalAction:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalActions'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalResult:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalResult'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalProgress:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalProgress'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalResult:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalResult'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalProgress:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalProgress'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalType:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalType'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalStatus:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalStatus'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalProgress:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalProgress'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalAction:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalActions'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalResult:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalResult'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreGoalClosedReason:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MTMGoalCloseReason'
                },
                url: 'shared/{0}/listitems'
            }
        },
        storeBarriers: {
            model: 'Atlas.casemanagement.model.BarriersModel',
            autoLoad: false,
            groupField: 'ProblemDesc'
        },
        storeBarriersTypeahead: {
            pageSize: 10,
            model: 'Atlas.casemanagement.model.BarrierTypeAHeadModel',
            remoteSort:true,
            remoteFilter: true
        }

    }
});