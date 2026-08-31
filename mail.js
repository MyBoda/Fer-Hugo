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

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            daysEl.innerText = days.toString().padStart(2, '0');
            hoursEl.innerText = hours.toString().padStart(2, '0');
            minutesEl.innerText = minutes.toString().padStart(2, '0');
            secondsEl.innerText = seconds.toString().padStart(2, '0');
        }

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

    // 2. LÓGICA DEL SOBRE Y REPRODUCTOR DE MÚSICA
    const audioBoda = document.getElementById('audioBoda');
    const btnReproductor = document.getElementById('btnReproductor');
    const iconoControl = document.getElementById('iconoControl');
    const reproductorAudio = document.getElementById('reproductorAudio');
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
    const mainContent = document.getElementById('mainContent');

    function abrirInvitacion() {
        if (envelopeOverlay) {
            envelopeOverlay.classList.add('hidden');
            setTimeout(() => {
                envelopeOverlay.style.display = 'none';
            }, 800);
        }
        
        if (mainContent) {
            mainContent.style.display = 'block';
        }

        if (audioBoda) {
            audioBoda.play().then(() => {
                if (iconoControl) iconoControl.className = 'icono-pausa';
                if (reproductorAudio) reproductorAudio.classList.add('reproduciendo');
            }).catch(error => {
                console.log("Reproducción automática bloqueada por el navegador:", error);
            });
        }

        // CORRECCIÓN VISUAL: Asegurar que los elementos visibles al abrir se muestren de inmediato
        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(el => {
                // Si el elemento está en la parte superior, lo mostramos de inmediato
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('visible');
                }
            });
        }, 100);
    }

    // Eventos para abrir el sobre
    if (openEnvelopeBtn) {
        openEnvelopeBtn.addEventListener('click', abrirInvitacion);
    }
    if (envelopeOverlay) {
        const openText = envelopeOverlay.querySelector('.open-text');
        if (openText) {
            openText.addEventListener('click', abrirInvitacion);
        }
    }

    // Control del botón de reproducción manual
    if (btnReproductor && audioBoda) {
        btnReproductor.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audioBoda.paused) {
                audioBoda.play();
                if (iconoControl) iconoControl.className = 'icono-pausa';
                if (reproductorAudio) reproductorAudio.classList.add('reproduciendo'); 
            } else {
                audioBoda.pause();
                if (iconoControl) iconoControl.className = 'icono-play';
                if (reproductorAudio) reproductorAudio.classList.remove('reproduciendo'); 
            }
        });
    }

    // 3. ANIMACIONES AL HACER SCROLL (Fade-in seguro)
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length > 0) {
        const appearOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }
});
