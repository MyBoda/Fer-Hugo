document.addEventListener('DOMContentLoaded', function() {
    
    // 1. LÓGICA DEL CONTADOR (17 de Octubre de 2026)
    const countDownDate = new Date("Oct 17, 2026 15:00:00").getTime();

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(x);
            const container = document.querySelector(".countdown-container");
            if (container) {
                container.innerHTML = "<p style='font-family: Playfair Display; font-size: 2rem; color: #fff; font-weight: normal; font-style: italic;'>¡El gran día ha llegado!</p>";
            }
            const title = document.querySelector(".countdown-title");
            if (title) title.style.display = "none";
        }
    }, 1000);

    // 2. LÓGICA DEL SOBRE Y REPRODUCTOR (Sincronizado con tus IDs actuales)
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
    const mainContent = document.getElementById('mainContent');
    const audioBoda = document.getElementById('audioBoda');
    const reproductorAudio = document.getElementById('reproductorAudio');
    const btnReproductor = document.getElementById('btnReproductor');
    const iconoControl = document.getElementById('iconoControl');

    function abrirInvitacion() {
        // Ocultar el sobre
        if (envelopeOverlay) {
            envelopeOverlay.classList.add('hidden');
            setTimeout(() => {
                envelopeOverlay.style.display = 'none';
            }, 800);
        }
        
        // Mostrar el contenido de la boda
        if (mainContent) {
            mainContent.style.display = 'block';
        }

        // Reproducir música
        if (audioBoda) {
            audioBoda.play().then(() => {
                if (reproductorAudio) reproductorAudio.classList.add('reproduciendo');
            }).catch(error => {
                console.log("Reproducción automática bloqueada por el navegador:", error);
            });
        }

        // Activar animaciones iniciales
        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }, 150);
    }

    // Evento de clic en el sobre / botón
    if (openEnvelopeBtn) {
        openEnvelopeBtn.addEventListener('click', abrirInvitacion);
    }

    // Evento de clic opcional en el texto inferior "HAZ CLICK PARA ABRIR"
    if (envelopeOverlay) {
        const openText = envelopeOverlay.querySelector('.open-text');
        if (openText) {
            openText.addEventListener('click', abrirInvitacion);
        }
    }

    // Control manual del reproductor de música
    if (btnReproductor && audioBoda) {
        btnReproductor.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audioBoda.paused) {
                audioBoda.play();
                if (reproductorAudio) reproductorAudio.classList.add('reproduciendo');
            } else {
                audioBoda.pause();
                if (reproductorAudio) reproductorAudio.classList.remove('reproduciendo');
            }
        });
    }

    // 3. ANIMACIONES AL HACER SCROLL (Fade-in)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});
