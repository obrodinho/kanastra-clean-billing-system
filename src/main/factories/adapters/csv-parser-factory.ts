import { CsvParserAdapter } from '@/infra/parsers'

export const makeCsvParserAdapter = (): CsvParserAdapter => {
  const options: CsvParserAdapter.Options = {
    cast: true,
    cast_date: true,
    columns: true,
    skip_empty_lines: true

  }
  return new CsvParserAdapter(options)
}
