// Component Loader - Carga componentes HTML dinámicamente
document.addEventListener('DOMContentLoaded', async function() {
  const components = [
    { id: 'nav-component', file: 'components/nav.html' },
    { id: 'about-component', file: 'components/about.html' },
    { id: 'experience-component', file: 'components/experience.html' },
    { id: 'projects-component', file: 'components/projects.html' },
    { id: 'music-component', file: 'components/music.html' },
    { id: 'contact-component', file: 'components/contact.html' },
    { id: 'footer-component', file: 'components/footer.html' },
    { id: 'music-player-component', file: 'components/music-player.html' }
  ];

  // Cargar cada componente
  for (const component of components) {
    try {
      const response = await fetch(component.file);
      if (response.ok) {
        const html = await response.text();
        const element = document.getElementById(component.id);
        if (element) {
          element.innerHTML = html;
        }
      } else {
        console.error(`Error cargando ${component.file}: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error cargando componente ${component.file}:`, error);
    }
  }
});
