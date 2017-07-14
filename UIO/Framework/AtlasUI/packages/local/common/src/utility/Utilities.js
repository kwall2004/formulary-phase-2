/**
 * Created by g2304 on 10/13/2016.
 */
Ext.define('Atlas.common.utility.Utilities', {
    singleton: true,

    /**
     *
     * @param {array} stores array of stores. if not a temp table CRD request,  json object of field list and value list: e.g. {key1: value1, key2:value2...} need to be passed.
     * @param {string} endPoint relative path need be passed without  "/" at beginning
     * @param {string} tempTableNames comma separated list of temp table name.
     * @param {array} trackingRemoved array of boolean to identify if corresponding store need to send deleted records to server, so that these records can be removed from databsae.
     * @param {json} parameters any extra parameters that need to send with the request in json format. sessionID is automatically passed, no need to specify.
     * @param {array} saveActions array of json object for each store to specify the keyword for each action of CRD:
     *         valid operations are Create, Update and  Delete for temp table related operation, Save is the operation for case of no temp table scenario.
     *         example: 2 temp tables:
     *              [{"Create": {key:'Action', value: 'A'}, "Update":{key:'Action', value: 'U'},"Delete": {key:'Action', value: 'D'}},
     *               {"Create": {key:'Action', value: 'A'}, "Update":{key:'Action', value: 'U'},"Delete": {key:'Action', value: 'D'}} ]
     *         example: no temp table:
     *         [{"Save": {"key": "mode", "value": "Update"}}]
     * @param {json} returnFields any extra value need to be return from server other than pResult, pMessage which are always be there.
     *
     */
    saveData: function (stores, endPoint, tempTableNames, trackingRemoved, parameters, saveActions, returnFields) {
        if (arguments.length < 7) {
            Ext.MessageBox.alert("Parameter Error", "Not all arugments entered.");
            return false;
        }

        var requestParameter = {};

        function saveDataSingleTT(store, tempTableName, trackingRemoved, saveAction) {
            var requestParameter = {};
            var recordsModified = [];

            var removeAction = saveAction.Delete;
            var createAction = saveAction.Create;
            var updateAction = saveAction.Update;


            if (trackingRemoved) {
                for (var i in store.removed) {
                    var rec = store.removed[i];
                    var recordData = rec.data;
                    recordData[removeAction.key] = removeAction.value;
                    recordsModified.push(recordData);
                }
            }


            for (var i in store.data.items) {
                var item = store.data.items[i];
                if (!!item.dirty) {
                    var recordData = item.data;
                    if (item.crudState == 'C') {
                        recordData[createAction.key] = createAction.value;
                    }
                    else {
                        recordData[updateAction.key] = updateAction.value;
                    }

                    recordsModified.push(recordData);
                }
            }

            requestParameter[tempTableName] = recordsModified;

            return requestParameter;
        }

        function saveDataNoTT(store, crudAction) {
            var requestParameter = {};
            for (var key in store) {
                requestParameter[key] = store[key];
            }
            requestParameter[crudAction.Save.key] = crudAction.Save.value;

            return requestParameter;
        }

        if (!tempTableNames) {
            requestParameter = saveDataNoTT(stores[0], saveActions[0]);
        }
        else {
            var tempTTArray = tempTableNames.split(',');
            for (var i = 0; i < tempTTArray.length; i++) {
                var store = stores[i],
                    tempTablename = tempTTArray[i],
                    tracking = trackingRemoved[i],
                    saveAction = saveActions[i];

                requestParameter[tempTablename] = saveDataSingleTT(store, tempTablename, tracking, saveAction);
            }
        }

        if (!returnFields) returnFields = [];
        //returnFields = returnFields.concat(['code', 'message']);

        for (var key in parameters) {
            requestParameter[key] = parameters[key];
        }
        requestParameter.pSessionId = Atlas.user.sessionId;
        requestParameter.pSessionID = Atlas.user.sessionId;
        var fullUrl = Atlas.apiURL + endPoint;

        var returnValue = {};

        var theResponse = Ext.Ajax.request({
            url: fullUrl,
            timeout: 120000,
            useDefaultXhrHeader: false,
            paramsAsJson: true,
            noCache: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // cors:true,
            jsonData: requestParameter,
            async: false,

            success: function (response) {
                var responseJSON = Ext.decode(response.responseText);

                returnValue.code = responseJSON.message[0].code;
                returnValue.message = responseJSON.message[0].message;

                //if (returnValue.code != 0) {
                //    Ext.MessageBox.alert('Error', 'Data is not saved<br>' + returnValue.message);
                //    return returnValue;
                //}
                for (i = 0; i < returnFields.length; i++) {
                    returnValue[returnFields[i]] = responseJSON.metadata[returnFields[i]];
                }

                // console.log("return value:" + returnValue);
//                return returnValue;
            },

            failure: function (response) {
                //Ext.MessageBox.alert('Error', 'Data is not saved');
                returnValue = Ext.decode(response, true) || response;
            },

            callback: function (response, opt, a) {

            }
        });

        // console.log(returnValue);

        // console.log(theResponse);

        return returnValue;
    },


    post: function (endPoint, parameters, returnFields) {
        var requestParameter = {};

        if (!returnFields) returnFields = [];
        //returnFields = returnFields.concat(['code', 'message']);

        for (var key in parameters) {
            requestParameter[key] = parameters[key];
        }
        requestParameter.pSessionId = Atlas.user.sessionId;
        requestParameter.pSessionID = Atlas.user.sessionId;
        var fullUrl = Atlas.apiURL + endPoint;
        //var fullUrl =  endPoint;



        var header = {
            'Content-Type': 'application/json'

        };

        // var isViewDocRequest = false;

        // if (fullUrl.indexOf('document/update') > -1 ) {
        //     // fullUrl = Atlas.docServiceNodeJS;
        //     fullUrl = 'http://mindjs01-dvl:3000/api/uploadfiles';
        //     var tempParam = {};
        //     tempParam.request = requestParameter;
        //     requestParameter = tempParam;

        //     // header.restUrl =  Atlas.docServiceRESTUpdate;
        //     // header["access-control-allow-origin"] = '"*"';
        //     isViewDocRequest = true;
        //     console.log('global seting of upload doc url: ' + Atlas.docServiceNodeJS);
        //     console.log('upload document url: ' + fullUrl);
        // }

        // if (fullUrl.indexOf('document/read') > -1 ) {
        //     fullUrl = Atlas.docServiceNodeJS;
        //     // fullUrl = fullUrl = Atlas.docServiceRESTRead;
        //     var tempParam = {};
        //     tempParam.request = requestParameter;
        //     requestParameter = tempParam;
        //     header.restUrl =  Atlas.docServiceRESTRead;
        //     // header["Access-Control-Allow-Origin"] = '"*"';
        //     isViewDocRequest = true;

        //     console.log('global seting of view doc url: ' + Atlas.docServiceNodeJS);
        //     console.log('view document url: ' + fullUrl);

        // }









        var returnValue = {};

        Ext.Ajax.request({
            url: fullUrl,
            useDefaultXhrHeader: false,
            paramsAsJson: true,
            async: false,
            // cors: true,
            withCredentials: false,
            // defaultXhrHeader: 'XmlHttpRequest',
            noCache: true,
            timeout: 120000,
            method: 'POST',
            headers: header,
            jsonData: requestParameter,

            success: function (response) {
                var responseJSON = Ext.decode(response.responseText);
                returnValue.code = responseJSON.message[0].code;
                returnValue.message = responseJSON.message[0].message;
                returnValue.result = 'Succeed';

                //if (returnValue.code != 0) {
                //    Ext.MessageBox.alert('Error', 'Data is not saved<br>' + returnValue.message);
                //    return returnValue;
                //}
                for (var i = 0; i < returnFields.length; i++) {
                    if (responseJSON.metadata && responseJSON.metadata.hasOwnProperty(returnFields[i])) returnValue[returnFields[i]] = responseJSON.metadata[returnFields[i]];
                }

                if (responseJSON.data) returnValue.data = responseJSON.data;


                // Atlas.common.utility.Utilities.sleep(2000);

            },

            failure: function (response) {
                //Ext.MessageBox.alert('Error', response.message);
                returnValue = Ext.decode(response, true) || response;
                returnValue.code = response.status;
                returnValue.message = response.statusText;
                returnValue.result = 'Failed.'
            }


            // }
        });

        return returnValue;
    },
    fileUpload: function(formData, returnFields){
        var endPoint = 'document/rx/upload';

        if (!returnFields) returnFields = [];

        var XHR = new XMLHttpRequest();
        var fullUrl = Atlas.apiURL + endPoint;

        // Set up our request
        XHR.open('POST', fullUrl,false);
        //XHR.open('POST', 'http://MICAGW01-SVA:8080/atlas/document/rx/upload',false); // sandbox


        XHR.send(formData);
        return JSON.parse(XHR.response);
        //return response;

    },
    viewDocument: function (documentID, fileType) {
        if (!documentID) {
            Ext.Msg.alert('View Document Error', 'Document ID is required');
            return false;
        }

        //var docType = fileType == null? 'pdf': fileType;



        // window.open(Atlas.docServiceNodeJS + '/?fn=' + returnValue.response.name);


        // Atlas.common.utility.Utilities.displayDocument(returnValue.response.pDocumentType, returnValue.response.pData);
        //     // callback: function (response, opt, a) {
        // return {"code": returnValue.response.pResult, "message": returnValue.response.pMessage };


        // var url = Atlas.apiURL + 'document/rx/document/read';
        var docID = CryptoJS.AES.encrypt(documentID.toString(), Atlas.user.sessionId).toString();





        var returnValue = Atlas.common.utility.Utilities.post(
            'document/rx/document/read',
            {
                pDocumentID: docID
            },
            ['type','name','message', 'code']
        );

        if (returnValue.code != 0) {
            Ext.Msg.alert('Document Error', returnValue.message + '[ErrorCode: (' + returnValue.code + ')]. ');
            return false;
        }


        var header = {
            'Content-Type': 'application/json'

        };

        var srcUrl = Atlas.apiURL + 'document/rx/download'+ '/?fn=' + returnValue.name;
        // srcUrl = [srcUrl, param(header)].join('?');

        var link = document.createElement("a");
        link.href = srcUrl;
        link.style = "visibility:hidden";
        // link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // window.open(srcUrl);











        // var form = document.createElement("form");
        // document.body.appendChild(form);
        // form.method = "POST";
        // form.action = url;
        // var docIdElement = document.createElement("INPUT");
        // docIdElement.name="documentID"
        // docIdElement.value = docID;
        // docIdElement.type = 'hidden'
        // form.appendChild(docIdElement);
        // form.submit();


    },



    formatDate: function (value, format){
        if (!value) return '';
        var tempDate = new Date(value);
        if (tempDate != 'Invalid Date')
        {
            if(Atlas.user.Offset != Atlas.user.localTimeOffset)
            {
                tempDate = tempDate.setHours(tempDate.getHours() + ((((Atlas.user.Offset * -1) + Atlas.user.localTimeOffset) / 60)));
            }
            else
            {
                tempDate = tempDate.setHours(tempDate.getHours() + ((Atlas.user.Offset * -1) / 60));

            }
            tempDate = new Date(tempDate);
            return this.formatDateView(tempDate, format);
        }
        //    tempDate.setHours(tempDate.getHours() + 11);
        return value;

        //return Ext.util.Format.date(tempDate, format);

    },

    formatDateView: function(value, format)
    {
        return Ext.util.Format.date(value, format);
    },


    FixDateoffsetToMatchServer:function(value,format)
    {
        if(value) {
            var tempDate = new Date(value);
            if ( tempDate != 'Invalid Date' && Atlas.user.Offset != Atlas.user.localTimeOffset) {
                   tempDate = tempDate.setMinutes(tempDate.getMinutes() + ((((Atlas.user.Offset * -1) + Atlas.user.localTimeOffset)) * -1));
                return this.formatDateView(new Date(tempDate),format);
            }
            else if(tempDate != 'Invalid Date')
            {
                return this.formatDateView(tempDate,format);
            }
        }
        return value;

    },


    FixDateoffsetToMatchLocal:function(value,format)
    {
        if(value) {
            var tempDate = new Date(value);
            if (tempDate != 'Invalid Date' && Atlas.user.Offset != Atlas.user.localTimeOffset) {
                if((typeof value ==='string' && value.indexOf('T') <0) || value instanceof Date) {
                    tempDate = tempDate.setMinutes(tempDate.getMinutes() + ((((Atlas.user.Offset * -1) + Atlas.user.localTimeOffset))));
                }
                return this.formatDateView(new Date(tempDate),format);
            }
            else if(tempDate != 'Invalid Date')
            {
                return this.formatDateView(tempDate,format);
            }
        }
        return value;

    },



    submitJobViewDoc: function (description, programName, parameters, runMode, programType, saveDoc, faxNumber) {
        var document = {};

        var returnValue = Atlas.common.utility.Utilities.post(
            'shared/rx/submitjob/update',
            {
                pDescription: description,
                pProgramName: programName,
                pParameters: parameters,
                pRunMode: runMode,
                pProgramType: programType,
                pSaveDocument: saveDoc,
                pFaxNumber: faxNumber
            },
            [
                'pDocumentID',
                'pDocumentType',
                'pData',
                'pJobNumber'
            ]
        );
        document.ID = returnValue.pDocumentID;
        document.type = returnValue.pDocumentType;
        document.data = returnValue.pData;
        document.jobNumber = returnValue.pJobNumber;
        document.code = returnValue.code;
        document.message = returnValue.message;

        return document;
    },

    //Export store to Excel based on parameters
    exportToExcel: function (store, excludeColumns) {
        //var newStore = Ext.clone(store, true);

        var proxy = store.getProxy();
        proxy.setExtraParam('command', 'ExportToExcel');
        if (excludeColumns) proxy.setExtraParam('excludeColumns', excludeColumns);

        var newStore = new Ext.create('Ext.data.Store', {
            proxy: proxy
        });

        newStore.load({

            //failure: function(record, operation){
            //    debugger;
            //},
            //success: function(record, operation){
            //    debugger;
            //},
            callback: function (records, operation, success) {
                if (success) {
                    var response = Ext.decode(operation.getResponse().responseText);
                    // var excelData = response.metadata.pData;

                    delete proxy.extraParams['command'];
                    delete proxy.extraParams['excludeColumns'];

                    var fileName = response.metadata.name;
                    
                    var srcUrl = Atlas.apiURL + 'document/rx/download'+ '/?fn=' + fileName;

                    var link = document.createElement("a");
                    link.href = srcUrl;
                    link.style = "visibility:hidden";
                    // link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    return false;

                    // window.open('data:application/vnd.ms-excel;base64,' + excelData);
                    // Atlas.common.utility.Utilities.displayDocument('xls',excelData);
                }
            }
        });
    },

    setEncryptedText: function (text, key) {
        if (!key) key = Atlas.user.SessionID;
        return CryptoJS.AES.encrypt(text, key).toString();
    },

    getDecriptedText: function (encryptedText, key) {
        if (!key) key = Atlas.user.SessionID;
        return CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    },

    displayDocument: function (fileType, base64Content) {
        var mimeType = '';
        if (!fileType) {
            Ext.Msg.alert('Error', 'Unknown document type.');
            return false;
        }

        switch (fileType.toLowerCase()) {
            case 'pdf':
                mimeType = 'application/pdf';
                break;
            case 'jpg':
                mimeType = 'image/jpeg';
                break;
            case 'svg':
                mimeType = 'image/svg+xml';
                break;
            case 'png':
                mimeType = 'image/png';
                break;
            case 'xls':
                mimeType = 'application/vnd.ms-excel';
                break;
            case 'xlsx':
                mimeType = 'application/vnd.ms-excel';
                break;
            case 'doc':
                mimeType = 'application/msword';
                break;
            case 'docx':
                mimeType = 'application/msword';
                break;
            case 'gif':
                mimeType = 'image/gif';
                break;
            case 'txt':
                mimeType = 'text/plain';
                break;
            case 'zip':
                mimeType = 'application/x-compressed';
                break;
            case 'csv':
                mimeType = 'application/vnd.ms-excel';
                break;
            case 'xml':
                mimeType = 'text/xml';
                break;
            default:
                Ext.Msg.alert('View Document error', 'Document type is not supported.');
                return false;
        }

        var base64Header = 'data:' + mimeType + ';base64,';
        if (base64Content){

            if (['jpg','gif','png'].indexOf(base64Header) >= 0) {
                window.open(base64Header + base64Content);
                return false;
            }
            else {
                var fileName = Date.now().toString() + '.' + fileType;

                if(Ext.browser.is.IE && window.navigator.msSaveOrOpenBlob){
                    // var IEwindow = window.open();
                    // IEwindow.document.open(mimeType, 'replace');
                    // IEwindow.document.write(base64Content);
                    // IEwindow.document.close();
                    // IEwindow.document.execCommand('SaveAs', true, fileName );
                    // IEwindow.close();

                    // var b64Data = base64Content.replace(/^[^,]+,/, '');
                    // b64Data = b64Data.replace(/\s/g, '');
                    var byteCharacters = Atlas.common.utility.Utilities.base64ToArrayBuffer(base64Content);
                    var fileContent = new Blob([byteCharacters], {"type": mimeType});
                    window.navigator.msSaveOrOpenBlob(fileContent, fileName);
                    return false;
                } else {
                    var uri = base64Header + base64Content;
                    var link = document.createElement("a");
                    link.href = uri;
                    link.style = "visibility:hidden";
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return false;
                }
            }

        }
        else Ext.Msg.alert('view Docment','Document is not found.');
        return false;
    },
    createLog: function(level, content) {
        var fullUrl = Atlas.apiURL + 'utility/rx/writelog/update'
        Ext.Ajax.request({
            url: fullUrl,
            useDefaultXhrHeader: false,
            paramsAsJson: true,
            // async: false,
            // cors: true,
            withCredentials: true,
            // defaultXhrHeader: 'XmlHttpRequest',
            noCache: true,
            timeout: 120000,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            jsonData: {"level": level, "content": content},

            success: function (response) {

                // console.log("return value:" + returnValue);
                //                return returnValue;
            },

            failure: function (response) {
                Ext.MessageBox.alert('Error', response.message);
                // Ext.decode(response, true) || response;
            },

            callback: function (response, opt, a) {

            }
        })

    },
    base64ToArrayBuffer: function (base64) {
        var binaryString =  window.atob(base64);
        var len = binaryString.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    },
    passwordEncode: function(plainText){

    },
    updatePlanGroupList: function() {

        var returnValue = Atlas.common.utility.Utilities.post(
            'system/rx/sessiondataaccessrest/read',
            null,
            [
                'ttCarrierAccount',
                'ttCarrierLOB',
                'ttPlangroup',
                'ttPlanBenefit',
                'ttPCN'
            ]
        );

        var tempArray = [];

        //carrierID list
        for ( var i = 0 ; i < returnValue.data.length; i ++) {
            var carrierID = returnValue.data[i]['carrierId'];
            tempArray.push(carrierID);
        }

        Atlas.user.CarrierIDList = tempArray.join();

        //Carrier Account List
        Atlas.user.CarrierAccountList = returnValue.ttCarrierAccount.ttCarrierAccount;

        //Carrier LOB List
        Atlas.user.CarrierLOBList = returnValue.ttCarrierLOB.ttCarrierLOB;

        //PlanGroup List ID
        tempArray = [];
        for ( var i = 0 ; i < returnValue.ttPlangroup.ttPlangroup.length; i ++) {
            var plangroupId = returnValue.ttPlangroup.ttPlangroup[i]['plangroupId'];
            tempArray.push(plangroupId);
        }
        Atlas.user.PlanGroupList = tempArray.join();

        //Plan Benefit ID List
        tempArray = [];
        for ( var i = 0 ; i < returnValue.ttPlanBenefit.ttPlanBenefit.length; i ++) {
            var planBenefitId = returnValue.ttPlanBenefit.ttPlanBenefit[i]['planBenefitId'];
            tempArray.push(planBenefitId);
        }
        Atlas.user.PlanBenefitList = tempArray.join();


        //PCN List
        tempArray = [];
        for ( var i = 0 ; i < returnValue.ttPCN.ttPCN.length; i ++) {
            var PCNCode = returnValue.ttPCN.ttPCN[i]['PCNCode'];
            tempArray.push(PCNCode);
        }
        Atlas.user.PCNCodeList = tempArray.join();

    },
    sleep: function (delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay){}
    } ,
    uploadFiles: function(file){

    },

    getLocalDateTime:function () {
        var clientdate = new Date();
        return new Date();
    },

    setServerDateTime:function () {
        var vServerDate = Ext.create('Atlas.common.model.merlin.serverdatetime');
        vServerDate.load({
            callback: function (recordInfo, operation, success) {

                if(!recordInfo.data)
                    return;

                var dateTime = new Date(recordInfo.data.serverDateTime);
                dateTime.setHours(dateTime.getHours()+ (recordInfo.data.UTCOffSet/60));

                Atlas.user.serverDateTime= dateTime;
                // var dateWithNoTime = dateTime.toString("mm/dd/YYYY");
                //Atlas.user.serverDateTime= recordInfo.data.serverDateTime;
                Atlas.user.serverDate= recordInfo.data.serverDate;
                Atlas.user.Offset =  recordInfo.data.UTCOffSet;
                Atlas.user.localTimeOffset =  ((new Date().getTimezoneOffset()))*-1;
            }
        });
    }
});


