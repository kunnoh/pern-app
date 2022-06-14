rebuild: server.rebuild ## Install
start: server.start ## Start in detech mode
daemon: server.daemon ## Start in detech mode
stop: server.stop ## Stop all images running and delete

dbconnect: db.connect

include makefiles/server.mk
include makefiles/db.mk
