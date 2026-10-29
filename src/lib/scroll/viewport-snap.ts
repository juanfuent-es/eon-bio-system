export type SnapSection = { id: string; top: number; bottom: number }
export type SnapTarget = { id: string; top: number }

/** Snap once per visit; allow reading tall sections without repeatedly pulling to their start. */
export class ViewportSnapTracker {
  private visited = new Set<string>()

  private threshold = 0.8

  commit(id: string) {
    this.visited.add(id)
  }

  update(sections: SnapSection[], viewportHeight: number, scrollY: number): SnapTarget | null {
    if (viewportHeight <= 0) return null
    let target: SnapTarget | null = null

    for (const section of sections) {
      const height = section.bottom - section.top
      const visible = Math.max(0, Math.min(section.bottom, viewportHeight) - Math.max(section.top, 0))
      const ratio = height > 0 ? visible / Math.min(height, viewportHeight) : 0

      if (ratio < this.threshold) {
        this.visited.delete(section.id)
        continue
      }
      if (this.visited.has(section.id)) continue

      // Entering a tall section from below aligns its bottom, preserving the reading order.
      const offset = height > viewportHeight && section.top < 0 ? section.bottom - viewportHeight : section.top
      const readingInside = height > viewportHeight && section.top <= 0 && section.bottom >= viewportHeight
      if (Math.abs(offset) < 1 || readingInside) {
        this.commit(section.id)
        continue
      }
      if (!target || Math.abs(offset) < Math.abs(target.top - scrollY)) {
        target = { id: section.id, top: scrollY + offset }
      }
    }
    return target
  }
}
