import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tgUserId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    refId: v.string(),
    points: v.float64(),
  }),
});
