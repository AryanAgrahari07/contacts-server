const express = require("express");
const Contact = require("../models/contact.js");
const router = express.Router();



// POST /contacts - Create a new contact
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, company, jobTitle } = req.body;

    // Check for missing fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newContact = await Contact.create({ firstName, lastName, phoneNumber, email, company, jobTitle });
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




// GET /contacts - Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find(); // Querying all contacts from DB
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});



// PUT /contacts/:email - Update a contact
router.put("/:email", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, company, jobTitle } = req.body;
    const { email } = req.params; // Email in the URL to identify the contact

    const existingContact = await Contact.findOne({ email });
    if (!existingContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const updatedContact = await Contact.findOneAndUpdate(
      { email },
      { firstName, lastName, phoneNumber, company, jobTitle },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Contact updated successfully", contact: updatedContact });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE /contacts/:id - Delete a contact
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /validate-email/:email - Validate if email exists
router.get("/validate-email/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Check if the email exists in the database
    const existingContact = await Contact.findOne({ email });

    if (existingContact) {
      return res.status(200).json({ exists: true, contact: existingContact });
    } else {
      return res.status(404).json({ exists: false, message: "Email not found" });
    }
  } catch (error) {
    console.error("Error validating email:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
