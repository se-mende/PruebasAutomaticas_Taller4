describe('Los estudiantes under monkeys', function(){
    it('visits los estudiantes and survives monkeys', function(){
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        //randomClick(10);
        randomEvent(10);
    })
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function randomClick(monkeysLeft) {
    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }

            cy.wait(1000);
            randomClick(monkeysLeft);
        });
    }
}

function randomEvent(eventsLeft) {
    function randomAlphaNumeric() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }

    var eventsLeft = eventsLeft;
    if(eventsLeft > 0){
        var random = getRandomInt(0, 3);
        switch(random){
            case 0: //Click link al azar
                cy.get('a').then(links => {
                    var randomLink = links.get(getRandomInt(0,links.length));
                    if(!Cypress.dom.isHidden(randomLink)){
                        cy.wrap(randomLink).click({force: true});
                        eventsLeft = eventsLeft - 1;
                    }
                    cy.wait(1000);
                    randomEvent(eventsLeft);
                });
                break;
            case 1: //Llenar un campo de texto al azar
                cy.get('input').then(inputs => {
                    var randomInput = inputs.get(getRandomInt(0,inputs.length));
                    if(!Cypress.dom.isHidden(randomInput)){
                        cy.wrap(randomInput).type(randomAlphaNumeric(), {force: true});
                        eventsLeft = eventsLeft - 1;
                    }
                    cy.wait(1000);
                    randomEvent(eventsLeft);
                });
                break;
            case 2: //Seleccionar un combo al azar
                if(Cypress.$('select').length > 0){
                    cy.get('select').then(selects => {
                        if(selects.length > 0){
                            var randomSelect = selects.get(getRandomInt(0,selects.length));
                            if(!Cypress.dom.isHidden(randomSelect)){
                                var options = randomSelect.children;
                                var randomOption = options[getRandomInt(0,options.length)];
                                randomOption.click({force: true});
                                eventsLeft = eventsLeft - 1;
                            }
                            cy.wait(1000);
                            randomEvent(eventsLeft);   
                        }
                    });
                }
                cy.wait(1000);
                randomEvent(eventsLeft);
                break;
            case 3: //Hacer click en un boton al azar
                cy.get('button').then(buttons => {
                    var randomButton = buttons.get(getRandomInt(0,buttons.length));
                    if(!Cypress.dom.isHidden(randomButton)){
                        cy.wrap(randomButton).click({force: true});
                        eventsLeft = eventsLeft - 1;
                    }
                    cy.wait(1000);
                    randomEvent(eventsLeft);
                });
                break;
        }
    }
}