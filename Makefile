TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REPORTER = spec
TIMEOUT = 3000
MOCHA_OPTS =

install:
	@npm install --registry=http://r.cnpmjs.org

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--harmony \
		--reporter $(REPORTER) \
		--require co-mocha \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov: install
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover --report html \
		./node_modules/.bin/_mocha -- \
		--reporter $(REPORTER) \
		--require co-mocha \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

.PHONY: test
