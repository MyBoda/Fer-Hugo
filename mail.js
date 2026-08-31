document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
    const openTextBtn = document.getElementById('openTextBtn');
    const openEnvelopeTrigger = document.getElementById('openEnvelopeTrigger');
    const audioBoda = document.getElementById('audioBoda');
    const reproductorAudio = document.getElementById('reproductorAudio');
    const btnReproductor = document.getElementById('btnReproductor');
    const mainContent = document.getElementById('mainContent');

    // Función principal para abrir la invitación
    function abrirInvitacion() {
        // 1. Ocultar la portada del sobre
        if (envelopeOverlay) {
            envelopeOverlay.classList.add('hidden');
        }
        
        // 2. Mostrar el contenido principal de la boda
        if (mainContent) {
            mainContent.style.display = 'block';
        }
        
        // 3. Intentar reproducir la música de fondo automáticamente
        if (audioBoda) {
            audioBoda.play().then(() => {
                if (reproductorAudio) {
                    reproductorAudio.classList.add('reproduciendo');
                }
            }).catch(e => {
                console.log("Reproducción automática bloqueada por el navegador (requiere interacción manual)", e);
            });
        }
        
        // 4. Activar animaciones de entrada
        setTimeout(checkFadeIn, 150);
    }

    // Eventos de clic para asegurar que abra desde cualquier elemento interactivo del sobre
    if (openEnvelopeBtn) {
        openEnvelopeBtn.addEventListener('click', abrirInvitacion);
    }
    if (openTextBtn) {
        openTextBtn.addEventListener('click', abrirInvitacion);
    }
    if (openEnvelopeTrigger) {
        openEnvelopeTrigger.addEventListener('click', abrirInvitacion);
    }
    
    // Opcional: Permitir abrir al hacer clic en todo el fondo del sobre por comodidad
    if (envelopeOverlay) {
        envelopeOverlay.addEventListener('click', (e) => {
            // Evita conflictos si hacen clic en elementos específicos que ya tienen su propio evento
            abrirInvitacion();
        });
    }

    // Control manual del reproductor de audio flotante
    if (btnReproductor && audioBoda) {
        btnReproductor.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que se propague el evento
            if (audioBoda.paused) {
                audioBoda.play();
                reproductorAudio.classList.add('reproduciendo');
            } else {
                audioBoda.pause();
                reproductorAudio.classList.remove('reproduciendo');
            }
        });
    }

    // Función para activar los elementos con animación fade-in al hacer scroll
    function checkFadeIn() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFadeIn);
    checkFadeIn();

    // Cuenta regresiva (ajustada a la fecha de la boda: 17 de octubre de 2026)
    const countDownDate = new Date("October 17, 2026 00:00:00").getTime();
    
    function actualizarContador() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const d = document.getElementById("days");
        const h = document.getElementById("hours");
        const m = document.getElementById("minutes");
        const s = document.getElementById("seconds");

        if (distance < 0) {
            if (d) d.innerText = "00";
            if (h) h.innerText = "00";
            if (m) m.innerText = "00";
            if (s) s.innerText = "00";
            return;
