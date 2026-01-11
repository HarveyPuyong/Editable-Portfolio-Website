import {getMainInfoAPI} from "./../api/main-info-api.js"
import {getAchievementsAPI} from "./../api/achievement-api.js"
import {getExperiencesAPI} from "./../api/experience-api.js"
import {getProjectsAPI} from "./../api/project-api.js"
import {getEducationsAPI} from "./../api/education-api.js"
import {getToolsAPI} from "./../api/tool-api.js"


const displayProfileCard = async () => {
  try{
    const data = await getMainInfoAPI();
    console.log(data);

    const profileCardHTML = `
      <div class="profile-card__img-container">
        <input type="file" id="profileImageInput" accept="image/*" hidden>
        <label for="profileImageInput" class="profile-card__img-container--input-icon" title="Upload-Image">
          <i class="fa-solid fa-camera"></i>
        </label>

        <img class="profile-card__image" src="${data.info.profileImage}" alt="profile-image">
      </div>
      
      <div class="profile-card__details">
        <select name="select-work-availability" id="select-work-availability">
          <option value="">Select Work Availabilty</option>
          <option value="available">Available for work</option>
          <option value="unavailable">Unavailable for work</option>
        </select>

        <div class="work-availability ${data.info.workAvailability}">
          <span class="work-availability__dot-status"></span>
          <p class="work-availability__label">Available for work</p>
        </div>

        <div class="profile-card__name editable-text" data-target="name-input"> ${data.info.name} </div>
        <input type="hidden" name="name-input" id="name-input">

        <div class="social-list-inputs">
          <input class="instagram-input-link" type="text" placeholder="Enter instagram link">
          <input class="tiktok-input-link" type="text" placeholder="Enter tiktok link">
          <input class="youtube-input-link" type="text" placeholder="Enter youtube link">
          <input class="facebook-input-link" type="text" placeholder="Enter facebook link">
        </div>

        <div class="profile-card__social-list">
          <a href="${data.info.instagramLink}" class="profile-card__social-list--img">
            <img class="profile-card__social-list--img-icon" src="images-and-icons/instagram.png" alt="instagram-img">
          </a>
          <a href="${data.info.tiktokLink}" class="profile-card__social-list--img">
            <img class="profile-card__social-list--img-icon" src="images-and-icons/tiktok.png" alt="tiktok-icon">
          </a>
          <a href="${data.info.youtubeLink}" class="profile-card__social-list--img">
            <img class="profile-card__social-list--img-icon" src="images-and-icons/youtube.png" alt="youtube-icon">
          </a>
          <a href="${data.info.facebookLink}" class="profile-card__social-list--img"> 
            <img class="profile-card__social-list--img-icon" src="images-and-icons/facebook.png" alt="facebook-icon">
          </a>
        </div>

        <div class="profile-card__buttons-container">
          <input id="CV-upload" type="file" type="file" accept=".pdf,.doc,.docx" hidden>
          <label for="CV-upload" class="profile-card__btn upload-cv-btn" title="Upload-CV">
            <i class="fa-solid fa-upload"></i>
            <span class="profile-card__btn--label">Upload CV</span>
          </label>
            
          <a href="${data.info.cvFile}" download class="profile-card__btn download-cv-btn">
            <i class="profile-card__btn--icon fas fa-download"></i>
            <p class="profile-card__btn--label">Download CV</p>
          </a>
          
          <a href="#contact-section" class="profile-card__btn contact-me-btn">
            <img class="profile-card__btn--icon" src="images-and-icons/contact-icon.png" alt="contact-icon">
            <p class="profile-card__btn--label">Contact Me</p>
          </a>
        </div>
      </div>
    `;

    document.getElementById('profile-card').innerHTML = profileCardHTML;
    document.dispatchEvent(new Event("displayedContent"));

  }catch(err){

  }

}

const updateWorkAvailability = () => {
  document.addEventListener('displayedContent', () => {
    const workAvailabilityContainer = document.querySelector('.work-availability');
    const workAvailabilityLabel = document.querySelector('.work-availability__label');

    console.log(workAvailabilityContainer.classList)

    if(workAvailabilityContainer.classList.contains('available')) workAvailabilityLabel.innerText = 'Available For Work';
    else workAvailabilityLabel.innerText = 'Unavailable For Work';
  });
}



export default function DisplayContentMain () {
  displayProfileCard();
  updateWorkAvailability();
}