const navLinks = document.querySelectorAll( '#main-nav a' )
const mobileMenuNav = document.getElementById( 'mobile-menu' )
const contentSections = document.querySelectorAll( '.content-section' )
const mobileMenuButton = document.getElementById( 'mobile-menu-button' )
const mainNav = document.getElementById( 'main-nav' )

mobileMenuNav.innerHTML = mainNav.innerHTML
const mobileNavLinks = mobileMenuNav.querySelectorAll( 'a' )

function setActiveLink ( targetId ) {
    const allLinks = [ ...navLinks, ...mobileNavLinks ]
    allLinks.forEach( link => {
        if ( link.getAttribute( 'href' ) === `#${ targetId }` ) {
            link.classList.add( 'active' )
        } else {
            link.classList.remove( 'active' )
        }
    } )
}

function showContent ( targetId ) {
    contentSections.forEach( section => {
        if ( section.id === targetId ) {
            section.classList.add( 'active' )
        } else {
            section.classList.remove( 'active' )
        }
    } )
    setActiveLink( targetId )
}

function handleNavClick ( event ) {
    event.preventDefault()
    const targetId = this.getAttribute( 'href' ).substring( 1 )
    window.location.hash = targetId
}

function handleHashChange () {
    const hash = window.location.hash.substring( 1 ) || 'inicio'
    showContent( hash )
    if ( mobileMenuNav.classList.contains( 'block' ) ) {
        mobileMenuNav.classList.remove( 'block' )
        mobileMenuNav.classList.add( 'hidden' )
    }
}

[ ...navLinks, ...mobileNavLinks ].forEach( link => {
    link.addEventListener( 'click', handleNavClick )
} )

window.addEventListener( 'hashchange', handleHashChange )

mobileMenuButton.addEventListener( 'click', function () {
    mobileMenuNav.classList.toggle( 'hidden' )
    mobileMenuNav.classList.toggle( 'block' )
} )

// Initial load
handleHashChange()

// Doughnut Chart
const ctx = document.getElementById( 'pillarsChart' ).getContext( '2d' )
const pillarsChart = new Chart( ctx, {
    type: 'doughnut',
    data: {
        labels: [ 'Ética', 'Netiqueta', 'Respeito', 'Legalidade' ],
        datasets: [ {
            label: 'Pilares da Cidadania Digital',
            data: [ 25, 25, 25, 25 ],
            backgroundColor: [
                '#A68E7A',
                '#C4B7A9',
                '#A9998B',
                '#8C7A6B'
            ],
            borderColor: '#F8F7F4',
            borderWidth: 4,
            hoverOffset: 10
        } ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: 'Inter',
                        size: 14
                    }
                }
            },
            tooltip: {
                titleFont: { family: 'Inter', weight: 'bold', size: 14 },
                bodyFont: { family: 'Inter', size: 12 },
            }
        },
        cutout: '60%'
    }
} )

// ... (Restante do seu código JS: Debate Example, Quiz, Checklist)
const debateExample = document.getElementById( 'debate-example' )
let isBadExample = true
debateExample.addEventListener( 'click', function () {
    if ( isBadExample ) {
        this.classList.remove( 'border-red-400', 'bg-red-50/50' )
        this.classList.add( 'border-green-400', 'bg-green-50/50' )
        this.innerHTML = `
            <p class="font-semibold text-green-800">Postura Adequada:</p>
            <p class="text-green-700">"Sua perspectiva é interessante. Eu li em outro autor que a questão pode ser vista por um ângulo diferente, e gostaria de compartilhar para enriquecer o debate..."</p>
            <small class="text-gray-500 block mt-2">(Clique para ver a abordagem inadequada)</small>
        `
    } else {
        this.classList.remove( 'border-green-400', 'bg-green-50/50' )
        this.classList.add( 'border-red-400', 'bg-red-50/50' )
        this.innerHTML = `
            <p class="font-semibold text-red-800">Postura Inadequada:</p>
            <p class="text-red-700">"Sua ideia não faz o menor sentido. Claramente você não leu o material direito."</p>
            <small class="text-gray-500 block mt-2">(Clique para ver a abordagem correta)</small>
        `
    }
    isBadExample = !isBadExample
} )

// Quiz Interaction (Multiple Questions)
const questionBlocks = document.querySelectorAll( '.quiz-question-block' )
questionBlocks.forEach( block => {
    const options = block.querySelectorAll( '.quiz-option' )
    const feedback = block.querySelector( '.quiz-feedback' )
    let answered = false

    options.forEach( option => {
        option.addEventListener( 'click', function () {
            if ( answered ) return // Impede múltiplas respostas

            answered = true
            const isCorrect = this.dataset.correct === 'true'

            options.forEach( opt => {
                opt.style.cursor = 'default'
                opt.classList.remove( 'hover:bg-gray-100' )
            } )

            if ( isCorrect ) {
                this.classList.add( 'bg-green-100', 'border-green-400' )
                feedback.textContent = "Correto! " + ( this.textContent.includes( "citar a fonte" ) ? "A atitude ética é sempre buscar a fonte e dar o devido crédito." : ( this.textContent.includes( "gritar" ) ? "A netiqueta recomenda evitar CAIXA ALTA." : "Respeitar a privacidade é fundamental." ) )
                feedback.className = 'quiz-feedback mt-4 font-semibold text-green-700 block'
            } else {
                this.classList.add( 'bg-red-100', 'border-red-400' )
                const correctOption = block.querySelector( '.quiz-option[data-correct="true"]' )
                correctOption.classList.add( 'bg-green-100', 'border-green-400' )
                feedback.textContent = "Incorreto. A resposta correta está destacada em verde."
                feedback.className = 'quiz-feedback mt-4 font-semibold text-red-700 block'
            }
        } )
    } )
} )

const checklistItems = document.querySelectorAll( '.checklist-item' )
checklistItems.forEach( item => {
    const checkbox = item.querySelector( 'input[type="checkbox"]' )
    const span = item.querySelector( 'span' )
    checkbox.addEventListener( 'change', function () {
        if ( this.checked ) {
            span.classList.add( 'line-through', 'text-gray-400' )
        } else {
            span.classList.remove( 'line-through', 'text-gray-400' )
        }
    } )
} )

// ======================================================
//      LÓGICA PARA O SIMULADOR DE DECISÕES ÉTICAS
// ======================================================
const simuladorBlocks = document.querySelectorAll( '.simulador-block' )
simuladorBlocks.forEach( block => {
    const choiceButtons = block.querySelectorAll( '.choice-button' )
    const resultContainer = block.querySelector( '.result-container' )

    choiceButtons.forEach( button => {
        button.addEventListener( 'click', function () {
            // Pega o texto da consequência do atributo 'data-consequence'
            const consequenceHTML = this.dataset.consequence

            // Mostra o resultado
            resultContainer.innerHTML = consequenceHTML
            resultContainer.classList.remove( 'hidden' )

            // Adiciona uma cor de fundo baseada no resultado
            if ( consequenceHTML.includes( 'text-green-800' ) ) {
                resultContainer.className = 'result-container mt-4 p-4 rounded-lg bg-green-50 border border-green-200'
            } else if ( consequenceHTML.includes( 'text-orange-800' ) ) {
                resultContainer.className = 'result-container mt-4 p-4 rounded-lg bg-orange-50 border border-orange-200'
            } else if ( consequenceHTML.includes( 'text-red-800' ) ) {
                resultContainer.className = 'result-container mt-4 p-4 rounded-lg bg-red-50 border border-red-200'
            } else {
                resultContainer.className = 'result-container mt-4 p-4 rounded-lg bg-gray-100 border border-gray-200'
            }

            // Desabilita todos os botões daquele cenário
            choiceButtons.forEach( btn => {
                btn.disabled = true
                btn.classList.add( 'opacity-50', 'cursor-not-allowed' )
                btn.classList.remove( 'hover:bg-gray-300' )
            } )

            // Destaca o botão que foi escolhido
            this.classList.add( 'ring-2', 'ring-offset-2', 'ring-blue-500' )
        } )
    } )
} )