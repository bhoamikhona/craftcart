export const users = [
  {
    userId: 1,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "+1 (212) 555-2145",
    address: "245 E 14th St, New York, NY 10003",
    creatorId: 1,
    tutorials: [1, 4], // Sarah created tutorials 1 and 4
    followers: 1247,
    subscribedChannels: [2, 3],
  },
  {
    userId: 2,
    name: "Mike Rodriguez",
    email: "mike.rodriguez@example.com",
    phone: "+1 (646) 555-7712",
    address: "88 Washington Pl, New York, NY 10011",
    creatorId: 2,
    tutorials: [2, 5], // Mike created tutorials 2 and 5
    followers: 986,
    subscribedChannels: [1, 3, 4],
  },
  {
    userId: 3,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 (917) 555-3342",
    address: "310 Amsterdam Ave, New York, NY 10024",
    creatorId: 3,
    tutorials: [3], // Emma created tutorial 3
    followers: 752,
    subscribedChannels: [1, 2, 5],
  },
  {
    userId: 4,
    name: "Lisa Baker",
    email: "lisa.baker@example.com",
    phone: "+1 (347) 555-9908",
    address: "57 W 16th St, New York, NY 10011",
    creatorId: 4,
    tutorials: [], // Lisa hasn’t uploaded yet
    followers: 523,
    subscribedChannels: [1, 2, 3],
  },
  {
    userId: 5,
    name: "Alex Patel",
    email: "alex.patel@example.com",
    phone: "+1 (929) 555-6041",
    address: "401 Hudson St, New York, NY 10014",
    creatorId: 5,
    tutorials: [], // Viewer for now, can upload later
    followers: 45,
    subscribedChannels: [1, 2, 3, 4],
  },
];
