document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('musica-fondo');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const icono = document.getElementById('icono-reproductor');

  btnPlayPause.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      icono.className = 'icono-pausa'; // Cambia el ícono a pausa
    } else {
      audio.pause();
      icono.className = 'icono-play'; // Cambia el ícono a play
    }
  });
});