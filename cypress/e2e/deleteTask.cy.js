describe("login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("allows a user create a task", () => {
    cy.get('input[placeholder="email"]').type("admin@eazy.nl");
    cy.get('input[placeholder="password"]').type("123456");
    cy.get("button").click();

    cy.get("span").contains("Tasks").click();
    cy.get("div").contains("Delete").click();
  });
});
