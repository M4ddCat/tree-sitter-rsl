package tree_sitter_rsl_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_rsl "github.com/tree-sitter/tree-sitter-rsl/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_rsl.Language())
	if language == nil {
		t.Errorf("Error loading tree-sitter-rsl grammar")
	}
}
