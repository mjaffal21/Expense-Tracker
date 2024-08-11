import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
  Id: serial("id").primaryKey().notNull(),
  Name: varchar("name").notNull(),
  Amount: numeric("amount").notNull(),
  Icon: varchar("icon"),
  CreatedBy: varchar("createdBy").notNull(),
});

export const Incomes = pgTable("incomes", {
  Id: serial("id").primaryKey().notNull(),
  Name: varchar("name").notNull(),
  Amount: numeric("amount").notNull(),
  Icon: varchar("icon"),
  CreatedAt: varchar("createdAt").notNull(),
});

export const Expenses = pgTable("expenses", {
  Id: serial("id").primaryKey().notNull(),
  Name: varchar("name").notNull(),
  Amount: numeric("amount").notNull().default(0),
  BudgetId: integer("budgetId").references(() => Budgets.Id),
  CreatedAt: varchar("createdAt").notNull(),
});
