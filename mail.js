/**
 * Script completo y optimizado para la invitación digital de boda.
 * Gestiona la transición del sobre interactivo, la reproducción de audio,
 * las animaciones de aparición gradual (fade-in) y la cuenta regresiva.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Selección segura de elementos del DOM
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
    const openTextBtn = document.getElementById('openTextBtn');
    const openEnvelopeTrigger = document.getElementById('openEnvelopeTrigger');
    const mainContent = document.getElementById('mainContent');
    const audioBoda = document.getElementById('audioBoda');
    const reproductorAudio = document.getElementById('reproductorAudio');
    const btnReproductor = document.getElementById('btnReproductor');

    /**
     * Función central para abrir la invitación:
     * 1. Oculta la pantalla del sobre agregando la clase 'hidden'.
     * 2. Muestra el contenido principal de la boda cambiando su visualización.
     * 3. Inicia la reproducción musical gestionando las políticas de autoplay de los navegadores.
     * 4. Activa las animaciones de entrada (fade-in).
     */
    function abrirInvitacion() {
        if (envelopeOverlay) {
            envelopeOverlay.classList.add('hidden');
        }
        
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.classList.add('visible');
        }
        
        if (audioBoda) {
            audioBoda.play().then(() => {
                if (reproductorAudio) {
                    reproductorAudio.classList.add('reproduciendo');
                }
            }).catch(error => {
                console.warn("La reproducción automática fue restringida por el navegador. Se requiere interacción manual desde el botón flotante.", error);
            });
        }
        
        // Disparar las animaciones de los elementos con la clase fade-in tras la apertura
        setTimeout(checkFadeIn, 150);
    }

    // --- ASIGNACIÓN DE EVENTOS DE APERTURA ---
    
    if (openEnvelopeBtn) {
        openEnvelopeBtn.addEventListener('click', abrirInvitacion);
    }
    
    if (openTextBtn) {
        openTextBtn.addEventListener('click', abrirInvitacion);
    }
    
    if (openEnvelopeTrigger) {
        openEnvelopeTrigger.addEventListener('click', abrirInvitacion);
    }

    // Permitir clic en todo el overlay del sobre para maximizar la usabilidad táctil en móviles
    if (envelopeOverlay) {
        envelopeOverlay.addEventListener('click', (e) => {
            abrirInvitacion();
        });
    }

    // --- CONTROL MANUAL DEL REPRODUCTOR DE AUDIO FLOTANTE ---
    if (btnReproductor && audioBoda) {
        btnReproductor.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevenir propagación de eventos hacia contenedores superiores
            if (audioBoda.paused) {
                audioBoda.play();
                reproductorAudio.classList.add('reproduciendo');
            } else {
                audioBoda.pause();
                reproductorAudio.classList.remove('reproduciendo');
            }
        });
    }

    // --- SISTEMA DE ANIMACIONES AL HACER SCROLL (FADE-IN) ---
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
    checkFadeIn(); // Verificación inicial al cargar la sección principal

    // --- CUENTA REGRESIVA DINÁMICA ---
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
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000
