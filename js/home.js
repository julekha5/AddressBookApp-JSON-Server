let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
        if (site_properties.useLocalStorage.match("true")) {
            getDataFromLocalStorage();
        } else
            getAddressDataFromServer();
    })
    // Section: 3 UC => 2 
function processAddressDataResponse() {
    document.querySelector(".person-count").textContent = addressBookList.length;
    createInnerHTML();
}
/** Section 3 UC2  */
const getDataFromLocalStorage = () => {
    addressBookList = localStorage.getItem('AddressBookList') ?
        JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processAddressDataResponse();
}

// Section: 3 UC => 2 Retrieving address book data from JSON server (GET method)
const getAddressDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true) //When we performing GET operation this needs to be true
        .then(response => {
            addressBookList = JSON.parse(response);
            console.log("Data Is getting: " + addressBookList);
            processAddressDataResponse();
        })
        .catch(error => {
            console.log("Get Error Status : " + JSON.stringify(error));
            addressBookList = [];
            processAddressDataResponse();
        })
}

// Section: 3 UC => 2 
const createInnerHTML = () => {
    const headerHtml = `
    <tr>
        <th>Fullname</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>Zip Code</th>
        <th>Phone Number</th>
        <th>Actions</th>
    </tr>`;
    if (addressBookList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const contactData of addressBookList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>${contactData._name}</td>
            <td>${contactData._address}</td>
            <td>${contactData._city}</td>
            <td>${contactData._state}</td>
            <td>${contactData._zipcode}</td>
            <td>${contactData._phone}</td>
            <td>
            <img id="${contactData._id}" alt="edit" src="../assets/icons/create-black-18dp.svg" onClick=update(this)>
            <img id="${contactData._id}" alt="delete" src="../assets/icons/delete-black-18dp.svg" onClick=remove(this)>
            </td>
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

// //UC5-Remove data
// const remove = (data) => {
//     let deletePerson = addressBookList.find(contactData => contactData._id == data.id);
//     if (!deletePerson)
//         return;
//     const index = addressBookList.map(contactData => contactData._id).indexOf(deletePerson._id);
//     addressBookList.splice(index, 1);
//     localStorage.setItem('AddressBookList', JSON.stringify(addressBookList));
//     document.querySelector(".person-count").textContent = addressBookList.length;
//     createInnerHTML();
//     alert("Person data deleted successfully..!");
// }

// // //UC6 -Update data
// const update = (data) => {
//     let updatePerson = addressBookList.find(contactData => contactData._id == data.id);
//     if (!updatePerson)
//         return;
//     localStorage.setItem('edit-person', JSON.stringify(updatePerson));
//     window.location.replace(site_properties.addBook);
// }