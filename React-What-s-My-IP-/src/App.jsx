import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import Ip from './components/Ip'

function App() {

  return (
    <ChakraProvider>
      <Ip />
    </ChakraProvider>
  )
}

export default App
