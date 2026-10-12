PATCH=node ../../patch-svg.js $< temp.svg
TT=../../build/TT/menu

ALL: \
	$(TT) \
	./exported \
	./exported/menu-sheet.png \
	./exported/menu-arrow-small.png \
	./exported/menu-arrow-medium.png \
	./exported/menu-arrow-large.png

$(TT):
	mkdir -p $@

./exported:
	mkdir -p $@

./exported/menu-sheet.png: menu-sheet.svg
	inkscape $< --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/6F6F438E4B246110.dds

./exported/menu-arrow-small.png: menu-arrows.svg
	$(PATCH) --hide:small:medium:large --show:small
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/E34A3787B5977B02.dds

./exported/menu-arrow-medium.png: menu-arrows.svg
	$(PATCH) --hide:small:medium:large --show:medium
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/000731415AA87031.dds

./exported/menu-arrow-large.png: menu-arrows.svg
	$(PATCH) --hide:small:medium:large --show:large
	inkscape temp.svg --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/73E5B47B6A461E06.dds