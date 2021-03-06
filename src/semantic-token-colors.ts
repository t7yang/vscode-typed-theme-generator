import { TokenColorSetting } from './token-colors';

export interface SemanticTokenColors {
  [P: string]: string | TokenColorSetting;
}

export const Type = {
  /** For identifiers that declare or reference a namespace, module, or package. */
  namespace: 'namespace',
  /** For identifiers that declare or reference a class type. */
  class: 'class',
  /** For identifiers that declare or reference an enumeration type. */
  enum: 'enum',
  /** For identifiers that declare or reference an interface type. */
  interface: 'interface',
  /** For identifiers that declare or reference a struct type. */
  struct: 'struct',
  /** For identifiers that declare or reference a type parameter. */
  typeParameter: 'typeParameter',
  /** For identifiers that declare or reference a type that is not covered above. */
  type: 'type',
  /** For identifiers that declare or reference a function or method parameters. */
  parameter: 'parameter',
  /** For identifiers that declare or reference a local or global variable. */
  variable: 'variable',
  /** For identifiers that declare or reference a member property, member field, or member variable. */
  property: 'property',
  /** For identifiers that declare or reference an enumeration property, constant, or member. */
  enumMember: 'enumMember',
  /** For identifiers that declare or reference decorators and annotations. */
  decorator: 'decorator',
  /** For identifiers that declare an event property. */
  event: 'event',
  /** For identifiers that declare a function. */
  function: 'function',
  /** For identifiers that declare a member function or method. */
  method: 'method',
  /** For identifiers that declare a macro. */
  macro: 'macro',
  /** For identifiers that declare a label. */
  label: 'label',
  /** For tokens that represent a comment. */
  comment: 'comment',
  /** For tokens that represent a string literal. */
  string: 'string',
  /** For tokens that represent a language keyword. */
  keyword: 'keyword',
  /** For tokens that represent a number literal. */
  number: 'number',
  /** For tokens that represent a regular expression literal. */
  regexp: 'regexp',
  /** For tokens that represent an operator. */
  operator: 'operator',
} as const;

export const Mod = {
  /** For declarations of symbols. */
  declaration: 'declaration',
  /** For definitions of symbols, for example, in header files. */
  definition: 'definition',
  /** For readonly variables and member fields (constants). */
  readonly: 'readonly',
  /** For class members (static members). */
  static: 'static',
  /** For symbols that should no longer be used. */
  deprecated: 'deprecated',
  /** For types and member functions that are abstract. */
  abstract: 'abstract',
  /** For functions that are marked async. */
  async: 'async',
  /** For variable references where the variable is assigned to. */
  modification: 'modification',
  /** For occurrences of symbols in documentation. */
  documentation: 'documentation',
  /** For symbols that are part of the standard library. */
  defaultLibrary: 'defaultLibrary',
} as const;
