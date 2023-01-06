export interface CsvParser {
  parse: (input: string | Buffer) => Promise<Object[]>
}
