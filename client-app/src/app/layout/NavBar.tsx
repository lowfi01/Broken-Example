import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

const NavBar = () => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header >
          <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
          Activities!
        </Menu.Item>
        <Menu.Item name="Activities"/>
        <Menu.Item name="Activities">
          <Button positive content='Create Activity'/>
        </Menu.Item>
        </Container>
    </Menu>
  )
}

export default NavBar
