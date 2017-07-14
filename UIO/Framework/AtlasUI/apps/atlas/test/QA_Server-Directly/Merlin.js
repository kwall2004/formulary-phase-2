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
    it("should ",function(){
    ST.play([
        { type: "tap", target: "textfield[reference=\"username\"]", x: 140, y: 10 },
        { type: "type", target: "textfield[reference=\"username\"] => input", text: "jsmith", caret: 0 },
        { type: "keydown", target: "textfield[reference=\"username\"] => input", key: "Tab", caret: 6 },
        { type: "keyup", target: "textfield[reference=\"password\"] => input", key: "Tab", caret: 0 },
        { type: "type", target: "textfield[reference=\"password\"] => input", text: "pword", caret: 0 },
        { type: "tap", target: "button[reference=\"login\"]", x: 16, y: 5 },
        { type: "tap", target: "treeview => [data-recordindex=\"2\"]", x: 13, y: 17 },
        { type: "tap", target: "treeview => [data-recordindex=\"3\"]", x: 90, y: 17 },
        { type: "tap", target: "membertypeahead[reference=\"advancedtextbox\"]", x: 190, y: 5 },
        { type: "type", target: "membertypeahead[reference=\"advancedtextbox\"] => input", text: "jay", caret: 0 },
        { type: "mousedown", target: "membertypeahead[reference=\"advancedtextbox\"] boundlist => [data-recordindex=\"1\"]", x: 73, y: 14, detail: 1 },
        { type: "mouseup", target: "membertypeahead[reference=\"advancedtextbox\"] boundlist => [data-recordindex=\"1\"]", x: 41, y: 2, detail: 1 },
        { type: "click", target: "membertypeahead[reference=\"advancedtextbox\"] boundlist => [data-recordindex=\"1\"]", x: 82, y: 81, detail: 1 }
    ]);
        
    });
   /* it("should show login to start",function(){
        ST.textField('[reference=\"username\"]').visible();      
    });
    it("should fail login", function() {
        merlin.login('jsmith','fake')
    });
    it("should login successfully", function() {
        merlin.clearlogin();
        merlin.login('jsmith','pword')
    });*/
});