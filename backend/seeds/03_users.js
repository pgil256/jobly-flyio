/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'testuser',
      password: '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
      first_name: 'Test',
      last_name: 'User',
      email: 'joel@joelburton.com',
      is_admin: false
    },
    {
      username: 'testadmin',
      password: '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
      first_name: 'Test',
      last_name: 'Admin!',
      email: 'joel@joelburton.com',
      is_admin: true
    }
  ]);
};
