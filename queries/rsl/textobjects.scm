; Функции (Макросы)
(macro_definition) @function.outer
(macro_body) @function.inner

; Классы
(class_definition) @class.outer
(class_body) @class.inner

; Любые списки выражений (как замена block)
(_statement_list) @block.outer
(_statement_list) @block.inner

; Комментарии
(comment) @comment.outer
(comment) @comment.inner

; Аргументы и параметры
(parameter_list) @parameter.outer
(parameter_list
  (_typed_identifier) @parameter.inner)

(argument_list) @parameter.outer
(argument_list
  (_expression) @parameter.inner)