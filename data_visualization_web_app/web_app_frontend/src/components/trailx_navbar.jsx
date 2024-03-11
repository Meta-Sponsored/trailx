import React from 'react';

const Trailx_NavHeader = () => {
  const styles = {
    navHeader: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      justifyContent: 'space-between',
      padding: '10px',
      height: '71px',
      width: '100vw',
    },
    logo: {
      height: '34px',
      width: '86px',
    },
    navMenu: {
      display: 'flex',
    },
    navItem: {
      padding: '10px',
      margin: '0 5px',
      color: '#595959',
      textDecoration: 'none',
      fontFamily: "'Poppins-Regular', sans-serif",
      fontSize: '14px',
    },
    profile: {
      height: '38px',
      position: 'relative',
      width: '38px',
    },
  };

  return (
    <div style={styles.navHeader}>
      <img style={styles.logo} src='/Logo.png' alt="Logo" />
      <div style={styles.navMenu}>
        <a style={styles.navItem} href="/news">NEWS & UPDATES</a>
        <a style={styles.navItem} href="/dashboard">DASHBOARD</a>
        <a style={styles.navItem} href="/history">HISTORY</a>
        <a style={styles.navItem} href="/about">WHO WE ARE</a>
      </div>
      <img style={styles.profile} alt="Profile" src="profile.png" />
    </div>
  );
};

export default Trailx_NavHeader;

