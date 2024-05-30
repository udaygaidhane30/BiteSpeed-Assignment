"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contacts = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.contacts = (0, pg_core_1.pgTable)("contacts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    phoneNumber: (0, pg_core_1.text)("phoneNumber"),
    email: (0, pg_core_1.text)("email"),
    linkedId: (0, pg_core_1.integer)("linkedId"),
    linkPrecedence: (0, pg_core_1.text)("linkPrecedence").default("primary"),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow(),
    deletedAt: (0, pg_core_1.timestamp)("deletedAt"),
});
