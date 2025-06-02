import Contact from '../models/contactModel.js';
import { Sequelize } from 'sequelize';

// Create new contatc
export const createContact = async (phoneNumber, email, linkedId = null, linkPrecedence = 'primary', options = {}) => {
    try {
        return await Contact.create({ phoneNumber, email, linkedId, linkPrecedence }, options);
    } catch (err) {
        throw new Error(err.message);
    }
};

// Find all existing and linked contacts
export const findExistingContacts = async (phoneNumber, email, options = {}) => {
    try {
        // Find all contacts matching phone or email
        const baseMatches = await Contact.findAll({
            where: {
                [Sequelize.Op.or]: [
                    ...(phoneNumber ? [{ phoneNumber }] : []),
                    ...(email ? [{ email }] : [])
                ]
            },
            order: [['createdAt', 'ASC']],
            ...options
        });

        if (!baseMatches.length) return [];

        // Collect primary IDs from baseMatches and their linked contacts
        const primaryIdsSet = new Set();

        baseMatches.forEach(contact => {
            if (contact.linkPrecedence === 'primary') {
                primaryIdsSet.add(contact.id);
            } else if (contact.linkedId) {
                primaryIdsSet.add(contact.linkedId);
            }
        });

        const primaryIds = Array.from(primaryIdsSet);

        // Fetch all contacts linked to these primary IDs (including primaries)
        const allLinkedContacts = await Contact.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { id: primaryIds },
                    { linkedId: primaryIds }
                ]
            },
            order: [['createdAt', 'ASC']],
            ...options
        });

        return allLinkedContacts;

    } catch (err) {
        throw new Error(err.message);
    }
};


// Batch update other primaries to secondary in one query
export const updateToSecondaryBatch = async (primaryId, primaryIdsToUpdate, options = {}) => {
    try {
        if (!primaryIdsToUpdate.length) return;

        await Contact.update(
            { linkedId: primaryId, linkPrecedence: 'secondary' },
            {
                where: {
                    linkPrecedence: 'primary',
                    id: { [Sequelize.Op.in]: primaryIdsToUpdate }
                },
                ...options
            }
        );
    } catch (err) {
        throw new Error(err.message);
    }
};



// Formats a consolidated response object from contacts.
export const formatConsolidatedResponse = (contacts) => {
    try {

        // Normalize all contact data
        const contactsData = contacts.map(contact => ({ ...contact.dataValues }));

        // Find primary
        const primary = contactsData
            .filter(contact => contact.linkPrecedence === 'primary')
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];

        // Unique list of all emails and phone numbers:
        const emails = [...new Set(contactsData.map(contact => contact.email).filter(Boolean))];
        const phoneNumbers = [...new Set(contactsData.map(contact => contact.phoneNumber).filter(Boolean))];

        // IDs of all secondaries contacts
        const secondaryContactIds = contactsData.filter(contact => contact.linkPrecedence === 'secondary').map(contact => contact.id);

        // Final consolidated structure
        return {
            contact: {
                primaryContactId: primary.id,
                emails,
                phoneNumbers,
                secondaryContactIds
            }
        };
    } catch (err) {
        throw new Error(err.message);
    }
};
