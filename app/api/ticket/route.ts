import mongoose from "mongoose";
import { Ticket } from "@/lib/Models/Ticket";
import { connect } from "@/lib/bd";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await connect();

    if (id) {
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return new NextResponse(
          JSON.stringify({ message: "Ticket could not be found" }),
          { status: 404 }
        );
      }
      return new NextResponse(JSON.stringify(ticket), { status: 200 });
    }

    const tickets = await Ticket.find();
    if (tickets.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No tickets found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(tickets), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error occurred while fetching tickets" }),
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newTicket = new Ticket(body);
    await newTicket.save();
    return new NextResponse(
      JSON.stringify({ message: 'Ticket created', Ticket: newTicket }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error occurred while creating ticket:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Error occurred while creating ticket' }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "Ticket ID is required" }),
      { status: 400 }
    );
  }

  try {
    await connect();
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      return new NextResponse(
        JSON.stringify({ message: "Ticket could not be deleted" }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "Ticket deleted" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error occurred while deleting ticket" }),
      { status: 500 }
    );
  }
};
