describe(`I can access my todos`, () => {
  const TODOS = [
    {
      completed: true,
      label: "Get a haircut",
    },
    {
      completed: false,
      label: "Decide you preferred having long hairs",
    },
  ]

  beforeEach(() => {
    cy.server()

      .route("/api/todos", [...TODOS])
      .as("data")
      .visit("todos")
      .wait("@data")
  })

  it("It is clearly identified as the todo page ", () => {
    cy.get("h1").then(el => {
      expect(el.text()).to.match(/todo list$/i)
    })

    cy.get("h1").should("have.text", "My todo list")

    cy.document()
      .title()
      .should("match", /^todos$/i)
  })

  it(`Displays my latests todos`, () => {
    cy.findByLabelText(TODOS[0].label).should("be.checked")

    cy.findByLabelText( "dfzdaz")

      .should("not.be.checked")
  })
})
