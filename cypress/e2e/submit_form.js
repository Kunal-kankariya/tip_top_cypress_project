const fillField = (selector, value) => {
  cy.get(selector).type(value);
};

const verifyElementDisabled = (selector) => {
  cy.get(selector).should("be.disabled");
};

const verifyElementHasAttribute = (selector, attribute) => {
  cy.get(selector).should("have.attr", attribute);
};

const verifyDropdownLength = (selector, length) => {
  cy.get(`${selector} option`).should("have.length", length);
  cy.get(selector).find("option").should("have.length", length);
};

const verifySubmitButtonState = (state) => {
  const assertion = state === "enabled" ? "not.be.disabled" : "be.disabled";
  cy.get("button[type='submit']").should(assertion);
};

const submitFormAndVerifyURL = (name, password, color) => {
  fillField("#my-name-id", name);
  fillField("#my-password-id", password);
  cy.get('[name="my-select"]').select(color);
  cy.get("button[type='submit']").click();

  cy.url()
    .should("include", "my-name=Test+Name")
    .and("include", `my-password=${password}`)
    .and("include", `my-select=${color.toLowerCase()}`);
};

describe("Tip Top Assignment Test Cases", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Verifies the input is disabled", () => {
    verifyElementDisabled('[name="my-disabled"]');
  });

  it('Verifies the input with value "Readonly input" is readonly', () => {
    verifyElementHasAttribute('[name="my-readonly"]', "readonly");
    verifyElementHasAttribute('[value="Readonly input"]', "readonly");
  });

  it("Verifies the dropdown to select color has 8 elements", () => {
    verifyDropdownLength('[name="my-select"]', 8);
  });

  it("Verifies the submit button is disabled when no data is entered in the Name field", () => {
    verifySubmitButtonState("disabled");
  });

  it("Verifies the submit button is enabled when both Name and Password fields are entered", () => {
    fillField("#my-name-id", "Test Name");
    fillField("#my-password-id", "TestPassword");
    verifySubmitButtonState("enabled");
  });

  it("Verifies that on submit of 'Submit' button the page shows 'Received' text", () => {
    fillField("#my-name-id", "Test Name");
    fillField("#my-password-id", "TestPassword");
    cy.get("button[type='submit']").click();
    cy.contains("Received").should("be.visible");
  });

  it("Verifies that on submit of form all the data is passed to the URL", () => {
    submitFormAndVerifyURL("Test Name", "TestPassword", "Blue");
  });
});
