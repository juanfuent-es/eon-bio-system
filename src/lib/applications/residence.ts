// ISO 3166-1 alpha-2. Shared by the form and server validation; no remote lookup.
const countryCodes =
  'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(
    ' ',
  )

const regionNames = new Intl.DisplayNames(['es'], { type: 'region' })
export const countries = countryCodes
  .map((value) => ({ value, label: regionNames.of(value)! }))
  .sort((a, b) => a.label.localeCompare(b.label, 'es'))

// ISO 3166-2 subdivision codes for Mexico.
export const mexicanStates = [
  {
    value: 'MX-AGU',
    label: 'Aguascalientes',
  },
  {
    value: 'MX-BCN',
    label: 'Baja California',
  },
  {
    value: 'MX-BCS',
    label: 'Baja California Sur',
  },
  {
    value: 'MX-CAM',
    label: 'Campeche',
  },
  {
    value: 'MX-CHH',
    label: 'Chihuahua',
  },
  {
    value: 'MX-CHP',
    label: 'Chiapas',
  },
  {
    value: 'MX-CMX',
    label: 'Ciudad de México',
  },
  {
    value: 'MX-COA',
    label: 'Coahuila de Zaragoza',
  },
  {
    value: 'MX-COL',
    label: 'Colima',
  },
  {
    value: 'MX-DUR',
    label: 'Durango',
  },
  {
    value: 'MX-GRO',
    label: 'Guerrero',
  },
  {
    value: 'MX-GUA',
    label: 'Guanajuato',
  },
  {
    value: 'MX-HID',
    label: 'Hidalgo',
  },
  {
    value: 'MX-JAL',
    label: 'Jalisco',
  },
  {
    value: 'MX-MEX',
    label: 'México',
  },
  {
    value: 'MX-MIC',
    label: 'Michoacán de Ocampo',
  },
  {
    value: 'MX-MOR',
    label: 'Morelos',
  },
  {
    value: 'MX-NAY',
    label: 'Nayarit',
  },
  {
    value: 'MX-NLE',
    label: 'Nuevo León',
  },
  {
    value: 'MX-OAX',
    label: 'Oaxaca',
  },
  {
    value: 'MX-PUE',
    label: 'Puebla',
  },
  {
    value: 'MX-QUE',
    label: 'Querétaro',
  },
  {
    value: 'MX-ROO',
    label: 'Quintana Roo',
  },
  {
    value: 'MX-SIN',
    label: 'Sinaloa',
  },
  {
    value: 'MX-SLP',
    label: 'San Luis Potosí',
  },
  {
    value: 'MX-SON',
    label: 'Sonora',
  },
  {
    value: 'MX-TAB',
    label: 'Tabasco',
  },
  {
    value: 'MX-TAM',
    label: 'Tamaulipas',
  },
  {
    value: 'MX-TLA',
    label: 'Tlaxcala',
  },
  {
    value: 'MX-VER',
    label: 'Veracruz de Ignacio de la Llave',
  },
  {
    value: 'MX-YUC',
    label: 'Yucatán',
  },
  {
    value: 'MX-ZAC',
    label: 'Zacatecas',
  },
] as const

export type Residence = {
  city: string
  country_code: string
  state_code: (typeof mexicanStates)[number]['value'] | null
}

export function parseResidence(value: (key: string) => string): Residence {
  const residence = value('residence')
  if (residence !== 'mexico' && residence !== 'abroad') throw new Error('Selecciona si vives en México o en otro país.')

  const city = value('city')
  if (!city || city.length > 100) throw new Error('Ingresa tu ciudad (máximo 100 caracteres).')

  if (residence === 'mexico') {
    const state = mexicanStates.find(({ value: code }) => code === value('state_code'))
    if (!state) throw new Error('Selecciona un estado de México.')
    return { city, country_code: 'MX', state_code: state.value }
  }

  const country = countries.find(({ value: code }) => code === value('country_code') && code !== 'MX')
  if (!country) throw new Error('Selecciona tu país de residencia fuera de México.')
  return { city, country_code: country.value, state_code: null }
}
