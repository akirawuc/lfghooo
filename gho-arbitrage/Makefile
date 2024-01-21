FORK_RPC_URL=https://mainnet.infura.io/v3/360a570f5c56455eb11e077353af1bc3
DEPLOY_RPC_URL=https://rpc.sepolia.org

test:
	forge test -vv --fork-url $(FORK_RPC_URL)
	#forge test -vv

build:
	forge build --via-ir

lint:
	npx solhint 'src/**/*.sol'
	npx prettier --write --plugin=prettier-plugin-solidity 'src/**/*.sol'

localnet:
	anvil --fork-url $(FORK_RPC_URL) --chain-id=1337

deploy:
	forge script DeploymentScript \
        --rpc-url $(DEPLOY_RPC_URL) \
        --json \
        --broadcast \
        -s "deploy()" \
        --via-ir


.PHONY: test build lint localnet
