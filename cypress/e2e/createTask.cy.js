describe("login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("allows a user create a task", () => {
    cy.get('input[placeholder="email"]').type("admin@eazy.nl");
    cy.get('input[placeholder="password"]').type("123456");
    cy.get("button").click();

    cy.get("span").contains("Tasks").click();
    cy.get("a").contains("Add New Task").click();
    cy.get('input[placeholder="task1"]').type("test task 3");
    cy.get('input[placeholder="Description"]').type(
      "description for test task 3"
    );
    cy.get('input[placeholder="Tasks"]').type("test");
    cy.get('input[placeholder="Jeff"]').type("Amanda");
    cy.get("button").click();
  });

  //   it("allows a user to create a task", () => {
  //     cy.get("span").contains("Tasks").click();
  //     cy.get("a").contains("Add New Task").click();
  //     cy.get('input[placeholder="task1"]').type("test task 3");
  //     cy.get('input[placeholder="Description"]').type(
  //       "description for test task 3"
  //     );
  //     cy.get('input[placeholder="Tasks"]').type("test");
  //     cy.get('input[placeholder="Jeff"]').type("Amanda");
  //   });
});
