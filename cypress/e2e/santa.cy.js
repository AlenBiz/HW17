import { faker } from "@faker-js/faker";
import { Loginpage } from "../pages/loginpage";
const loginpageElements = require("../fixtures/pages/loginpageSelector.json");

describe("santa login ui", () => {
  let oldAssword = "rty123";
  let loginpage = new Loginpage();
  it("user cannot login witch old password - UI", () => {
    let newAssword = faker.internet.password(8); //8 characters
    cy.log(newAssword);

    cy.visit("https://santa-secret.ru");
    cy.contains("Вход и регистрация").click({ force: true });
    loginpage.login("testbizyaev@gmail.com", oldAssword);
    // cy.get(':nth-child(3) > .frm').type("testbizyaev@gmail.com");
    // cy.get(':nth-child(4) > .frm').type(oldAssword);
    // cy.get('.btn-main').click();
    cy.contains("Коробки").should("exist");
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header > .header"
    ).should("exist");
    cy.changeAssword("Alena", newAssword);
    cy.contains("Выйти с сайта").click();
    cy.visit("https://santa-secret.ru");
    cy.contains("Вход и регистрация").click({ force: true });
    // loginpage.login("testbizyaev@gmail.com", oldAssword);
    cy.get(loginpageElements.loginField).type("testbizyaev@gmail.com");
    cy.get(loginpageElements.passwordField).type(oldAssword);
    cy.get(loginpageElements.loginButton).click();
    cy.contains("Неверное имя пользователя или пароль").should("exist");
    cy.get(":nth-child(4) > .frm").clear().type(newAssword);
    cy.get(".btn-main").click();
    cy.changeAssword("Alena", oldAssword);
  });

  it("user cannot login witch old password - ApI, UI", () => {
    let newAssword = faker.internet.password(8); //8 characters
    cy.log(newAssword);
    cy.request({
      metod: "PUT",
      headers: {
        Cookie:
          "connect.sid=s%3A0qGejcsDIH3l0roj49NTQdW_FSujHcKb.%2FFfIpCYuoZ%2Bz8uhXekIrU8BJhKX6UevRVeSRS2aBLFM; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMDYsImlhdCI6MTY3MzU5NTk0NiwiZXhwIjoxNjczNTk5NTQ2fQ.bZMuLZtEsM4TpeBNXjdV-NJkrYvkk4ZSoRva8I-dwu4; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMDYsImlhdCI6MTY3MzU5NTk0NiwiZXhwIjoxNjczNjAzMTQ2fQ.0Uypu0agWeHch3ogsOJN93wha64h5tMzpFAfCqp2MHE",
      },
      url: "https://santa-secret.ru/api/account/password",
        body: { password: newAssword },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.visit("https://santa-secret.ru");
    cy.contains("Вход и регистрация").click({ force: true });
    loginpage.login("testbizyaev@gmail.com", newAssword);
    cy.contains("Коробки").should("exist");
    cy.contains("Alena").click({force:true});
    cy.contains("Выйти с сайта").click();

    cy.request({
        metod: "PUT",
        headers: {
          Cookie:
            "connect.sid=s%3A0qGejcsDIH3l0roj49NTQdW_FSujHcKb.%2FFfIpCYuoZ%2Bz8uhXekIrU8BJhKX6UevRVeSRS2aBLFM; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMDYsImlhdCI6MTY3MzU5NTk0NiwiZXhwIjoxNjczNTk5NTQ2fQ.bZMuLZtEsM4TpeBNXjdV-NJkrYvkk4ZSoRva8I-dwu4; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMDYsImlhdCI6MTY3MzU5NTk0NiwiZXhwIjoxNjczNjAzMTQ2fQ.0Uypu0agWeHch3ogsOJN93wha64h5tMzpFAfCqp2MHE",
        },
        url: "https://santa-secret.ru/api/account/password",
          body: { password: oldAssword },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
      cy.visit("https://santa-secret.ru");
      cy.contains("Вход и регистрация").click({ force: true });
      loginpage.login("testbizyaev@gmail.com", oldAssword);
  });
});
