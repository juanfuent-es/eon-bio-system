export const objectives = [
  'Bajar grasa',
  'Ganar músculo',
  'Mejorar la salud',
  'Longevidad',
  'Rendimiento',
  'Solo quiero conocer mi estado actual',
  'Otro',
]
export const sources = [
  'Gimnasio',
  'Otros deportes',
  'Familiar o amigo',
  'Instagram',
  'Facebook',
  'Google',
  'Paciente actual / referido por paciente',
  'Otro',
]
export type AssessmentState = {
  status: 'idle' | 'error' | 'success'
  message: string
  modality?: 'presencial' | 'remota'
}
