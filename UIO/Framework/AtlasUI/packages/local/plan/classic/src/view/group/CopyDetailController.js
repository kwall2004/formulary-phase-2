/**
 * Created by d3973 on 11/28/2016.
 */
Ext.define('Atlas.plan.view.group.CopyDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plancopydetailcontroller',

    // listen: {
    //     controller: {
    //         '*': {
    //             benefitChange: 'selectPlan'
    //         }
    //     }
    // },

    init: function() {
        var me = this,
            view = me.getView(),
            tree = view.down('treepanel'),
            //tree = me.getView(),
            storeNodesUnformatted = tree.getViewModel().getStore('nodesUnformatted'),
            moduleSelectionTree = tree.findParentByType('merlinworkspace'),
            selectedModule = moduleSelectionTree.down().getSelectionModel().getSelection()[0],
            displayInfo = tree.down('displayfield');

        if (this.getView().up().title == 'Plan Group Setup'){
            var cbxBenefitDetail = tree.down('[valueField = planBenefitId]');

            cbxBenefitDetail.hide();
            view.pageEntity = 'PlanGroup';
        }
        else {
            var cbxPlanGroup = tree.down('plangrouptypeahead');

            cbxPlanGroup.hide();
            view.pageEntity = 'PlanBenefit';
        }

        //set the correct displayfield based on the chosen page
        displayInfo.setConfig('fieldLabel', 'Selected ' + me.pageEntityWithSpaces());

        storeNodesUnformatted.onAfter('load', 'onLoadNodesUnformatted');

        storeNodesUnformatted.getProxy().setExtraParam('pEntity', view.pageEntity);
        storeNodesUnformatted.load();

        //if a plan group or plan benefit is chosen, call selectPlan
        var planGroupOrBenefit = me.retrievePlanGroupOrBenefit();
        if (planGroupOrBenefit){
            me.selectPlan();
        }
    },

    onLoadNodesUnformatted: function(storeNodesUnformatted, records){
        var me = this,
            //tree = me.getView(),
            view = me.getView(),
            tree = view.down('panel'),
            storeDetailTree = tree.getViewModel().getStore('detailTree');

        function setTextOnChildNodes(parentNode){
            var arrayChildren = parentNode.childNodes;

            for (var idx = 0, length = arrayChildren.length; idx < length; idx = idx + 1){
                if(arrayChildren[idx].hasChildNodes){
                    setTextOnChildNodes(arrayChildren[idx]);
                }

                arrayChildren[idx].set('text', arrayChildren[idx].get('nodeValue'));
                arrayChildren[idx].set('checked', false);
            }
        }

        storeDetailTree.setRoot(records[0].data);

        var rootDetailTree = storeDetailTree.getRoot();

        rootDetailTree.set('text', rootDetailTree.get('nodeValue'));
        rootDetailTree.set('checked', false);

        setTextOnChildNodes(rootDetailTree);
    },

    selectPlan: function(){
        //debugger;
        /*
        enters the plan group/benefit name in the displayfield, and then calls emptyCbxValues
         */
        var me = this,
            view = me.getView(),
            //displayPlanInfo = view.down('displayfield'),
            displayPlanInfo = view.down('#displayPlanInfo'),
            planGroupOrBenefit = me.retrievePlanGroupOrBenefit()/*,
            groupName = planGroupOrBenefit.get('planGroupName')*/;

        var atlasRecord = this.getView().up().getViewModel().get('isAtlasRecord');
        if(atlasRecord){
            this.retrieveCbx(view.pageEntity).setDisabled(true);
        }else{
            this.retrieveCbx(view.pageEntity).setDisabled(false);
        }
        /*if (atlasRecord){
            this.getView().setDisabled(true);
        }else{
            this.getView().setDisabled(false);
        }*/

        if (view.pageEntity == 'PlanGroup'){
            displayPlanInfo.setValue(planGroupOrBenefit.get('planGroupName'));
        }
        else if (view.pageEntity == 'PlanBenefit'){
            displayPlanInfo.setValue(planGroupOrBenefit.get('BenefitName'));
        }

        // displayPlanInfo.setValue(groupName);

        me.emptyCbxValues();
    },

    emptyCbxValues: function(){
        /*
        enables or disables the copy button based on validation
         */
        var me = this,
            view = me.getView(),
            planGroupOrBenefit = me.retrievePlanGroupOrBenefit(),
            cbxTargetPlan = me.retrieveCbx(view.pageEntity),
            btnCopy = view.down('button');

        view.tempCbxSelection = cbxTargetPlan.getValue();

        if (planGroupOrBenefit && cbxTargetPlan.getValue()){
            var idType = (view.pageEntity == 'PlanGroup') ? 'planGroupId':'planBenefitId';

            if (planGroupOrBenefit.get(idType) == cbxTargetPlan.getValue()){
                var pageEntityWithSpaces = me.pageEntityWithSpaces();

                Ext.Msg.alert('Validation', 'Source and Target ' + pageEntityWithSpaces + ' are the same');
                btnCopy.disable();
                return;
            }
            btnCopy.enable();
        }
        else {
            btnCopy.disable();
        }
    },

    replaceEmptyVal: function(cbx){
        /*
        if a user selects a target plan group/benefit, deletes the input and leaves the
        combobox, this function repopulates the target plan/benefit with the value the
        user entered
         */
        var me = this,
            view = me.getView();

        if(cbx.getValue() != view.tempCbxSelection){
            cbx.setValue(view.tempCbxSelection);
        }
    },

    checkNode: function(node, checked){
        /*
        determines what to do if the user checks/unchecks a node
         */
        var me = this,
            view = me.getView(),
            tree = view.down('treepanel'),
            // storeDetailTree = view.getStore(),
            storeDetailTree = tree.getStore(),
            nodeRoot = storeDetailTree.getRoot();

        function checkParentNodeChecked(tempNode){
            //debugger;
            //checkParentNodeChecked(tempNode.parentNode);
            if (tempNode.parentNode != null){
                checkParentNodeChecked(tempNode.parentNode);
            }
            if (!(tempNode.get('leaf'))){
                tempNode.set('checked', true);
            }
        }

        function checkParentNodeUnchecked(tempNode, clickedNode, flag){
            var arrayChildren = tempNode.childNodes;

            /*
            if the originally clicked node was unchecked and it is not a leaf, then the
            current node and all children nodes are unchecked
             */
            function uncheckAllChildrenNodes(currentNode){
                var children = currentNode.childNodes;

                for (var idx3 = 0, length3 = children.length; idx3 < length3; idx3 = idx3 + 1){
                    uncheckAllChildrenNodes(children[idx3]);
                }
                currentNode.set('checked', false);
            }

            /*
            if the current node has children and they are all unchecked, then uncheck the
            current node; otherwise, leave the current node as is.
             */
            function checkForChecksOnChildren(currentNode2){
                var children2 = currentNode2.childNodes;

                for (var idx4 = 0, length4 = children2.length; idx4 < length4; idx4 = idx4 + 1){
                    if(children2[idx4].get('checked') == true){
                        return;
                    }
                }
                if(children2.length > 0){
                    currentNode2.set('checked', false);
                }
            }

            /*
            Start with the topmost node. Recursion is used to access the bottom-most nodes.
            Once the bottom-most nodes are accessed, recursion is fulfilled as parent nodes
            are returned to until the top most node is reached again.
             */
            for (var idx = 0, length = arrayChildren.length; idx < length; idx = idx + 1){
                if(arrayChildren[idx].hasChildNodes){
                    checkParentNodeUnchecked(arrayChildren[idx], clickedNode, flag);
                }
            }
            /*
            This loop is used for parent nodes. The loop checks to see if there are any
            child nodes that are checked. If not, the next parent node is accessed.
            If there are, then the current parent node becomes checked and the next
            parent node repeats the process.
             */
            for (var idx2 = 0, length2 = arrayChildren.length; idx2 < length2; idx2 = idx2 + 1){
                var checkedChildren = arrayChildren[idx2].get('checked');

                if (checkedChildren === true){
                    tempNode.set('checked', true);
                    break;
                }
                if (idx2 == length2 - 1){
                    tempNode.set('checked', false);
                }
            }

            if ((clickedNode.get('leaf') == false) && (clickedNode == tempNode)){
                uncheckAllChildrenNodes(tempNode);
            }

            checkForChecksOnChildren(tempNode);
        }

        if (checked){
            checkParentNodeChecked(node);
        }
        else{
            checkParentNodeUnchecked(nodeRoot, node, false);
        }
    },

    onBtnCopy: function(){
        var me = this,
            view = me.getView(),
            tree = view.down('panel'),
            storeDetailTree = tree.getStore(),
            // storeDetailTree = view.getStore(),
            rootNode = storeDetailTree.getRoot(),
            checkedNodes;

        function retrieveCheckedNodes(node){
            var children = node.childNodes;

            if ((node.parentNode != null) && (node.get('checked') === true)){
                checkedNodes = checkedNodes + ',' + node.get('text');
            }

            for (var idx = 0, length = children.length; idx < length; idx = idx + 1){
                retrieveCheckedNodes(children[idx]);
            }
        }

        if(rootNode.get('checked') === true){
            var checkedNodesString,
                message = Ext.Msg;

            message.confirm('Confirm', 'This will delete all old ' + me.pageEntityWithSpaces() + ' setup and copy this data. Do you wish to continue?',
                function(buttonId){
                    if (buttonId === 'yes'){
                        var controller = this,
                            planGroupOrBenefit = controller.retrievePlanGroupOrBenefit(),
                            pageEntity = controller.getView().pageEntity.toLowerCase(),
                            planId = planGroupOrBenefit.get('planBenefitId'),
                            targetCbx = controller.retrieveCbx(controller.getView().pageEntity),
                            targetPlanId = targetCbx.getValue();

                        retrieveCheckedNodes(rootNode);

                        //eliminates the initial comma from the delimited string
                        if (checkedNodes && checkedNodes.startsWith('undefined,')){
                            checkedNodesString = checkedNodes.substr(10);
                        }

                        var params = {
                            pDescription: 'Copy Plan Settings',
                            pProgramName: 'copyPlanGroupSetup.p',
                            pParameters: pageEntity + '|' + planId + '|' +targetPlanId + '|Copy|' + checkedNodesString,
                            pRunMode: 2,
                            pProgramType: 'Batch',
                            pSaveDocument: false,
                            pFaxNumber: ''
                        };

                        saveAction =[{
                            "Save": {"key": '', "value": ''}
                        }];

                        var submitJob = Atlas.common.utility.Utilities.saveData([], 'shared/rx/submitjob/update', null,[false], params,
                            saveAction, ['pJobNumber']);

                        if (submitJob.code === 0){
                            Ext.Msg.alert('Success', 'Please check job queue for job number ' + submitJob.pJobNumber);
                        }
                    }
                    else {
                        return 'no';
                    }
                },
                me
            );

        }
        else {
            Ext.Msg.alert('Copy Plan', 'Please select at least one criteria to copy');
        }
    },

    pageEntityWithSpaces: function(){
        /*
         loop through all letters of view.pageEntity, apart from the first letter,
         to add a space before capital letters. The purpose is to turn one word into
         multiple words
         */
        var me = this,
            view = me.getView(),
            newValue;

        for (var idx = 1, length = view.pageEntity.length; idx < length; idx = idx + 1){
            var currentLetter = view.pageEntity[idx];

            if(currentLetter === currentLetter.toUpperCase()){
                var firstStringPortion = view.pageEntity.substr(0, idx),
                    secondStringPortion = view.pageEntity.substr(idx);

                newValue = firstStringPortion + ' ' + secondStringPortion;
            }
        }

        return newValue;
    },

    retrievePlanGroupOrBenefit: function(){
        /*
        retrieves the plan group/benefit that correlates with the selected plan group
        or plan benefit
         */
        var me = this,
            view = me.getView();

        if (view.pageEntity == 'PlanGroup'){
            return view.findParentByType('tabpanel').lookupReference('plangroup').getSelection();
        }
        else if (view.pageEntity == 'PlanBenefit'){
            return view.findParentByType('tabpanel').down('planBenefit').getSelection();
        }
    },

    retrieveCbx: function(pageEntity){
        /*
        retrieves the target plan group/benefit combobox that correlates with the
        selected page
         */
        var me = this,
            view = me.getView();

        if (pageEntity == 'PlanGroup'){
            return view.down('plangrouptypeahead');
        }
        else {
            return view.down('[fieldLabel = Target Plan Benefit]');
        }
    }
});