"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyContact = void 0;
const databaseConnection_1 = require("../config/databaseConnection");
const contactModel_1 = require("../models/contactModel");
const expressions_1 = require("drizzle-orm/expressions");
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { email, phoneNumber } = req.body;
//   if (!email && !phoneNumber) {
//     return res
//       .status(400)
//       .json({ error: "Email or phoneNumber must be provided" });
//   }
//   try {
//     const conditions = [];
//     if (email) {
//       conditions.push(eq(contacts.email, email));
//     }
//     if (phoneNumber) {
//       conditions.push(eq(contacts.phoneNumber, phoneNumber));
//     }
//     const combinedConditions =
//       conditions.length > 1 ? or(...conditions) : conditions[0];
//     const contactsResult = await db
//       .select()
//       .from(contacts)
//       .where(and(isNull(contacts.deletedAt), combinedConditions));
//     let primaryContact: Contact | null = null;
//     let secondaryContacts: Contact[] = [];
//     if (contactsResult.length > 0) {
//       contactsResult.forEach((contact) => {
//         if (contact.linkPrecedence === "primary") {
//           primaryContact = contact;
//         } else {
//           secondaryContacts.push(contact);
//         }
//       });
//       if (!primaryContact) {
//         primaryContact = secondaryContacts[0];
//         secondaryContacts = secondaryContacts.slice(1);
//       }
//       const primaryContactId = primaryContact.id;
//       const emails = new Set<string>(
//         primaryContact.email ? [primaryContact.email] : []
//       );
//       const phoneNumbers = new Set<string>(
//         primaryContact.phoneNumber ? [primaryContact.phoneNumber] : []
//       );
//       const secondaryContactIds: number[] = [];
//       secondaryContacts.forEach((secondary) => {
//         if (secondary.email) emails.add(secondary.email);
//         if (secondary.phoneNumber) phoneNumbers.add(secondary.phoneNumber);
//         secondaryContactIds.push(secondary.id);
//       });
//       return res.status(200).json({
//         contact: {
//           primaryContactId: primaryContactId,
//           emails: Array.from(emails),
//           phoneNumbers: Array.from(phoneNumbers),
//           secondaryContactIds: secondaryContactIds,
//         },
//       });
//     } else {
//       const now = new Date();
//       const [primaryContact] = await db
//         .insert(contacts)
//         .values({
//           email,
//           phoneNumber,
//           linkedId: null,
//           linkPrecedence: "primary",
//           createdAt: now,
//           updatedAt: now,
//         })
//         .returning({
//           id: contacts.id,
//           email: contacts.email,
//           phoneNumber: contacts.phoneNumber,
//           linkedId: contacts.linkedId,
//           linkPrecedence: contacts.linkPrecedence,
//           createdAt: contacts.createdAt,
//           updatedAt: contacts.updatedAt,
//         });
//       return res.status(200).json({
//         contact: {
//           primaryContactId: primaryContact.id,
//           emails: email ? [email] : [],
//           phoneNumbers: phoneNumber ? [phoneNumber] : [],
//           secondaryContactIds: [],
//         },
//       });
//     }
//   } catch (error) {
//     console.error("Error handling /identify request:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// export const identifyContact = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { email, phoneNumber } = req.body;
//   if (!email && !phoneNumber) {
//     return res
//       .status(400)
//       .json({ error: "Email or phoneNumber must be provided" });
//   }
//   try {
//     const conditions = [];
//     if (email) {
//       conditions.push(eq(contacts.email, email));
//     }
//     if (phoneNumber) {
//       conditions.push(eq(contacts.phoneNumber, phoneNumber));
//     }
//     const combinedConditions =
//       conditions.length > 1 ? or(...conditions) : conditions[0];
//     const contactsResult = await db
//       .select()
//       .from(contacts)
//       .where(and(isNull(contacts.deletedAt), combinedConditions));
//     let primaryContact: Contact | null = null;
//     let secondaryContacts: Contact[] = [];
//     if (contactsResult.length > 0) {
//       contactsResult.forEach((contact) => {
//         if (contact.linkPrecedence === "primary") {
//           primaryContact = contact;
//         } else {
//           secondaryContacts.push(contact);
//         }
//       });
//       if (!primaryContact) {
//         primaryContact = secondaryContacts[0];
//         secondaryContacts = secondaryContacts.slice(1);
//       }
//       const primaryContactId = primaryContact.id;
//       const emails = new Set<string>(
//         primaryContact.email ? [primaryContact.email] : []
//       );
//       const phoneNumbers = new Set<string>(
//         primaryContact.phoneNumber ? [primaryContact.phoneNumber] : []
//       );
//       const secondaryContactIds: number[] = [];
//       secondaryContacts.forEach((secondary) => {
//         if (secondary.email) emails.add(secondary.email);
//         if (secondary.phoneNumber) phoneNumbers.add(secondary.phoneNumber);
//         secondaryContactIds.push(secondary.id);
//       });
//       if (
//         (email && !emails.has(email)) ||
//         (phoneNumber && !phoneNumbers.has(phoneNumber))
//       ) {
//         const now = new Date();
//         const [secondaryContact] = await db
//           .insert(contacts)
//           .values({
//             email,
//             phoneNumber,
//             linkedId: primaryContact.id,
//             linkPrecedence: "secondary",
//             createdAt: now,
//             updatedAt: now,
//           })
//           .returning({
//             id: contacts.id,
//             email: contacts.email,
//             phoneNumber: contacts.phoneNumber,
//             linkedId: contacts.linkedId,
//             linkPrecedence: contacts.linkPrecedence,
//             createdAt: contacts.createdAt,
//             updatedAt: contacts.updatedAt,
//           });
//         secondaryContactIds.push(secondaryContact.id);
//         if (secondaryContact.email) emails.add(secondaryContact.email);
//         if (secondaryContact.phoneNumber)
//           phoneNumbers.add(secondaryContact.phoneNumber);
//       }
//       return res.status(200).json({
//         contact: {
//           primaryContactId: primaryContactId,
//           emails: Array.from(emails),
//           phoneNumbers: Array.from(phoneNumbers),
//           secondaryContactIds: secondaryContactIds,
//         },
//       });
//     } else {
//       const now = new Date();
//       const [primaryContact] = await db
//         .insert(contacts)
//         .values({
//           email,
//           phoneNumber,
//           linkedId: null,
//           linkPrecedence: "primary",
//           createdAt: now,
//           updatedAt: now,
//         })
//         .returning({
//           id: contacts.id,
//           email: contacts.email,
//           phoneNumber: contacts.phoneNumber,
//           linkedId: contacts.linkedId,
//           linkPrecedence: contacts.linkPrecedence,
//           createdAt: contacts.createdAt,
//           updatedAt: contacts.updatedAt,
//         });
//       return res.status(200).json({
//         contact: {
//           primaryContactId: primaryContact.id,
//           emails: email ? [email] : [],
//           phoneNumbers: phoneNumber ? [phoneNumber] : [],
//           secondaryContactIds: [],
//         },
//       });
//     }
//   } catch (error) {
//     console.error("Error handling /identify request:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const identifyContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phoneNumber } = req.body;
    if (!email && !phoneNumber) {
        return res
            .status(400)
            .json({ error: "Email or phoneNumber must be provided" });
    }
    try {
        const conditions = [];
        if (email) {
            conditions.push((0, expressions_1.eq)(contactModel_1.contacts.email, email));
        }
        if (phoneNumber) {
            conditions.push((0, expressions_1.eq)(contactModel_1.contacts.phoneNumber, phoneNumber));
        }
        const combinedConditions = conditions.length > 1 ? (0, expressions_1.or)(...conditions) : conditions[0];
        const contactsResult = yield databaseConnection_1.db
            .select()
            .from(contactModel_1.contacts)
            .where((0, expressions_1.and)((0, expressions_1.isNull)(contactModel_1.contacts.deletedAt), combinedConditions));
        let primaryContact = null;
        let secondaryContacts = [];
        const contactsToUpdate = [];
        if (contactsResult.length > 0) {
            contactsResult.forEach((contact) => {
                if (contact.linkPrecedence === "primary") {
                    primaryContact = contact;
                }
                else {
                    secondaryContacts.push(contact);
                }
            });
            if (!primaryContact) {
                primaryContact = secondaryContacts[0];
                secondaryContacts = secondaryContacts.slice(1);
            }
            const primaryContactId = primaryContact.id;
            const emails = new Set(primaryContact.email ? [primaryContact.email] : []);
            const phoneNumbers = new Set(primaryContact.phoneNumber ? [primaryContact.phoneNumber] : []);
            const secondaryContactIds = [];
            secondaryContacts.forEach((secondary) => {
                if (secondary.email)
                    emails.add(secondary.email);
                if (secondary.phoneNumber)
                    phoneNumbers.add(secondary.phoneNumber);
                secondaryContactIds.push(secondary.id);
            });
            let newSecondaryContactCreated = false;
            if ((email && !emails.has(email)) ||
                (phoneNumber && !phoneNumbers.has(phoneNumber))) {
                const now = new Date();
                const [secondaryContact] = yield databaseConnection_1.db
                    .insert(contactModel_1.contacts)
                    .values({
                    email,
                    phoneNumber,
                    linkedId: primaryContact.id,
                    linkPrecedence: "secondary",
                    createdAt: now,
                    updatedAt: now,
                })
                    .returning({
                    id: contactModel_1.contacts.id,
                    email: contactModel_1.contacts.email,
                    phoneNumber: contactModel_1.contacts.phoneNumber,
                    linkedId: contactModel_1.contacts.linkedId,
                    linkPrecedence: contactModel_1.contacts.linkPrecedence,
                    createdAt: contactModel_1.contacts.createdAt,
                    updatedAt: contactModel_1.contacts.updatedAt,
                });
                secondaryContactIds.push(secondaryContact.id);
                if (secondaryContact.email)
                    emails.add(secondaryContact.email);
                if (secondaryContact.phoneNumber)
                    phoneNumbers.add(secondaryContact.phoneNumber);
                newSecondaryContactCreated = true;
            }
            if (newSecondaryContactCreated) {
                // If a new secondary contact was created, check if any primary contact should be downgraded
                const oldestPrimaryContact = contactsResult
                    .filter((contact) => contact.linkPrecedence === "primary")
                    .sort((a, b) => { var _a, _b, _c, _d; return ((_b = (_a = a.createdAt) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = b.createdAt) === null || _c === void 0 ? void 0 : _c.getTime()) !== null && _d !== void 0 ? _d : 0); })[0];
                if (oldestPrimaryContact.id !== primaryContactId) {
                    // If the oldest primary contact is not the current primary, we need to update
                    primaryContact.linkPrecedence = "secondary";
                    primaryContact.linkedId = oldestPrimaryContact.id;
                    contactsToUpdate.push(primaryContact);
                    primaryContact = oldestPrimaryContact;
                    secondaryContacts.forEach((secondary) => {
                        secondary.linkedId = (primaryContact === null || primaryContact === void 0 ? void 0 : primaryContact.id) ? primaryContact === null || primaryContact === void 0 ? void 0 : primaryContact.id : null;
                        contactsToUpdate.push(secondary);
                    });
                    yield databaseConnection_1.db
                        .update(contactModel_1.contacts)
                        .set({
                        linkPrecedence: "secondary",
                        linkedId: oldestPrimaryContact.id,
                    })
                        .where((0, expressions_1.eq)(contactModel_1.contacts.id, primaryContactId));
                    for (const contact of contactsToUpdate) {
                        yield databaseConnection_1.db
                            .update(contactModel_1.contacts)
                            .set({ linkedId: primaryContact.id, updatedAt: new Date() })
                            .where((0, expressions_1.eq)(contactModel_1.contacts.id, contact.id));
                    }
                }
            }
            return res.status(200).json({
                contact: {
                    primaryContactId: primaryContact.id,
                    emails: Array.from(emails),
                    phoneNumbers: Array.from(phoneNumbers),
                    secondaryContactIds: secondaryContactIds,
                },
            });
        }
        else {
            const now = new Date();
            const [primaryContact] = yield databaseConnection_1.db
                .insert(contactModel_1.contacts)
                .values({
                email,
                phoneNumber,
                linkedId: null,
                linkPrecedence: "primary",
                createdAt: now,
                updatedAt: now,
            })
                .returning({
                id: contactModel_1.contacts.id,
                email: contactModel_1.contacts.email,
                phoneNumber: contactModel_1.contacts.phoneNumber,
                linkedId: contactModel_1.contacts.linkedId,
                linkPrecedence: contactModel_1.contacts.linkPrecedence,
                createdAt: contactModel_1.contacts.createdAt,
                updatedAt: contactModel_1.contacts.updatedAt,
            });
            return res.status(200).json({
                contact: {
                    primaryContactId: primaryContact.id,
                    emails: email ? [email] : [],
                    phoneNumbers: phoneNumber ? [phoneNumber] : [],
                    secondaryContactIds: [],
                },
            });
        }
    }
    catch (error) {
        console.error("Error handling /identify request:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.identifyContact = identifyContact;
