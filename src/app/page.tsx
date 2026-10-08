import { MuscleAssessmentChrome } from './muscle-assessment/muscle-assessment-chrome'
import MuscleAssessmentPage from './muscle-assessment/page'

export { metadata } from './muscle-assessment/page'

export default function Page() {
  return (
    <MuscleAssessmentChrome>
      <MuscleAssessmentPage />
    </MuscleAssessmentChrome>
  )
}
