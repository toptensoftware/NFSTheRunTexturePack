TT=../../build/TT/stage-maps

ALL: \
	$(TT) \
	./exported \
	./exported/stagemap1.png \
	./exported/stagemap2.png \
	./exported/stage-complete-01.touch \
	./exported/stage-complete-02.touch

$(TT):
	mkdir -p $@

./exported:
	mkdir -p $@

./exported/stagemap1.png: stagemap1.svg
	inkscape $< --export-filename=$@ 
	magick $@ -define dds:compression=none -define dds:mipmaps=0 $(TT)/62E1F08F61948008.dds

./exported/stagemap2.png: stagemap2.svg
	inkscape $< --export-filename=$@ 
	magick $@ -define dds:compression=none -define dds:mipmaps=0 $(TT)/E04CBBBE576B0C53.dds

./exported/%.touch: %.svg
	node ../../export-pages.js $< ./exported $(TT)
