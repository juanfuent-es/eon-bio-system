import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'favicon.ico')
    const data = readFileSync(filePath)
    
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    return new NextResponse('Not Found', { status: 404 })
  }
}
