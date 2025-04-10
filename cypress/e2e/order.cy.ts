describe("creating an order in the burger constructor", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "refreshToken",
      "ead00482159020a3524c224424430e3b6e7b481e1290267465eb4b86caed911eec542bd337c6362f"
    );
    window.localStorage.setItem(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzQ1YzYwMTMzYWNkMDAxYmU1NGM4NCIsImlhdCI6MTc0NDI4MzI0MCwiZXhwIjoxNzQ0Mjg0NDQwfQ.3w-2NomzX2TyB9pcdMNf_OtnxnEtujgxIEUyeGBF9aY"
    );
    cy.intercept("GET", "api/ingredients", {
      fixture: "ingredients.json",
    }).as("ingredients");
    cy.intercept("GET", "api/auth/user", {
      fixture: "user.json",
    });
    cy.intercept("POST", "api/auth/token", {
      fixture: "accessToken.json",
    });
    cy.intercept("POST", "api/orders", {
      fixture: "order.json",
    });
    cy.visit("/");
    cy.wait("@ingredients");
  });

  it("opens and closes modal with ingredient details", () => {
    cy.getByData("bun").within(() => {
      cy.getByData("content").eq(0).as("card");
      cy.get("@card")
        .should("contain", "Краторная булка N-200i")
        .and("contain", "1255")
        .find("img")
        .should(
          "have.attr",
          "src",
          "https://code.s3.yandex.net/react/code/bun-02-large.png"
        );
      cy.get("@card").click();
    });

    cy.location("pathname").should(
      "equal",
      "/ingredients/643d69a5c3f7b9001cfa093c"
    );

    cy.getByData("ingredient-details")
      .should("exist")
      .should("contain", "Краторная булка N-200i")
      .and("contain", "80")
      .and("contain", "24")
      .and("contain", "53")
      .and("contain", "420");

    cy.getByData("close-button").find("svg").click();
    cy.location("href").should("equal", Cypress.config("baseUrl"));
  });

  it("allows the user to reorder ingredients in the constructor", () => {
    const dataTransfer = new DataTransfer();
    cy.getByData("content").as("ingredients");
    cy.getByData("constructor").as("constructor");
    cy.get("@ingredients").eq(2).trigger("dragstart", { dataTransfer });
    cy.get("@constructor").trigger("drop", { dataTransfer });

    cy.get("@ingredients").eq(3).trigger("dragstart", { dataTransfer });
    cy.get("@constructor").trigger("drop", { dataTransfer });

    cy.get(".constructor-element")
      .should("have.length", 4)
      .as("constructorElements");

    cy.get("@constructorElements").eq(1).invoke("text").as("firstItemText");
    cy.get("@constructorElements").eq(2).invoke("text").as("secondItemText");

    cy.get("@constructorElements").eq(2).trigger("dragstart", { dataTransfer });

    cy.get("@constructorElements").eq(1).trigger("dragover", { dataTransfer });

    cy.get("@constructorElements").eq(2).trigger("drop", { dataTransfer });

    cy.get(".constructor-element")
      .eq(1)
      .invoke("text")
      .then((firstTextAfterReorder) => {
        cy.get("@secondItemText").should("equal", firstTextAfterReorder);
      });
  });

  it("allows an authorized user create an order", () => {
    const dataTransfer = new DataTransfer();
    cy.getByData("content").as("ingredients");
    cy.getByData("constructor").as("constructor");
    cy.get("@constructor").getByData("total-price").as("totalPrice");
    cy.get("@constructor")
      .find("button")
      .contains("Оформить заказ")
      .as("submitBtn");

    cy.get("@constructor").should("exist").and("contain", "Выберите булку");
    cy.get("@totalPrice").should("exist").and("contain", "0");
    cy.get("@submitBtn").should("be.disabled");

    cy.get("@ingredients").eq(1).trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@constructor")
      .trigger("drop", { dataTransfer })
      .should("contain", "Флюоресцентная булка R2-D3")
      .and("contain", "988");

    cy.get("@ingredients").eq(0).trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@constructor")
      .trigger("drop", { dataTransfer })
      .should("contain", "Краторная булка N-200i")
      .and("contain", "1255");

    cy.get("@submitBtn").should("be.disabled");

    cy.get("@ingredients").eq(2).trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@constructor").trigger("drop", { dataTransfer });
    cy.get("@ingredients").eq(6).trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@constructor").trigger("drop", { dataTransfer });
    cy.get("@ingredients").eq(6).trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@constructor").trigger("drop", { dataTransfer });
    cy.get("@ingredients").eq(7).trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@constructor").trigger("drop", { dataTransfer });

    cy.get("@constructor")
      .should("contain", "Краторная булка N-200i")
      .and("contain", "1255")
      .should("contain", "Соус Spicy-X")
      .and("contain", "90")
      .should("contain", "Биокотлета из марсианской Магнолии")
      .and("contain", "424")
      .should("contain", "Филе Люминесцентного тетраодонтимформа")
      .and("contain", "988");

    cy.get("@constructor").within(() => {
      cy.get(".constructor-element").should("have.length", "6");

      cy.get(".constructor-element")
        .eq(1)
        .within(() => {
          cy.get(".constructor-element__action").find("svg").as("deleteBtn");
          cy.get("@deleteBtn").click();
        });

      cy.get(".constructor-element").should("have.length", "5");
    });

    cy.get("@constructor")
      .should("not.contain", "Соус Spicy-X")
      .and("not.contain", "90");

    cy.get("@submitBtn").should("be.enabled").click();
    cy.getByData("order-details").should("exist").as("details");
    cy.getByData("order-number").should("exist").and("contain", "74004");
    cy.getByData("close-button").should("exist").as("closeBtn");
    cy.get("@closeBtn").find("svg").click();
    cy.get("@details").should("not.exist");
    cy.get("@constructor").should("exist").and("contain", "Выберите булку");
    cy.get("@totalPrice").should("exist").and("contain", "0");
    cy.get("@submitBtn").should("be.disabled");
  });
});
