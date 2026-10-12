INPUTS := $(wildcard *-topaz.png)
OUTDIR := ../../build/TT/characters
OUTPUTS := $(patsubst %-topaz.png,$(OUTDIR)/%.dds,$(INPUTS))

all: $(OUTPUTS)

$(OUTDIR)/%.dds: %-topaz.png
	@mkdir -p $(OUTDIR)
	bc7enc -q -g "$<" "$@"
