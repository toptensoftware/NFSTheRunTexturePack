TT=../../build/TT/hud

ALL: \
	$(TT) \
	./exported \
	./exported/hudmap.png

$(TT):
	mkdir -p $@

./exported:
	mkdir -p $@

./exported/hudmap.png: hudmap.svg
	inkscape $< --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/D6406BE07F12231E.dds

