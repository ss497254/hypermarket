package client

import (
	"embed"
)

//go:embed all:apps/admin/out
var AdminWebsiteSource embed.FS

//go:embed all:apps/web/out
var WebsiteSource embed.FS

// func AdminWebsiteSource() fs.FS {
// 	distFS, err := fs.Sub(adminWebsiteSource, "apps/admin/out")
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	return distFS
// }

// func WebsiteSource() fs.FS {
// 	distFS, err := fs.Sub(websiteSource, "apps/web/out")
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	return distFS
// }
