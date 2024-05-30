import { GambaUi, TokenValue, useCurrentPool, useGambaPlatformContext, useUserBalance } from 'gamba-react-ui-v2'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Modal } from '../components/Modal'
import TokenSelect from './TokenSelect'
import { UserButton } from './UserButton'


const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: #003c00;
  border-radius: 10px;
  background: #03ffa4;
  padding: 2px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background .2s;
  &:hover {
    background: white;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; 
  padding: 10px;
  background: rgba(33, 34, 51, 0.9);
  position: fixed;
  background: #000000CC;
  backdrop-filter: blur(20px);
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
`

const Logo = styled(NavLink)`
  height: 60px;
  margin-right: 30px;
  & > img {
    height: 100%;
  }
`;

const LogoText = styled(NavLink)`
  color: white;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: none;
  background: linear-gradient(-45deg, #ffb07c, #ff3e88, #2969ff, #ef3cff, #ff3c87);
  background-size: 300% 300%;
  animation: welcome-fade-in 0.5s ease, backgroundGradient 30s ease infinite;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  border-radius: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  @keyframes welcome-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes backgroundGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;


export default function Header() {
  const pool = useCurrentPool()
  const context = useGambaPlatformContext()
  const balance = useUserBalance()
  const [bonusHelp, setBonusHelp] = React.useState(false)
  const [jackpotHelp, setJackpotHelp] = React.useState(false)


  
  

  

  return (
    <>
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          <h1>Bonus ✨</h1>
          <p>
            You have <b><TokenValue amount={balance.bonusBalance} /></b> worth of free plays. This bonus will be applied automatically when you play.
          </p>
          <p>
            Note that a fee is still needed from your wallet for each play.
          </p>
        </Modal>
      )}
      {jackpotHelp && (
        <Modal onClose={() => setJackpotHelp(false)}>
          <h1>Jackpot 💰</h1>
          <p style={{ fontWeight: 'bold' }}>
            There{'\''}s <TokenValue amount={pool.jackpotBalance} /> in the Jackpot.
          </p>
          <p>
            The Jackpot is a prize pool that grows with every bet made. As the Jackpot grows, so does your chance of winning. Once a winner is selected, the value of the Jackpot resets and grows from there until a new winner is selected.
          </p>
          <p>
            You will be paying a maximum of {(context.defaultJackpotFee * 100).toLocaleString(undefined, { maximumFractionDigits: 4 })}% for each wager for a chance to win.
          </p>
          <GambaUi.Switch
            checked={context.defaultJackpotFee > 0}
            onChange={(checked) => context.setDefaultJackpotFee(checked ? 0.01 : 0)}
          />
        </Modal>
      )}
      <StyledHeader>
        <Logo to="/">
          <img alt="Betardio Logo" src="/logo.png" />
        </Logo>
        <LogoText to="/">Betardio</LogoText>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative' }}>
          {pool.jackpotBalance > 0 && (
            <Bonus onClick={() => setJackpotHelp(true)}>
              💰 <TokenValue amount={pool.jackpotBalance} />
            </Bonus>
          )}
          {balance.bonusBalance > 0 && (
            <Bonus onClick={() => setBonusHelp(true)}>
              ✨ <TokenValue amount={balance.bonusBalance} />
            </Bonus>
          )}
          <TokenSelect />
          <UserButton />
        </div>
      </StyledHeader>
    </>
  )
} 
