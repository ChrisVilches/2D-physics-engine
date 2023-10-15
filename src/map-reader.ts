import * as map1 from '../maps/map1.json'
import { MovingFloor } from './moving-floor'
import { Point } from './point'
import { Segment } from './segment'

function pointFromArray (arr: number[]): Point {
  return new Point(arr[0], arr[1])
}

function segmentFromArray (arr: unknown[]): Segment {
  const [x, y, a, b, seq] = arr
  if (typeof x !== 'number' || typeof y !== 'number') throw new Error()
  if (typeof a !== 'number' || typeof b !== 'number') throw new Error()

  const p = new Point(x, y)
  const q = new Point(a, b)

  if (seq === undefined) {
    return new Segment(p, q)
  } else {
    return new MovingFloor(p, q, (seq as any).map((s: any) => ({
      v: pointFromArray(s.v),
      frames: s.frames
    })))
  }
}

interface ReadMapResult {
  initialPosition: Point
  floors: Segment[]
  walls: Segment[]
}

export function readMap (): ReadMapResult {
  return {
    initialPosition: pointFromArray(map1.initial),
    floors: map1.floors.map(segmentFromArray),
    walls: map1.walls.map(segmentFromArray)
  }
}
