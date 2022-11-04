"use strict";

/** Customer for Lunchly */

const db = require("../db");
const Reservation = require("./reservation");

/** Customer of the restaurant. */

class Customer {
  constructor({ id, firstName, lastName, phone, notes }) {
    this.id = id;  //primary key
    this.firstName = firstName;  //not null
    this.lastName = lastName;  //not null
    this.phone = phone;
    this.notes = notes;  // default " ", not null
  }

  /** find all customers. */

  static async all() {
    const results = await db.query(
          `SELECT id,
                  first_name AS "firstName",
                  last_name  AS "lastName",
                  phone,
                  notes
           FROM customers
           ORDER BY last_name, first_name`,
    );
    return results.rows.map(c => new Customer(c));
  }

  /** get a customer by ID. */

  static async get(id) {
    const results = await db.query(
          `SELECT id,
                  first_name AS "firstName",
                  last_name  AS "lastName",
                  phone,
                  notes
           FROM customers
           WHERE id = $1`,
        [id],
    );

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }

  /** get all reservations for this customer. */

  async getReservations() {
    return await Reservation.getReservationsForCustomer(this.id);
  }

  /** If an id is passed in, then it takes in the incoming data, pulls up
   * the customer instance in the database, patches the data and returns nothing (change this).
   * If no id is passed in, this adds a new customer row to the database. Returns
   * the new customer's id.
   */

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
            `INSERT INTO customers (first_name, last_name, phone, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
          [this.firstName, this.lastName, this.phone, this.notes],
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
            `UPDATE customers
             SET first_name=$1,
                 last_name=$2,
                 phone=$3,
                 notes=$4
             WHERE id = $5`, [
            this.firstName,
            this.lastName,
            this.phone,
            this.notes,
            this.id,
          ],
      );
    }
  }
  /* end save() */

  /** Takes the firstName and the lastName of the customer instance that
   * it is called on and returns a single string containing the customer's
   * full name.
   */

  fullName() {

  return `${this.firstName} ${this.lastName}`;

  }

}

module.exports = Customer;
