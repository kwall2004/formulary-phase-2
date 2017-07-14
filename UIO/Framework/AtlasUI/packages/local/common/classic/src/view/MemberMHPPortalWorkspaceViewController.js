/**
 * Created by t3852 on 10/19/2016.
 */
Ext.define('Atlas.common.view.MemberMHPPortalWorkspaceViewController', {
    extend: 'Atlas.common.view.PortalWorkspaceController',
    alias: 'controller.membermhpportalworkspaceview',


    listen: {
        controller: {
            '*': {
                userSet: 'onAuthValid'
            }
        }
    },

    onAuthValid: function() {
        var store = this.getViewModel().getStore('navigation'),
            user = Ext.first('viewport').getViewModel().get('user'),
            planID = 'hpm';

        if(user.portalStateSelected === 'IL') {
            planID = 'MHPIL';
        }

        store.getProxy().setExtraParam('pSessionID', user.sessionId);
        store.getProxy().setExtraParam('pPlanID', planID);
        store.getProxy().setExtraParam('pRecipientID', user.recipientId);
        store.getProxy().setExtraParam('pMemberID', user.memberId);
        store.getProxy().setExtraParam('pUserType', user.start);
        store.getProxy().setExtraParam('userState', user.portalStateSelected);
        store.getProxy().setExtraParam('pBenefitplandesc', user.benefitPlanCodeShortDesc);

        store.load();

    },

    onNavigationItemClick: function (tree, info) {
        var me = this,
            //client = me.getView()['atlasClient'],
            node = info.node || info,
            //TODO Match property name for new Workspaces. Should align to 'route'
            route = node.get('route') || node.get('routeId'),
            //routeInfo,
            parentMenuId = node.get('parentMenuID'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle');

        //<debug>
        console.log('Navigate to menuId=' + menuId + ', parentMenuId=' + parentMenuId + ' Single view querystring: ?single=yes' + '#' + route + '/' + menuId + '/' + parentMenuId);
        //</debug>

        if (route) {
            switch (route) {
                case ('nurseUrl'):
                    var user = Atlas.user;
                    sessionStorage.setItem('ssouser',user.memberId);
                    sessionStorage.setItem('ssouserplan', user.portalStateSelected);
                    sessionStorage.setItem('ssouserportalplan',user.portalPlanId);
                    sessionStorage.setItem('ssouserrecid', user.recipientId);
                    window.open(Atlas.nurseUrl);
                    break;
                case ('healthyHabitsUrl'):
                    var user = Atlas.user;
                    sessionStorage.setItem('ssouser',user.memberId);
                    sessionStorage.setItem('ssouserplan', user.portalStateSelected);
                    sessionStorage.setItem('ssouserportalplan',user.portalPlanId);
                    sessionStorage.setItem('ssouserrecid', user.recipientId);
                    window.open(Atlas.healthyHabitsUrl);
                    break;
                case ('healthEducationUrl'):
                    window.open('https://corp.mhplan.com/en/member/illinois/meridianhealthplan/health-library/');
                    break;
                case ('changePasswordNav'):
                    Ext.create('Atlas.portals.view.hpmember.ChangePassword').show();
                    break;
                case ('hpmember/portals/hpmember_HealthRiskAssessment'):
                    var user = Atlas.user,
                        referenceName = 'hpmember-hra';

                    if (user.isHealthyMI == 'yes') {
                        this.fireEvent('openView', 'hpmember', 'common', 'hra_HMSAssessmentWelcome', {
                            title: 'Health Risk Assessment',
                            reference: referenceName,
                            portalType: user.start
                        });
                    }
                    else {
                        this.fireEvent('openView', 'hpmember', 'portals', 'hpmember_HealthRiskAssessment', {
                            title: 'Health Risk Assessment',
                            reference: referenceName,
                            portalType: user.start
                        });
                    }
                    break;
                case ('viewBill'):
                    var nowDate = new Date(),
                        fromDate = new Date();
                    
                    fromDate.setDate(fromDate.getDate()-45);
                    var pThruDate = Ext.Date.format(nowDate, 'Y-m-d');
                    var pFromDate = Ext.Date.format(fromDate, 'Y-m-d');
                    var me = this,
                        vm = this.getViewModel(),
                        user = Ext.first('viewport').getViewModel().getData().user,
                        documentList = vm.getStore('documentlist');
                    
                    documentList.getProxy().setExtraParam('pIDList', user.recipientId);
                    documentList.getProxy().setExtraParam('pSourceEnv', 'MP');
                    documentList.getProxy().setExtraParam('pFromDate', pFromDate);
                    documentList.getProxy().setExtraParam('pThruDate', pThruDate);
                    documentList.getProxy().setExtraParam('pFromRecord', 1);
                    documentList.getProxy().setExtraParam('pToRecord', 1);
                    documentList.getProxy().setExtraParam('pSort', 'by docDate desc');
                    documentList.getProxy().setExtraParam('pDocCategory', 'Invoice');
                    
                    documentList.load({
                        callback: function (response, operation) {
                            var requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64Portal', {});
                            if (response != '') {
                                var jobNumber = response[0].data.jobNum;
                    
                                requestModel.phantom = false;
                                requestModel.getProxy().setExtraParam('pRegenReport', 3);
                                requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
                                requestModel.getProxy().setExtraParam('pJobNum', jobNumber);
                    
                                requestModel.save({
                                    success: function (response, operation) {
                                        var obj = Ext.JSON.decode(operation._response.responseText),
                                            base64EncodedPDF = obj.data;
                    
                                        if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                                            Ext.MessageBox.alert('Error', 'No current bill to display.', function(){});
                                        } else {
                                            Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                                        }
                                    }
                                });
                            } else {
                                Ext.MessageBox.alert('Error', 'No current bill to display.', function(){});
                            }
                        }
                    });
                    break;
                default:
                    me.fireEvent('routeTo', {
                        routeId: route,
                        parentMenuId: parentMenuId,
                        menuId: menuId,
                        title: menuTitle
                    });
                    break;
            }

        } else if(node.data.expanded === false){
            node.expand();
        } else {
            node.collapse();
        }
    }
});
