export interface CsvParser {
  parse: (input: string | Buffer) => Object
}
