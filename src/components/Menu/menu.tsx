import { NavLink } from 'react-router-dom'
import './menu.css'

export const Menu = () => (
  <div>
    <nav className="menu-nav">
    <NavLink to="/" children={({ isActive }) => {
      if(isActive) {
        return <img src="/home.svg" alt="" />
      }

      return (
        <button className="menu-item">
        <img src="/home.svg" alt="" />
      </button>
      )

    }} />
    <NavLink to="/invite-friends" children={({ isActive }) => {
      if(isActive) {
        return <img src="/invite-friend.svg" alt="" />
      }

      return (
        <button className="menu-item">
        <img src="/invite-friend.svg" alt="" />
      </button>
      )

    }} />
    </nav>
  </div>
)