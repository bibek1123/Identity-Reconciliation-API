import { createContact, findExistingContacts, updateToSecondaryBatch, formatConsolidatedResponse } from './contactService.js'
import sequelize from '../config/db/connection.js'

export const handleIdentify = async (contactDetails) => {
  const transaction = await sequelize.transaction();
  try {
    const { phoneNumber, email } = contactDetails;

    // Find all existing contacts linked by phone/email
    const existingContacts = await findExistingContacts(phoneNumber, email, { transaction });

    // If no existing contacts, create new primary contact
    if (!existingContacts.length) {
      const newContact = await createContact(phoneNumber, email, null, 'primary', { transaction });
      await transaction.commit();
      return formatConsolidatedResponse([newContact]);
    }

    // Find all primary contacts from existingContacts
    const primaryContacts = existingContacts.filter(contact => contact.linkPrecedence === 'primary');

    // Find the oldest primary contact (lowest createdAt)
    const oldestPrimary = primaryContacts.reduce((oldest, current) =>
      current.createdAt < oldest.createdAt ? current : oldest
      , primaryContacts[0]);

    // Identify other primaries to update (exclude oldest primary)
    const otherPrimaryIds = primaryContacts
      .filter(contact => contact.id !== oldestPrimary.id)
      .map(contact => contact.id);

    // Update other primaries to secondary linked to oldestPrimary
    await updateToSecondaryBatch(oldestPrimary.id, otherPrimaryIds, { transaction });

    // Check if current phone/email combo already exists as secondary linked to oldestPrimary
    const isAlreadyPresent = existingContacts.some(contact =>
      contact.phoneNumber === phoneNumber &&
      contact.email === email &&
      (contact.linkPrecedence === 'primary' || contact.linkedId === oldestPrimary.id)
    );

    let newSecondary;

    if (!isAlreadyPresent) {
      // Create new secondary linked to oldestPrimary
      newSecondary = await createContact(phoneNumber, email, oldestPrimary.id, 'secondary', { transaction });
    }

    await transaction.commit();

    // Find updated contacts
    const updatedContacts = await findExistingContacts(phoneNumber, email); // re-fetch to include all changes

    return formatConsolidatedResponse(updatedContacts);

  } catch (err) {
    await transaction.rollback();
    throw new Error(err.message);
  }
};

