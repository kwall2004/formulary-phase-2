/**
 * Created by m4542 on 10/27/2016.
 */
Ext.define('Atlas.common.view.MemberRxPortalWorkspaceViewController', {
    extend: 'Atlas.common.view.PortalWorkspaceController',
    alias: 'controller.memberrxportalworkspaceview',

    listen: {
        controller: {
            '*': {
                userSet: 'onAuthValid'
            }
        }
    },

    onAuthValid: function() {

        var store = this.getViewModel().getStore('navigation');
        store.load();
        // debugger;
        var user = Ext.first('viewport').getViewModel().getData().user,
            url = Atlas.apiURL + 'portal/rx/portalmembercoveragep/read';

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pSessionId: user.retSessionID,
                pRecipientId: user.retRecipientID
            }),
            success: function (response) {
                var obj = Ext.decode(response.responseText),
                    objArray = obj.data,
                    subString = "CMC Employees",
                    cmcFound = false,
                    now = Atlas.common.utility.Utilities.getLocalDateTime();
                now.setHours(0,0,0,0);
                subString = subString.toLowerCase();

                for (var i = 0; i < objArray.length; i++) {
                    var planName = objArray[i].PlanGroupName,
                        planTermDate = objArray[i].TermDate;

                    planName = planName.toLowerCase();
                    if(planTermDate != null)
                        planTermDate = new Date(planTermDate);
                    if (planName.indexOf(subString) != -1) {
                        if(planTermDate >= now || planTermDate == null) {
                            cmcFound = true;
                        }
                    }
                }

                if (cmcFound == false) {
                    store.filterBy(function(rec) {
                        return rec.data.menuTitle != "Request ID Card";
                    });
                }
            }
        });
    }

});