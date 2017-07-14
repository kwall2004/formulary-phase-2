describe("Routing", function() {
    
    var Viewport = {
        clientList: function (){
            return ST.component('combo[reference=clientcombo]');
        }
    };
    
    beforeEach(function(){
        Atlas.app.redirectTo(""); // make sure you are on no route
    });

    describe('App navigation', function(){
         describe('It should default to home', function(){

             it("clientlist menu should be visible", function(){
                Viewport.clientList().visible();
             });

             it("hash tag should route to home", function(){
                return window.location.hash === '#home';
             });
          });
    });
    
   
    
});