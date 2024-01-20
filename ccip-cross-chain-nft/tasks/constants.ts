export type AddressMap = { [blockchain: string]: string };
export type TokenAmounts = { token: string, amount: string }

export enum PayFeesIn {
    Native,
    LINK
}

export const supportedNetworks = [
    `ethereumSepolia`,
    `optimismGoerli`,
    `arbitrumTestnet`,
    `avalancheFuji`,
    `polygonMumbai`,
];

export const LINK_ADDRESSES: AddressMap = {
    [`ethereumSepolia`]: `0x779877A7B0D9E8603169DdbD7836e478b4624789`,
    [`polygonMumbai`]: `0x326C977E6efc84E512bB9C30f76E30c160eD06FB`,
    [`optimismGoerli`]: `0xdc2CC710e42857672E7907CF474a69B63B93089f`,
    [`arbitrumTestnet`]: `0xb1D4538B4571d411F07960EF2838Ce337FE1E80E`,
    [`avalancheFuji`]: `0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846`
};

export const routerConfig = {
    ethereumSepolia: {
        address: `0xd0daae2231e9cb96b94c8512223533293c3693bf`,
        chainSelector: `16015286601757825753`,
        feeTokens: [LINK_ADDRESSES[`ethereumSepolia`], `0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534`]
    },
    optimismGoerli: {
        address: `0xeb52e9ae4a9fb37172978642d4c141ef53876f26`,
        chainSelector: `2664363617261496610`,
        feeTokens: [LINK_ADDRESSES[`optimismGoerli`], `0x4200000000000000000000000000000000000006`]
    },
    avalancheFuji: {
        address: `0x554472a2720e5e7d5d3c817529aba05eed5f82d8`,
        chainSelector: `14767482510784806043`,
        feeTokens: [LINK_ADDRESSES[`avalancheFuji`], `0xd00ae08403B9bbb9124bB305C09058E32C39A48c`]
    },
    arbitrumTestnet: {
        address: `0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165`,
        chainSelector: `3478487238524512106`,
        feeTokens: [LINK_ADDRESSES[`arbitrumTestnet`], `0x32d5D5978905d9c6c2D4C417F0E06Fe768a4FB5a`]
    },
    polygonMumbai: {
        address: `0x70499c328e1e2a3c41108bd3730f6670a44595d1`,
        chainSelector: `12532609583862916517`,
        feeTokens: [LINK_ADDRESSES[`polygonMumbai`], `0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889`]
    }
}
