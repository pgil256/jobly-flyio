"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Job {

  static async create(data) {
    const [job] = await db("jobs").insert({
      title: data.title,
      salary: data.salary,
      equity: data.equity,
      company_handle: data.companyHandle
    }).returning(["id", "title", "salary", "equity", "company_handle as companyHandle"]);

    return job;
  }

  static async findAll({ minSalary, hasEquity, title } = {}) {
    let queryBuilder = db("jobs as j")
      .leftJoin("companies as c", "c.handle", "j.company_handle")
      .select("j.id", "j.title", "j.salary", "j.equity", "j.company_handle as companyHandle", "c.name as companyName");

    if (minSalary !== undefined) {
      queryBuilder.where("salary", ">=", minSalary);
    }

    if (hasEquity === true) {
      queryBuilder.where("equity", ">", 0);
    }

    if (title !== undefined) {
      queryBuilder.where("title", "ilike", `%${title}%`);
    }

    const jobs = await queryBuilder.orderBy("title");
    return jobs;
  }

  static async get(id) {
    const [job] = await db("jobs")
      .where({ id })
      .select("id", "title", "salary", "equity", "company_handle as companyHandle");

    if (!job) throw new NotFoundError(`No job: ${id}`);

    const [company] = await db("companies")
      .where({ handle: job.companyHandle })
      .select("handle", "name", "description", "num_employees as numEmployees", "logo_url as logoURL");

    delete job.companyHandle;
    job.company = company;

    return job;
  }

  static async update(id, data) {
    const [job] = await db("jobs")
      .where({ id })
      .update(data)
      .returning(["id", "title", "salary", "equity", "company_handle as companyHandle"]);

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  static async remove(id) {
    const [job] = await db("jobs")
      .where({ id })
      .del()
      .returning("id");

    if (!job) throw new NotFoundError(`No job: ${id}`);
  }
}

module.exports = Job;
