const NO_FIELD = 0
const TEXTFIELD = 1
const AUTOCOMPLETE = 2

function isVolumeValid (vol, withMsg) {
  const msg = 'El volumen debe estar entre 0 y 10'
  if (vol >= 0 && vol <= 10) {
    return true
  }
  return withMsg ? msg : false
}

function isLevelValid (level, withMsg) {
  const msg = 'Debe ser un número entre 0 y 100'
  if (level >= 0 && level <= 100) {
    return true
  }
  return withMsg ? msg : false
}

function isCodeValid (code, withMsg) {
  const msg = 'Debe ser un número entre 0000 y 9999'
  if (code >= 0 && code < 10000) {
    return true
  }
  return withMsg ? msg : false
}

function isAcTemperatureValid (temp, withMsg) {
  const msg = 'La temperatura debe estar entre 18°C y 24°C '
  if (temp >= 18 && temp <= 24) {
    return true
  } else {
    return withMsg ? msg : false
  }
}

function isFreezerTempValid (temp, withMsg) {
  const msg = 'La temperatura del freezer debe estar entre -20°C y -8°C'
  if (temp >= -20 && temp <= -8) {
    return true
  } else {
    return withMsg != null ? msg : false
  }
}

function isRefrigeratorTempValid (temp, withMsg) {
  const msg = 'La temperatura de la heladera debe estar entre 2°C y 8°C'
  if (temp >= 2 && temp <= 8) {
    return true
  } else {
    return withMsg != null ? msg : false
  }
}

function translateAcMode (mode) {
  switch (mode) {
    case 'Frío': return 'cool'
    case 'Calor': return 'heat'
    case 'Ventilador': return 'fan'
    default: return mode
  }
}

function translateRefrigeratorMode (mode) {
  switch (mode) {
    case 'Predeterminado': return 'default'
    case 'Vacaciones': return 'vacation'
    case 'Fiesta': return 'party'
    default: return mode
  }
}

const supportedGenres = ['classical', 'country', 'dance', 'latina', 'pop', 'rock']
const supportedAcModes = ['Frío', 'Calor', 'Ventilador']
const supportedVerticalSwings = ['auto', '22', '45', '67', '90']
const supportedHorizontalSwings = ['auto', '-90', '-45', '0', '45', '90']
const supportedFanSpeeds = ['auto', '25', '50', '75', '100']
const supportedRefrigeratorModes = ['Predeterminado', 'Vacaciones', 'Fiesta']

export default {
  speaker: {
    setVolume: { type: TEXTFIELD, rule: isVolumeValid },
    play: { type: NO_FIELD },
    stop: { type: NO_FIELD },
    pause: { type: NO_FIELD },
    resume: { type: NO_FIELD },
    nextSong: { type: NO_FIELD },
    previousSong: { type: NO_FIELD },
    setGenre: { type: AUTOCOMPLETE, values: supportedGenres },
    getPlaylist: { type: NO_FIELD }
  },
  blinds: {
    open: { type: NO_FIELD },
    close: { type: NO_FIELD },
    setLevel: { type: TEXTFIELD, rule: isLevelValid }
  },
  ac: {
    turnOn: { type: NO_FIELD },
    turnOff: { type: NO_FIELD },
    setTemperature: { type: TEXTFIELD, rule: isAcTemperatureValid },
    setMode: { type: AUTOCOMPLETE, values: supportedAcModes, translator: translateAcMode },
    setVerticalSwing: { type: AUTOCOMPLETE, values: supportedVerticalSwings },
    setHorizontalSwing: { type: AUTOCOMPLETE, values: supportedHorizontalSwings },
    setFanSpeed: { type: AUTOCOMPLETE, values: supportedFanSpeeds }
  },
  door: {
    open: { type: NO_FIELD },
    close: { type: NO_FIELD },
    lock: { type: NO_FIELD },
    unlock: { type: NO_FIELD }
  },
  alarm: {
    // Corregir despues
    changeSecurityCode: { type: TEXTFIELD },
    armStay: { type: NO_FIELD },
    armAway: { type: NO_FIELD },
    disarm: { type: TEXTFIELD, rule: isCodeValid }
  },
  refrigerator: {
    setFreezerTemperature: { type: TEXTFIELD, rule: isFreezerTempValid },
    setTemperature: { type: TEXTFIELD, rule: isRefrigeratorTempValid },
    setMode: { type: AUTOCOMPLETE, values: supportedRefrigeratorModes, translator: translateRefrigeratorMode }
  }
}
/* TIPOS DE REQUERIMIENTOS
  NO_FIELD: No requiere ningun campo en particular
  TEXTFIELD: Requiere input/textfield o similar
  AUTOCOMPLETE: Requiere autocomplete o similar
 */
