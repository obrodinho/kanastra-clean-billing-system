import { CsvParser } from '@/utils/protocols'

import { parse } from 'csv-parse/sync'

export class CsvParserAdapter implements CsvParser {
  public static readonly defaultParseOptions: CsvParserAdapter.Options = {
    columns: true,
    skip_empty_lines: true,
    cast: true,
    cast_date: true
  }

  private readonly parseOptions: CsvParserAdapter.Options

  constructor (parseOptions: CsvParserAdapter.Options = CsvParserAdapter.defaultParseOptions) {
    this.parseOptions = Object.assign(parseOptions, CsvParserAdapter.defaultParseOptions)
  }

  async parse (input: string | Buffer): Promise<JSON[]> {
    const parser = parse(Buffer.from(input), CsvParserAdapter.defaultParseOptions)
    const records = []
    for await (const record of parser) {
      records.push(record)
    }

    return records
  }
}

export namespace CsvParserAdapter {
  export type Options = {
    cast: boolean
    cast_date: boolean
    columns: boolean
    skip_empty_lines: boolean
  }
}
