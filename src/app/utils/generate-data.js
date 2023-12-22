// Generate Request Items

const skillsets = ['Bartender', 'Officer', 'Chef', 'Servant', 'Security', 'Butcher'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const fakeData = [];

const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 12) + 1;
  const period = ['AM', 'PM'][Math.floor(Math.random() * 2)];
  return `${hours}:00 ${period}`;
};

const generateRandomDate = () => {
  const randomMonthIndex = Math.floor(Math.random() * months.length);
  const month = months[randomMonthIndex];
  const day = Math.floor(Math.random() * 30) + 1;
  return `${month} ${day}, 2023`;
};

const generateRandomFullName = () => {
  const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Robert', 'Mia'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

const generateRandomComment = () => {
  const loremIpsum = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ];
  return loremIpsum[Math.floor(Math.random() * loremIpsum.length)];
};

const locations = Array.from({ length: 20 }, (_, index) => {
  return {
    id: index,
    name: `Location ${index}`,
  };
});

const workers = Array.from({ length: 100 }, (_, index) => {
  return {
    id: index,
    name: generateRandomFullName(),
  };
});

const events = Array.from({ length: 12 }, (_, index) => {
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];

  return {
    id: index,
    name: `Event ${index}`,
    date: `${generateRandomTime()} ${generateRandomDate()}`,
    location_id: randomLocation.id,
    location: randomLocation.name,
  };
});

for (let i = 0; i < 1000; i++) {
  const randomEvent = events[Math.floor(Math.random() * events.length)];
  const randomWorker = workers[Math.floor(Math.random() * workers.length)];

  const requestItem = {
    id: i,
    worker_id: randomWorker.id,
    worker_name: randomWorker.name,
    event_id: randomEvent.id,
    event_name: randomEvent.name,
    shift_date_display: randomEvent.date,
    shift_date: new Date(randomEvent.date),
    location_id: randomEvent.location_id,
    location: randomEvent.location,
    skillset: skillsets[Math.floor(Math.random() * skillsets.length)],
    current_hours: Math.floor(Math.random() * 50),
    remaining_spots: `${Math.floor(Math.random() * 5) + 1}/10`,
    date_added: `${generateRandomTime()} ${generateRandomDate()}`,
    comment: generateRandomComment(),
  };

  fakeData.push(requestItem);
}

console.log(fakeData);
