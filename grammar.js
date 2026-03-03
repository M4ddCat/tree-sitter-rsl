// vi:ts=2:sw=2:et

module.exports = grammar({
  name: "rsl",

  extras: ($) => [/[ \t\r\n]/, $.comment],

  word: ($) => $._word_identifier,

  conflicts: ($) => [[$.variable_definition, $.identifier]],

  rules: {
    unit: ($) =>
      seq(
        optional(semicolonSep1(choice($.import, $._definition, $._statement))),
        optional($.error_handler),
        optional(seq($._end, optional(";"))),
      ),

    error_handler: ($) =>
      seq(
        caseInsensitive("onerror"),
        optional(seq("(", $.identifier, ")")),
        $._statement_list,
      ),

    _definition_list: ($) => semicolonSep1($._definition),

    import: ($) => seq(caseInsensitive("import"), commaSep1($.filename)),

    filename: ($) => choice($.identifier, $.string),

    _word_identifier: ($) => /[a-zA-Zа-яА-Я_][a-zA-Zа-яА-Я0-9_]*/,
    _special_identifier: ($) => seq("{", repeat1(/\S/), "}"),
    identifier: ($) => choice($._word_identifier, $._special_identifier),

    _definition: ($) => choice($.macro_definition, $.class_definition),

    _statement: ($) =>
      choice(
        $.array_definition,
        $.record_definition,
        $.while_loop,
        $.for_loop,
        $.if_statement,
        $.return_statement,
        $.output_statement,
        $.macro_call,
        $.constant_definition,
        $.variable_definition,
        $.variable_assignment,
        $.with_definition,
      ),

    class_body: ($) => semicolonSep1(choice($.macro_definition, $._statement)),

    macro_body: ($) => semicolonSep1(choice($._statement, $.macro_definition)),

    _statement_list: ($) => semicolonSep1($._statement),

    macro_definition: ($) =>
      seq(
        optional($.attribute),
        caseInsensitive("macro"),
        field("name", $.identifier),
        optional($.parameter_list),
        optional($.type_declaration),
        optional($.macro_body),
        optional($.error_handler),
        $._end,
      ),

    _typed_identifier: ($) =>
      seq(field("name", $.identifier), optional($.type_declaration)),

    type_declaration: ($) => seq(":", $.type),

    type: ($) => choice($.scalar_type, $.object_type),
    scalar_type: ($) =>
      choice(
        caseInsensitive("variant"),
        caseInsensitive("integer"),
        caseInsensitive("money"),
        caseInsensitive("double"),
        caseInsensitive("doublel"),
        caseInsensitive("string"),
        caseInsensitive("bool"),
        caseInsensitive("date"),
        caseInsensitive("time"),
        caseInsensitive("procref"),
        caseInsensitive("datetime"),
        caseInsensitive("r2m"),
        caseInsensitive("memaddr"),
      ),
    object_type: ($) =>
      choice(
        caseInsensitive("tbfile"),
        caseInsensitive("trechandler"),
        caseInsensitive("tarray"),
        caseInsensitive("tstreamdoc"),
        caseInsensitive("object"),
      ),
    boolean_literal: ($) =>
      choice(caseInsensitive("true"), caseInsensitive("false")),
    constant_builtin: ($) =>
      choice(
        caseInsensitive("v_integer"),
        caseInsensitive("v_double"),
        caseInsensitive("v_doublel"),
        caseInsensitive("v_string"),
        caseInsensitive("v_bool"),
        caseInsensitive("v_date"),
        caseInsensitive("v_time"),
        caseInsensitive("v_dttm"),
        caseInsensitive("v_memaddr"),
        caseInsensitive("v_proc"),
        caseInsensitive("v_r2m"),
        caseInsensitive("v_decimal"),
        caseInsensitive("v_numeric"),
        caseInsensitive("v_money"),
        caseInsensitive("v_moneyl"),
        caseInsensitive("v_undef"),
      ),
    special_literal: ($) =>
      choice(
        caseInsensitive("optval"),
        caseInsensitive("nullval"),
        caseInsensitive("null"),
      ),
    variable_builtin: ($) =>
      choice(caseInsensitive("this"), caseInsensitive("\\{curdate\\}")),
    macro_builtin: ($) => choice(caseInsensitive("valtype")),

    variable_definition: ($) =>
      seq(
        optional($.attribute),
        caseInsensitive("var"),
        $._identifier_init_list,
      ),

    _identifier_init_list: ($) =>
      prec.left(commaSep1($._variable_initialization)),

    _variable_initialization: ($) =>
      seq(
        $._typed_identifier,
        optional(seq($.assignment_operator, $._expression)),
      ),

    constant_definition: ($) =>
      seq(
        optional($.attribute),
        caseInsensitive("const"),
        commaSep1(seq($.constant, $.assignment_operator, $._expression)),
      ),
    constant: ($) => $._typed_identifier,

    array_definition: ($) =>
      seq(
        optional($.attribute),
        caseInsensitive("array"),
        commaSep1($.identifier),
      ),

    record_definition: ($) =>
      seq(
        optional($.attribute),
        choice(caseInsensitive("record"), caseInsensitive("file")),
        $.identifier,
        "(",
        commaSep1($.filename),
        ")",
        repeat($.record_parameter),
      ),
    record_parameter: ($) =>
      choice(
        caseInsensitive("normal"),
        caseInsensitive("write"),
        caseInsensitive("mem"),
        caseInsensitive("btr"),
        caseInsensitive("dbf"),
        caseInsensitive("dialog"),
        caseInsensitive("blob"),
        seq(
          caseInsensitive("txt"),
          optional($._integer), // line buffer size
        ),
        seq(
          choice(caseInsensitive("key"), caseInsensitive("sort")),
          $._integer,
        ),
      ),

    number: ($) => choice($._integer, $._decimal),
    _integer: ($) => /\d+/,
    _decimal: ($) => /\d+\.\d+/,
    string: ($) => repeat1(/"([^"]|\\")*"/),

    comment: ($) =>
      token(
        choice(
          seq("//", /(\\(.|\r?\n)|[^\\\n])*/),
          seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),
        ),
      ),

    _end: ($) => caseInsensitive("end"),

    class_definition: ($) =>
      seq(
        optional($.attribute),
        caseInsensitive("class"),
        optional(seq("(", field("parent_class", $.identifier), ")")),
        field("class_name", $.identifier),
        optional($.parameter_list),
        optional(field("class_body", $.class_body)),
        optional($.error_handler),
        $._end,
      ),

    attribute: ($) =>
      choice(caseInsensitive("local"), caseInsensitive("private")),

    with_definition: ($) =>
      seq(
        caseInsensitive("with"),
        "(",
        $.identifier,
        ")",
        $._statement_list,
        $._end,
      ),

    parameter_list: ($) => seq("(", commaSep($._typed_identifier), ")"),

    argument_list: ($) => seq("(", optional(commaSep($._expression)), ")"),

    // for (var i, 0, 100, 1)
    for_loop: ($) =>
      seq(
        caseInsensitive("for"),
        optional($.for_arguments),
        optional($._statement_list),
        $._end,
      ),

    for_arguments: ($) =>
      seq(
        "(",
        field("variable", choice($.variable_definition, $.identifier)),
        optional(
          seq(
            ",",
            field("start", $._expression),
            optional(
              seq(
                ",",
                field("end", $._expression),
                optional(seq(",", field("step", $._expression))),
              ),
            ),
          ),
        ),
        ")",
      ),

    while_loop: ($) =>
      prec(
        10,
        seq(
          caseInsensitive("while"),
          field("condition", $.parenthesized_expression),
          optional($._statement_list),
          $._end,
        ),
      ),

    if_statement: ($) =>
      seq(
        caseInsensitive("if"),
        field("condition", $.parenthesized_expression),
        optional($._statement_list),

        repeat(
          seq(
            caseInsensitive("elif"),
            field("condition", $.parenthesized_expression),
            optional($._statement_list),
          ),
        ),

        optional(seq(caseInsensitive("else"), optional($._statement_list))),

        $._end,
      ),

    return_statement: ($) => seq(caseInsensitive("return"), $._expression),

    output_statement: ($) =>
      seq(seq("[", $.template, "]"), optional($.formatted_argument_list)),

    template: ($) => /[^]]*/,

    formatted_argument_list: ($) =>
      seq("(", commaSep(seq($._expression, repeat($._format_specifier))), ")"),

    _format_specifier: ($) =>
      seq(
        ":",
        field(
          "format_specifier",
          choice(
            $._integer,
            "l",
            "r",
            "c",
            "a",
            "t",
            "d",
            "m",
            "w",
            "z",
            "f",
            "i",
            "iv",
            "v",
          ),
        ),
      ),

    macro_call: ($) =>
      seq(
        repeat($.qualification_prefix),
        choice(
          $._macro_call_with_parentheses,
          prec(-2, $._macro_call_without_parentheses),
        ),
      ),

    _macro_call_without_parentheses: ($) => seq(field("name", $.identifier)),

    _macro_call_with_parentheses: ($) =>
      seq(field("name", $.identifier), $.argument_list),

    variable_assignment: ($) =>
      seq(
        repeat($.qualification_prefix),
        $.identifier,
        $.assignment_operator,
        $._expression,
      ),
    _expression: ($) =>
      prec(
        1,
        choice(
          $.identifier,
          $.number,
          $.string,
          $.parenthesized_expression,
          prec(-1, $.macro_call),
          $.binary_expression,
          $.unary_expression,
          $._subscript_identifier,
          $.boolean_literal,
          $.special_literal,
          $.constant_builtin,
          $.variable_builtin,
        ),
      ),

    parenthesized_expression: ($) => seq("(", $._expression, ")"),

    qualification_prefix: ($) =>
      seq(choice($.identifier, $._macro_call_with_parentheses), "."),

    _subscript_identifier: ($) =>
      seq(repeat($.qualification_prefix), $.identifier, $.subscript),

    subscript: ($) => seq("[", $._expression, "]"),

    binary_expression: ($) =>
      prec.left(seq($._expression, $.binary_operator, $._expression)),
    binary_operator: ($) =>
      choice(
        prec.left(3, $.multiplication_operator),
        prec.left(2, $.add_operator),
        prec.left(1, $.relation_operator),
        prec.right($.assignment_operator),
      ),
    multiplication_operator: ($) => choice("*", "/", caseInsensitive("and")),
    add_operator: ($) => choice("+", "-", caseInsensitive("or")),
    relation_operator: ($) => choice("==", "!=", "<", "<=", ">", ">="),
    assignment_operator: ($) => "=",

    unary_expression: ($) => prec.left(seq($.unary_operator, $._expression)),
    unary_operator: ($) => choice(caseInsensitive("not"), "-"),
  },
});

function caseInsensitive(keyword, aliasAsWord = true) {
  let result = token(
    prec(
      1,
      new RegExp(
        keyword
          .split("")
          .map((l) =>
            l.toLowerCase() !== l.toUpperCase()
              ? `[${l.toUpperCase()}${l.toLowerCase()}]`
              : l,
          )
          .join(""),
      ),
    ),
  );
  if (aliasAsWord) result = alias(result, keyword);
  return result;
}

function commaSep(rule, delimiter = ",") {
  return optional(commaSep1(rule, delimiter));
}

function commaSep1(rule, delimiter = ",") {
  return seq(rule, repeat(seq(delimiter, rule)));
}

function semicolonSep1(rule, delimiter = ";") {
  return seq(rule, repeat(seq(delimiter, rule)), optional(delimiter));
}

function semicolonSep(rule, delimiter = ";") {
  return optional(semicolonSep1(rule, delimiter));
}
