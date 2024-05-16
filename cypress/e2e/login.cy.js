describe("login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("allows a user to login", () => {
    cy.get('input[placeholder="email"]').type("admin@eazy.nl");
    cy.get('input[placeholder="password"]').type("123456");
    cy.get("button").click();
  });
});
