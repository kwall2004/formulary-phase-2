Ext.define("Atlas.benefitplan.data.proxy.BenefitPlanProxy", {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.benefitplan',

    // Keep a default copy of the action methods here. Ideally could just null
    // out actionMethods and just check if it exists & has a property, otherwise
    // fallback to the default. But at the moment it's defined as a public property,
    // so we need to be able to maintain the ability to modify/access it.
    actionMethods: {
        create: 'PUT',
        read: 'GET',
        update: 'PUT',
        destroy: 'DELETE'
    },
    //used for batching similar actions(creates, updates, destroys) vs sending them one at a time when doing a sync
    //batchActions: true,
    noCache: false,
    useDefaultXhrHeader: false,
    limitParam: 'pageSize',
    paramsAsJson: true,
    headers: {
        'Content-Type': 'application/json'
    },
    reader: {
        type: 'json',
        rootProperty: function (node) {
            return node.Rows || node.ChildrenNodes;
        },
        totalProperty: 'Count'
    },
    writer: {
        type: "json",
        writeAllFields: true,
        allDataOptions: {
            associated: true
        }
    },
    /**
     * Get the url for the request taking into account the order of priority,
     * - The request
     * - The api
     * - The url
     * @private
     * @param {Ext.data.Request} request The request
     * @return {String} The url
     */
    getUrl: function (request) {

        //debugger;

        if (request){
            var proxy = request.getProxy();
            var operation = request.getOperation();
            var idString = '';

            //debugger;
            // Add Routine to format this outside of this code
            // Enable one spot to handle all special assignment of query string parameters.

            if (request.getAction() === 'read' && request.getOperation().getId()) {
                idString = '?' + proxy.getIdParam() + '=' + operation.getId();
                if (request.config.proxy.treeTypeParam) {
                    idString = idString + '?treeType=' + request.config.proxy.treeTypeParam;
                }
            }

            if (request.getAction() === 'destroy' && !!proxy.skParam) {
                idString = '?' + proxy.getIdParam() + '=' + proxy.skParam + '&currentUser=' + proxy.userParam;
            }

            return Atlas.benefitplan.service.EnvironmentURLUtil.getEnvironmentBaseURL() + proxy.url + idString;

        } else {
            return this.callParent(arguments);
        }
    }
  /*  /!**
     * Get the url for the request taking into account the order of priority,
     * - The request
     * - The api
     * - The url
     * @private
     * @param {Ext.data.Request} request The request
     * @return {String} The url
     *!/
    getUrl: function (request) {
        if (request) {
            var proxy = request.getProxy();
            return Atlas.apiURL + 'benefitplan/api' + proxy.url;
            //return Atlas.apiURL + 'BenefitPlanApi/api' + proxy.url;
        } else {
            return this.callParent(arguments);
        }
    }*/
});
