; Функция как объект (af, if в Vim)
(macro_definition) @function.outer
(macro_definition
  body: (_) @function.inner)

; Класс как объект
(class_definition) @class.outer
(class_definition
  body: (_) @class.inner)

; Блок кода
(block) @block.outer
(block) @block.inner

; Комментарий
(comment) @comment.outer
(comment) @comment.inner

; Параметры
(parameter_list) @parameter.outer
(parameter) @parameter.inner