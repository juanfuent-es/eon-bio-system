import type { ReactNode } from 'react'
import { MuscleAssessmentChrome } from './muscle-assessment-chrome'

export default function AssessmentLayout({ children }: { children: ReactNode }) {
  return <MuscleAssessmentChrome>{children}</MuscleAssessmentChrome>
}
