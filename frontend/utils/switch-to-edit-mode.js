export function switchToEditMode() {
  const saveBtn = document.querySelector(".save-btn");
  const editBtn = document.querySelector(".button-enable-edit");
  const wrapper = document.querySelector(".main-wrapper");
  const editableTexts = document.querySelectorAll('.editable-text')

  if (wrapper.tagName && wrapper.tagName.toLowerCase() === 'form') return;

  // create a form and copy attributes
  const form = document.createElement('form');
  form.id = 'edit-content-form';

  for (const attr of Array.from(wrapper.attributes)) {
    form.setAttribute(attr.name, attr.value);
  }

  // move children into the new form
  while (wrapper.firstChild) form.appendChild(wrapper.firstChild);
  
  // replace in DOM
  wrapper.parentNode.replaceChild(form, wrapper);

  form.classList.remove('view-mode');
  form.classList.add('edit-mode');

  editableTexts.forEach(text => {
    text.setAttribute("contenteditable", "true");
  });

  ['displayedProfileCard', 'displayedAboutSection', 'displayedExperienceSection', 'displayedProjectSection', 'displayedEducationSection', 'displayedToolsSection'].
  forEach(event => {
    document.addEventListener(event, () => {
      document.querySelectorAll('.editable-text').forEach(el => el.setAttribute('contenteditable', 'true'));
    });
  });

  editBtn.classList.add('hide');
  saveBtn.classList.remove('hide');

  document.querySelector('.popup-success')?.classList.add('hide');
  document.querySelector('.blur-bg')?.classList.add('hide');
  document.querySelectorAll('.auth-form').forEach(form => form.classList.add('hide'));

  document.dispatchEvent(new Event("edit-mode"));
}