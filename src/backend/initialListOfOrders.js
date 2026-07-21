export const initialListOfOrders = [{
  doNo: '0001',
  status: 'unfulfilled',
  date: '2025-11-17',
  companyName: 'Test company 1',
  deliverTo: 'Company 1 HQ Address',
  contact: 'Person 12345678',
  attendedBy: 'ZHANG',
  model: '100Bar',
  serialNumber: '202001232',
  items: [{
    id: crypto.randomUUID(),
    content: 'Service & repair 100bar waterjet',
    qty: 1,
    price: '',
  }, {
    id: crypto.randomUUID(),
    content: 'New Pump 11.20',
    qty: 1,
    price: '',
  }],
  signature: {
    img: 'somerandomhashshouldbehere',
    timestamp: (new Date).toString()
  }
},{
  doNo: '0002',
  status: 'unfulfilled',
  date: '2026-02-06',
  companyName: 'Test Company 2',
  deliverTo: 'Blk 123 Somewhere Rd',
  contact: '987654321',
  attendedBy: 'Lee',
  model: '',
  serialNumber: '',
  items: [{
    id: crypto.randomUUID(),
    content: 'High Pressure Hose',
    qty: 1,
    price: '',
  }],
  signature: {
    img: 'imagehashshouldbehere',
    timestamp: (new Date).toString()
  }
},{
  doNo: '0003',
  status: 'unfulfilled',
  date: '2026-03-12',
  companyName: 'Company 3',
  deliverTo: 'Somewhere\'s address',
  contact: 'Person contact 123',
  attendedBy: 'Zhang',
  model: '',
  serialNumber: '',
  items: [{
    id: crypto.randomUUID(),
    content: 'Hose repair',
    qty: 5,
    price: '',
  }, {
    id: crypto.randomUUID(),
    content: 'High Pressure Nipple',
    qty: 3,
    price: '',
  },{
    id: crypto.randomUUID(),
    content: 'High Pressure Coupling',
    qty: 2,
    price: '',
  },{
    id: crypto.randomUUID(),
    content: 'Ball Valve 1/4"',
    qty: 1,
    price: '',
  }],
  signature: {
    img: 'imagehashshouldbehere',
    timestamp: (new Date).toString()
  }
}
]