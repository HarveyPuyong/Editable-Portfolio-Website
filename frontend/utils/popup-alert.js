/* ==========================================================================
   CLOSE POPUP ALERT
   ========================================================================== */
const closePopupAlert = () => {
  const popupContainers = document.querySelectorAll('.popup-alert');

  popupContainers.forEach(popup => {
    const popupButton = popup.querySelector('.popup-alert__button');
    
    popupButton.addEventListener('click', () => {
      popup.classList.add('hide');
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
  closePopupAlert();
}


/* ==========================================================================
   POPUP ERROR 
   ========================================================================== */
function popupError(detail) {
  const popupContainer = document.querySelector('.popup-error');
  popupContainer.classList.remove('hide');
  
  popupContainer.querySelector('.popup-alert__details').innerText = detail;
  closePopupAlert();
}


export {popupSuccess, popupError, closePopupAlert}