import mongoose, { models } from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: Number,
      default: 0,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Ticket = models.Ticket || mongoose.model('Ticket', TicketSchema);
