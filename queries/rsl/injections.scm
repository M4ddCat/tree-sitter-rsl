; SQL инъекции в строках (учитываем открывающую кавычку)
(string) @injection.content
  (#match? @injection.content "^\"(?i)sql:")
  (#set! injection.language "sql")

; Комментарии с SQL (учитываем слеши)
(comment) @injection.content
  (#match? @injection.content "^//\\s*(?i)sql")
  (#set! injection.language "sql")