const style = {}
style.container = {
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  top: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: "linear-gradient(-45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%,  rgba(255,53,127,1) 100%)" 
}

style.div1 = {
  height: '100%', 
  width: '100%', 
  overflow: 'hidden',
}

style.div2 = { 
  height: '90%', 
  width: '100%', 
  overflow: 'auto',
}

style.siteContainer = {
  background: 'white', 
  height: '100%', 
  marginTop: '0em', 
  paddingTop: '7rem',
  paddingLeft: '4rem',
  paddingRight: '4rem',
  width: '1400px'
}
export default style;