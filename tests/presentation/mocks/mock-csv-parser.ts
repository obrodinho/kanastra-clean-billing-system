import { CsvParser } from '@/utils/protocols/csv-parser'

export class CsvParserSpy implements CsvParser {
  async parse (input: string | Buffer): Promise<Object[]> {
    return []
  }
}
