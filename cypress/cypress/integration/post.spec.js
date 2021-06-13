describe('Post Tests', function () {

    beforeEach(function () {
        cy.visit('http://localhost')
	});

    it('Data Layer Loaded', function () {
        cy.window().then((win) => {
            assert.isDefined(win.dataLayer, 'Data Layer is defined');
			console.debug(win.dataLayer)
        });             
    });
})
