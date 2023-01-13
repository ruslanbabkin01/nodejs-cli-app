const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");
const itemId = uid(3);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parseData = JSON.parse(data);
    console.log(parseData);
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parseData = JSON.parse(data);
    const findId = parseData.find((item) => item.id === contactId.toString());
    console.log(findId);
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    const newArr = parsedData.filter(
      (item) => item.id !== contactId.toString()
    );
    console.log(`Contact ${contactId} deleted`);

    await fs.writeFile(contactsPath, JSON.stringify(newArr), "utf-8");
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    const newContact = {
      id: itemId,
      name,
      email,
      phone,
    };
    console.log(newContact);

    parsedData.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(parsedData), "utf-8");
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
