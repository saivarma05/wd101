document.addEventListener('DOMContentLoaded', function () {
    // Populate the table with saved data
    populateTable(getSavedData());
  });
  
  function submitForm() {
    // Validate the form
    const form = document.getElementById('registrationForm');
    if (!form.checkValidity()) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Validate date of birth
    const dobInput = document.getElementById('dob');
    const dobValue = new Date(dobInput.value);
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  
    if (dobValue < minDate || dobValue > maxDate) {
      alert('Please enter a valid date of birth between ages 18 and 55.');
      return;
    }
  
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      dob: dobInput.value,
      acceptedTerms: document.getElementById('terms').checked,
    };
  
    // Save data to web storage
    const savedData = getSavedData();
    savedData.push(formData);
    localStorage.setItem('registrationData', JSON.stringify(savedData));
  
    // Populate the table with updated data
    populateTable(savedData);
  
    // Clear the form
    form.reset();
  }
  
  function getSavedData() {
    return JSON.parse(localStorage.getItem('registrationData')) || [];
  }
  
  function populateTable(data) {
    const tableBody = document.getElementById('dataTableBody');
    // Clear existing rows
    tableBody.innerHTML = '';
  
    // Populate the table with data
    data.forEach(entry => {
      const row = tableBody.insertRow();
      const columns = ['name', 'email', 'password', 'dob', 'acceptedTerms'];
  
      columns.forEach(column => {
        const cell = row.insertCell();
        cell.textContent = entry[column];
      });
    });
  }
  
