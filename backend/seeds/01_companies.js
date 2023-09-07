/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('companies').del();

  // Inserts seed entries
  await knex('companies').insert([
    { handle: 'bauer-gallagher', name: 'Bauer-Gallagher', num_employees: 862, description: 'Difficult ready trip question produce produce someone.', logo_url: null },
    { handle: 'edwards-lee-reese', name: 'Edwards, Lee and Reese', num_employees: 744, description: 'To much recent it reality coach decision Mr. Dog language evidence minute either deep situation pattern. Other cold bad loss surface real show.', logo_url: '/logos/logo2.png' },
    { handle: 'hall-davis', name: 'Hall-Davis', num_employees: 749, description: 'Adult go economic off into. Suddenly happy according only common. Father plant wrong free traditional.', logo_url: '/logos/logo2.png' },
    { handle: 'watson-davis', name: 'Watson-Davis', num_employees: 819, description: 'Year join loss.', logo_url: '/logos/logo3.png' },
    { handle: 'baker-santos', name: 'Baker-Santos', num_employees: 225, description: 'Compare certain use. Writer time lay word garden. Resource task interesting voice.', logo_url: '/logos/logo3.png' },
    { handle: 'erickson-inc', name: 'Erickson Inc', num_employees: 267, description: 'Interesting environment owner beautiful school politics. General friend hair player dinner last administration teacher.', logo_url: '/logos/logo4.png' },
    { handle: 'norman-harvey', name: 'Norman-Harvey', num_employees: null, description: 'Drop along test material education. Opportunity forget campaign federal certainly total hair.', logo_url: '/logos/logo4.png' },
    { handle: 'boyd-evans', name: 'Boyd-Evans', num_employees: 698, description: 'Build respond generation tree. No five keep. Happy medical back fine focus suffer modern.', logo_url: '/logos/logo4.png' },
    { handle: 'mitchell-brown', name: 'Mitchell-Brown', num_employees: 288, description: 'Republican truth church generation voice price issue.', logo_url: '/logos/logo1.png' },
    { handle: 'russo-gillespie-conrad', name: 'Russo, Gillespie and Conrad', num_employees: 398, description: 'South sound knowledge guy. Up I size anyone issue drop. Agent light significant mouth while.', logo_url: '/logos/logo2.png' },
    { handle: 'weber-hernandez', name: 'Weber-Hernandez', num_employees: 681, description: 'Contain product south picture scientist.', logo_url: '/logos/logo4.png' }
  ]);
};
