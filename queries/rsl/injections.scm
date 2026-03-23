; SQL инъекции в строках с префиксом "sql:"
(string) @injection.content
  (#match? @injection.content "^sql:")
  (#set! injection.language "sql")

; Комментарии с SQL
(comment) @injection.content
  (#match? @injection.content "^-- sql")
  (#set! injection.language "sql")