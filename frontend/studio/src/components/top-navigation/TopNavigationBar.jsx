import { NavLink } from 'react-router'
import './TopNavigationBar.scss'

const TopNavigationBar = () => {
  return (
    <section className='top-navigation-bar'>
        <div className="top-path">
            <NavLink icon='' title='' path='' />
        </div>
        <hr className="top-divider" />
    </section>
  )
}

export default TopNavigationBar