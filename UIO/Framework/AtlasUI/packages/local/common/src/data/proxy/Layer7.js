/**
 * @example
 *  Ext.define('Atlas.pharmacy.model.Pharmacy', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'NCPDP', 'NPI', 'PharmacyName', 'Address', 'City', 'State', 'Zip', 'PIC'
    ],

    proxy: {
        //unifyOperations: true, // Set this to true if API expects create, update and destroy at the same endpoint -> /update
        //createUrl: 'pharmacy/{0}/pharmacycreate', // Set if there is a separate API for create operation
        //updateUrl: 'pharmacy/{0}/pharmacyupdate', // Set if there is a separate API for update operation
        //destroyUrl: 'pharmacy/{0}/pharmacydestroy', // Set if there is a separate API for create operation
        url: 'pharmacy/{0}/pharmacycreddetail' // API url. Required.
    }
});
 */

Ext.define('Atlas.common.data.proxy.Layer7', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.layer7',

    config: {
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },

        noCache: false,
        batchActions: false,

        useDefaultXhrHeader: false,
        withCredentials: true,
        limitParam: 'pageSize',
        paramsAsJson: true,

        headers: {
            'Content-Type': 'application/json' //'application/json'
        },

        createUrl: null,
        updateUrl: null,
        destroyUrl: null
    },

    urlBase: Atlas.apiURL, // for Atlas project
    atlasKey: 'rx', // used in Url generation to substitute placeholder. Should be set from Applciation once it changes.

    /**
     * @param unifyOperations {Boolean} Set to true to send create/update/delete operations as update
     * Note: additional parameter apiOperationFlag will be set to match operation name
     * Defaults to false
     */
    unifyOperations: false,

    /**
     * @param skipData {Boolean} True to exclude fields that originally were loaded via READ operation
     * Used in during non standard save using delimited parameters and values
     */
    skipData: false,

    reader: {
        type: 'json',
        metaProperty: 'metadata',
        useSimpleAccessors: true, // Workaround for field names containing dots
        rootProperty: 'data',
        totalProperty: 'total',
        successProperty: 'success',
        messageProperty: 'message'
    },

    writer: {
        type: 'json',
        nameProperty: 'mapping', //send back mapped properties rather than named
        //This server-side example relies on all fields
        writeAllFields: true // TBD [All | modified]
    },

    buildRequest: function (operation) {
        var me = this,
            initialParams = Ext.apply({}, operation.getParams()),
            // Clone params right now so that they can be mutated at any point further down the call stack
            params = Ext.applyIf(initialParams, me.getExtraParams() || {}),
            action = operation.getAction(),
            request,
            operationId,
            idParam;

        //copy any sorters, filters etc into the params so they can be sent over the wire
        Ext.applyIf(params, me.getParams(operation));

        // Set up the entity id parameter according to the configured name.
        // This defaults to "id". But TreeStore has a "nodeParam" configuration which
        // specifies the id parameter name of the node being loaded.
        operationId = operation.getId();
        idParam = me.getIdParam();

        if (operationId !== undefined && params[idParam] === undefined) {
            params[idParam] = operationId;
        }

        if (me.unifyOperations) {
            params['apiOperationFlag'] = action;
        }

        // New feature to send UUID with every request
        //params['requestGUID'] = Atlas.UUIDgen.generate();

        //--------
        request = new Ext.data.Request({
            params: params,
            action: action,
            records: operation.getRecords(),
            url: operation.getUrl(),
            operation: operation,

            // this is needed by JsonSimlet in order to properly construct responses for
            // requests from this proxy
            proxy: me
        });

        request.setUrl(me.buildUrl(request));

        /*
         * Save the request on the Operation. Operations don't usually care about Request and Response data, but in the
         * ServerProxy and any of its subclasses we add both request and response as they may be useful for further processing
         */
        operation.setRequest(request);

        return request;
    },

    buildUrl: function (request) {
        var me = this,
            url = me.getUrl(request);

        //<debug>
        if (!url) {
            Ext.raise('Layer 7 proxy should be configured with URL.');
        }
        //</debug>

        if (me.getNoCache()) {
            url = Ext.urlAppend(url, Ext.String.format("{0}={1}", me.getCacheString(), Ext.Date.now()));
        }

        return url;
    },

    getUrl: function (request) {
        var me = this,
            url = me.url,
            action;

        if (request) {
            action = request.getAction();

            if (me.createUrl && action === 'create') {
                url = me.createUrl;
            }

            if (me.updateUrl && action === 'update') {
                url = me.updateUrl;
            }

            if (me.destroyUrl && action === 'destroy') {
                url = me.destroyUrl;
            }

            //For some reason url defined on store proxy is using XTemplate, that will change placeholders !
            //Thus we check for string '/0/' and revert back in to /{0}/
            url = url.replace('/0/', '/{0}/');

            if (me.unifyOperations) {
                action = (action === 'read') ? 'read' : 'update';
            }
            url = me.urlBase + Ext.String.format(url, me.atlasKey) + '/' + action;
        }

        return url;
    },

    doRequest: function (operation) {
        var me = this,
            writer = me.getWriter(),
            request = me.buildRequest(operation),
            method = me.getMethod(request),
            jsonData, params;

        if (me.skipData) {
            // We skip the data payload
        } else {
            if (writer && operation.allowWrite()) {
                request = writer.write(request);
            }
        }

        request.setConfig({
            binary: me.getBinary(),
            headers: me.getHeaders(),
            timeout: me.getTimeout(),
            scope: me,
            callback: me.createRequestCallback(request, operation),
            method: method,
            useDefaultXhrHeader: me.getUseDefaultXhrHeader(),
            disableCaching: false
        });
        // explicitly set it to false, ServerProxy handles caching
        if (method.toUpperCase() !== 'GET' && me.getParamsAsJson()) {
            params = request.getParams();
            if (params) {
                jsonData = request.getJsonData();
                if (jsonData) {
                    jsonData = Ext.Object.merge({}, jsonData, params);
                } else {
                    jsonData = params;
                }
                request.setJsonData(jsonData);
                request.setParams(undefined);
            }
        }
        if (me.getWithCredentials()) {
            request.setWithCredentials(true);
            request.setUsername(me.getUsername());
            request.setPassword(me.getPassword());
        }
        return me.sendRequest(request);
    }
});