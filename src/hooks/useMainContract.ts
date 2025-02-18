import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { Address, OpenedContract, toNano } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { MainContract } from "../contracts/MainContract";
import { useTonConnect } from "./useTonConnect";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export function useMainContract() {

    const { sender } = useTonConnect();

    const client = useTonClient();

    const [contractData, setContractData] = useState<null | {
        counter_value: number;
        recent_sender: Address;
        owner_address: Address;
    }>();

    const [balance, setBalance] = useState(0);

    const mainContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = new MainContract(
            Address.parseFriendly('EQBLbRYYAJh-Th5trOBbu8MA5iuxHqftVbhP49X3BuZ-OfFq').address
        )       

        return client.open(contract) as OpenedContract<MainContract>;
    }, [client]);

    useEffect(() => {
        async function getValue() {
                if (!mainContract) return;
                
                setContractData(null);

                const val = await mainContract.getData();
                const contractBalance = await mainContract.getBalance();

                setContractData({
                    counter_value: val.number,
                    recent_sender: val.recent_sender,
                    owner_address: val.owner_address
                })

                setBalance(contractBalance.number);

                await sleep(5000);

                getValue();

        
        }

        getValue();
    }, [mainContract])

    return {
        contract_address: mainContract?.address.toString(),
        contract_balance: balance,
        ...contractData,
        sendIncrement: async () => mainContract?.sendIncrement(sender, toNano('0.05'), 5),
        sendDeposit: async () => mainContract?.sendDeposit(sender, toNano('0.5')),
        sendWithdrawalRequest: async () => mainContract?.sendWithdrawalRequest(sender, toNano('0.05'), toNano('0.5'))
    };
}