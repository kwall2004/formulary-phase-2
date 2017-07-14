describe("Merlin", function() {
    var merlin = {
        login: function (username, password){
            ST.play([
                { type: "tap", target: "textfield[reference=\"username\"]", x: 139, y: 14 },
                { type: "type", target: "textfield[reference=\"username\"] => input", text: username, caret: 0 },
                { type: "keydown", target: "textfield[reference=\"username\"] => input", key: "Tab", caret: 6 },
                { type: "keyup", target: "textfield[reference=\"password\"] => input", key: "Tab", caret: 0 },
                { type: "type", target: "textfield[reference=\"password\"] => input", text: password, caret: 0 },
                { type: "tap", target: "button[reference=\"login\"]", x: 23, y: 14 }
            ]);
        },
        clearlogin: function(){
            ST.textField('[reference=\"username\"]').setValue('');      
            ST.textField('[reference=\"password\"]').setValue('');      
        }
    }
    it("should show login to start",function(){
        ST.textField('[reference=\"username\"]').visible();      
    });
    it("should fail login", function() {
        merlin.login('jsmith','fake')
    });
    it("should login successfully", function() {
        merlin.clearlogin();
        merlin.login('jsmith','pword')
    });
    it("should should show jennifer in the userbox", function() {
        ST.button('button[reference=\"login\"]').visible();      
        ST.button('button[reference=\"login\"]').textLike(/My Settings - Jennifer/i);      
    });
    it("should launch a member tab when member left is chosen", function() {
        ST.play([
            { type: "tap", target: "treeview => [data-recordindex=\"2\"]", x: 11, y: 16 },
            { type: "tap", target: "treeview => [data-recordindex=\"3\"]", x: 73, y: 20 },
        ]);
    });
    it("should find a member when searched for", function() {
        ST.play([
            { type: "tap", target: "tab[text=\"Member\"]", x: 29, y: 15 },
         ]);
        ST.play([
            { type: "tap", target: "membertypeahead[reference=\"advancedtextbox\"]", x: 150, y: 12 },
            { type: "type", target: "membertypeahead[reference=\"advancedtextbox\"] => input", text: "smith", caret: 0 },
            { type: "tap", target: "membertypeahead[reference=\"advancedtextbox\"] boundlist => [data-recordindex=\"0\"]", x: 171, y: 10 },
            { type: "tap", target: "combobox[itemId=\"cboMemberList\"]", x: 258, y: 15 },
            { type: "tap", target: "combobox[itemId=\"cboMemberList\"] boundlist => [data-recordindex=\"1\"]", x: 95, y: 11 },
            { type: "tap", target: "gridpanel => [data-recordindex=\"0\"]", x: 174, y: 19 },
            { type: "mousedown", target: "button[iconCls=\"fa-search\"]", x: 20, y: 8, detail: 1 },
            { type: "mouseup", target: "button[iconCls=\"fa-search\"]", x: 22, y: 8, detail: 1 },
            { type: "click", target: "button[iconCls=\"fa-search\"]", x: 22, y: 8, detail: 1 }

        ]);
        
    });

});