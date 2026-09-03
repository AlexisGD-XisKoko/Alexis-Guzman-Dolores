document.addEventListener("DOMContentLoaded", () => {
    // 1. Configuración de Particles.js (Efecto de red / constelación)
    if(window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00e5ff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00e5ff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // 2. Animaciones de desplazamiento (Fade-in y Slide-up)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Forzar descarga de archivos (Evita que se abra el TXT/PDF en otra pestaña si es posible)
    document.querySelectorAll('a[download]').forEach(boton => {
        boton.addEventListener('click', function(evento) {
            evento.preventDefault(); 
            
            const urlArchivo = this.getAttribute('href');
            const nombreArchivo = this.getAttribute('download');

            fetch(urlArchivo)
                .then(respuesta => respuesta.blob())
                .then(blob => {
                    const urlBlob = window.URL.createObjectURL(blob);
                    const enlaceTemporal = document.createElement('a');
                    enlaceTemporal.style.display = 'none';
                    enlaceTemporal.href = urlBlob;
                    enlaceTemporal.download = nombreArchivo;
                    document.body.appendChild(enlaceTemporal);
                    enlaceTemporal.click();
                    window.URL.revokeObjectURL(urlBlob);
                    document.body.removeChild(enlaceTemporal);
                })
                .catch(() => {
                    // Respaldo por si el fetch falla (ej. bloqueos de seguridad en local)
                    window.open(urlArchivo, '_blank');
                });
        });
    });
});