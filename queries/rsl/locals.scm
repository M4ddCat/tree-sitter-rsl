; --- Области видимости (Scopes) ---
(macro_definition) @scope
(class_definition) @scope
(for_loop) @scope
(while_loop) @scope
(if_statement) @scope

; --- Определения переменных (Definitions) ---
; Переменные в var (нужно пробиться через инициализацию к имени)
(variable_definition
  (_variable_initialization
    (_typed_identifier name: (identifier) @definition.var)))

; Параметры макроса
(parameter_list
  (_typed_identifier name: (identifier) @definition.parameter))

; --- Использование (References) ---
(identifier) @reference