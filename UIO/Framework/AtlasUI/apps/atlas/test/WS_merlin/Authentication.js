describe("WebService", function() {
    it("should return data", function(done) {
           Ext.Ajax.request({
             url: 'http://apidev.atlascomplete.local/atlas/system/rx/ctlsystem/read',
             cors: true,
             withCredentials: true,
             method: 'POST',
             useDefaultXhrHeader: false,
             headers: {
                'Content-Type': 'application/json' //'application/json'
             },
             success: function(response, opts) {
                 var obj = Ext.decode(response.responseText);
                 debugger;
                 expect(obj.success).toBe(true);
                 done();
             },
             failure: function(response, opts) {
                 console.log('server-side failure with status code ' + response.status);
                 expect(1).toBe(0);
                 done();
             }
         });
        
    });
});