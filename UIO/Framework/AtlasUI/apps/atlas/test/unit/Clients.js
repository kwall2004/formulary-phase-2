describe("Clients", function() {
    
    describe("Model", function() {

        describe("with a new model", function() {
            
            beforeEach( function() {
                this.startTime = new Date().getTime();
    
                // Create a new item
                this.client = new Atlas.model.Client({});
            });
            
            it("should have -1 for id", function() {
                 expect(this.client.data.id).toBe(null);
            });
        });

        describe("with an existing model", function() {
            
            beforeEach( function() {
                this.startTime = new Date().getTime();
    
                // Create a new item
                this.client = new Atlas.model.Client({});
                this.client.load(123,{
                    success: function(client){
                        console.log(client.getId());
                    }
                });
            });
            
            it("should pass", function() {
                expect(1).toBe(1);
            });
        });

    });
    
    describe("Store", function() {
        describe("when adding a record", function() {
            it("should pass", function() {
                expect(1).toBe(1);
            });
        });

        describe("when editing a record", function() {
            it("should pass", function() {
                expect(1).toBe(1);
            });
        });

        describe("when removing a record", function() {
            it("should pass", function() {
                expect(1).toBe(1);
            });
        });
        
        describe("when reading a list of records", function() {
            it("should pass", function() {
                expect(1).toBe(1);
            });
        });

        describe("when filtering records", function() {
            it("should pass", function() {
                expect(1).toBe(1);
            });
        });

        describe("when sorting records", function() {
            it("should pass", function() {
                expect(1).toBe(1);
            });
        });

    });
});