describe("Home page tests", () => {
  const dogsBaseApi = "https://dog.ceo/api";

  beforeEach(() => {
    cy.visit("/");
  });

  it("successfuly loads", () => {});

  it("navigating to favorites and back", () => {
    cy.get("[data-cypress='header-link-favorites']").click();
    cy.url().should("include", "/favorites");
    cy.get("[data-cypress='header-link-home']").click();
  });

  it("displays application name", () => {
    cy.get("[data-cypress='page-title']").should("be.visible");
  });

  it("shows dogs initial list", () => {
    cy.get("[data-cypress='home-list']")
      .children()
      .should("have.length", 20);
  });

  it("makes item card favorite and back", () => {
    cy.get("[data-cypress='home-list'] > :nth-child(1)").as("cardItem");
    cy.get(
      "[data-cypress='home-list'] > :nth-child(1) [data-cypress='card-item-image']"
    ).as("cardImage");

    cy.get("@cardImage").click();
    cy.get("@cardItem").should("have.class", "card-item--favorite");

    cy.get("@cardImage").click();
    cy.get("@cardItem").should("not.have.class", "card-item--favorite");
  });

  it("loads more items after scrolling to bottom", () => {
    cy.fixture("randomDogsList").then((dogsList) => {
      cy.intercept(`${dogsBaseApi}/breeds/image/random/*`, dogsList).as(
        "getDogsList"
      );
    });

    cy.reload();
    cy.scrollTo("bottom");

    cy.wait("@getDogsList").then(() => {
      cy.get("[data-cypress='home-list']")
        .children()
        .should("have.length", 40);
    });
  });

  it("selects breed in breed selector and loads dogs list by selected breed", () => {
    cy.fixture("allBreedsList").then((breeds) => {
      cy.intercept(`${dogsBaseApi}/breeds/list/all`, breeds).as("getBreeds");
    });

    cy.fixture("randomDogsListByBreed").then((dogsList) => {
      cy.intercept(`${dogsBaseApi}/breed/*/images/random/20`, dogsList).as(
        "getDogsByBreed"
      );
    });

    cy.reload();

    cy.wait("@getBreeds").then(() => {
      cy.get("[data-cypress='breed-select'] select").as("breedSelect");
      cy.get("[data-cypress='home-list']").as("homeList");
      cy.get("[data-cypress='home-title']").as("homeTitle");

      cy.get("@breedSelect").select("affenpinscher");

      cy.wait("@getDogsByBreed").then(() => {
        cy.get("@breedSelect").should("have.value", "affenpinscher");
        cy.get("@homeTitle").contains("Affenpinscher Dogs List");

        cy.get("@homeList")
          .children()
          .should("have.length", 20);

        cy.get("@homeList").should(
          "have.attr",
          "data-breed-name",
          "affenpinscher"
        );

        cy.get("[data-cypress='breed-clear']").click();
        cy.get("@breedSelect").should("have.value", null);
        cy.get("@homeTitle").contains("Random Dogs List");
      });
    });
  });
});
