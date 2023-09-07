"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {

  static async authenticate(username, password) {
    const [user] = await db("users")
      .where({ username })
      .select("username", "password", "first_name as firstName", "last_name as lastName", "email", "is_admin as isAdmin");

    if (user && await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  static async register({ username, password, firstName, lastName, email, isAdmin }) {
    const [existingUser] = await db("users")
      .where({ username })
      .select("username");

    if (existingUser) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const [user] = await db("users").insert({
      username,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      email,
      is_admin: isAdmin
    }).returning(["username", "first_name as firstName", "last_name as lastName", "email", "is_admin as isAdmin"]);

    return user;
  }

  static async findAll() {
    const users = await db("users")
      .select("username", "first_name as firstName", "last_name as lastName", "email", "is_admin as isAdmin")
      .orderBy("username");

    return users;
  }

  static async get(username) {
    const [user] = await db("users")
      .where({ username })
      .select("username", "first_name as firstName", "last_name as lastName", "email", "is_admin as isAdmin");

    if (!user) throw new NotFoundError(`No user: ${username}`);

    const applications = await db("applications")
      .where({ username })
      .select("job_id as jobId");
    user.applications = applications.map(a => a.jobId);

    return user;
  }

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    // Mapping to rename columns
    const columnMapping = {
      firstName: "first_name",
      lastName: "last_name",
      isAdmin: "is_admin"
    };

    let updateData = {};
    for (let key in data) {
      if (columnMapping[key]) {
        updateData[columnMapping[key]] = data[key];
      } else {
        updateData[key] = data[key];
      }
    }

    const [user] = await db("users")
      .where({ username })
      .update(updateData)
      .returning(["username", "first_name as firstName", "last_name as lastName", "email", "is_admin as isAdmin"]);

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  static async remove(username) {
    const [user] = await db("users")
      .where({ username })
      .del()
      .returning("username");

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  static async applyToJob(username, jobId) {
    const [job] = await db("jobs").where({ id: jobId }).select("id");
    if (!job) throw new NotFoundError(`No job with id of: ${jobId}`);

    const [user] = await db("users").where({ username }).select("username");
    if (!user) throw new NotFoundError(`No username with name: ${username}`);

    await db("applications").insert({ job_id: jobId, username });
  }
}

module.exports = User;
