import accountData from '../../DATA/account.json'
import Account from './Account'

export default function Accounts(){
    return (
        <>
          <h2 className="sr-only">Accounts</h2>
          {accountData.map(account => <Account account={account} key={account.id}/>)}         
        </>
    )
}