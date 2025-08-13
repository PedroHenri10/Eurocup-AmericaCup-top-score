document.addEventListener('DOMContentLoaded', () => {

    const btnEuro = document.getElementById('btn-euro');
    const btnCopaAmerica = document.getElementById('btn-copa-america');
    const landingPage = document.querySelector('.landing-page');
    
    if (btnEuro) {
        btnEuro.addEventListener('click', () => {
            localStorage.setItem('selectedCompetition', 'Eurocopa');
        });
    }

    if (btnCopaAmerica) {
        btnCopaAmerica.addEventListener('click', () => {
            localStorage.setItem('selectedCompetition', 'Copa América');
        });
    }

        const imagensMobile = [
    {
        src: 'src/backgronds/bg-mobile-copaAmerica.jpg',
        position: 'top center'
    },
    {
        src: 'src/backgronds/bg-mobile-eurocopa.jpg',
        position: 'top center' 
    }
];
    
    const imagemDesktop = 'src/backgronds/copaAmericaxEuro.png'; 
    
    let imagemAtualIndex = 0;
    let slideshowInterval = null; 

    function iniciarSlideshow() {
        if (slideshowInterval) return;

        const imagemInicial = imagensMobile[imagemAtualIndex];
        landingPage.style.backgroundImage = `url(${imagemInicial.src})`; 
        landingPage.style.backgroundPosition = imagemInicial.position;

        slideshowInterval = setInterval(() => {
            imagemAtualIndex = (imagemAtualIndex + 1) % imagensMobile.length;
            
            const proximaImagem = imagensMobile[imagemAtualIndex];

            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.top = '0';
            tempDiv.style.left = '0';
            tempDiv.style.width = '100%';
            tempDiv.style.height = '100%';
            tempDiv.style.backgroundImage = `url(${proximaImagem.src})`; 
            tempDiv.style.backgroundSize = 'cover';
            tempDiv.style.backgroundPosition = proximaImagem.position; 
            tempDiv.style.backgroundAttachment = 'fixed';
            tempDiv.style.opacity = '0';
            tempDiv.style.transition = 'opacity 2.5s ease-in-out'; 
            tempDiv.style.zIndex = '-1';

            landingPage.insertBefore(tempDiv, landingPage.firstChild);
            
            requestAnimationFrame(() => {
                tempDiv.style.opacity = '1';
            });
            
            setTimeout(() => {
                landingPage.style.backgroundImage = `url(${proximaImagem.src})`;
                tempDiv.remove();
            }, 3000); 

        }, 4000);
    }

    function pararSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }
        landingPage.style.backgroundImage = `url(${imagemDesktop})`;
        landingPage.style.backgroundPosition = 'center center';
    }

    function verificarTamanhoTela() {
        if (window.innerWidth <= 768) {
            iniciarSlideshow();
        } else {
            pararSlideshow();
        }
    }

    verificarTamanhoTela();
    window.addEventListener('resize', verificarTamanhoTela);
});