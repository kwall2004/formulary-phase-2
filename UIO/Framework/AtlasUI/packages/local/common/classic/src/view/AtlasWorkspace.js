Ext.define('Atlas.common.view.AtlasWorkspace', {
    extend: 'Atlas.common.view.Workspace',
    alias: 'widget.atlasworkspace',

    viewModel: {
        stores:{
            navigation:{
                type: 'tree',
                root: {
                    "expanded": true,
                    "children":[{
                        "text" : "Benefit Plan Configuration",
                        "iconCls" : "x-fa fa-users",
                        "leaf" : false,
                        "children" : [{
                            "text" : "Tenant Search",
                            "iconCls" : "x-fa fa-hourglass-start",
                            "routeId" : "atlas/benefitplan/tenantsearch_Main",
                            "leaf" : true
                        }, {
                            "text" : "Plan Benefit Package Search",
                            "iconCls" : "x-fa fa-hourglass-start",
                            "routeId" : "atlas/benefitplan/planbenefitpackage_Main",
                            "leaf" : true
                        }, {
                            "text" : "Benefit Plan Search",
                            "iconCls" : "x-fa fa-hourglass-start",
                            "routeId" : "atlas/benefitplan/benefitplan_Main",
                            "leaf" : true
                        }, {
                            "text" : "Pharmacy Types",
                            "iconCls" : "x-fa fa-hourglass-start",
                            "routeId" : "atlas/benefitplan/planbenefit_pharmacytypes_Main",
                            "leaf" : true
                        }, {
                            "text" : "Administration",
                            "iconCls" : "x-fa fa-cog",
                            "leaf" : false,
                            "children" : [{
                                "text" : "Benefit Search",
                                "iconCls" : "x-fa fa-sitemap",
                                "routeId" : "atlas/benefitplan/benefitsearch_Main",
                                "leaf" : true
                            },
							{
                                    "text" : "Benefit Package Search",
                                    "iconCls" : "x-fa fa-hourglass-start",
                                    "routeId" : "atlas/benefitplan/planbenefitpackage_Main",
                                    "leaf" : true
                            }
                            ,{
                                    "text" : "Benefit Plan Search",
                                    "iconCls" : "x-fa fa-hourglass-start",
                                    "routeId" : "atlas/benefitplan/planbenefit_Main",
                                    "leaf" : true
                            }
                            ,{
                                    "text" : "Benefit Plan Workflow",
                                    "iconCls" : "x-fa fa-sitemap",
                                    "routeId" : "atlas/benefitplan/benefitplanworkflow_Main",
                                    "leaf" : true
                            },
                            {
                                    "text" : "Benefit Search",
                                    "iconCls" : "x-fa fa-cog",
                                    "routeId" : "atlas/benefitplan/benefitsearch_Main",
                                    "leaf" : true
                            },
                                {
                                    "text" : "Account Configuration",
                                    "iconCls" : "x-fa fa-hourglass-start",
                                    "routeId" : "atlas/benefitplan/accountconfig_Main",
                                    "leaf" : true
                                },
                                {
                                    "text" : "Population Group Configuration",
                                    "iconCls" : "x-fa fa-hourglass-start",
                                    "routeId" : "atlas/benefitplan/popgroupconfig_Main",
                                    "leaf" : true
                                },
                                {
                                    "text" : "Workflow",
                                    "iconCls" : "x-fa fa-hourglass-start",
                                    "routeId" : "atlas/benefitplan/workflow_Main",
                                    "leaf" : true
                                },
                                {
                                    "text" : "Healthcare Finincial Account",
                                    "iconCls" : "x-fa fa-hourglass-start",
                                    "routeId" : "atlas/benefitplan/healthcarefinancialaccount",
                                    "leaf" : true
                                },
                                {
                                    "text" : "Cost Share Maximums",
                                    "iconCls" : "x-fa fa-hourglass-start",
                                    "routeId" : "atlas/benefitplan/costsharemaximums",
                                    "leaf" : true
                                },
                                {
                                    "text" : "Contact Export",
                                    "iconCls" : "x-fa fa-hourglass-start",
                                    "routeId" : "atlas/benefitplan/ContactExport",
                                    "leaf" : true
                                }


                                ]
                        },
                        {
                            "text" : "Formulary",
                            "iconCls" : "x-fa fa-users",
                            "leaf" : false,
                            "children" : [{
                                "text" : "Main",
                                "iconCls" : "x-fa fa-hourglass-start",
                                "routeId" : "atlas/formulary/Main"
                            }, {
                                "text" : "Prescriber Drug Override",
                                "iconCls" : "x-fa fa-medkit",
                                "routeId" : "atlas/benefitplan/benefitplanworkflow_Main",
                                "leaf" : true
                            }, {
                                "text" : "Allowed Prescribers",
                                "iconCls" : "x-fa fa-user-md",
                                "routeId" : "atlas/benefitplan/benefitplanworkflow_Main",
                                "leaf" : true
                            }]
                        }]
                    }, {
                            "text" : "Formulary Management",
                            "iconCls" : "x-fa fa-life-saver",
                            "leaf" : false,
                            "children" : [/*{
                                  "text" : "Dashboard",
                                  "iconCls" : "x-fa fa-dashboard",
                                  "routeId" : "atlas/formulary/dashboard.Dashboard",
                                  "leaf" : true
                                }, */{
                                  "text" : "Manage Formulary",
                                  "iconCls" : "x-fa fa-cubes",
                                  "routeId" : "atlas/atlasformulary/manageformulary.ManageFormulary",
                                  "leaf" : true,
                                  "expanded" : true
                                }, {
                                  "text" : "Drug Search",
                                  "iconCls" : "x-fa fa-medkit",
                                  "routeId" : "atlas/atlasformulary/drugsearch.DrugSearch",
                                  "leaf" : true,
                                  "expanded" : true
                                }, {
                                "text": "New Drugs To Market",
                                "iconCls": "x-fa fa-medkit",
                                "routeId": "atlas/atlasformulary/newdrugstomarket.NewDrugsToMarket",
                                "leaf": true,
                                "expanded": true
                            }, {
                                  "text" : "UM Programs",
                                  "iconCls" : "x-fa fa-stethoscope",
                                  "routeId" : "atlas/atlasformulary/umprograms.UMPrograms",
                                  "leaf" : true,
                                  "expanded" : true
                                }, {
                                  "text" : "FRF/FF Management",
                                  "iconCls" : "x-fa fa-files-o",
                                  "routeId" : "atlas/atlasformulary/frf.FRF",
                                  "leaf" : true
                                }, {
                                  "text" : "Manage Drug Lists",
                                  "iconCls" : "x-fa fa-list-alt",
                                  "routeId" : "atlas/atlasformulary/druglists.DrugLists",
                                  "leaf" : true,
                                  "expanded" : true
                                }, {
                                  "text" : "Import/Export",
                                  "iconCls" : "x-fa fa-upload",
                                  "routeId" : "atlas/atlasformulary/importexport.ImportExport",
                                  "leaf" : true,
                                  "expanded" : true
                                },{
                                "text" : "Custom NDC",
                                "iconCls" : "x-fa fa-medkit",
                                "routeId" : "atlas/atlasformulary/customndc.CustomNDC",
                                "leaf" : true,
                                "expanded" : true
                            },{
                                "text" : "Formulary Review",
                                "iconCls" : "x-fa fa-smile-o",
                                "routeId" : "atlas/atlasformulary/formularyreview.Review",
                                "leaf" : true,
                                "expanded" : true
                            },{
                                "text" : "File History",
                                "iconCls" : "x-fa fa-medkit",
                                "routeId" : "atlas/atlasformulary/filehistory.FileHistory",
                                "leaf" : true,
                                "expanded" : true
                                }, {
                                "text" : "Add Missing NDC",
                                "iconCls" : "x-fa fa-medkit",
                                "routeId" : "atlas/atlasformulary/missingndc.Main",
                                "leaf" : true,
                                "expanded" : true
                                }, {
                                "text" : "Job Queue",
                                "iconCls" : "x-fa fa-medkit",
                                "routeId" : "atlas/atlasformulary/jobqueue.JobQueue",
                                "leaf" : true,
                                "expanded" : true
                            }
                            ]
                        }
                    ]
                }
            }
        }
    }
});
