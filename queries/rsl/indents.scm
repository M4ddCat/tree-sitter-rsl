; Блоки, которые увеличивают отступ на уровень
[
  (class_definition)
  (macro_definition)
  (while_loop)
  (for_loop)
  (if_statement)
  (with_definition)
  (error_handler)
] @indent.begin

; Ветвления, которые должны оставаться на том же уровне (например, elif, else)
"elif" @indent.branch
"else" @indent.branch

; Ключевые слова, которые закрывают блок и уменьшают отступ
"end" @indent.end
"}" @indent.end