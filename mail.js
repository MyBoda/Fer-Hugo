document.addEventListener('DOMContentLoaded', function() {
    
    // 1. CONTADOR (17 de Octubre de 2026)
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
            if (container) container.innerHTML = "<p style='font-family: Playfair Display; font-size: 2rem; color: #fff; font-style: italic;'>¡El gran día ha llegado!</p>";
            const title = document.querySelector(".countdown-title");
            if (title) title.style.display = "none";
        }
    }, 1000);

    // 2. SOBRE Y MÚSICA
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
    const mainContent = document.getElementById('mainContent');
    const audioBoda = document.getElementById('audioBoda');
    const reproductorAudio = document.getElementById('reproductorAudio');
    const btnReproductor = document.getElementById('btnReproductor');
    const iconoControl = document.getElementById('iconoControl');

    function abrirInvitacion() {
        if (envelopeOverlay) {
            envelopeOverlay.classList.add('hidden');
            setTimeout(() => { envelopeOverlay.style.display = 'none'; }, 800);
        }
        if (mainContent) mainContent.style.display = 'block';

        if (audioBoda) {
            audioBoda.play().then(() => {
                if (reproductorAudio) reproductorAudio.classList.add('reproduciendo');
                if (iconoControl) iconoControl.className = 'icono-pausa';
            }).catch(error => console.log("Autoplay bloqueado:", error));
        }

        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
        }, 150);
    }

    if (openEnvelopeBtn) openEnvelopeBtn.addEventListener('click', abrirInvitacion);
    if (envelopeOverlay) {
        const openText = envelopeOverlay.querySelector('.open-text');
        if (openText) openText.addEventListener('click', abrirInvitacion);
    }

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

    // 3. GOOGLE DRIVE (Bloqueado hasta Oct 17 2026)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwL_eQypLJ_iNiJv2gc4uMnppUtj5Ky8_ifHIa_CHcfhYLtQItbQ1IPxAV5m8Hg_WNY/exec'; 
    const form = document.getElementById('upload-form');
    const statusText = document.getElementById('upload-status');
    const btnSubir = document.getElementById('btn-subir');
    const fechaLimiteSubida = new Date("Oct 17, 2026 00:00:00").getTime();
    const ahoraMismo = new Date().getTime();

    if (form) {
        if (ahoraMismo < fechaLimiteSubida) {
            form.style.display = 'none';
            const aviso = document.createElement('p');
            aviso.className = 'detail-text';
            aviso.style.color = 'var(--primary-color)';
            aviso.style.fontWeight = '600';
            aviso.innerText = '📸 Podrás subir tus fotos a partir del gran día: 17 de Octubre de 2026. ¡Te esperamos!';
            form.parentNode.insertBefore(aviso, form);
        } else {
            form.addEventListener('submit', e => {
                e.preventDefault();
                const fileInput = document.getElementById('photo-file');
                if (!fileInput || fileInput.files.length === 0) return;
                
                const file = fileInput.files[0];
                btnSubir.disabled = true; btnSubir.innerText = 'Subiendo...';
                statusText.style.display = 'block'; statusText.innerText = 'Subiendo...';

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    const rawData = reader.result.split(',')[1];
                    fetch(scriptURL, {
                        method: 'POST',
                        body: JSON.stringify({ filename: file.name, mimeType: file.type, fileData: rawData })
                    }).then(r => r.json()).then(res => {
                        if (res.result === 'success') {
                            statusText.innerText = '¡Archivo subido con éxito!';
                            form.reset(); btnSubir.disabled = false; btnSubir.innerText = 'Subir Otro';
                        } else {
                            statusText.innerText = 'Error al subir.'; btnSubir.disabled = false; btnSubir.innerText = 'Intentar de nuevo';
                        }
                    }).catch(() => {
                        statusText.innerText = 'Error de conexión.'; btnSubir.disabled = false; btnSubir.innerText = 'Subir Recuerdo';
                    });
                };
            });
        }
    }

    // 4. SCROLL FADE-IN
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
