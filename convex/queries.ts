import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const userByTelegramId = query({
  args: {
    tgUserId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tgUserId"), args.tgUserId))
      .first();
  },
});

export const invitees = query({
  args: {
    tgUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const invitees = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("refId"), args.tgUserId))
      .collect();
    return invitees;
  },
});

export const userExists = query({
  args: {
    tgUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tgUserId"), args.tgUserId))
      .first();
    return !!user;
  },
});

export const newUser = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    tgUserId: v.string(),
    refId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tgUserId"), args.tgUserId))
      .unique();

    if (user !== null) {
      if (
        user.firstName !== args.firstName ||
        user.lastName !== args.lastName
      ) {
        await ctx.db.patch(user._id, {
          firstName: args.firstName,
          lastName: args.lastName,
        });
      }
      return { id: user._id, existingUser: true };
    }

    const id = await ctx.db.insert("users", {
      firstName: args.firstName,
      lastName: args.lastName,
      tgUserId: args.tgUserId,
      refId: args.refId || "",
      points: 0,
    });

    return { id, existingUser: false };
  },
});
