let isUpdate = false;
addressBookObject = {};
window.addEventListener('DOMContentLoaded', (event) => {
    validationOnField();
    // editForm();
})

function validationOnField() {
    const name = document.querySelector('#name');
    const phone = document.querySelector('#phone');
    const address = document.querySelector('#address');
    const nameError = document.querySelector('.name-error');
    const phoneError = document.querySelector('.phone-error');
    const addressError = document.querySelector('.address-error');

    name.addEventListener('input', function() {
        try {
            checkName(name.value);
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
    });

    phone.addEventListener('input', function() {
        try {
            checkPhone(phone.value);
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }
    });

    address.addEventListener('input', function() {
        try {
            checkAddress(address.value);
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });
}

//on click submit Save method call
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        createAddressBook();
        if (site_properties.useLocalStorage.match("true")) {
            addAndUpdateLocalStorage();
            alert("Data Stored With Name " + addressBookObject._name);
            redirect();
        } else {
            createOrUpdateAddressInJsonServer();
            redirect();
        }
    } catch (e) {
        console.log(e);
        return;
    }
}

function redirect() {
    console.log("redirect");
    window.location.replace(site_properties.home);
}
const createAddressBook = () => {
        addressBookObject._name = getInputValueId('#name');
        addressBookObject._phone = getInputValueId('#phone');
        addressBookObject._address = getInputValueId('#address');
        addressBookObject._city = getInputValueId('#city');
        addressBookObject._state = getInputValueId('#state');
        addressBookObject._zipcode = getInputValueId('#zipcode');
    }
    /* Section3 UC3- Add address book data from JSON server (POST method)*/
const createOrUpdateAddressInJsonServer = () => {
    let url = site_properties.server_url;
    let methodCall = "POST";
    let message = "Data Store with name ";

    makeServiceCall(methodCall, url, true, addressBookObject)
        .then(response => {
            alert(message + addressBookObject._name);
            // redirect();
        }).catch(error => {
            console.log("inside error")
            throw error;
        });
}

const getInputValueId = (id) => {
    return document.querySelector(id).value;
}

//Create a new person id
// const createNewPersonId = () => {
//     let personId = localStorage.getItem('personId');
//     personId = !personId ? 1 : (parseInt(personId) + 1).toString();
//     localStorage.setItem('personId', personId);
//     return personId;
// }

const addAndUpdateLocalStorage = (data) => {
    let personList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (personList) {
        let existingPersonData = personList.find(personData => personData._id == addressBookObject.id);
        if (!existingPersonData) {
            //addressBookObject.id = createNewPersonId();
            personList.push(addressBookObject);
        } else {
            const index = personList.map(person => person._id).indexOf(addressBookObject.id); //Get index of that array using map andindexOf
            personList.splice(index, 1, addressBookObject); //Remove person from the list
        }
    } else {
        //data.id = createNewPersonId();
        personList = [addressBookObject];
    }
    localStorage.setItem('AddressBookList', JSON.stringify(personList));
}

// //Uc7 - Data populated from local storage for updating data
// const editForm = () => {
//     let jsonData = localStorage.getItem('edit-person');
//     isUpdate = jsonData ? true : false;
//     if (!isUpdate)
//         return;
//     addressBookObject = JSON.parse(jsonData);
//     setForm();
// }

// const setForm = () => {
//     setValue('#name', addressBookObject._name);
//     setValue('#phone', addressBookObject._phone);
//     setValue('#address', addressBookObject._address);
//     setValue('#city', addressBookObject._city);
//     setValue('#state', addressBookObject._state);
//     setValue('#zipcode', addressBookObject._zipcode);
// }

// const setValue = (id, value) => {
//     let element = document.querySelector(id);
//     element.value = value;
// }


//UC9- Cancel event
const cancel = () => {
    window.location.replace(site_properties.home);
}

//UC-9 Reset event
const reset = () => {
    setValue('#name', '');
    setTextValue('.text-error', '');
    setValue('#address', '');
    setTextValue('.address-error', '');
    setValue('#city', 'Select City');
    setValue('#state', 'Select State');
    setValue('#zipcode', '');
    setTextValue('.zip-error', '');
    setValue('#phone', '');
    setTextValue('.phone-error', '');
    alert("Data reseted");
}

const setTextValue = (id, message) => {
    const textError = document.querySelector(id);
    textError.textContent = message;
}