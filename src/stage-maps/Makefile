TT=../../build/TT/stage-maps

ALL: \
	$(TT) \
	./exported \
	./exported/stagemap1.png \
	./exported/stagemap2.png \
	./exported/stage-complete-01.touch \
	./exported/stage-complete-02.touch \
	./exported/stage-complete-03.touch \
	./exported/stage-complete-04.touch \
	./exported/stage-complete-05.touch \
	./exported/stage-complete-06.touch \
	./exported/stage-complete-07.touch \
	./exported/stage-complete-08.touch \
	./exported/stage-complete-09.touch \
	./exported/stage-complete-10.touch

$(TT):
	mkdir -p $@

./exported:
	mkdir -p $@

./exported/stagemap1.png: stagemap1.svg
	inkscape $< --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/62E1F08F61948008.dds

./exported/stagemap2.png: stagemap2.svg
	inkscape $< --export-filename=$@ 
	bc7enc -q -g "$@" $(TT)/E04CBBBE576B0C53.dds

./exported/%.touch: %.svg
	node ../../export-pages.js $< ./exported $(TT)
