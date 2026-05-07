; Навигация по макросам и классам
(macro_definition
  "macro" @open
  "end" @close)

(class_definition
  "class" @open
  "end" @close)

; Навигация по условиям
(if_statement
  "if" @open
  "elif" @mid
  "else" @mid
  "end" @close)

; Навигация по циклам
(while_loop
  "while" @open
  "end" @close)

(for_loop
  "for" @open
  "end" @close)

(with_definition
  "with" @open
  "end" @close)