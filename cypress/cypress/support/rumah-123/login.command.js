Cypress.Commands.add(
  "doLoginR123",
  (username = "123.superqa@gmail.com", password = "rumahnya123") => {
    cy.get(".ui-organism-navbar-r123__login").then((element) => {
      const text = element.text();

      if (text === "Akun") {
        cy.get(".ui-organism-navbar-r123__login").click();
        cy.get('input[name="email"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
      }
      cy.log(text);
    });
  }
);
