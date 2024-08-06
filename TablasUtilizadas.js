// Función para alternar la visibilidad del menú hamburguesa

function toggleMenu() {
  var mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.style.display = (mobileMenu.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  const openPopup = document.getElementById('openPopup');
  const closePopup = document.getElementById('closePopup');
  const popup = document.getElementById('popup');

  openPopup.addEventListener('click', () => {
      popup.style.display = 'flex'; // Mostrar el popup
  });

  closePopup.addEventListener('click', () => {
      popup.style.display = 'none'; // Ocultar el popup
  });

  // Opcional: cerrar el popup si el usuario hace clic fuera del contenido
  window.addEventListener('click', (event) => {
      if (event.target === popup) {
          popup.style.display = 'none';
      }
  });
});


window.addEventListener("load",function(){

  document.getElementById("Enlace1"  ).style.color   = "darkgoldenrod";
  document.getElementById("Enlace2"  ).style.color   = "darkgoldenrod";
  document.getElementById("Enlace3"  ).style.color   = "darkgoldenrod";
  document.getElementById("openPopup").style.color   = "darkgoldenrod";

}); 


