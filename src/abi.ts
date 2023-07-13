import { abi as ERC20 } from '../build/contracts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json'
import { abi as FundingRoundFactory } from '../build/contracts/contracts/FundingRoundFactory.sol/FundingRoundFactory.json'
import { abi as FundingRound } from '../build/contracts/contracts/FundingRound.sol/FundingRound.json'
import { abi as MACIFactory } from '../build/contracts/contracts/MACIFactory.sol/MACIFactory.json'
import { abi as MACI } from '../build/contracts/maci-contracts/sol/MACI.sol/MACI.json'
import { abi as UserRegistry } from '../build/contracts/contracts/userRegistry/IUserRegistry.sol/IUserRegistry.json'
import { abi as BrightIdUserRegistry } from '../build/contracts/contracts/userRegistry/BrightIdUserRegistry.sol/BrightIdUserRegistry.json'
import { abi as SimpleRecipientRegistry } from '../build/contracts/contracts/recipientRegistry/SimpleRecipientRegistry.sol/SimpleRecipientRegistry.json'
import { abi as OptimisticRecipientRegistry } from '../build/contracts/contracts/recipientRegistry/OptimisticRecipientRegistry.sol/OptimisticRecipientRegistry.json'
import { abi as KlerosGTCR } from '../build/contracts/contracts/recipientRegistry/IKlerosGTCR.sol/IKlerosGTCR.json'
import { abi as KlerosGTCRAdapter } from '../build/contracts/contracts/recipientRegistry/KlerosGTCRAdapter.sol/KlerosGTCRAdapter.json'

export {
	ERC20,
	FundingRoundFactory,
	FundingRound,
	MACIFactory,
	MACI,
	UserRegistry,
	BrightIdUserRegistry,
	SimpleRecipientRegistry,
	OptimisticRecipientRegistry,
	KlerosGTCR,
	KlerosGTCRAdapter,
}
