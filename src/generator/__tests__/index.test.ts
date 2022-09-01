import { experimentGenerator } from '..'
import {
  EXAMPLE_BIG_384_RESPONSE,
  EXAMPLE_BIG_96_RESPONSE,
  EXAMPLE_BIG_PAYLOAD,
  EXAMPLE_PAYLOAD_INVALID,
  EXAMPLE_PAYLOAD_MORE_REAGENTS,
  EXAMPLE_PAYLOAD_MORE_REAGENTS_RESULT,
  EXAMPLE_PAYLOAD_MORE_SAMPLES,
  EXAMPLE_PAYLOAD_MORE_SAMPLES_RESULT,
  EXAMPLE_PAYLOAD_NO_REAGENTS,
  EXAMPLE_PAYLOAD_NO_REAGENTS_RESULT,
  EXAMPLE_PAYLOAD_NO_REPLICATES,
  EXAMPLE_PAYLOAD_NO_REPLICATES_RESULT,
  EXAMPLE_PAYLOAD_NO_SAMPLES,
  EXAMPLE_PAYLOAD_NO_SAMPLES_RESULT,
} from './fixtures.test'
import { GroupBy, GroupingLogic } from '../types'

describe('Table Generation', () => {
  test('Generate with more samples should pass', () => {
    expect(
      experimentGenerator({
        tableSize: 96,
        experimentGroups: [EXAMPLE_PAYLOAD_MORE_SAMPLES],
        groupingLogic: GroupingLogic.COMPLEX,
        groupBy: GroupBy.REAGENT,
        fixedColor: true,
      }),
    ).toStrictEqual(EXAMPLE_PAYLOAD_MORE_SAMPLES_RESULT)
  })

  test('Generate with more reagents should pass', () => {
    expect(
      experimentGenerator({
        tableSize: 96,
        experimentGroups: [EXAMPLE_PAYLOAD_MORE_REAGENTS],
        groupingLogic: GroupingLogic.COMPLEX,
        groupBy: GroupBy.REAGENT,
        fixedColor: true,
      }),
    ).toStrictEqual(EXAMPLE_PAYLOAD_MORE_REAGENTS_RESULT)
  })

  test('Generate with no reagents should pass', () => {
    expect(
      experimentGenerator({
        tableSize: 96,
        experimentGroups: [EXAMPLE_PAYLOAD_NO_REAGENTS],
        groupingLogic: GroupingLogic.COMPLEX,
        groupBy: GroupBy.REAGENT,
        fixedColor: true,
      }),
    ).toStrictEqual(EXAMPLE_PAYLOAD_NO_REAGENTS_RESULT)
  })

  test('Generate with no samples should pass', () => {
    expect(
      experimentGenerator({
        tableSize: 96,
        experimentGroups: [EXAMPLE_PAYLOAD_NO_SAMPLES],
        groupingLogic: GroupingLogic.COMPLEX,
        groupBy: GroupBy.REAGENT,
        fixedColor: true,
      }),
    ).toStrictEqual(EXAMPLE_PAYLOAD_NO_SAMPLES_RESULT)
  })

  test('Generate with no replicates should error', () => {
    expect(() =>
      experimentGenerator({
        tableSize: 96,
        experimentGroups: [EXAMPLE_PAYLOAD_NO_REPLICATES],
        groupingLogic: GroupingLogic.COMPLEX,
        groupBy: GroupBy.REAGENT,
        fixedColor: true,
      }),
    ).toThrowError(EXAMPLE_PAYLOAD_NO_REPLICATES_RESULT)
  })

  test('Invalid data should error', () => {
    expect(() =>
      experimentGenerator({
        tableSize: 96,
        experimentGroups: [EXAMPLE_PAYLOAD_INVALID as any],
        groupingLogic: GroupingLogic.COMPLEX,
        groupBy: GroupBy.REAGENT,
        fixedColor: true,
      }),
    ).toThrowError()
  })

  test('Big generate for 96 table should pass', () => {
    expect(
      experimentGenerator({
        tableSize: 96,
        experimentGroups: [EXAMPLE_BIG_PAYLOAD],
        groupingLogic: GroupingLogic.COMPLEX,
        groupBy: GroupBy.REAGENT,
        fixedColor: true,
      }),
    ).toStrictEqual(EXAMPLE_BIG_96_RESPONSE)
  })

  test('Big generate for 384 table should pass', () => {
    expect(
      experimentGenerator({
        tableSize: 384,
        experimentGroups: [EXAMPLE_BIG_PAYLOAD],
        groupingLogic: GroupingLogic.COMPLEX,
        groupBy: GroupBy.REAGENT,
        fixedColor: true,
      }),
    ).toStrictEqual(EXAMPLE_BIG_384_RESPONSE)
  })
})
