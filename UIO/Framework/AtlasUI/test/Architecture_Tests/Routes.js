describe("Routes", function() {
    
    var Viewport = {
        mainHeader: function() {
            return ST.component('[reference=mainHeader]');
        }

    };
    
    beforeEach(function(done){
       Admin.app.redirectTo("#");
        // navigate app to correct page and wait to be visible
        Viewport.maiHeader.visible()
            .and(done);
    });
    
    it("should pass", function() {
        expect(1).toBe(1);
    });
});