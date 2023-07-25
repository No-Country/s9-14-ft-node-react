export function calculateAgeFromISODate(isoDate: string) {
  const birthDate = new Date(isoDate);
  const currentDate = new Date();
  const ageInMillis = +currentDate - +birthDate;
  const ageInYears = ageInMillis / (1000 * 60 * 60 * 24 * 365.25);
  const age = Math.floor(ageInYears);

  return age;
}

export function convertDateFromISO(fechaISO: string) {
  const date = new Date(fechaISO);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
}


