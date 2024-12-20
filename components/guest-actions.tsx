'use server';

import {
  createGuestInsecure,
  deleteGuestInsecure,
  getGuestsInsecure,
  updateGuestInsecure,
} from '../../../database/guests';
import type { Guest } from '../../../migrations/00000-createTableGuests';
import { guestsSchema } from '../../../migrations/00000-createTableGuests';

// Fetch all guests
export async function fetchGuests(): Promise<Guest[]> {
  const guests = await getGuestsInsecure();
  return guests;
}

// Create a new guest
export async function createGuest(newGuest: {
  firstName: string;
  lastName: string;
  attending: boolean;
}): Promise<Guest> {
  // Validate input using schema
  const result = guestsSchema.safeParse(newGuest);

  if (!result.success) {
    throw new Error(
      `Validation failed: ${result.error.issues
        .map((issue) => issue.message)
        .join(', ')}`,
    );
  }

  const guest = await createGuestInsecure(result.data);

  if (!guest) {
    throw new Error('Guest could not be created');
  }

  return guest;
}

// Update an existing guest
export async function updateGuest(updatedGuest: {
  id: number;
  firstName: string;
  lastName: string;
  attending: boolean;
}): Promise<Guest> {
  const guest = await updateGuestInsecure(updatedGuest);

  if (!guest) {
    throw new Error('Guest could not be updated');
  }

  return guest;
}

// Delete a guest by ID
export async function deleteGuest(guestId: number): Promise<Guest> {
  const guest = await deleteGuestInsecure(guestId);

  if (!guest) {
    throw new Error('Guest could not be deleted');
  }

  return guest;
}
