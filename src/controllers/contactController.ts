import { Request, Response } from "express";
import { db } from "../config/databaseConnection";
import { contacts, Contact } from "../models/contactModel";
import { eq, isNull, or, and } from "drizzle-orm/expressions";

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


export const identifyContact = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res
      .status(400)
      .json({ error: "Email or phoneNumber must be provided" });
  }

  try {
    const conditions = [];
    if (email) {
      conditions.push(eq(contacts.email, email));
    }
    if (phoneNumber) {
      conditions.push(eq(contacts.phoneNumber, phoneNumber));
    }

    const combinedConditions =
      conditions.length > 1 ? or(...conditions) : conditions[0];

    const contactsResult = await db
      .select()
      .from(contacts)
      .where(and(isNull(contacts.deletedAt), combinedConditions));

    let primaryContact: Contact | null = null;
    let secondaryContacts: Contact[] = [];
    const contactsToUpdate: Contact[] = [];

    if (contactsResult.length > 0) {
      contactsResult.forEach((contact) => {
        if (contact.linkPrecedence === "primary") {
          primaryContact = contact;
        } else {
          secondaryContacts.push(contact);
        }
      });

      if (!primaryContact) {
        primaryContact = secondaryContacts[0];
        secondaryContacts = secondaryContacts.slice(1);
      }

      const primaryContactId = primaryContact.id;
      const emails = new Set<string>(
        primaryContact.email ? [primaryContact.email] : []
      );
      const phoneNumbers = new Set<string>(
        primaryContact.phoneNumber ? [primaryContact.phoneNumber] : []
      );
      const secondaryContactIds: number[] = [];

      secondaryContacts.forEach((secondary) => {
        if (secondary.email) emails.add(secondary.email);
        if (secondary.phoneNumber) phoneNumbers.add(secondary.phoneNumber);
        secondaryContactIds.push(secondary.id);
      });

      let newSecondaryContactCreated = false;

      if (
        (email && !emails.has(email)) ||
        (phoneNumber && !phoneNumbers.has(phoneNumber))
      ) {
        const now = new Date();
        const [secondaryContact] = await db
          .insert(contacts)
          .values({
            email,
            phoneNumber,
            linkedId: primaryContact.id,
            linkPrecedence: "secondary",
            createdAt: now,
            updatedAt: now,
          })
          .returning({
            id: contacts.id,
            email: contacts.email,
            phoneNumber: contacts.phoneNumber,
            linkedId: contacts.linkedId,
            linkPrecedence: contacts.linkPrecedence,
            createdAt: contacts.createdAt,
            updatedAt: contacts.updatedAt,
          });

        secondaryContactIds.push(secondaryContact.id);
        if (secondaryContact.email) emails.add(secondaryContact.email);
        if (secondaryContact.phoneNumber)
          phoneNumbers.add(secondaryContact.phoneNumber);
        newSecondaryContactCreated = true;
      }

      if (newSecondaryContactCreated) {
        // If a new secondary contact was created, check if any primary contact should be downgraded
        const oldestPrimaryContact = contactsResult
          .filter((contact) => contact.linkPrecedence === "primary")
          .sort(
            (a, b) =>
              (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0)
          )[0];

        if (oldestPrimaryContact.id !== primaryContactId) {
          // If the oldest primary contact is not the current primary, we need to update
          primaryContact.linkPrecedence = "secondary";
          primaryContact.linkedId = oldestPrimaryContact.id;
          contactsToUpdate.push(primaryContact);
          primaryContact = oldestPrimaryContact;

          secondaryContacts.forEach((secondary) => {
            secondary.linkedId = primaryContact?.id ? primaryContact?.id : null;
            contactsToUpdate.push(secondary);
          });

          await db
            .update(contacts)
            .set({
              linkPrecedence: "secondary",
              linkedId: oldestPrimaryContact.id,
            })
            .where(eq(contacts.id, primaryContactId));

          for (const contact of contactsToUpdate) {
            await db
              .update(contacts)
              .set({ linkedId: primaryContact.id, updatedAt: new Date() })
              .where(eq(contacts.id, contact.id));
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
    } else {
      const now = new Date();
      const [primaryContact] = await db
        .insert(contacts)
        .values({
          email,
          phoneNumber,
          linkedId: null,
          linkPrecedence: "primary",
          createdAt: now,
          updatedAt: now,
        })
        .returning({
          id: contacts.id,
          email: contacts.email,
          phoneNumber: contacts.phoneNumber,
          linkedId: contacts.linkedId,
          linkPrecedence: contacts.linkPrecedence,
          createdAt: contacts.createdAt,
          updatedAt: contacts.updatedAt,
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
  } catch (error) {
    console.error("Error handling /identify request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
