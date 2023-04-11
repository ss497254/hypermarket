package client

import (
	"embed"
)

//go:embed all:dist
var WebsiteSource embed.FS
