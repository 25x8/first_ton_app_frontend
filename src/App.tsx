import { fromNano } from '@ton/core';
import './App.css'
import TonConnectButton from './external/TonConnectButton'
import { useMainContract } from './hooks/useMainContract'
import { useTonConnect } from './hooks/useTonConnect';

function App() {

  const {
    contract_address,
    counter_value,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest
  } = useMainContract();

  const { connected } = useTonConnect();

  return (
    <>
      <div>
        <TonConnectButton />
      </div>
      <div>
          <div className="Card">
            <b>Our contract address</b>
            <div className="Hint">{contract_address?.slice(0, 30) + '...'}</div>
            <b>Our contract balance</b>
            {contract_balance && (<div className="Hint">{fromNano(contract_balance)}</div>)}
          </div>

          <div className="Card">
            <b>Counter Value</b>
            <div>{counter_value ?? 'Loading...'}</div>
          </div>

          {
            connected && (
              <a
                onClick={sendIncrement}
              >
                Increment
              </a>
            )
          }

          <br />


          {
            connected && (
              <a
                onClick={sendDeposit}
              >
                Request deposit 0.5 ton
              </a>
            )
          }

          <br />
          {
            connected && (
              <a
                onClick={sendWithdrawalRequest}
              >
                Request 0.5 TON withdrawal
              </a>
            )
          }
      </div>
      
    </>
  )
}

export default App
