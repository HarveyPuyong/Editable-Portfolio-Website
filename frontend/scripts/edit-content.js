import {editMainInfoAPI, editMainEmailAPI} from "./../api/main-info-api.js"
import {editAchievementAPI} from "./../api/achievement-api.js"
import {editSkillAPI} from "./../api/skill-api.js"
import {editExperiencesAPI} from "./../api/experience-api.js"
import {editProjectAPI} from "./../api/project-api.js"
import {editToolAPI} from "./../api/tool-api.js";


// ================================
// Image Preview
// ================================
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
  const address = document.querySelector('#address').innerText;
  const email = document.querySelector('#email').innerText;
  const sendgridApiKey = document.querySelector('#sendgrid-api-key').value;
  const instagramLink = document.querySelector('.instagram-input-link');
  const tiktokLink = document.querySelector('.tiktok-input-link');
  const youtubeLink = document.querySelector('.youtube-input-link');
  const facebookLink = document.querySelector('.facebook-input-link');
  const profileImageInput = document.querySelector('.profile-image-input');
  const cvInput = document.querySelector('#CV-upload');


  // Create FormData for Backend
  const formData = new FormData();
  formData.append("name", name);
  formData.append("workAvailability", workAvailability);
  formData.append("aboutMe", aboutMe);
  formData.append("contactNumber", contactNumber);
  formData.append("address", address);
  formData.append("sendgridApiKey", sendgridApiKey);
  formData.append("instagramLink", instagramLink);
  formData.append("tiktokLink", tiktokLink);
  formData.append("youtubeLink", youtubeLink);
  formData.append("facebookLink", facebookLink);

  if (profileImageInput.files[0]) {
    formData.append("profileImage", profileImageInput.files[0]);
  }
  if (cvInput.files[0]) {
    formData.append("cvFile", cvInput.files[0]);
  }

  try{
    console.log(formData)
    console.log(email);
    await editMainInfoAPI(formData);
    await editMainEmailAPI(email)
  } catch (err){
    console.log(err);
  }
}


export default function EditContentMain () {
  ['displayedToolsSection', 'displayedProjectSection', 'displayedProfileCard']
  .forEach(eventName => {
    document.addEventListener(eventName, imagePreview);
  });


  document.addEventListener('edit-mode', () => {
    const editForm = document.querySelector('#edit-content-form');

    editForm.addEventListener('submit', async (e) => {
      editMainInfo();
    });
  });
}