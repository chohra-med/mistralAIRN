import { GetBlocksResponse } from "~/redux/blocks/blocksModel"

export const NB_TRANSACTIONS_PER_PAGE = 20



export const MOCKED_BLOCKS_DATA: GetBlocksResponse = {

    data: [
        {
            id: "ba42b90a390b4f3332b779b98a43288f17ce26ab6395f178c998a54aa6b136a2",
            version: 2,
            timestamp: 1708389540,
            height: 21427964,
            previousBlockID: "73b18ca305b851f1d654ee71c7d5d8ccf3cb4bd20bf299c5466937af15967fa5",
            generator: {
                address: "lskuct93vc8znov9a4fj7d3q4cprm6jj6ujnaajjo",
                name: "rougher_regret",
                publicKey: "f30b889457401bb3919746a0aa2dc753b6c9b019eaa9e9ed6b063c5bc8d203a7"
            },
            transactionRoot: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            assetRoot: "73804375cb3dd859dc8c3f1607a32d6bc1d3c57b6f343b90a0ee6bb776b064ce",
            numberOfTransactions: 0,
            numberOfAssets: 1,
            numberOfEvents: 2,
            signature: "3c381e5d593cddcfbe5efe23e6cc9ecfb82d92ca3e01138295b6c6e7d810573c7c83b185041adf12adef4da4c87d95d6ea3f4e1896980957cab6f157a7ae780b",
            isFinal: false
        },
        {
            id: "73b18ca305b851f1d654ee71c7d5d8ccf3cb4bd20bf299c5466937af15967fa5",
            version: 2,
            timestamp: 1708389530,
            height: 21427963,
            previousBlockID: "7c0495ce04c7b0f40d62e2f91cf33e4d601d9314a00eb06d1d1423dc7e57c851",
            generator: {
                address: "lsksmdmyjb3h3suchmfjsseywyo924f5nvf6yvkxg",
                name: "light_language",
                publicKey: "ce9dce2c5ff732c06b81429c9dd3757f3183bb9e22eef2da10d77c603978a600"
            },
            transactionRoot: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            assetRoot: "c3c6b0d4be81ef876d1014999703f64534294872acce2c40a4c73ba777be9a71",
            numberOfTransactions: 0,
            numberOfAssets: 1,
            numberOfEvents: 2,
            signature: "772de7bb674a5f055118d8001459f4ad56e11c1fad4d4a6830c75e2c821a321543d79dc0185918bb72572c1a7c54de12f737647d31e00c18bd26bf1eb1c26d01",
            isFinal: false
        },
        {
            id: "7c0495ce04c7b0f40d62e2f91cf33e4d601d9314a00eb06d1d1423dc7e57c851",
            version: 2,
            timestamp: 1708389520,
            height: 21427962,
            previousBlockID: "db2bfb5de0bafa29f2867bd25e09e14828b0d5ede97d03fbab3e700eff7f1547",
            generator: {
                address: "lsk76c3hovvq5cg3fausjucy87fxgbyypa4t5sodd",
                name: "pedantic_person",
                publicKey: "db2d3fa5fefc426702fe48561c8af98224efccc3e3e691812288ccbfa93115a9"
            },
            transactionRoot: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            assetRoot: "a08ee619d4987f49bdecf4788fdffb4cb0bde3d645ef61d47bb98e60811db5d9",
            numberOfTransactions: 0,
            numberOfAssets: 1,
            numberOfEvents: 2,
            signature: "7ec1936c3ffb5405aeda87eff363804b51c19d2091b150c7f919ee1262327af363454c28a80d029ccaf26d334defe1a3546565765b91785e9a402b038c28b006",
            isFinal: false
        }]
}