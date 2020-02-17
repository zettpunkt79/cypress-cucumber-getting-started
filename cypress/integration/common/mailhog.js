/// <reference types="Cypress" />
export {mailhog}

const mailhog = {
  getAllMails() {
    cy.request({
      url: Cypress.env('mailhogUrl'),
      method: 'GET'
    }).then(response => {
      return cy.wrap(response.body.items)
    }).as('mails')
    return mailhog
  },
  to(recipient) {
    cy.get('@mails').then((mails) => {
      return mails.filter((mail) =>
        mail.To.map(
          (recipientObj) => `${recipientObj.Mailbox}@${recipientObj.Domain}`
        ).includes(recipient)
      )
    }).as('mails')
    return mailhog
  },
  from(sender) {
    cy.get('@mails').then((mails) => {
      return mails.filter((mail) => mail.Raw.From === sender);
    }).as('mails')
    return mailhog
  },
  withSubject(subject) {
    cy.get('@mails').then((mails) => {
      return mails.filter((mail) => mail.Content.Headers.Subject[0] === subject);
    }).as('mails')
    return mailhog
  },
  first(){
    cy.get('@mails').then(mails => {
      return mails[0]
    }).as('mails')
    return mailhog
  },
  getSubject(){
    return cy.get('@mails').then(mails => {
      return mails[0].Content.Headers.Subject[0]
    })
  },
  getBody(){
    return cy.get('@mails').then(mails => {
      return mails[0].Content.Body
    })
  }
}