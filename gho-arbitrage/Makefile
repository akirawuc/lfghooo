RPC_URL=https://mainnet.infura.io/v3/360a570f5c56455eb11e077353af1bc3

test:
	forge test -vv --fork-url $(RPC_URL)
	#forge test -vv

build:
	forge build --via-ir

lint:
	npx solhint 'src/**/*.sol'
	npx prettier --write --plugin=prettier-plugin-solidity 'src/**/*.sol'

localnet:
	anvil --chain-id=1

deploy:
	forge script DeploymentScript \
        --private-key $(PRIVATE_KEY) \
        --rpc-url $(RPC_URL) \
        --chain-id 11155111 \
        --json \
        --broadcast \
        -s "deploy()" \
        --via-ir


.PHONY: test build lint localnet
