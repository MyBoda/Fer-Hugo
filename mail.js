// 1. LÓGICA DEL CONTADOR (Actualizado al 17 de Octubre de 2026)
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

// 2. LÓGICA DEL SOBRE Y REPRODUCTOR DE MÚSICA
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('musica-fondo');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const icono = document.getElementById('icono-reproductor');
  const contenedorReproductor = document.getElementById('contenedor-reproductor-audio');
  const overlay = document.getElementById('envelope-overlay');
  const openEnvelopeBtn = document.getElementById('open-envelope-btn');

  if (openEnvelopeBtn && overlay) {
      openEnvelopeBtn.addEventListener('click', () => {
          overlay.classList.add('hidden');
          if (audio) {
              audio.play().then(() => {
                  if (icono) icono.className = 'icono-pausa';
                  if (contenedorReproductor) contenedorReproductor.classList.add('reproduciendo');
              }).catch(error => {
                  console.log("Reproducción automática bloqueada:", error);
              });
          }
      });
  }

  if (btnPlayPause && audio) {
      btnPlayPause.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
          audio.play();
          if (icono) icono.className = 'icono-pausa';
          if (contenedorReproductor) contenedorReproductor.classList.add('reproduciendo'); 
        } else {
          audio.pause();
          if (icono) icono.className = 'icono-play';
          if (contenedorReproductor) contenedorReproductor.classList.remove('reproduciendo'); 
        }
      });
  }
});

// 3. LÓGICA DE SUBIDA A GOOGLE DRIVE Y BLOQUEO POR FECHA
const scriptURL = 'https://script.google.com/macros/s/AKfycbwL_eQypLJ_iNiJv2gc4uMnppUtj5Ky8_ifHIa_CHcfhYLtQItbQ1IPxAV5m8Hg_WNY/exec'; 
const form = document.getElementById('upload-form');
const statusText = document.getElementById('upload-status');
const btnSubir = document.getElementById('btn-subir');

const fechaLimiteSubida = new Date("Oct 17, 2026 00:00:00").getTime();
const ahoraMismo = new Date().getTime();

if (form) {
    if (ahoraMismo < fechaLimiteSubida) {
        form.style.display = 'none';
        const avisoBloqueo = document.createElement('p');
        avisoBloqueo.className = 'detail-text';
        avisoBloqueo.style.color = 'var(--primary-color)';
        avisoBloqueo.style.fontWeight = '600';
        avisoBloqueo.style.margin = '15px 0';
        avisoBloqueo.innerText = '📸 Podrás subir tus fotos y videos a partir del gran día: 17 de Octubre de 2026. ¡Te esperamos!';
        form.parentNode.insertBefore(avisoBloqueo, form);
    } else {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const fileInput = document.getElementById('photo-file');
            if (!fileInput || fileInput.files.length === 0) return;

            const file = fileInput.files[0];
            btnSubir.disabled = true;
            btnSubir.innerText = 'Subiendo...';
            statusText.style.display = 'block';
            statusText.innerText = 'Subiendo tu archivo a la nube, por favor espera...';

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const rawData = reader.result.split(',')[1];
                const data = {
                    filename: file.name,
                    mimeType: file.type,
                    fileData: rawData
                };

                fetch(scriptURL, {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    if (result.result === 'success') {
                        statusText.innerText = '¡Archivo subido con éxito! Muchas gracias por compartir tus recuerdos.';
                        form.reset();
                        btnSubir.disabled = false;
                        btnSubir.innerText = 'Subir Otro Archivo';
                    } else {
                        statusText.innerText = 'Error al subir: ' + (result.error || 'Desconocido');
                        btnSubir.disabled = false;
                        btnSubir.innerText = 'Intentar de nuevo';
                    }
                })
                .catch(error => {
                    console.error('Error de red!', error);
                    statusText.innerText = 'Hubo un error de conexión. Inténtalo de nuevo.';
                    btnSubir.disabled = false;
                    btnSubir.innerText = 'Subir Recuerdo';
                });
            };
        });
    }
}

// 4. LÓGICA DE ANIMACIÓN AL HACER SCROLL (Fade-in)
document.addEventListener("DOMContentLoaded", function() {
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    setTimeout(() => {
        document.querySelectorAll('.hero-content.fade-in').forEach(el => el.classList.add('visible'));
    }, 100);
});
