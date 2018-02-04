import React from 'react';
import {NavLink} from 'react-router-dom';
import cxs from 'cxs';

import {colors, font} from '../../common/theme';

const navBarItems = [
  {title: 'Research', path: '/research'},
  {title: 'My favorites', path: '/my-favorites'}
];

const navBarStyle = cxs({
  backgroundColor: 'rgba(0,0,0,.5)',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '24px',
  paddingTop: '60px',
  position: 'fixed',
  width: '220px',
  ' a': {
    color: 'hsla(0,0%,100%,.6)',
    transition: '0.2s linear',
    cursor: 'pointer',
    fontSize: font.menuSize,
    lineHeight: '22px',
    letterSpacing: '.015em',
    fontWeight: '600',
    padding: '10px 0'
  },
  ' a.active': {
    color: 'rgba(81, 201, 123, 0.867)'
  },
  ' a:hover:not(.active)': {
    color: colors.primaryColor
  },
  '@media screen and (max-width: 480px)': {
    overflow: 'hidden',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    display: 'block',
    height: '50px',
    padding: '0',
    zIndex: '20',
    backgroundColor: '#000',
    ' a': {
      width: `${100/navBarItems.length}%`,
      float: 'left',
      display: 'block',
      color: '#f2f2f2',
      textAlign: 'center',
      padding: '14px 16px',
      textDecoration: 'none'
    }
  }
});

const NavBar = () => {

  return (
    <nav className={navBarStyle}>
      {navBarItems.map((navBarItem, i) =>
        <NavLink to={navBarItem.path} key={i}>
            {navBarItem.title}
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
