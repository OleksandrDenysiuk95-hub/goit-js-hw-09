let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

populateForm();

form.addEventListener('input', event => {
  const { name, value } = event.target;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    return alert('Fill please all fields');
  }

  console.log('Submitted Data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    Object.entries(formData).forEach(([key, value]) => {
      if (form.elements[key]) {
        form.elements[key].value = value;
      }
    });
  }
}
