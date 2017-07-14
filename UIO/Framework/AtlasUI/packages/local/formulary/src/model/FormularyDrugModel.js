/**
 * Created by s6627 on 10/17/2016.
 */
Ext.define('Atlas.formulary.model.FormularyDrugModel', {
    extend: 'Atlas.common.model.TreeBase',
    idProperty: 'nodeId',
    fields: [
        {
            name: "id",
            mapping: function(data) {
                return data.NodeId;
            }
        },
        {
            name: "name",
            mapping : function(data){
                return data.NodeName;
            }
        },
        {
            name: "leaf",
            mapping : function(data){
                return data.leaf;
            }
        }

    ],
    proxy: {
        extraParams: {
            pFormularyId: 10,
            pFormVersion: 21,
            pETCId: 0,
            pNDC: '',
            pParentNodeId: 0,
            pLastNodeIdUsed: 0,
            timeout: 5000000
        },
        url: 'formulary/{0}/fdbformularytreerest',
        reader: {
            transform: function (data) {
                return {
                    rootData: data.data
                };
            },
            rootProperty: function (payload) {
                if (payload.nodeId !== 'root') {
                    if (payload.rootData != null) {
                        if (payload.rootData[0].children != null) {
                            if (payload.rootData[0].children[0].NodeName == "All Drugs") {
                                return payload.rootData[0].children[0].children;
                            }
                            else {
                                return payload.rootData[0].children;
                            }
                        }
                    }
                    if (payload.children != null) {
                        return payload.children;
                    }

                }
            }
        }
    }
});