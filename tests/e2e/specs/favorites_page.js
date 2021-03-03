describe("Favroites page tests", () => {
  const dogsBaseApi = "https://dog.ceo/api";

  beforeEach(() => {
    cy.visit("/favorites");
  });

  it("displays page title", () => {
    cy.get("[data-test='favorites-title']").should("be.visible");
  });

  it("shows that user didnt selected any favorite cards", () => {
    cy.get("[data-test='favorites-not-found']").should("be.visible");
  });

  it("selecting 5 items as favorite and display them", () => {
    cy.fixture("randomDogsList").then((dogsList) => {
      cy.intercept(`${dogsBaseApi}/breeds/image/random/*`, dogsList).as(
        "getDogsList"
      );
    });

    cy.visit("/");
    cy.wait("@getDogsList").then(() => {
      for (let i = 1; i <= 5; i++) {
        cy.get(
          `[data-test='home-list'] > :nth-child(${i}) [data-test='card-item-image']`
        ).click();
      }
    });

    cy.visit("/favorites");
    cy.get("[data-test='favorites-list']")
      .children()
      .should("have.length", 5);
  });
});
