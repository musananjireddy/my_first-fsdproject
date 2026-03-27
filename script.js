let contactsList = JSON.parse(localStorage.getItem('contacts')) || [];

const updateBtn = document.getElementById('updateContactBtn');
updateBtn.style.display = 'none';

displayContacts();

function addContact() {

    const name = document.getElementById('nameInput').value;
    const phone = document.getElementById('phoneInput').value;
    const email = document.getElementById('emailInput').value;

    if (!name || !phone || !email) {
        alert('Please fill in name, phone, and email.');
        return;
    }
    const contact = { name, phone, email };
    contactsList.push(contact);

    console.log('All Contacts:', contactsList);
    localStorage.setItem('contacts', JSON.stringify(contactsList));
    displayContacts();

    document.getElementById('nameInput').value = '';
    document.getElementById('phoneInput').value = '';
    document.getElementById('emailInput').value = '';
        
}

function displayContacts() {

    const contactContainer = document.getElementById('contactContainer');
    contactContainer.innerHTML = '';

    contactsList.forEach((contact, index) => { 
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');

        const picContaciner = document.createElement('div');  
        picContaciner.classList.add('profile-pic-container');

        const contactInfo = document.createElement('div');
        contactInfo.classList.add('contact-info');

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');

        const contactPic = document.createElement('img');
        contactPic.classList.add('profile-pic');
        contactPic.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        picContaciner.appendChild(contactPic);

        const contactName = document.createElement('h2');
        contactName.textContent = contact.name;
        const contactPhone = document.createElement('p');
        contactPhone.textContent = contact.phone;
        const contactEmail = document.createElement('p');
        contactEmail.textContent = contact.email;

        contactInfo.appendChild(contactName);
        contactInfo.appendChild(contactPhone);
        contactInfo.appendChild(contactEmail);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');    
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteContact(index));
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', ()=>{editContact(index)});
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);


        contactCard.appendChild(picContaciner);
        contactCard.appendChild(contactInfo);
        contactCard.appendChild(btnContainer);

        contactContainer.appendChild(contactCard);
    })
}

function editContact(index) {
    const addBtn = document.getElementById('addContactBtn');
    addBtn.style.display = 'none';
    updateBtn.style.display = 'block';
    updateBtn.onclick = function() {updateContact(index)};

    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const emailInput = document.getElementById('emailInput');

    nameInput.value = contactsList[index].name;
    phoneInput.value = contactsList[index].phone;
    emailInput.value = contactsList[index].email;

}

function updateContact(index) {
    contactsList[index].name = document.getElementById('nameInput').value;
    contactsList[index].phone = document.getElementById('phoneInput').value;
    contactsList[index].email = document.getElementById('emailInput').value;
    localStorage.setItem('contacts', JSON.stringify(contactsList));
    displayContacts();
    document.getElementById('nameInput').value = '';
    document.getElementById('phoneInput').value = '';
    document.getElementById('emailInput').value = '';

    document.getElementById('addContactBtn').style.display = 'block';
    updateBtn.style.display = 'none';
}

function deleteContact(index) {
    contactsList.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contactsList));
    displayContacts();
}