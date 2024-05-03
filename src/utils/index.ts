export const API_URL = 'http://127.0.0.1:3000';

export const timeInSeconds = (time: number) => {
  const result = Number((time / 1000).toFixed(2));
  return result;
};

export const carNames = [
  'Tesla',
  'Ford',
  'Chevrolet',
  'Toyota',
  'Honda',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Volkswagen',
  'Nissan',
];
export const carModels = [
  'Model S',
  'Mustang',
  'Corvette',
  'Camry',
  'Civic',
  'X5',
  'E-Class',
  'A4',
  'Golf',
  'Altima',
];
export const carColors = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Black',
  'Brown',
  'Silver',
  'Orange',
  'Purple',
  'Pink',
];
