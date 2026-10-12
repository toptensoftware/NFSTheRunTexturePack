TT=../../build/TT/loading-map

ALL: \
	$(TT) \
	./exported \
	./exported/mapsheet.png

$(TT):
	mkdir -p $@

./exported:
	mkdir -p $@

./exported/mapsheet.png: mapsheet.svg
	inkscape $< --export-filename=$@ 
	bc7enc -q -g $@ $(TT)/90CE3DF27F7DCC27.dds
	