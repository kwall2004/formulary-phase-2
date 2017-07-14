Ext.define('Atlas.portals.prescriber.FormsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formsview',

    /**
     * Called when the view is created
     */
    init: function() {
        var viewModel = this.getViewModel(),
            formsRootNode = viewModel.getStore('formstree').getRootNode().childNodes[0],
            formDocsStore = viewModel.getStore('formDocs');

        formDocsStore.load({
            failure: function (records, operation) {
                //do something if the load failed
            },
            success: function (records, operation) {

            },
            callback: function (records, operation, success) {
                var formDocsMetaData = formDocsStore.getProxy().getReader().metaData,
                    planGroup = formDocsMetaData.ttPlanGroup.ttPlanGroup,
                    planType = formDocsMetaData.ttPlanType.ttPlanType,
                    documentType = formDocsMetaData.ttDocumentType.ttDocumentType;

                for (var i = 0; i < records.length; i++) {

                    var stateCode = records[i].data.StateCode;
                    var treeAppend = {
                        text: stateCode,
                        iconCls: 'x-fa fa-folder',
                        itemId: stateCode,
                        leaf: false
                    };

                    formsRootNode.appendChild(treeAppend);
                }

                for (var i = 0; i < formsRootNode.childNodes.length; i++) {
                    var currentState = formsRootNode.childNodes[i].data.itemId;

                    for (var j = 0; j < planType.length; j++) {
                        var planTypeState = planType[j].StateCode,
                            typeDesc = planType[j].TypeDesc,
                            planTypeType = planType[j].PlanType;

                        if (currentState == planTypeState) {
                            formsRootNode.childNodes[i].appendChild({
                                text: typeDesc,
                                iconCls: 'x-fa fa-folder',
                                itemId: planTypeType,
                                leaf: false
                            });
                        }
                    }

                    for (var k = 0; k < planGroup.length; k++) {
                        var planGroupState = planGroup[k].StateCode,
                            planDesc = planGroup[k].PlanType,
                            planGroupName = planGroup[k].PlanGroupName,
                            planGroupId = planGroup[k].PlanGroupId;

                        if (currentState == planGroupState) {
                            for (var l = 0; l < formsRootNode.childNodes[i].childNodes.length; l++) {
                                var planGroupType = formsRootNode.childNodes[i].childNodes[l].data.itemId;

                                if (planGroupType == planDesc) {
                                    formsRootNode.childNodes[i].childNodes[l].appendChild({
                                        text: planGroupName,
                                        iconCls: 'x-fa fa-folder',
                                        itemId: planGroupName,
                                        itemCls: planGroupId,
                                        leaf: false
                                    });
                                }
                            }

                        }
                    }

                    for (var m = 0; m < documentType.length; m++) {
                        var docDesc = documentType[m].DocumentDesc,
                            docCode = documentType[m].DocumentCode;

                        for (var n = 0; n < formsRootNode.childNodes[i].childNodes.length; n++) {
                            for (var o = 0; o < formsRootNode.childNodes[i].childNodes[n].childNodes.length; o++) {
                                var groupId = formsRootNode.childNodes[i].childNodes[n].childNodes[o].data.itemCls;
                                var groupName = formsRootNode.childNodes[i].childNodes[n].childNodes[o].data.itemId;

                                formsRootNode.childNodes[i].childNodes[n].childNodes[o].appendChild({
                                    text: docDesc,
                                    iconCls: 'x-fa fa-file-text',
                                    itemId: groupId + '|' + docCode,
                                    itemCls: groupName,
                                    leaf: true
                                })
                            }
                        }
                    }
                }
            }
        });
    },

    onDocumentClick: function(tree, treeIndex, colIndex) {
        if (treeIndex.node.data.leaf === true) {

            var nodeText = treeIndex.node.data.text,
                nodeId = treeIndex.node.data.itemId,
                nodeCls = treeIndex.node.data.itemCls,
                viewModel = this.getViewModel(),
                mrxDocsStore = viewModel.getStore('mrxDocs'),
                tabPanel = Ext.first('tabpanel[itemId=formDocsTabPanel]');

            if (nodeId == 'paFormNode') {
                var concatReference = 'Prior Auth Request Form',
                    strippedReference = 'priorAuthRequestForm';
            } else {
                var splitId = nodeId.split('|'),
                    concatReference = splitId[1] + ' - ' + nodeCls,
                    removeLeftPar = concatReference.replace('(', ''),
                    removeRightPar = removeLeftPar.replace(')', ''),
                    strippedReference = removeRightPar.replace(/ /g, '');
            }

            var existingTab = tabPanel.up().lookup(strippedReference),
                    tab;

            if (!existingTab) {
                var myMask = new Ext.LoadMask({
                    msg: 'Loading ' + concatReference,
                    target: tabPanel
                });

                myMask.show();
                mrxDocsStore.getProxy().setExtraParam('pProgramName', 'ltrPriorAuthFormMRx.p');
                mrxDocsStore.getProxy().setExtraParam('pDescription', nodeText);
                mrxDocsStore.getProxy().setExtraParam('pParameters', nodeId);
                mrxDocsStore.load({
                    failure: function (records, operation) {
                        //do something if the load failed
                    },
                    success: function (records, operation) {

                    },
                    callback: function (records, operation, success) {
                        var mrxDocsMetaData = mrxDocsStore.getProxy().getReader().metaData,
                            docData = mrxDocsMetaData.pData;
                        var urlString = "data:application/pdf;base64," + escape(docData);

                        if (nodeId == 'paFormNode') {
                            urlString = 'resources/rxmember/forms/MeridianRx_Fax_PA_Form.pdf';
                        }

                        var iframeHtml = '<iframe src="' + urlString + '" height="100%" width="100%"></iframe>';

                        if (Ext.browser.is.IE && window.navigator.msSaveOrOpenBlob && nodeId !== 'paFormNode') {
                            Atlas.common.utility.Utilities.displayDocument('pdf', docData);
                        } else {
                            tab = tabPanel.add({
                                title: concatReference,
                                html: iframeHtml,
                                flex: 1,
                                closable: true,
                                reference: strippedReference
                            });
                            tabPanel.setActiveTab(tab);
                        }
                        myMask.hide();
                    }
                });
            } else {
                tabPanel.setActiveTab(existingTab);
            }

        }
    }
});