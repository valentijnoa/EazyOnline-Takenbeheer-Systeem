describe("login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("allows a user create a task", () => {
    cy.get('input[placeholder="email"]').type("admin@eazy.nl");
    cy.get('input[placeholder="password"]').type("123456");
    cy.get("button").click();

    cy.get("span").contains("Users").click();
    cy.get("a").contains("Add New User").click();
    cy.get('input[placeholder="jeff_morris"]').type("freddy12");
    cy.get('input[placeholder="Jeff Morris"]').type("Freddy Kruger");
    cy.get('input[placeholder="jeff_morris@gmail.com"]').type(
      "freddy@test.com"
    );
    cy.get('input[placeholder="0612345678"]').type("0674125896");
    cy.get('input[placeholder="password"]').type("password123");
    cy.get('input[placeholder="address"]').type(
      "Elm Street 13, Springwood, Ohio"
    );
    cy.get('input[placeholder="Netherlands"]').type("USA");
    cy.get("button").click();
  });
});
