"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Company {
  static async create({ handle, name, description, numEmployees, logoUrl }) {
    const duplicateCheck = await db("companies").where({ handle });
    
    if (duplicateCheck.length)
      throw new BadRequestError(`Duplicate company: ${handle}`);

    const [company] = await db("companies").insert({
      handle,
      name,
      description,
      num_employees: numEmployees,
      logo_url: logoUrl
    }).returning(["handle", "name", "description", "num_employees as numEmployees", "logo_url as logoUrl"]);

    return company;
  }

  static async findAll() {
    return await db("companies")
      .select(["handle", "name", "description", "num_employees as numEmployees", "logo_url as logoUrl"])
      .orderBy("name");
  }

  static async get(handle) {
    const [company] = await db("companies")
      .select(["handle", "name", "description", "num_employees as numEmployees", "logo_url as logoUrl"])
      .where({ handle });
    
    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

  static async update(handle, data) {
    // You need to update sqlForPartialUpdate to work with knex or use knex directly here.
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        numEmployees: "num_employees",
        logoUrl: "logo_url"
      }
    );

    const [company] = await db("companies")
      .where({ handle })
      .update(setCols)
      .returning(["handle", "name", "description", "num_employees as numEmployees", "logo_url as logoUrl"]);
    
    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

  static async remove(handle) {
    const [company] = await db("companies")
      .where({ handle })
      .del()
      .returning("handle");
    
    if (!company) throw new NotFoundError(`No company: ${handle}`);
  }
}

module.exports = Company;
