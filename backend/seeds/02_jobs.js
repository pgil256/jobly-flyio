/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries from 'jobs'
  await knex('jobs').del();

  // Inserts seed entries
  await knex('jobs').insert([
    {title: 'Conservator, furniture', salary: 110000, equity: 0, company_handle: 'watson-davis'},
    {title: 'Information officer', salary: 200000, equity: 0, company_handle: 'baker-santos'}, 
    {title: 'Consulting civil engineer', salary: 60000, equity: 0, company_handle: 'bauer-gallagher'}, 
    {title: 'Civil engineer', salary: 100000, equity: 0, company_handle: 'watson-davis'},
    {title: 'Clinical researcher', salary: 143000, equity: 0.032, company_handle: 'edwards-lee-reese'},
    {title: 'Health and safety adviser', salary: 91000, equity: 0.03, company_handle: 'russo-gillespie-conrad'},
    {title: 'Radiographer, therapeutic', salary: 79000, equity: 0, company_handle: 'erickson-inc'}, 
    {title: 'Scientific laboratory technician', salary: 64000, equity: 0.02, company_handle: 'norman-harvey'}, 
    {title: 'Medical secretary', salary: 57000, equity: 0, company_handle: 'mitchell-brown'}, 
    {title: 'Building surveyor', salary: 88000, equity: 0.015, company_handle: 'boyd-evans'},
    {title: 'Editor, commissioning', salary: 103000, equity: 0.025, company_handle: 'baker-santos'}, 
    {title: 'Psychologist, counselling', salary: 112000, equity: 0.05, company_handle: 'erickson-inc'}, 
    {title: 'Industrial buyer', salary: 77000, equity: 0, company_handle: 'norman-harvey'}, 
    {title: 'Public librarian', salary: 65000, equity: 0.01, company_handle: 'mitchell-brown'}, 
    {title: 'Engineer, drilling', salary: 138000, equity: 0.03, company_handle: 'bauer-gallagher'}, 
    {title: 'Chartered accountant', salary: 117000, equity: 0.02, company_handle: 'hall-davis'}, 
    {title: 'Chartered public finance accountant', salary: 129000, equity: 0.035, company_handle: 'watson-davis'}, 
    {title: 'Operational researcher', salary: 83000, equity: 0, company_handle: 'bauer-gallagher'}, 
    {title: 'Museum/gallery exhibition officer', salary: 72000, equity: 0.01, company_handle: 'baker-santos'},
    {title: 'Retail merchandiser', salary: 69000, equity: 0.015, company_handle: 'weber-hernandez'},
    {title: 'Public house manager', salary: 58000, equity: 0, company_handle: 'erickson-inc'}, 
    {title: 'Corporate treasurer', salary: 102000, equity: 0.02, company_handle: 'hall-davis'}, 
    {title: 'Engineer, electronics', salary: 114000, equity: 0.03, company_handle: 'norman-harvey'}, 
    {title: 'Dance movement psychotherapist', salary: 86000, equity: 0, company_handle: 'mitchell-brown'},       
    {title: 'Historic buildings inspector/conservation officer', salary: 129000, equity: 0.052, company_handle: 'watson-davis'}
  ]);
};
