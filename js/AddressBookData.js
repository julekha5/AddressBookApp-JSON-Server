/*UC7 getter setter form validation and to string method  */
class AddressBookData {
    id;

    get name() {
        return this._name;
    }
    set name(name) {
        const nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        } else {
            throw "First letter capital - minimum 3 character allowed";

        }
    }
    get phone() {
        return this._phone;
    }
    set phone(phone) {
        const phoneRegex = RegExp('^[+][1-9]{2}[-][0-9]{10}$');
        if (phoneRegex.test(phone)) {
            this._phone = phone;
        } else {
            throw "Phone number format (Ex:+91-1234567890)";
        }
    }

    get address() {
        return this._address;
    }
    set address(address) {
        const addressRegex = RegExp('^([A-Za-z0-9/.,-]{3,}.)+$');
        if (addressRegex.test(address)) {
            this._address = address;
        } else {
            throw "Invalid address - minimum 3 character";
        }
    }

    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }

    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }

    get zipcode() {
        return this._zipcode;
    }
    set zipcode(zipcode) {
        this._zipcode = zipcode;
    }

    // toString() method
    toString() {
        return "id : " + this.id + ", Name : " + this.name + ", Address : " + this.address + ", Phone : " + this.phoneNumber +
            ", State : " + this.state + ", City : " + this.city + ", ZipCode : " + this.zipcode;
    }
}