/**
 * Created by b6636 on 11/1/2016.
 */
Ext.define('Atlas.common.hra.HMSAssessmentWelcomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hmsAssessmentController',

    /**
     * Called when the view is created
     */
    init: function () {
        var me = this,
            vm = me.getViewModel(),
            portalType = me.getView().portalType,
            recipientId = me.getView().recipientId,
            memberDetails = me.getView().memberDetails,
            user = Ext.first('viewport').getViewModel().get('user');

        // make sure the assessment form is initially hidden
        me.lookupReference('hmsAssessmentForm').setVisible(false);

        me.loadProviderStore();

        if (portalType == 'hpprovider') {
            vm.set('recipientId', recipientId);
            vm.set('userFirstName', memberDetails.firstName);
            vm.set('userLastName', memberDetails.lastName);
            vm.set('memberAddressLine1', memberDetails.respAddress1);
            vm.set('memberAddressLine2', (memberDetails.respAddress2 ? memberDetails.respAddress2 + '<br />' : ''));
            vm.set('memberCity', memberDetails.respCity);
            vm.set('memberState', memberDetails.respState);
            vm.set('memberZip', Ext.util.Format.usZip(memberDetails.respZip));
            vm.set('userState', user.providerStateSelected);
            me.lookupReference('providerWelcomePage').setVisible(true);
            me.lookupReference('welcomePage').setVisible(false);
        }
        else {
            vm.set('recipientId', user.recipientId);
            vm.set('userFirstName', user.firstName);
            vm.set('userLastName', user.lastName);
            vm.set('memberAddressLine1', user.respAddress1);
            vm.set('memberAddressLine2', (user.respAddress2 ? user.respAddress2 + '<br />' : ''));
            vm.set('memberCity', user.respCity);
            vm.set('memberState', user.respState);
            vm.set('memberZip', Ext.util.Format.usZip(user.respZip));
            vm.set('userState', user.portalStateSelected);
            me.lookupReference('welcomePage').setVisible(true);
            me.lookupReference('providerWelcomePage').setVisible(false);
        }

        vm.set('portalType', portalType);
        //vm.set('HEALTHY_MI_MEMBER_DOWNLOAD_LINK', '\<a target="_blank" href="resources/hpmember/forms/SURV11_HMP_HRA_Original.pdf">Healthy Michigan Survey Risk Assessment PDF</a>');
        vm.set('HEALTHY_MI_MEMBER_DOWNLOAD_LINK', 'resources/hpmember/forms/SURV11_HMP_HRA_Original.pdf');
        vm.set('HEALTHY_MI_PCP_INSTRUCTIONS_LINK', '\<a target="_blank" href="resources/hpmember/forms/FLYPS41_HMS_Provider_Instructions.pdf">Full Provider Instructions</a>');
        vm.set('currentDate', Ext.Date.format(new Date(), 'F d, Y'));

        me.loadAssessmentDataStore();
    },

    isProviderPortal: function() {
        var me = this,
            vm = me.getViewModel(),
            portalType = vm.get('portalType');

        return portalType === 'hpprovider';
    },

    isMemberPortal: function() {
        var me = this,
            vm = me.getViewModel(),
            portalType = vm.get('portalType');

        return portalType === 'hpmember';
    },

    hasMissingAnswers: function(tabPanelItem) {
        var me = this,
            vm = me.getViewModel(),
            portalType = vm.get('portalType'),
            questionStore = vm.getStore('memberAssessmentQA'),
            answerStore = vm.getStore('assessmentAnswerIO'),
            unansweredCount = 0;

        // loop through the questions
        questionStore.clearFilter(); // since this is stored in the view model, any filters applied remain.  make sure they are cleared out
        questionStore.each(function (question) {
            var questionRecord = question.data;

            var field = tabPanelItem.down('[hmsQuestionSystemId=' + questionRecord.systemID + ']');
            if (field && !field.disabled && (me.isProviderPortal() || me.isMemberPortal() && tabPanelItem.reference != 'hmsSection4')) {
                //console.log(field.fieldLabel);
                var controlName = '',
                    controlInfo;

                // get the answers for this question
                answerStore.clearFilter();
                answerStore.filter([
                    {
                        property: 'assessmentID',
                        value: questionRecord.assessmentID,
                        operator: '='
                    },
                    {
                        property: 'questionID',
                        value: questionRecord.questionID,
                        operator: '='
                    }
                ]);

                // determine the control type
                controlInfo = answerStore.data.items[0].getControlInfo(questionRecord);

                if (controlInfo.controlType == 'radio' || controlInfo.controlType == 'checkbox') {
                    if (!field.getValue()) {
                        unansweredCount++;
                    }
                }
                else if (controlInfo.controlType == 'textfield' || controlInfo.controlType == 'datefield') {
                    if (!field.getValue()) {
                        unansweredCount++;
                    }
                }
            }
        });

        return (unansweredCount > 0);
    },

    loadAssessmentDataStore: function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('assessmentData'),
            proxy = store.getProxy(),
            user = Ext.first('viewport').getViewModel().get('user');

        store.on({
            scope: me,
            single: true,
            load: 'onLoadAssessmentDataStore'
        });

        proxy.setExtraParam('pSessionID', user.sessionId);
        proxy.setExtraParam('viRecipientID', vm.get('recipientId'));
        proxy.setExtraParam('viAssessmentID', 1); // this is always 1
        proxy.setExtraParam('viAction', 'get');
        proxy.setExtraParam('vioSeqNum', 0);

        store.load();
    },

    onLoadAssessmentDataStore: function (store, records, success, operation, opts) {
        var objResp = Ext.decode(operation.getResponse().responseText);
        var metadataList = [],
            vm = this.getViewModel();

        metadataList = objResp.metadata;
        vm.set('vioSeqNum', metadataList.vioSeqNum);
        vm.set('completeDate', objResp.data[0].completeDate);
        this.loadSubStores(metadataList);
    },

    loadSubStores: function (metadataList) {
        var me = this,
            vm = me.getViewModel(),
            questionStore = vm.getStore('memberAssessmentQA'),
            answerStore = vm.getStore('assessmentAnswerIO'),
            sectionId = 0,
            container = {},
            controlsToAdd = [],
            listenersToAdd = [],
            parentQuestions = [],
            runToggleDependents = [],
            hmsModel = Ext.create('Atlas.portals.hpmember.model.HMSAssessmentForm'); // create an empty model and load the data as we are building the form

        vm.set('answers', metadataList.ttAssessmentAnswerIO.ttAssessmentAnswerIO);
        vm.set('questions', metadataList.ttmemberAssessmentQA.ttmemberAssessmentQA);

        answerStore.loadRawData(metadataList.ttAssessmentAnswerIO.ttAssessmentAnswerIO);
        questionStore.loadRawData(metadataList.ttmemberAssessmentQA.ttmemberAssessmentQA);

        // loop through and get the dependencies
        questionStore.each(function (model) {
            if (model.isSubQuestion()) {
                parentQuestions.push(model.dependencyQuestionId());
                listenersToAdd.push({
                    dependentQuestionId: model.data.questionID,
                    parentQuestionId: model.dependencyQuestionId(),
                    enableValue: model.dependencyEnableValue()
                })
            }
        }, me);

        vm.set('dependencies', listenersToAdd);

        questionStore.each(function (model) {
            var questionRecord = model.data,
                //container = {},
                hasDependencies = false,
                isDependent = false;

            hasDependencies = Ext.Array.contains(parentQuestions, questionRecord.questionID);
            isDependent = model.isSubQuestion();

            if (questionRecord.sectionHeader === true) {
                // this is a new section and its not the first time through
                if (sectionId > 0) {
                    container = me.lookupReference('hmsSection' + sectionId);
                    container.add(controlsToAdd);
                    controlsToAdd = []; // need to clear these out for the next pass
                }

                // increment the sectionid - every thing after section
                if (sectionId < 4) {
                    sectionId++;
                }
            }

            if (questionRecord.sectionHeader === true) {
                var header = new Ext.Component({
                    autoEl: {
                        html: '<u>' + questionRecord.questionDescription + '</u>',
                        tag: 'h2'
                    }
                });
                controlsToAdd.push(header);

                if (sectionId == 2) {
                    var additionalText = new Ext.Component({
                        autoEl: {
                            tag: 'p',
                            html: "A routine checkup is an important part of taking care of your health.  An annual check-up"+
                            "appointment is a covered benefit<br />of the Healthy Michigan Plan and your health plan can help you ride to "+
                            "and from this appointment."
                        }
                    });
                    controlsToAdd.push(additionalText);
                }

                if (questionRecord.questionID == 61) {
                    // This is the attestation section -- need custom message
                    var additionalAttestationText = new Ext.Component({
                        autoEl: {
                            tag: 'p',
                            html: "<b>Please click 'SUBMIT' below, to electronically sign and submit the HRA.  By clicking 'SUBMIT' you attest that you have " +
                            "completed the HRA and answered all questions to the best of your knowledge.  A PDF version of the completed HRA will be " +
                            "available for your records on this portal in the Documents Sub Tab of the Member Tab.  It will be available for you to print and distribute to the member.</b>"
                        }
                    });
                    controlsToAdd.push(additionalAttestationText);
                }
            }
            else { // not a section header
                var controlName = '',
                    controlInfo;

                // get the answers for this question
                answerStore.clearFilter();
                answerStore.filter([
                    {
                        property: 'assessmentID',
                        value: questionRecord.assessmentID,
                        operator: '='
                    },
                    {
                        property: 'questionID',
                        value: questionRecord.questionID,
                        operator: '='
                    }
                ]);

                // determine the control type
                controlInfo = answerStore.data.items[0].getControlInfo(questionRecord);

                // TODO: Need to handle special cases
                // Question 64 - this should be a dropdown of providers -- AssessmentDataForm line 2431
                // Question 65 - this should be a hidden field          -- AssessmentDataForm line 2436
                if (questionRecord.questionID == 64) {
                    answerStore.each(function (answerModel) {
                        var controlName = model.getControlName(sectionId),
                            providerCombo = {
                                xtype: 'combo',
                                reference: controlName,
                                name: controlName,
                                fieldLabel: questionRecord.questionDescription,
                                displayField: 'displayName',
                                valueField: 'displayName',
                                queryMode: 'local',
                                bind: {
                                    store: '{providers}'
                                },
                                hmsQuestionSystemId: questionRecord.systemID,
                                hmsAnswerSystemId: answerModel.data.systemID,
                                hmsQuestionId: questionRecord.questionID,
                                hmsQuestionSeq: answerModel.data.questionSeq,
                                hmsAnswerId: answerModel.data.answerID,
                                hmsAnswerSeq: answerModel.data.answerSeq,
                                // is this the answer the user gave?
                                value: answerModel.data.memberAnswerValue,
                                listeners: {
                                    select: 'onProviderSelect'
                                }
                            };
                        controlsToAdd.push(providerCombo);
                    });
                }
                else if (controlInfo.controlType == 'radio') {
                    // Create the radio button options for this question
                    var possibleAnswers = [];

                    answerStore.each(function (answerModel) {
                        var controlName = model.getControlName(sectionId),
                            radio = {
                                boxLabel: answerModel.data.answerDescription,
                                name: controlName,
                                inputValue: answerModel.data.answerValue,
                                hmsAnswerSystemId: answerModel.data.systemID,
                                hmsQuestionId: questionRecord.questionID,
                                hmsQuestionSeq: answerModel.data.questionSeq,
                                hmsAnswerId: answerModel.data.answerID,
                                hmsAnswerSeq: answerModel.data.answerSeq,
                                // is this the answer the user gave?
                                value: answerModel.data.memberAnswerValue
                            };
                        possibleAnswers.push(radio);
                    });

                    // need to create a radiogroup and add radios to it
                    var questionRadioGroup =
                    {
                        xtype: 'radiogroup',
                        fieldLabel: questionRecord.questionDescription,
                        items: possibleAnswers,
                        labelSeparator: '',
                        labelAlign: 'top',
                        hmsQuestionSystemId: questionRecord.systemID,
                        hmsQuestionId: questionRecord.questionID,
                        hmsChildControlName: controlName,
                        disabled: isDependent,
                        simpleValue: true
                    };

                    if ((questionRecord.questionID >= 14 && questionRecord.questionID <= 16) || questionRecord.questionID == 40) {
                        questionRadioGroup.columns = 2;
                    }

                    if (hasDependencies == true) {
                        questionRadioGroup.listeners = {change: 'toggleDependent'};
                        runToggleDependents.push(questionRadioGroup);
                    }

                    controlsToAdd.push(questionRadioGroup);
                }
                else if (controlInfo.controlType == 'checkbox') {
                    // Create the radio button options for this question
                    var possibleAnswers = [];

                    answerStore.each(function (answerModel) {
                        var controlName = model.getControlName(sectionId),
                            checkbox = {
                                boxLabel: answerModel.data.answerDescription,
                                name: controlName,
                                inputValue: answerModel.data.answerValue,
                                hmsAnswerSystemId: answerModel.data.systemID,
                                hmsQuestionId: answerModel.data.questionID,
                                hmsQuestionSeq: answerModel.data.questionSeq,
                                hmsAnswerId: answerModel.data.answerID,
                                hmsAnswerSeq: answerModel.data.answerSeq,
                                // is this the answer the user gave?
                                value: answerModel.data.memberAnswerValue
                            };

                        if (answerModel.data.freeTextInd == 1){
                            //this is the "Other" texbox
                            var container = {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: answerModel.data.answerDescription,
                                        labelSeparator: '',
                                        labelWidth: 40,
                                        name: controlName + '_textbox',
                                        hmsAnswerSystemId: answerModel.data.systemID,
                                        hmsQuestionId: answerModel.data.questionID,
                                        hmsQuestionSeq: answerModel.data.questionSeq,
                                        hmsAnswerId: answerModel.data.answerID,
                                        hmsAnswerSeq: answerModel.data.answerSeq,
                                        // is this the answer the user gave?
                                        value: answerModel.data.memberAnswerValue
                                    }
                                ]
                            };

                            possibleAnswers.push(container);
                        }
                        else {
                            possibleAnswers.push(checkbox);
                        }

                    });

                    // need to create a checkbox group and add checkboxes to it
                    var questionCheckBoxGroup =
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: questionRecord.questionDescription,
                        items: possibleAnswers,
                        labelSeparator: '',
                        labelAlign: 'top',
                        columns: 2,
                        hmsQuestionSystemId: questionRecord.systemID,
                        hmsQuestionId: questionRecord.questionID,
                        disabled: isDependent
                    };

                    if (hasDependencies == true) {
                        questionCheckBoxGroup.listeners = {change: 'toggleDependent'};
                        runToggleDependents.push(questionCheckBoxGroup);
                    }

                    controlsToAdd.push(questionCheckBoxGroup);
                }
                else if (controlInfo.controlType == 'textfield') {
                    // there should only be one - but we need to get the question and answer id and sequence
                    var fieldContainer,
                        isContainer = false;

                    if (answerStore.count() > 1) {
                        //console.log('*****', questionRecord.questionID, questionRecord.questionDescription, answerStore.count());
                        // this is a field group
                        fieldContainer = {
                            xtype: 'fieldcontainer',
                            fieldLabel: questionRecord.questionDescription,
                            labelSeparator: '',
                            items: []
                            // disabled: isDependent,
                            // hmsQuestionSystemId: questionRecord.systemID
                        };
                        isContainer = true;
                    }

                    answerStore.each(function (answerModel) {
                        var controlName = model.getControlName(sectionId),
                            textfield =
                            {
                                xtype: 'textfield',
                                fieldLabel: (answerModel.data.answerDescription ? answerModel.data.answerDescription : questionRecord.questionDescription),
                                labelSeparator: '',
                                name: model.getControlName(sectionId),
                                hmsAnswerSystemId: answerModel.data.systemID,
                                hmsQuestionSystemId: questionRecord.systemID,
                                hmsQuestionId: questionRecord.questionID,
                                hmsQuestionSeq: answerModel.data.questionSeq,
                                hmsAnswerId: answerModel.data.answerID,
                                hmsAnswerSeq: answerModel.data.answerSeq,
                                // is this the answer the user gave?
                                value: answerModel.data.memberAnswerValue,
                                disabled: isDependent
                            };

                        // ugh - special case
                        if (questionRecord.questionID == 65) {
                            textfield.xtype = 'hiddenfield';
                        }

                        // ugh - special case
                        if (questionRecord.questionID == 65 || questionRecord.questionID == 59) {
                            textfield.reference = controlName;
                        }

                        if (hasDependencies == true) {
                            //console.log('Need a listener for this textfield', textfield);
                            runToggleDependents.push(textfield);
                        }

                        if (isContainer) {
                            fieldContainer.items.push(textfield);
                        }
                        else {
                            //textfield.disabled = isDependent;
                            controlsToAdd.push(textfield);
                        }
                    });

                    if (isContainer) {
                        controlsToAdd.push(fieldContainer);
                    }
                }
                else if (controlInfo.controlType == 'textareafield') {
                    // there should only be one - but we need to get the question and answer id and sequence
                    //if (answerStore.count() > 1) {console.log('*****', questionRecord.questionID, questionRecord.questionDescription, answerStore.count());}
                    answerStore.each(function (answerModel) {
                        var controlName = model.getControlName(sectionId),
                            textfield =
                            {
                                xtype: 'textareafield',
                                fieldLabel: questionRecord.questionDescription,
                                labelSeparator: '',
                                labelAlign: 'top',
                                width: controlInfo.width,
                                name: model.getControlName(sectionId),
                                hmsAnswerSystemId: answerModel.data.systemID,
                                hmsQuestionSystemId: questionRecord.systemID,
                                hmsQuestionId: questionRecord.questionID,
                                hmsQuestionSeq: answerModel.data.questionSeq,
                                hmsAnswerId: answerModel.data.answerID,
                                hmsAnswerSeq: answerModel.data.answerSeq,
                                // is this the answer the user gave?
                                value: answerModel.data.memberAnswerValue
                            };

                        if (hasDependencies == true) {
                            //<debug>
                            console.log('Need a listener for this textareafield', textfield);
                            //</debug>
                            runToggleDependents.push(textfield);
                        }
                        controlsToAdd.push(textfield);
                    });
                }
                else if (controlInfo.controlType == 'datefield') {
                    // there should only be one - but we need to get the question and answer id and sequence
                    //if (answerStore.count() > 1) {console.log('*****', questionRecord.questionID, questionRecord.questionDescription, answerStore.count());}
                    answerStore.each(function (answerModel) {
                        // what date format are we looking for?
                        var dateFormat = 'MM/DD/YY',
                            invalidText;
                        if (questionRecord.questionDescription.indexOf('MM/YYYY') >= 0) {
                            dateFormat = 'MM/YYYY'
                        }

                        invalidText = '{0} is not a valid date - it must be in the format ' + dateFormat;

                        var controlName = model.getControlName(sectionId),
                            datefield =
                            {
                                xtype: 'datefield',
                                name: model.getControlName(sectionId),
                                reference: model.getControlName(sectionId),
                                fieldLabel: questionRecord.questionDescription,
                                labelSeparator: '',
                                format: controlInfo.dateFormat,
                                submitFormat: 'mdy',
                                invalidText: invalidText,
                                hmsAnswerSystemId: answerModel.data.systemID,
                                hmsQuestionSystemId: questionRecord.systemID,
                                hmsQuestionId: answerModel.data.questionID,
                                hmsQuestionSeq: answerModel.data.questionSeq,
                                hmsAnswerId: answerModel.data.answerID,
                                hmsAnswerSeq: answerModel.data.answerSeq,
                                // is this the answer the user gave?
                                value: answerModel.data.memberAnswerValue
                            };

                        if (hasDependencies == true) {
                            //<debug>
                            console.log('Need a listener for this datefield', datefield);
                            //</debug>
                            runToggleDependents.push(datefield);
                        }
                        controlsToAdd.push(datefield);
                    });
                }

                // is there a tool tip for this question? but only if it is question 12 or 13
                if (questionRecord.tooltip && (questionRecord.questionID == 12 || questionRecord.questionID == 13)) {
                    var hr = new Ext.Component({
                        autoEl: {
                            tag: 'hr'
                        }
                    });

                    var toolTip = new Ext.Component({
                        autoEl: {
                            html: questionRecord.tooltip,
                            tag: 'p'
                        }
                    });

                    controlsToAdd.push(hr);
                    controlsToAdd.push(toolTip);
                    if (questionRecord.questionID == 13){
                        var hr2 = new Ext.Component({
                            autoEl: {
                                tag: 'hr'
                            }
                        });
                        controlsToAdd.push(hr2);
                    }
                }

                // question Record
                //console.log(model.getControlName(sectionId));
            } // end not a section header

        }, me);

        // add the last question
        container = me.lookupReference('hmsSection' + sectionId);
        container.add(controlsToAdd);

        runToggleDependents.forEach(function(element, index, array){
            var form = me.getView().down('form'),
                field = form.down('[hmsQuestionSystemId=' + element.hmsQuestionSystemId + ']');

            me.toggleDependent(field);
        });

        // Disable section 4 if we are not in the provider portal
        if (!me.isProviderPortal()) {
            this.disableChildControls(this.lookupReference('hmsSection4'), me);
        }

        me.disableHRAIfComplete();
    },

    displayHMSAssessmentForm: function () {
        var me = this;
        me.lookupReference('welcomePage').setVisible(false);
        me.lookupReference('providerWelcomePage').setVisible(false);
        me.lookupReference('hmsAssessmentForm').setVisible(true);
    },

    displayProviderHMSAssessmentForm: function () {
        var me = this,
            message = "Thank you for choosing to perform the Health Risk Assessment online.<br /><br />"+
        "By choosing to perform the survey online, you have also chosen to provide an electronic signature for the attestation.<br /><br />"+
        "After completing and signing the survey, a pdf version including your electronic signature will be<br /> stored "+
        "in a digital format on this portal. Creating the pdf file may not occur immediately. Once it is<br />ready, you will "+
        "be able to access this information in the documents sub tab of the member tab.<br /><br />"+
        "Please note that if you complete the survey online, but choose not to sign it electronically, you will<br />need "+
        "to print a blank PDF version and complete the survey once more by hand. You may then <br />sign and fax "+
        "that document to Meridian Health Plan's Quality Improvement department<br />at 313-324-9120.<br /><br />"+
        "If you agree to these conditions and wish to provide an electronic signature, click 'I agree' below.<br /><br />"+
        "If you prefer to print, complete and fax a paper version, click 'I decline' below.<br /><br />";

        Ext.Msg.show({
            title: 'Process to Online Health Risk Assessment',
            message: message,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'I Agree',
                no: 'I Decline'
            },
            fn: function(btn) {
                if (btn === 'yes') {
                    me.displayHMSAssessmentForm();
                }
                if (btn === 'no') {
                    me.providerDeclineOnlineSurvey();
                }
            }
        });
    },

    providerDeclineOnlineSurvey: function(){
        var me = this,
            vm = me.getViewModel(),
            message = '<p>You chose NOT to perform the online survey.</p>'
        + '<p>The alternative is to print the survey and fill it out on paper.</p>'
        + '<p><a target="_blank" href="' + vm.get('HEALTHY_MI_MEMBER_DOWNLOAD_LINK') + '">Download and print PDF version of the Health Risk Assessment</a><p>'
        + '<p>Once you have completed and signed the survey, you may fax it to Meridian Health Plan\'s Quality<br />Improvement department at 313-324-9120.</p>'
        + '<p>Please note that a faxed in survey will replace any answers that were provided through the portal.</p>';

        Ext.Msg.show({
            title: 'Decline online Health Risk Assessment',
            message: message,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Close',
                no: 'Back'
            },
            fn: function(btn) {
                if (btn === 'no') {
                    me.displayProviderHMSAssessmentForm();
                }
            }
        });
    },

    checkAnswersAndNavigate: function (panel, direction) {
        // This routine could contain business logic required to manage the navigation steps.
        // It would call setActiveItem as needed, manage navigation button state, handle any
        // branching logic that might be required, handle alternate actions like cancellation
        // or finalization, etc.  A complete wizard implementation could get pretty
        // sophisticated depending on the complexity required, and should probably be
        // done as a subclass of CardLayout in a real-world implementation.
        var me = this,
            layout = panel.getLayout(),
            activeItem = layout.getActiveItem();

        if (me.hasMissingAnswers(activeItem) && me.canEditHra()){
            Ext.Msg.show({
                title:'Warning',
                message: 'One or more questions have not been answered. Do you wish to continue? Click Yes to continue or No to remain on the page.',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.INFO,
                fn: function(btn) {
                    if (btn === 'yes') {
                        me.navigate(panel, direction);
                    }
                }
            });
        }
        else {
            if (me.canEditHra()) {
                me.saveDraft();
            }
            me.navigate(panel, direction);
        }
    },

    // navigate checks to make sure we are clear to move to the next page, navigate actually moves to the next page
    navigate: function (panel, direction) {
        var me = this,
            layout = panel.getLayout();

        if (direction == 'prev' || direction == 'next') {
            layout[direction]();
        }
        else {
            layout.setActiveItem(direction);
        }

        Ext.getCmp('hms-move-prev').setDisabled(!layout.getPrev());
        Ext.getCmp('hms-move-next').setDisabled(!layout.getNext());
        Ext.getCmp('hms-saveSubmit').setDisabled(layout.getNext()); // only enable this on the last page
    },

    onSaveDraft: function (sender, e) {
        this.saveDraft();
        Ext.Msg.alert('Success', 'Draft saved.');
    },

    onSubmit: function (sender, e) {
        this.saveDraft();
        if (this.preSaveValidations()) {
            if (this.validate()) {
                // need to attest and then submit
                this.showAttestDialog();
            }
            else {
                Ext.Msg.alert('Error', 'Please correct noted errors.');
            }
        }
    },

    onPrint: function (sender, e) {
        var me = this;
        if (me.canEditHra()) {
            this.saveDraft();
        }
        this.sendToPrinter();
        //this.print();
    },

    onRefused: function (sender, e) {
        var me = this,
            vm = me.getViewModel(),
            portalType = vm.get('portalType'),
            providerPortalMessage = "You have indicated the Member does not wish to complete the Healthy Michigan Plan health risk assessment.  If the Member wishes"+
            " to complete this assessment in the future he or she may do so at any time online through the member portal or with you, the Provider.  "+
            "If the Member has any questions they may contact Meridian's Member Services department at 888-437-0606.",
            memberPortalMessage = "Thank you for logging into the Meridian Health Plan Member Portal. You have " +
                "indicated that you do not wish to complete the Healthy Michigan Plan health risk assessment. " +
                "If you wish to complete this assessment in the future, you may do so at any time online through " +
                "the member portal or with your doctor. The assessment will be considered complete once we receive " +
                "a signed version from your doctor. If you have any questions, please contact Meridian's Member " +
                "Services department at 888-437-0606.",
            message;

        if (portalType == 'hpprovider') {
            message = providerPortalMessage;
        }
        else {
            message = memberPortalMessage;
        }

        Ext.Msg.alert('Message', message);

        // return to the instructions page
        this.navigate(this.getView().down('form'), 0);
    },

    saveDraft: function () {
        var me = this,
            vm = me.getViewModel(),
            answers = vm.get('answers'), // these are already in a store?
            questions = vm.get('questions'), // these are already in a store?
            questionStore = vm.getStore('memberAssessmentQA'),
            answerStore = vm.getStore('assessmentAnswerIO'),
            form = me.getView().down('form'), //.getForm(), // difference between form and form.basic
            record = form.getValues(),
            answerPayload = [],
            user = Ext.first('viewport').getViewModel().get('user'),
            recipientId = vm.get('recipientId');

        form.mask('Saving...');

        // loop through the questions
        questionStore.clearFilter(); // since this is stored in the view model, any filters applied remain.  make sure they are cleared out
        questionStore.each(function (question) {
            var questionRecord = question.data;

            var field = form.down('[hmsQuestionSystemId=' + questionRecord.systemID + ']');
            if (field) {
                //console.log(field.fieldLabel);
                var controlName = '',
                    controlInfo;

                // get the answers for this question
                answerStore.clearFilter();
                answerStore.filter([
                    {
                        property: 'assessmentID',
                        value: questionRecord.assessmentID,
                        operator: '='
                    },
                    {
                        property: 'questionID',
                        value: questionRecord.questionID,
                        operator: '='
                    }
                ]);

                // determine the control type
                controlInfo = answerStore.data.items[0].getControlInfo(questionRecord);

                if (controlInfo.controlType == 'radio' || controlInfo.controlType == 'checkbox') {
                    answerStore.each(function (answer) {
                        var answerRecord = answer.data;
                        var answerField = form.down('[hmsAnswerSystemId=' + answerRecord.systemID + ']');
                        if (answerField) {
                            if (answerField.xtype == 'textfield') { // this is the other textbox for a checkbox group
                                answerPayload.push({
                                    questionID: answerField.hmsQuestionId,
                                    questionSeq: answerField.hmsQuestionSeq,
                                    answerID: answerField.hmsAnswerId,
                                    answerSeq: answerField.hmsAnswerSeq,
                                    memberAnswerValue: answerField.getValue()
                                });
                            }
                            else {
                                //console.log(answerField.boxLabel, answerField.hmsAnswerId, answerField.hmsAnswerSeq, answerField.inputValue, answerField.value);
                                if (answerField.value == true) {
                                    answerPayload.push({
                                        questionID: answerField.hmsQuestionId,
                                        questionSeq: answerField.hmsQuestionSeq,
                                        answerID: answerField.hmsAnswerId,
                                        answerSeq: answerField.hmsAnswerSeq,
                                        memberAnswerValue: answerField.inputValue
                                    });
                                }
                            }
                        }
                    });
                }
                else if (controlInfo.controlType == 'textfield' || controlInfo.controlType == 'textareafield') {
                    answerStore.each(function (answer) {
                        var answerRecord = answer.data;
                        var answerField = form.down('[hmsAnswerSystemId=' + answerRecord.systemID + ']');
                        if (answerField) {
                            //console.log(answerField.fieldLabel, answerField.hmsAnswerId, answerField.hmsAnswerSeq, answerField.inputValue, answerField.value);
                            if (answerField.value) {
                                answerPayload.push({
                                    questionID: answerField.hmsQuestionId,
                                    questionSeq: answerField.hmsQuestionSeq,
                                    answerID: answerField.hmsAnswerId,
                                    answerSeq: answerField.hmsAnswerSeq,
                                    memberAnswerValue: answerField.rawValue
                                })
                            }
                        }
                    });
                }
                else if (controlInfo.controlType == 'datefield') {
                    answerStore.each(function (answer) {
                        var answerRecord = answer.data;
                        var answerField = form.down('[hmsAnswerSystemId=' + answerRecord.systemID + ']');
                        if (answerField) {
                            //console.log(answerField.fieldLabel, answerField.hmsAnswerId, answerField.hmsAnswerSeq, answerField.inputValue, answerField.value);
                            if (answerField.value) {
                                answerPayload.push({
                                    questionID: answerField.hmsQuestionId,
                                    questionSeq: answerField.hmsQuestionSeq,
                                    answerID: answerField.hmsAnswerId,
                                    answerSeq: answerField.hmsAnswerSeq,
                                    memberAnswerValue: answerField.getSubmitValue()
                                })
                            }
                        }
                    });
                }
            }
        });

        // Save draft
        var response = Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            async: false,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'member/hp/memberasssessmentdataweb/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pSessionID: user.sessionId,
                userState: vm.get('userState'),
                viRecipientID: recipientId,
                viAssessmentID: 1, // this is constant
                viAction: 'set', // one API call to rule them all!
                vioSeqNum: vm.get('vioSeqNum'),
                ttAssessmentAnswerIO: {ttAssessmentAnswerIO: answerPayload}
            })
        });

        form.unmask();

        var obj = Ext.decode(response.responseText);
        return obj.metadata.pSeqNum;

    },

    disableChildControls: function (control, controller) {
        if (control.items) {
            control.items.each(function (item) {
                switch (item.xtype) {
                    case 'textfield':
                        item.setReadOnly(true);
                        break;
                    case 'datefield':
                        item.setReadOnly(true);
                        break;
                    case 'checkboxfield':
                        item.setReadOnly(true);
                        break;
                    case 'radiofield':
                        item.setReadOnly(true);
                        break;
                    case 'combobox':
                        item.setReadOnly(true);
                        break;
                    case 'radiogroup':
                        controller.disableChildControls(item, controller);
                        break;
                    case 'checkboxgroup':
                        controller.disableChildControls(item, controller);
                        break;
                    case 'fieldcontainer':
                        controller.disableChildControls(item, controller);
                        break;
                    default:
                    //console.log('This is the odd man out...xtype: ' + item.xtype + ', name: ' + item.name + ', id: ' + item.id);
                }
                return true;
            })
        }
    },

    validate: function () {
        var me = this,
            vm = me.getViewModel(),
            questionStore = vm.getStore('memberAssessmentQA'),
            form = me.getView().down('form'),
            user = Ext.first('viewport').getViewModel().get('user'),
            recipientId = vm.get('recipientId'),
            isValid = true,
            response = Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                async: false,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'member/hp/memberasssessmentdataweb/read',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pSessionID: user.sessionId,
                    userState: vm.get('userState'),
                    viRecipientID: recipientId,
                    viAssessmentID: 1, // this is constant
                    viAction: 'validate', // one API call to rule them all!
                    vioSeqNum: vm.get('vioSeqNum'),
                    ttAssessmentAnswerIO: {ttAssessmentAnswerIO: []}
                })
            });

        var obj = Ext.decode(response.responseText);
        if (obj.message[0].code == 404) {
            isValid = false;
            // the validation call returned errors
            obj.metadata.ttErrorMessages.ttErrorMessages.forEach(function(item){
                questionStore.clearFilter();
                questionStore.filter([
                    {
                        property: 'questionID',
                        value: item.questionid,
                        operator: '='
                    }
                ]);

                questionStore.each(function(questionModel){
                    var field = form.down('[hmsQuestionSystemId=' + questionModel.data.systemID + ']');
                    if (field) {
                        field.markInvalid(item.errormessage);
                    }
                    else {
                        //<debug>
                        console.log('** Unhandled validation error **', item);
                        //</debug>
                    }
                })

            })
        }

        return isValid;
    },

    submit: function () {
        var me = this,
            vm = me.getViewModel(),
            questionStore = vm.getStore('memberAssessmentQA'),
            form = me.getView().down('form'),
            user = Ext.first('viewport').getViewModel().get('user'),
            recipientId = vm.get('recipientId'),
            isValid = true,
            response = Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                async: false,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'member/hp/memberasssessmentdataweb/read',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pSessionID: user.sessionId,
                    userState: vm.get('userState'),
                    viRecipientID: recipientId,
                    viAssessmentID: 1, // this is constant
                    viAction: 'submit', // one API call to rule them all!
                    vioSeqNum: vm.get('vioSeqNum'),
                    ttAssessmentAnswerIO: {ttAssessmentAnswerIO: []}
                })
            });

        var obj = Ext.decode(response.responseText);
        if (obj.message[0].code == 404) {
            isValid = false;
            // the validation call returned errors
            obj.metadata.ttErrorMessages.ttErrorMessages.forEach(function(item){
                questionStore.clearFilter();
                questionStore.filter([
                    {
                        property: 'questionID',
                        value: item.questionid,
                        operator: '='
                    }
                ]);

                questionStore.each(function(questionModel){
                    var field = form.down('[hmsQuestionSystemId=' + questionModel.data.systemID + ']');
                    if (field) {
                        field.markInvalid(item.errormessage);
                    }
                    else {
                        //<debug>
                        console.log('** Unhandled validation error **', item);
                        //</debug>
                    }
                })

            })
        }

        return isValid;
    },

    toggleDependent: function (sender) {
        var me = this,
            vm = this.getViewModel(),
            form = me.getView().down('form'),
            dependencies = vm.get('dependencies'),
            questionId = sender.hmsQuestionId,
            selectedValue = sender.getValue(),
            questionStore = vm.getStore('memberAssessmentQA');

        // get the selected value. This will vary depending on the type of control
        if (sender.xtype = 'radiogroup') {

        }
        else {
            selectedValue = sender.getValue();
        }

        dependencies.forEach(function(element, index, array) {
            if (element.parentQuestionId == questionId) {
                // get child control -- look in questions for QuestionId, get the systemId
                questionStore.clearFilter();
                questionStore.filter([
                    {
                        property: 'questionID',
                        value: element.dependentQuestionId,
                        operator: '='
                    }
                ]);

                // enable/disable child control
                questionStore.each(function (model) {
                    var dependentFields = form.query('[hmsQuestionSystemId=' + model.data.systemID + ']');
                    dependentFields.forEach(function(item){
                        if (selectedValue == element.enableValue) {
                            item.enable();
                        }
                        else {
                            // we need to be able to clear out a raido button that becomes disabled
                            if (item.xtype =='radiogroup' ){
                                item.items.items.forEach(function(radioItem){
                                    radioItem.setValue(false);
                                })
                            }
                            else {
                                item.setValue();
                            }
                            item.disable();
                        }
                    });
                });
            }
        });
    },

    loadProviderStore: function() {
        var me = this,
            providerStore = me.getView().getViewModel().getStore('providers'),
            user = Ext.first('viewport').getViewModel().get('user');

        providerStore.getProxy().setExtraParam('pUserName', user.un);
        providerStore.load();
    },

    preSaveValidations: function(){
        var me = this,
            vm = me.getViewModel(),
            portalType = vm.get('portalType'),
            isValid = true,
            providerNPIControl = me.lookupReference('ProviderNPI'),
            providerNPIValue = providerNPIControl.getValue(),
            providerNameControl = me.lookupReference('ProviderName'),
            providerNameValue = providerNameControl.getValue();

        if (portalType == 'hpprovider') {
            if (providerNameValue && providerNPIValue) {
                if (providerNameControl.selection.data.npinNum != providerNPIValue) {
                    isValid = false;
                    providerNPIControl.markInvalid('Invalid NPI entered for the selected provider');
                }
            }
            else {
                if (!providerNameValue) {
                    providerNameControl.markInvalid('Provider name is required');
                }

                if (!providerNPIValue) {
                    providerNPIControl.markInvalid('NPI of selected provider is required');
                }
                isValid = false;
            }
        }

        return isValid;
    },
    
    onProviderSelect: function(sender, record, eOpts) {
        var me = this,
            meridianProviderId = me.lookupReference('MeridianProviderId');

        if (record) {
            meridianProviderId.setValue(record.data.provID);
        }
        else {
            meridianProviderId.setValue('');
        }
    },

    showAttestDialog: function() {
        var me = this,
            win = me.lookupReference('attestDialog'),
            ProviderName = me.lookupReference('ProviderName'),
            ProviderNPI = me.lookupReference('ProviderNPI'),
            AttestationDate = me.lookupReference('AttestationDate'),
            attestName = me.lookupReference('attestName'),
            attestNPI = me.lookupReference('attestNPI'),
            attestDate = me.lookupReference('attestDate');

        attestName.setValue(ProviderName.getValue());
        attestNPI.setValue(ProviderNPI.getValue());
        attestDate.setValue(AttestationDate.getRawValue());

        win.show();
    },

    onAttestSign: function() {
        var me = this,
            user = Ext.first('viewport').getViewModel().get('user'),
            attestPassword = me.lookupReference('attestPassword'),
            form = me.getView().down('form');

        form.mask('Submitting...');

        // validate the users password
        var authUrl = Atlas.apiURL + 'eligibility/hp/userinfoweb/read';

        var response = Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            async: false,
            noCache: false,
            url: authUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pUserName: user.un,
                pPassword: Ext.util.Base64.encode(attestPassword.getValue()),
                pUserIPaddress: 'test',
                pBrowserName: 'test',
                pBrowserVersion: 'test',
                pScreenResolutionWidth: 'test',
                pScreenResolutionHeight: 'test',
                pOperatingSystem: 'test',
                userState: user.providerStateSelected
            })
        });

        var returnFields = Ext.decode(response.responseText);

        if (returnFields.data[0].value != '') {
            me.submitHRA();
        } else {
            form.unmask();
            Ext.Msg.alert('Error', 'Invalid password entered.');
        }
    },

    onAttestCancel: function() {
        var me = this,
            win = me.lookupReference('attestDialog');

        win.hide();
    },

    submitHRA: function() {
        var me = this,
            vm = me.getViewModel(),
            win = me.lookupReference('attestDialog'),
            recipientId = vm.get('recipientId'),
            user = Ext.first('viewport').getViewModel().get('user'),
            form = me.getView().down('form');

        // Submit HRA
        var response = Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            async: false,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'member/hp/memberasssessmentdataweb/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pSessionID: user.sessionId,
                userState: vm.get('userState'),
                viRecipientID: recipientId,
                viAssessmentID: 1, // this is constant
                viAction: 'submit', // one API call to rule them all!
                vioSeqNum: vm.get('vioSeqNum'),
                ttAssessmentAnswerIO: {ttAssessmentAnswerIO: []}
            })
        });

        // check for errors
        var obj = Ext.decode(response.responseText),
            errorCount = 0;

        obj.metadata.ttErrorMessages.ttErrorMessages.forEach(function(item){
            errorCount = errorCount + 1;

        })

        if (errorCount > 0) {
            Ext.Msg.alert('Error', 'The HRA could not be submitted.');
        }
        else {
            vm.set('completeDate', new Date());
            me.disableHRAIfComplete();
            win.hide();
            Ext.Msg.alert('HRA Submitted', 'To view/print the completed HRA survey, please click on the HRA link on the Documents Sub Tab of the Member Tab.');
        }

        form.unmask();
    },

    canEditHra: function () {
        var me = this,
            vm = me.getViewModel(),
            completeDate = vm.get('completeDate');

        if (completeDate) {
            return false; // there is a complete date - don't allow editing
        }
        else {
            return true;
        }
    },

    disableHRAIfComplete: function() {
        var me = this;

        if (!me.canEditHra()) {
            // disable controls
            me.disableChildControls(me.lookupReference('hmsSection1'), me);
            me.disableChildControls(me.lookupReference('hmsSection2'), me);
            me.disableChildControls(me.lookupReference('hmsSection3'), me);
            me.disableChildControls(me.lookupReference('hmsSection4'), me);

            // hide the buttons
            Ext.getCmp('hms-save').hide();
            Ext.getCmp('hms-saveSubmit').hide();
            Ext.getCmp('hms-refused').hide();
        }
    },

    processHMSButtonClick: function (btn) {
        this.checkAnswersAndNavigate(btn.up("panel"), btn.hmsDirection);
    }
});
