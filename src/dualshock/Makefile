PATCH=node ../../patch-svg.js $< temp.svg
TT=../../build/TT/dualshock

ALL: \
	$(TT) \
	./exported \
	./exported/menu-cross.png \
	./exported/menu-circle.png \
	./exported/menu-square.png \
	./exported/menu-triangle.png \
	./exported/menu-start.png \
	./exported/menu-select.png \
	./exported/shoulder-buttons-glow.png \
	./exported/shoulder-buttons-glow.png \
	./exported/qte-circle-cracked.png \
	./exported/qte-circle-up.png \
	./exported/qte-circle-down.png \
	./exported/qte-square-cracked.png \
	./exported/qte-square-up.png \
	./exported/qte-square-down.png \
	./exported/qte-triangle-cracked.png \
	./exported/qte-triangle-up.png \
	./exported/qte-triangle-down.png \
	./exported/qte-cross-cracked.png \
	./exported/qte-cross-up.png \
	./exported/qte-cross-down.png \
	./exported/qte-l2r2-cracked.png \
	./exported/qte-l2r2-up.png \
	./exported/qte-l2r2-down.png \
	./exported/qte-l2-cracked.png \
	./exported/qte-l2-up.png \
	./exported/qte-l2-down.png \
	./exported/qte-r2-cracked.png \
	./exported/qte-r2-up.png \
	./exported/qte-r2-down.png \
	./exported/menu-sheet.png

$(TT):
	mkdir -p $@

./exported:
	mkdir -p $@

./exported/menu-cross.png: menu-buttons.svg
	$(PATCH) --hide:cross:circle:square:triangle --show:cross
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/C8667679416EE768.dds

./exported/menu-circle.png: menu-buttons.svg
	$(PATCH) --hide:cross:circle:square:triangle --show:circle
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/F0821E62773F858B.dds

./exported/menu-square.png: menu-buttons.svg
	$(PATCH) --hide:cross:circle:square:triangle --show:square
	inkscape temp.svg --export-filename=$@ 
	# .dds hash unknown

./exported/menu-triangle.png: menu-buttons.svg
	$(PATCH) --hide:cross:circle:square:triangle --show:triangle
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/6282ED8CEDB2B259.dds

./exported/menu-select.png: start-select.svg
	$(PATCH) --hide:start:select --show:select
	inkscape temp.svg --export-filename=$@ 
	# .dds hash unknown

./exported/menu-start.png: start-select.svg
	$(PATCH) --hide:start:select --show:start
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/02F53D4F7BF30EB6.dds

./exported/shoulder-buttons-glow.png: shoulder-buttons-glow.svg
	inkscape $< --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/9680805BB6D0827E.dds

./exported/shoulder-button-glow.png: shoulder-button-glow.svg
	inkscape $< --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/F2FDB578D1742339.dds

./exported/qte-circle-cracked.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:circle:up:cracked
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/27F1824D1AFCB6C4.dds

./exported/qte-circle-up.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:circle:up
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/6D2E0BED9C9EE316.dds

./exported/qte-circle-down.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:circle:down
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/5598383E23C67393.dds


./exported/qte-square-cracked.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:square:up:cracked
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/83B1500CF5BA0961.dds

./exported/qte-square-up.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:square:up
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/FA223997906956A4.dds

./exported/qte-square-down.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:square:down
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/8564D1B55428AAD0.dds


./exported/qte-triangle-cracked.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:triangle:up:cracked
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/707374DF826595C7.dds

./exported/qte-triangle-up.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:triangle:up
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/4533FD8B0436304B.dds

./exported/qte-triangle-down.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:triangle:down
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/0AB64365F33FB919.dds


./exported/qte-cross-cracked.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:cross:up:cracked
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/D681AADB49B88355.dds

./exported/qte-cross-up.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:cross:up
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/B3DFA5F68C8BC282.dds

./exported/qte-cross-down.png: qte-buttons.svg
	$(PATCH) --hide:cracked:up:down:circle:triangle:square:cross --show:cross:down
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/D5FC5C89D122B87F.dds

./exported/qte-l2r2-cracked.png: shoulder-buttons.svg
	$(PATCH) --hide:cracked:up:down --show:up:cracked
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/60244607B2236D26.dds

./exported/qte-l2r2-up.png: shoulder-buttons.svg
	$(PATCH) --hide:cracked:up:down --show:up
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/D2E2246027DB920F.dds

./exported/qte-l2r2-down.png: shoulder-buttons.svg
	$(PATCH) --hide:cracked:up:down --show:down
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/DD53A16BABCC5E6C.dds


./exported/qte-l2-cracked.png: shoulder-button.svg
	$(PATCH) --hide:l2:r2:cracked:up:down --show:l2:up:cracked
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/62B61365F9C9A77D.dds

./exported/qte-l2-up.png: shoulder-button.svg
	$(PATCH) --hide:l2:r2:cracked:up:down --show:l2:up
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/AB647EC537447B4E.dds

./exported/qte-l2-down.png: shoulder-button.svg
	$(PATCH) --hide:l2:r2:cracked:up:down --show:l2:down
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/F2A2A229932BBD7C.dds

./exported/qte-r2-cracked.png: shoulder-button.svg
	$(PATCH) --hide:l2:r2:cracked:up:down --show:r2:up:cracked
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/5A6EB3CA78039F9C.dds

./exported/qte-r2-up.png: shoulder-button.svg
	$(PATCH) --hide:l2:r2:cracked:up:down --show:r2:up
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/6D7662B3DCF678B0.dds

./exported/qte-r2-down.png: shoulder-button.svg
	$(PATCH) --hide:l2:r2:cracked:up:down --show:r2:down
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/CD099E2A3525AADB.dds

./exported/menu-sheet.png: menu-sheet.svg
	inkscape $< --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/E3714DDCA128992A.dds

