"use strict";

/** Reservation for Lunchly */

const moment = require("moment");

const db = require("../db");

/** A reservation for a party */

class Reservation {
  constructor({ id, customerId, numGuests, startAt, notes }) {
    this.id = id;  //primary key
    this.customerId = customerId;    //int, not null, references customers
    this.numGuests = numGuests;  //int, not null
    this.startAt = startAt;  //timestame without t/z, not null
    this.notes = notes;  //default '', not null
  }

  /** formatter for startAt */

  getFormattedStartAt() {
    return moment(this.startAt).format("MMMM Do YYYY, h:mm a");
  }

  /** 
   * If an id is passed in, then it takes in the incoming data, pulls up
   * the reservation instance in the database, patches the data and returns id.
   * 
   * If no id is passed in, this adds a new reservation row to the database. 
   * Returns the new reservations's id.
   * */

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO reservations (customer_id, start_at, num_guests, notes)
          VALUES ($1, $2, $3, $4)
          RETURNING id`,
        [this.customerId, this.startAt, this.numGuests, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE reservations
            SET customer_id=$1,
              start_at=$2,
              num_guests=$3,
              notes=$4
            WHERE id = $5
            RETURNING id`,
        [this.customerId,
        this.startAt,
        this.numGuests,
        this.notes,
        this.id,
        ],
      );
    }
  }
  /* end save() */

  static async getReservationsForCustomer(customerId) {
    const results = await db.query(
      `SELECT id,
                  customer_id AS "customerId",
                  num_guests AS "numGuests",
                  start_at AS "startAt",
                  notes AS "notes"
           FROM reservations
           WHERE customer_id = $1`,
      [customerId],
    );

    return results.rows.map(row => new Reservation(row));
  }
}


module.exports = Reservation;
