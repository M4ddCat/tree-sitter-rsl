; Макросы создают область видимости
(macro_definition) @scope

; Классы создают область видимости
(class_definition) @scope

; Блоки создают область видимости
(block) @scope

; Циклы создают область видимости
(for_loop) @scope
(while_loop) @scope

; Условные операторы создают область видимости
(if_statement) @scope

; Определения переменных
(variable_definition
  (identifier) @definition.var)

; Параметры макросов
(parameter
  (identifier) @definition.parameter)

; Параметры в определении макроса
(macro_definition
  parameters: (parameter_list
    (parameter) @definition.parameter))

; Ссылки на переменные
(identifier) @reference
  (#not-match? @reference "^(Import|Macro|Var|If|Else|End|For|While|Return)$")