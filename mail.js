document.addEventListener('DOMContentLoaded', function() {
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
    const mainContent = document.getElementById('mainContent');
    const audioBoda = document.getElementById('audioBoda');
    const reproductorAudio = document.getElementById('reproductorAudio');
    const btnReproductor = document.getElementById('btnReproductor');

    function abrirInvitacion() {
        // 1. Ocultar el sobre con transición
        if (envelopeOverlay) {
            envelopeOverlay.classList.add('hidden');
        }

        // 2. Mostrar el contenido principal de la boda
        if (mainContent) {
            mainContent.style.display = 'block';
        }

        // 3. Reproducir la música de fondo
        if (audioBoda) {
            audioBoda.play().then(() => {
                if (reproductorAudio) {
                    reproductorAudio.classList.add('reproduciendo');
                }
            }).catch(error => {
                console.log("Reproducción automática bloqueada por políticas del navegador:", error);
            });
        }

        // 4. Activar las animaciones de entrada (fade-in)
        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }, 150);
    }

    // Evento al hacer clic en el sobre o en el botón del sello
    if (openEnvelopeBtn) {
        openEnvelopeBtn.addEventListener('click', abrirInvitacion);
    }

    // Permitir clic en todo el overlay del sobre por comodidad
    if (envelopeOverlay) {
        envelopeOverlay.addEventListener('click', function(e) {
            abrirInvitacion();
        });
    }

    // Control manual del reproductor de música flotante
    if (btnReproductor && audioBoda) {
        btnReproductor.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar conflictos de clics
            if (audioBoda.paused) {
                audioBoda.play();
                reproductorAudio.classList.add('reproduciendo');
            } else {
                audioBoda.pause();
                reproductorAudio.classList.remove('reproduciendo');
            }
        });
    }

    // Observador para animar elementos al hacer scroll hacia abajo
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
