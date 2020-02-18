/// <reference types="Cypress" />
export {mailhog}

const mailhog = {
  count(){
    return cy.get('@mails').then(mails => {return mails.length})
  },
  delete() {
    cy.get('@mails').then((mails) => {
      mails.forEach(mail => {
        cy.request('DELETE', `${Cypress.env('mailhogUrl')}/api/v1/messages/${mail.ID}`)
      })
    })
    return mailhog
  },
  deleteAll() {
    cy.request('DELETE', `${Cypress.env('mailhogUrl')}/api/v1/messages`)
    return mailhog
  },
  getAllMails() {
    cy.request({
      url: `${Cypress.env('mailhogUrl')}/api/v2/messages`,
      method: 'GET'
    }).then(response => {
      return cy.wrap(response.body.items)
    }).as('mails')
    return mailhog
  },
  to(recipient) {
    cy.log('Filtering by recipient')
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
    cy.log('Filtering by sender')
    cy.get('@mails').then((mails) => {
      return mails.filter((mail) => mail.Raw.From === sender)
    }).as('mails')
    return mailhog
  },
  withSubject(subject) {
    cy.log('Filtering by subject')
    cy.get('@mails').then((mails) => {
      return mails.filter((mail) => mail.Content.Headers.Subject[0] === subject);
    }).as('mails')
    return mailhog
  },
  first(){
    cy.log('Getting first email')
    cy.get('@mails').then(mails => {
      return mails[0]
    }).as('mails')
    return mailhog
  },
  getSubject(){
    cy.log('Getting subject')
    return cy.get('@mails').then(mails => {
      if (Array.isArray(mails)) {
        return mails[0].Content.Headers.Subject[0]
      }
      return mails.Content.Headers.Subject[0]
    })
  },
  getBody(){
    cy.log('Getting body')
    return cy.get('@mails').then(mails => {
      if (Array.isArray(mails)) {
        return mails[0].Content.Body
      }
      return mails.Content.Body
    })
  }
}