import {editMainInfoAPI} from "./../api/main-info-api.js"
import {editAchievementAPI} from "./../api/achievement-api.js"
import {editSkillAPI} from "./../api/skill-api.js"
import {editExperiencesAPI} from "./../api/experience-api.js"
import {editProjectAPI} from "./../api/project-api.js"
import {editToolAPI} from "./../api/tool-api.js";


const imagePreview = () => {
  document.addEventListener('change', e => {
    if (!e.target.classList.contains('image-input')) return;

    const container = e.target.closest('.with-image-content');
    if (!container) return;

    const image = container.querySelector('.image-preview');
    const file = e.target.files[0];
    if (!file || !image) return;

    const reader = new FileReader();
    reader.onload = ev => image.src = ev.target.result;
    reader.readAsDataURL(file);
  });
}



const editMainInfo = async() => {
  const name = document.querySelector('.profile-card__name').innerText;
  const workAvailability = document.querySelector('#select-work-availability').value;
  const aboutMe = document.querySelector('.about-section__about-me').innerText;
  const contactNumber = document.querySelector('#contact-number').innerText;
  const adress = document.querySelector('#address').innerText;
  const sendgridApiKey = document.querySelector('#sendgrid-api-key').value;
  const instagramLink = document.querySelector('.instagram-input-link');
  const tiktokLink = document.querySelector('.tiktok-input-link');
  const youtubeLink = document.querySelector('.youtube-input-link');
  const facebookLink = document.querySelector('.facebook-input-link');

  
}


export default function EditContentMain () {
  ['displayedToolsSection', 'displayedProjectSection', 'displayedProfileCard']
  .forEach(eventName => {
    document.addEventListener(eventName, imagePreview);
  });

  document.addEventListener('edit-mode', () => {
    const editForm = document.querySelector('#edit-content-form');

    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      editMainInfo();
    });
  });
}