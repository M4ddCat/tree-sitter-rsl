; ============================================
; Комментарии, Строки и Числа
; ============================================
(comment) @comment
(string) @string
(number) @number
(money_literal) @number.float

; ============================================
; Ключевые слова (строго по словам)
; ============================================
"import" @keyword.import
"var" @keyword.modifier
"macro" @keyword.function
"class" @keyword.function
"if" @keyword.conditional
"elif" @keyword.conditional
"else" @keyword.conditional
"for" @keyword.repeat
"while" @keyword.repeat
"return" @keyword.return
"const" @keyword.modifier
"with" @keyword
"record" @keyword
"file" @keyword
"array" @keyword
"end" @keyword
"onerror" @keyword.exception

; ============================================
; Идентификаторы
; ============================================
(identifier) @variable

; ============================================
; Функции и Макросы
; ============================================
(macro_definition name: (identifier) @function)
(macro_call name: (identifier) @function.call)
(macro_call name: (variable_builtin) @variable.builtin)

; ============================================
; Типы
; ============================================
(type_declaration (type) @type)
(scalar_type) @type.builtin
(object_type (identifier) @type)

; ============================================
; Встроенные значения
; ============================================
(boolean_literal) @boolean
(constant_builtin) @constant.builtin
(special_literal) @constant.builtin
(variable_builtin) @variable.builtin

; ============================================
; Операторы и Разделители
; ============================================
(multiplication_operator) @operator
(add_operator) @operator
(relation_operator) @operator
(unary_operator) @operator
(assignment_operator) @operator

";" @punctuation.delimiter
"," @punctuation.delimiter
"." @punctuation.delimiter
":" @punctuation.delimiter

"(" @punctuation.bracket
")" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket