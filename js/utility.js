const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
    if (!nameRegex.test(name))
        throw "First letter capital - minimum 3 character allowed";
}

const checkPhone = (phone) => {
    let phoneRegex = RegExp('^[+][1-9]{2}[-][0-9]{10}$');
    if (!phoneRegex.test(phone))
        throw "Phone number format (Ex:+91-1234567890)";
}

const checkAddress = (address) => {
    let addressRegex = RegExp('^([A-Za-z0-9/.,-]{3,}.)+$');
    if (!addressRegex.test(address))
        throw "Invalid address - minimum 3 character";
}