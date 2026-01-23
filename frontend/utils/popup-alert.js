import {switchToEditMode} from "./switch-to-edit-mode.js"

/* ==========================================================================
   CLOSE POPUP ALERT
   ========================================================================== */
const closePopupAlert = (detail) => {
  const popupContainers = document.querySelectorAll('.popup-alert');

  popupContainers.forEach(popup => {
    const popupButton = popup.querySelector('.popup-alert__button');
    
    popupButton.addEventListener('click', () => {
      popup.classList.add('hide');

      if(!detail) return

      if(detail === "Session expired. Please log in again.") window.location.reload();

      if(detail === 'Logged In Successfully'){
        switchToEditMode();
      }
    })
  });
}


/* ==========================================================================
   POPUP SUCCESS
   ========================================================================== */
function popupSuccess(detail) {
  const popupContainer = document.querySelector('.popup-success');
  popupContainer.classList.remove('hide');
  
  popupContainer.querySelector('.popup-alert__details').innerText = detail;
  closePopupAlert(detail);
}


/* ==========================================================================
   POPUP ERROR 
   ========================================================================== */
function popupError(detail) {
  const popupContainer = document.querySelector('.popup-error');
  popupContainer.classList.remove('hide');
  
  popupContainer.querySelector('.popup-alert__details').innerText = detail;
  closePopupAlert(detail);
}


export {popupSuccess, popupError, closePopupAlert}