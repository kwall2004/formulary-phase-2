/**
 * Created by n6570 on 11/29/2016.
 */
Ext.define("Atlas.benefitplan.data.proxy.BenefitPlanAjax", {
    extend: 'Ext.data.Connection',
    singleton: true,

    defaultHeaders: {
      /*  'sessionid': Atlas.sessionId,
        'username': Atlas.user.un*/
    }
});

